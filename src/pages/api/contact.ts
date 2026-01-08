// /pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Get form data from request body
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

    // Validate required fields
    if (!name || !email || !eventType || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please fill in all required fields' 
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

    // Format the date nicely
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

    // Create email content for Charles
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Event Booking Inquiry</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #eee;
              border-top: none;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
            }
            .field:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .label {
              font-weight: 600;
              color: #D4AF37;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
              font-size: 16px;
            }
            .message-box {
              background: white;
              border-left: 4px solid #D4AF37;
              padding: 15px;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
            }
            .badge {
              display: inline-block;
              padding: 4px 12px;
              background: #D4AF37;
              color: white;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎤 New Event Booking Inquiry</h1>
            <p>You have received a new booking request from your website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Client Information</div>
              <div class="value">
                <strong>${name}</strong><br>
                📧 ${email}<br>
                ${phone ? `📱 ${phone}` : ''}
              </div>
            </div>
            
            <div class="field">
              <div class="label">Event Details</div>
              <div class="value">
                <span class="badge">${eventType}</span><br><br>
                <strong>Date:</strong> ${formattedDate}<br>
                <strong>Location:</strong> ${eventLocation || 'Not specified'}<br>
                <strong>Audience Size:</strong> ${audienceSize || 'Not specified'}
              </div>
            </div>
            
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="footer">
              <p>This inquiry was submitted through your website contact form.</p>
              <p>You can reply directly to ${email} to respond to this inquiry.</p>
              <p style="margin-top: 10px; color: #999;">
                Sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 1. Send notification email to Charles
    const notificationResult = await resend.emails.send({
      from: 'Charles Website <onboarding@resend.dev>', // Free Resend domain
      to: ['donotforgetme911@gmail.com'], // Send to Charles
      replyTo: email, // Set reply-to as client's email
      subject: `🎤 New ${eventType} Booking: ${name}`,
      html: emailHtml,
      text: `
        NEW EVENT BOOKING INQUIRY
        =========================
        
        Client Information:
        ------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        
        Event Details:
        -------------
        Event Type: ${eventType}
        Event Date: ${formattedDate}
        Event Location: ${eventLocation || 'Not specified'}
        Audience Size: ${audienceSize || 'Not specified'}
        
        Message:
        -------
        ${message}
        
        =========================
        
        This inquiry was submitted through your website contact form.
        You can reply directly to ${email} to respond to this inquiry.
        
        Sent on ${new Date().toLocaleDateString()}
      `,
    });

    if (notificationResult.error) {
      console.error('Resend notification error:', notificationResult.error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send notification email. Please try again later.' 
      });
    }

    // 2. Send auto-reply to the client
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Inquiry</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
              color: white;
              padding: 40px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #eee;
              border-top: none;
            }
            .greeting {
              font-size: 18px;
              margin-bottom: 20px;
            }
            .summary-box {
              background: white;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              border-left: 4px solid #D4AF37;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .summary-title {
              font-weight: 600;
              color: #D4AF37;
              margin-bottom: 10px;
              font-size: 16px;
            }
            .summary-item {
              margin-bottom: 8px;
              padding-bottom: 8px;
              border-bottom: 1px solid #f0f0f0;
            }
            .summary-item:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .highlight {
              background: #FFF9E6;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
              border-left: 4px solid #FFD700;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 30px;
              font-weight: 600;
              margin: 20px 0;
              text-align: center;
            }
            .contact-info {
              background: white;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              border: 1px solid #eee;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
            }
            .icon {
              display: inline-block;
              width: 20px;
              text-align: center;
              margin-right: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎤 Thank You for Your Inquiry!</h1>
            <p>Your event booking request has been received</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for reaching out about your ${eventType} event. I'm excited to learn more about your plans!</p>
            </div>
            
            <div class="summary-box">
              <div class="summary-title">📋 Inquiry Summary:</div>
              <div class="summary-item">
                <strong>Event Type:</strong> ${eventType}
              </div>
              ${eventDate ? `
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
                <strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            
            <div class="highlight">
              <p>✅ <strong>What happens next?</strong></p>
              <p>I've received your inquiry and will review it personally. You can expect a response from me within <strong>24 hours</strong>.</p>
            </div>
            
            <div class="contact-info">
              <p><strong>📞 Need immediate assistance?</strong></p>
              <p>
                <span class="icon">📱</span> Call or WhatsApp: <strong>+234 9133 769 535</strong><br>
                <span class="icon">📧</span> Email: <strong>donotforgetme911@gmail.com</strong>
              </p>
            </div>
            
            <div>
              <p><strong>In the meantime, you might want to:</strong></p>
              <ul>
                <li>Prepare any additional details about your event vision</li>
                <li>Think about specific songs or performances you'd like</li>
                <li>Consider your budget and timing preferences</li>
                <li>Check out my previous work on social media</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="tel:+2349133769535" class="cta-button">📞 Call Me Now</a>
            </div>
            
            <div class="footer">
              <p>This is an automated confirmation. Please do not reply to this email.</p>
              <p>To discuss your event further, please email <strong>donotforgetme911@gmail.com</strong></p>
              <p style="margin-top: 10px; color: #999;">
                Charles | Professional Event Host & MC<br>
                Lagos, Nigeria
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const autoReplyResult = await resend.emails.send({
      from: 'Charles <onboarding@resend.dev>', // From Charles
      to: [email], // Send to the client
      subject: `✅ Thank you for your ${eventType} booking inquiry!`,
      html: autoReplyHtml,
      text: `
        THANK YOU FOR YOUR INQUIRY
        ===========================
        
        Hi ${name},
        
        Thank you for reaching out about your ${eventType} event. I'm excited to learn more about your plans!
        
        📋 INQUIRY SUMMARY:
        -------------------
        Event Type: ${eventType}
        ${eventDate ? `Event Date: ${formattedDate}` : ''}
        ${eventLocation ? `Location: ${eventLocation}` : ''}
        ${audienceSize ? `Expected Guests: ${audienceSize}` : ''}
        Submitted: ${new Date().toLocaleDateString()}
        
        ✅ WHAT HAPPENS NEXT?
        ---------------------
        I've received your inquiry and will review it personally.
        You can expect a response from me within 24 hours.
        
        📞 NEED IMMEDIATE ASSISTANCE?
        ------------------------------
        Call or WhatsApp: +234 9133 769 535
        Email: donotforgetme911@gmail.com
        
        In the meantime, you might want to:
        • Prepare any additional details about your event vision
        • Think about specific songs or performances you'd like
        • Consider your budget and timing preferences
        • Check out my previous work on social media
        
        ===========================
        
        This is an automated confirmation. Please do not reply to this email.
        To discuss your event further, please email donotforgetme911@gmail.com
        
        Charles | Professional Event Host & MC
        Lagos, Nigeria
      `,
    });

    if (autoReplyResult.error) {
      console.error('Resend auto-reply error:', autoReplyResult.error);
      // Don't fail the whole request if auto-reply fails
      // Just log it and continue
    }

    // Success response
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! An auto-reply has been sent to your email.',
      data: {
        notificationSent: !notificationResult.error,
        autoReplySent: !autoReplyResult.error
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    });
  }
}