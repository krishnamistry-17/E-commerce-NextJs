    // Example in a Next.js API route (pages/api/send-otp.js)
    import { generateOtp, saveOtp } from '../../lib/otpService'; // Your custom OTP functions
    import { sendEmail } from '../../lib/emailService'; // Your email sending service

    export default async function handler(req, res) {
      if (req.method === 'POST') {
        const { email } = req.body;
        const otp = generateOtp();
        await saveOtp(email, otp); // Store OTP in DB
        await sendEmail(email, 'Your OTP', `Your OTP is: ${otp}`);
        res.status(200).json({ message: 'OTP sent successfully' });
      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
    }