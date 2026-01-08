// // /pages/api/test-email.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { Resend } from 'resend';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (!process.env.RESEND_API_KEY) {
//     return res.status(500).json({ 
//       success: false, 
//       error: 'RESEND_API_KEY is not set' 
//     });
//   }

//   const resend = new Resend(process.env.RESEND_API_KEY);
  
//   // Test both domains
//   const domains = ['onboarding@resend.dev', 'noreply@resend.app'];
//   const results = [];

//   for (const domain of domains) {
//     try {
//       const result = await resend.emails.send({
//         from: `Test <${domain}>`,
//         to: ['donotforgetme911@gmail.com'],
//         subject: `Test email from ${domain}`,
//         text: `Testing if ${domain} works`,
//       });
      
//       results.push({
//         domain,
//         success: !result.error,
//         error: result.error
//       });
//     } catch (error: any) {
//       results.push({
//         domain,
//         success: false,
//         error: error.message
//       });
//     }
//   }

//   res.status(200).json({
//     success: true,
//     results,
//     apiKeyExists: !!process.env.RESEND_API_KEY,
//     apiKeyStartsWith: process.env.RESEND_API_KEY?.substring(0, 10) + '...'
//   });
// }