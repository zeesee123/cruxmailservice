const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body);

       let transporter = nodemailer.createTransport({
               service: 'gmail',  // Using Gmail SMTP service
               auth: {
                   user: 'cruxcreativesolutionslead@gmail.com',  // Your Gmail email address
                   pass: 'ntteeicxsbfxsolm'  // Use your app password here if using 2FA
               }
           });

           
let filteredData = Object.keys(data)
.filter(key => key !== "Form Type") // Exclude "Form Type"
.map(key => `<li><strong>${key}:</strong> ${data[key]}</li>`)
.join("");

        let info = await transporter.sendMail({
            from: `cruxcreativesolutionslead@gmail.com`,
            to: "reachout@cruxcreativesolutions.com",
            subject: `${data["Form Type"]}`,
            html: `<p>Hello CRUX</p>
            <p>There is a New Lead For you From CRUX Website</p>
            
                   <ul>
                   ${filteredData}
                   </ul>
                   <br>
                   <p>Please contact me as soon as possible via email or phone</p>`,
        });
        //he

        

        let userInfo = await transporter.sendMail({
            from: `cruxcreativesolutionslead@gmail.com`,
            to: data['email'],  // Send to the user
            subject: "Thank you for reaching out!",
            html: `<p>Dear ${data.name || "User"},</p>
                   <p>Thank you for contacting us. We have received your request and will get back to you shortly.</p>
                   <p><strong>Details Submitted:</strong></p>
                   <ul>${filteredData}</ul>
                   <p>We appreciate your interest!</p>
                   <br>
                   <p>Best Regards,<br>CRUX Creative Solutions</p>`,
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
