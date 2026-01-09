import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 2;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // 🔐 RATE LIMIT (Vercel-safe)
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  const now = Date.now();
  const lastRequest = Number(req.headers["x-last-request"] || 0);

  if (now - lastRequest < RATE_LIMIT_WINDOW) {
    return res.status(429).json({
      success: false,
      error: "Too many requests. Please wait a minute and try again.",
    });
  }

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
      honey, // honeypot (explained below)
    } = req.body;

    // 🐝 Honeypot check
    if (honey) {
      return res.status(200).json({ success: true });
    }

    if (!name || !email || !eventType || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    await resend.emails.send({
      from: "Charles Portfolio <charlesugwuja9@gmail.com>",
      to: ["charlesugwuja9@gmail.com"],
      replyTo: email,
      subject: `New Booking Inquiry — ${name} (${eventType})`,
      html: `
        <h2>New Event Booking Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${eventDate || "Not specified"}</p>
        <p><strong>Audience:</strong> ${audienceSize || "Not specified"}</p>
        <p><strong>Location:</strong> ${eventLocation || "Not specified"}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    res.setHeader("X-Last-Request", String(now));

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
}
