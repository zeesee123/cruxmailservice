const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body);

       let transporter = nodemailer.createTransport({
               service: 'gmail',  // Using Gmail SMTP service
               auth: {
                   user: 'noreply@cruxcreativesolutions.com',  // Your Gmail email address
                   pass: 'Target1000@'  // Use your app password here if using 2FA
               }
           });

        let info = await transporter.sendMail({
            from: `${data["email"]}`,
            to: "reachout@cruxcreativesolutions.com",
            subject: `New ${data["Form Type"]} Submission`,
            html: `<h2>${data["Form Type"]}</h2>
                   <ul>
                   ${Object.keys(data).map((key) => `<li><strong>${key}:</strong> ${data[key]}</li>`).join("")}
                   </ul>`,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully", info }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
