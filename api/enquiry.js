const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const {
            firstName = '',
            surname = '',
            email = '',
            company = '',
            mobile = '',
            city = '',
            state = '',
            comments = '',
            productName = 'General',
            sendTo
        } = req.body;

        // Ensure SMTP credentials are provided in Vercel Environment Variables
        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.error("Missing SMTP_EMAIL or SMTP_PASSWORD environment variables.");
            return res.status(500).json({ success: false, message: 'Server email configuration error' });
        }

        // Create the transporter using Gmail SMTP
        // If the user uses a non-Gmail address, they might need different host/port settings
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Defaulting to Gmail for App Passwords
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        // Determine destination email
        const destinationEmail = sendTo || 'marketing@techbottindia.com';

        // Construct the email content
        const mailOptions = {
            from: `"TechBott Website" <${process.env.SMTP_EMAIL}>`,
            to: destinationEmail,
            subject: `New Enquiry / Brochure Download: ${productName}`,
            html: `
                <h2>New Enquiry Received</h2>
                <p><strong>Product of Interest:</strong> ${productName}</p>
                <hr />
                <h3>Contact Details</h3>
                <ul>
                    <li><strong>First Name:</strong> ${firstName}</li>
                    <li><strong>Surname:</strong> ${surname}</li>
                    <li><strong>Email Address:</strong> ${email}</li>
                    <li><strong>Mobile:</strong> ${mobile}</li>
                    <li><strong>Company:</strong> ${company}</li>
                    <li><strong>City:</strong> ${city}</li>
                    <li><strong>State:</strong> ${state}</li>
                </ul>
                <h3>Additional Comments</h3>
                <p>${comments}</p>
                <br />
                <p><em>This email was generated automatically by the TechBott website chatbot/forms.</em></p>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
    }
}
