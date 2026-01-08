import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting store
interface RateLimitEntry {
  count: number;
  firstRequest: number;
  lastRequest: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const RATE_LIMIT_MAX = 2; // Max 2 requests per minute

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.lastRequest > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());

// Rate limiting middleware
app.use('/api/contact', (req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const identifier = `${ip}-${userAgent}`;
  
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry) {
    // First request
    rateLimitStore.set(identifier, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    next();
  } else {
    // Check if window has passed
    if (now - entry.firstRequest > RATE_LIMIT_WINDOW) {
      // Reset for new window
      rateLimitStore.set(identifier, {
        count: 1,
        firstRequest: now,
        lastRequest: now
      });
      next();
    } else {
      // Still in window
      if (entry.count >= RATE_LIMIT_MAX) {
        return res.status(429).json({
          success: false,
          error: 'Too many requests. Please wait a minute or contact me directly via phone/email.',
          contactInfo: {
            phone: '+234 9133 769 535',
            email: 'charlesugwuja9@gmail.com',
            alternativeMessage: 'For urgent inquiries, please call or WhatsApp me directly.'
          },
          retryAfter: Math.ceil((RATE_LIMIT_WINDOW - (now - entry.firstRequest)) / 1000)
        });
      } else {
        // Increment count
        entry.count++;
        entry.lastRequest = now;
        rateLimitStore.set(identifier, entry);
        next();
      }
    }
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is running!',
    port,
    rateLimitInfo: {
      maxRequests: RATE_LIMIT_MAX,
      windowSeconds: RATE_LIMIT_WINDOW / 1000
    }
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      audienceSize,
      eventLocation,
      message,
    } = req.body;

    console.log(`New contact form submission from: ${email}`);

    // Validation
    if (!name || !email || !eventType || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields: name, email, event type, and message'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Format date
    let formattedDate = 'Not specified';
    if (eventDate) {
      const date = new Date(eventDate);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }

    // Create subject for client (avoids spam triggers)
    const clientSubject = `Thank you for your ${eventType} inquiry - Charles Ugwuja`;
    
    // Create subject for Charles
    const charlesSubject = `New Inquiry: ${name} - ${eventType} - ${formattedDate === 'Not specified' ? 'Date TBD' : formattedDate}`;

    // 1. Send immediate notification to Charles
    console.log('Sending immediate notification to Charles...');
    const notificationResult = await resend.emails.send({
      from: 'Charles Porfolio(MC) <onboarding@resend.dev>',
      to: ['charlesugwuja9@gmail.com'],
      replyTo: email,
      subject: charlesSubject,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'normal'
      },
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Event Booking Inquiry</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #ffffff; padding: 25px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid #f0f0f0; }
              .label { font-weight: 600; color: #D4AF37; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
              .value { color: #333; font-size: 15px; }
              .message-box { background: #f9f9f9; border-left: 4px solid #D4AF37; padding: 15px; margin-top: 8px; border-radius: 4px; }
              .footer { text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
              .badge { display: inline-block; padding: 4px 10px; background: #D4AF37; color: white; border-radius: 16px; font-size: 12px; font-weight: 600; }
              .action-btn { display: inline-block; background: #D4AF37; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-weight: 600; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 22px;"> New Event Inquiry Received</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Client Name: ${name}</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Client Information</div>
                <div class="value">
                  <strong>${name}</strong><br>
                   Client Email: ${email}<br>
                  Client Number: ${phone ? `${phone}` : ' Phone not provided'}
                </div>
              </div>
              
              <div class="field">
                <div class="label">Event Details</div>
                <div class="value">
                  <span class="badge">Event Type: ${eventType}</span><br><br>
                  <strong>Date of Event:</strong> ${formattedDate}<br>
                  <strong>Event Location:</strong> ${eventLocation || 'Not specified'}<br>
                  <strong>Audience Size:</strong> ${audienceSize || 'Not specified'}
                </div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="background: #f0f8ff; padding: 15px; border-radius: 6px; border-left: 4px solid #4dabf7; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong> Submission Stats:</strong><br>
                  • Time received: ${new Date().toLocaleTimeString()}<br>
                  • Auto-reply scheduled: In 30 seconds<br>
                  • Email thread: ${clientSubject}
                </p>
              </div>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="mailto:${email}?subject=Re: ${charlesSubject}" class="action-btn">
                   Reply to ${name}
                </a>
              </div>
              
              <div class="footer">
                <p>This inquiry was submitted through your website contact form.</p>
                
                <p style="margin-top: 10px; color: #999; font-size: 11px;">
                  Sent at ${new Date().toLocaleTimeString()} on ${new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
NEW EVENT INQUIRY RECEIVED
==========================

CLIENT INFORMATION:
------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

EVENT DETAILS:
-------------
Event Type: ${eventType}
Event Date: ${formattedDate}
Event Location: ${eventLocation || 'Not specified'}
Audience Size: ${audienceSize || 'Not specified'}

MESSAGE:
--------
${message}

==========================

 SUBMISSION STATS:
• Time received: ${new Date().toLocaleTimeString()}
• Email thread: ${clientSubject}

 QUICK REPLY:
Email: ${email}
Subject: Re: ${charlesSubject}
This inquiry was submitted through your website contact form.

Sent at ${new Date().toLocaleTimeString()} on ${new Date().toLocaleDateString()}
      `,
    });

    if (notificationResult.error) {
      console.error('Resend notification error:', notificationResult.error);
      return res.status(500).json({
        success: false,
        error: 'Failed to process your inquiry. Please try again later.'
      });
    }

    console.log('Notification sent to Charles successfully');
    
    // 2. Schedule auto-reply to client after 30 seconds
    console.log('Scheduling auto-reply to client in 30 seconds...');
    
    // Store the auto-reply task
    const autoReplyData = {
      name,
      email,
      eventType,
      formattedDate,
      eventLocation,
      audienceSize,
      clientSubject,
      scheduledTime: Date.now() + 30000 // 30 seconds from now
    };
    
    // Schedule the auto-reply
    setTimeout(async () => {
      try {
        console.log(`Sending auto-reply to ${email}...`);
        
        const autoReplyResult = await resend.emails.send({
          from: 'Charles Ugwuja <onboarding@resend.dev>',
          to: [email],
          subject: clientSubject,
          headers: {
            'X-Priority': '3',
            'X-MSMail-Priority': 'Normal',
            'Importance': 'normal',
            'Precedence': 'bulk'
          },
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Thank You for Your Inquiry</title>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: white; padding: 35px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none; }
                  .greeting { font-size: 17px; margin-bottom: 20px; color: #444; }
                  .summary-box { background: #f9f9f9; border-radius: 6px; padding: 20px; margin: 20px 0; border-left: 4px solid #D4AF37; }
                  .summary-title { font-weight: 600; color: #D4AF37; margin-bottom: 12px; font-size: 15px; }
                  .summary-item { margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #eee; }
                  .summary-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
                  .highlight { background: #fff9e6; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #ffd700; }
                  .contact-info { background: #f0f8ff; border-radius: 6px; padding: 18px; margin: 20px 0; border: 1px solid #d0e8ff; }
                  .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
                  .cta-button { display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: white; padding: 12px 28px; text-decoration: none; border-radius: 24px; font-weight: 600; margin: 15px 0; font-size: 15px; }
                  .icon { display: inline-block; width: 20px; text-align: center; margin-right: 8px; }
                  .unsubscribe { font-size: 11px; color: #888; margin-top: 20px; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1 style="margin: 0; font-size: 24px;"> Inquiry Confirmed</h1>
                  <p style="margin: 8px 0 0 0; opacity: 0.9;">Thank you for contacting Charles Ugwuja</p>
                </div>
                
                <div class="content">
                  <div class="greeting">
                    <p>Hi <strong>${name}</strong>,</p>
                    <p>Thank you for your interest in my services for your <strong>${eventType}</strong> event. I've received your inquiry and am excited to learn more about your plans!</p>
                  </div>
                  
                  <div class="summary-box">
                    <div class="summary-title"> Your Inquiry Summary</div>
                    <div class="summary-item">
                      <strong>Event Type:</strong> ${eventType}
                    </div>
                    ${formattedDate !== 'Not specified' ? `
                    <div class="summary-item">
                      <strong>Event Date:</strong> ${formattedDate}
                    </div>
                    ` : ''}
                    ${eventLocation ? `
                    <div class="summary-item">
                      <strong>Location:</strong> ${eventLocation}
                    </div>
                    ` : ''}
                    ${audienceSize ? `
                    <div class="summary-item">
                      <strong>Expected Guests:</strong> ${audienceSize}
                    </div>
                    ` : ''}
                    <div class="summary-item">
                      <strong>Inquiry Received:</strong> ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  <div class="highlight">
                    <p><strong> What Happens Next?</strong></p>
                    <p>I will personally review your inquiry and respond with more detailed information within <strong>24 hours</strong>.</p>
                    <p>In my response, I'll include:</p>
                    <ul style="margin: 10px 0 0 20px;">
                      <li>Availability for your event date</li>
                      <li>Customized proposal and pricing</li>
                      <li>Previous event examples (if relevant)</li>
                      <li>Next steps for booking</li>
                    </ul>
                  </div>
                  
                  <div class="contact-info">
                    <p><strong> Need Immediate Assistance?</strong></p>
                    <p>
                      <span class="icon"></span> <strong>Call/WhatsApp:</strong> +234 9133 769 535<br>
                      <span class="icon"></span> <strong>Email:</strong> charlesugwuja9@gmail.com<br>
                      <span class="icon"></span> <strong>Location:</strong> Lagos, Nigeria
                    </p>
                    <p style="margin-top: 10px; font-size: 14px;">
                      <em>For urgent matters, direct contact is fastest.</em>
                    </p>
                  </div>
                  
                  <div>
                    <p><strong> While You Wait:</strong></p>
                    <ul style="margin: 10px 0 20px 20px;">
                      <li>Prepare any additional event details or questions</li>
                      <li>Consider your preferred event timeline</li>
                      <li>Think about specific music or program preferences</li>
                      <li>Check your email regularly for my response</li>
                    </ul>
                  </div>
                  
                  <div style="text-align: center; margin: 25px 0;">
                    <a href="tel:+2349133769535" class="cta-button"> Call Me Directly</a>
                    <p style="font-size: 13px; color: #666; margin-top: 10px;">
                      Available for urgent inquiries
                    </p>
                  </div>
                  
                  <div class="footer">
                    <p><strong>Charles Ugwuja</strong><br>
                    Professional Event Host & Master of Ceremonies</p>
                    
                    <div style="background: #f9f9f9; padding: 12px; border-radius: 4px; margin: 15px 0; font-size: 11px;">
                      <p style="margin: 0; color: #666;">
                        This is an automated confirmation email. Please do not reply directly to this message.<br>
                        To respond, email: <strong>charlesugwuja9@gmail.com</strong>
                      </p>
                    </div>
                    
                    <div class="unsubscribe">
                      <p style="margin: 0;">
                        To stop receiving automated confirmations, 
                        <a href="mailto:charlesugwuja9@gmail.com?subject=Unsubscribe%20Notifications" style="color: #888; text-decoration: underline;">
                          click here to unsubscribe
                        </a>
                      </p>
                    </div>
                    
                    <p style="margin-top: 15px; color: #999; font-size: 11px;">
                      Lagos, Nigeria • ${new Date().getFullYear()}
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
          text: `
INQUIRY CONFIRMATION
====================

Hi ${name},

Thank you for your interest in my services for your ${eventType} event. 
I've received your inquiry and am excited to learn more about your plans!

 YOUR INQUIRY SUMMARY
------------------------
Event Type: ${eventType}
${formattedDate !== 'Not specified' ? `Event Date: ${formattedDate}` : ''}
${eventLocation ? `Location: ${eventLocation}` : ''}
${audienceSize ? `Expected Guests: ${audienceSize}` : ''}
Inquiry Received: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}

 WHAT HAPPENS NEXT?
---------------------
I will personally review your inquiry and respond with more detailed information within 24 hours.

In my response, I'll include:
• Availability for your event date
• Customized proposal and pricing
• Previous event examples (if relevant)
• Next steps for booking

 NEED IMMEDIATE ASSISTANCE?
------------------------------
Call/WhatsApp: +234 9133 769 535
Email: charlesugwuja9@gmail.com
Location: Lagos, Nigeria

For urgent matters, direct contact is fastest.

 WHILE YOU WAIT:
------------------
• Prepare any additional event details or questions
• Consider your preferred event timeline
• Think about specific music or program preferences
• Check your email regularly for my response

====================

Charles Ugwuja
Professional Event Host & Master of Ceremonies

This is an automated confirmation email. Please do not reply directly to this message.
To respond, email: charlesugwuja9@gmail.com

To stop receiving automated confirmations, email charlesugwuja9@gmail.com with subject "Unsubscribe Notifications"

Lagos, Nigeria • ${new Date().getFullYear()}
          `,
        });

        if (autoReplyResult.error) {
          console.error('Auto-reply failed:', autoReplyResult.error);
        } else {
          console.log(`Auto-reply sent successfully to ${email}`);
        }
        
      } catch (error) {
        console.error('Error sending auto-reply:', error);
      }
    }, 30000); // 30 seconds delay

    // Return success response immediately
    res.status(200).json({
      success: true,
      message: 'Your inquiry has been received successfully!',
      note: 'Plesae wait for my response. Thank you.',
      details: {
        autoReplyScheduled: true,
        scheduledTime: new Date(Date.now() + 30000).toLocaleTimeString(),
        estimatedResponse: 'Within 24 hours',
        contactInfo: {
          directPhone: '+234 9133 769 535',
          directEmail: 'charlesugwuja9@gmail.com',
          note: 'For urgent inquiries, please contact me directly via phone or email.'
        }
      }
    });

  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again or contact me directly.',
      contactInfo: {
        phone: '+234 9133 769 535',
        email: 'charlesugwuja9@gmail.com'
      }
    });
  }
});

// Get rate limit status endpoint
app.get('/api/rate-limit-status', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const identifier = `${ip}-${userAgent}`;
  
  const entry = rateLimitStore.get(identifier);
  const now = Date.now();
  
  if (!entry) {
    return res.json({
      status: 'OK',
      remaining: RATE_LIMIT_MAX,
      limit: RATE_LIMIT_MAX,
      resetIn: 0
    });
  }
  
  const windowStart = entry.firstRequest;
  const resetTime = windowStart + RATE_LIMIT_WINDOW;
  const remaining = Math.max(0, RATE_LIMIT_MAX - entry.count);
  const resetIn = Math.max(0, Math.ceil((resetTime - now) / 1000));
  
  res.json({
    status: remaining > 0 ? 'OK' : 'LIMITED',
    remaining,
    limit: RATE_LIMIT_MAX,
    resetIn,
    used: entry.count,
    windowStart: new Date(windowStart).toISOString(),
    nextReset: new Date(resetTime).toISOString()
  });
});

// Start server
app.listen(port, () => {
  console.log(` Backend server running on port ${port}`);
  console.log(` Resend API key: ${process.env.RESEND_API_KEY ? 'Loaded' : 'Missing!'}`);
  console.log(` Rate limiting: ${RATE_LIMIT_MAX} requests per ${RATE_LIMIT_WINDOW/1000} seconds`);
  console.log(` Auto-reply delay: 30 seconds`);
});