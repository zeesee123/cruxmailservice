const nodemailer=require('nodemailer');

console.log(nodemailer);

exports.handler=async function(event,context){


    if (event.httpMethod !== 'POST') {
        
        return {
            statusCode: 405, // Method Not Allowed
            body: JSON.stringify({ message: 'Only POST method is allowed' })
        };
    }

    // Parse the request body (it will be a JSON object)
    const requestBody = JSON.parse(event.body);
    const { name,comment,link,  order_number, 
        currency, 
        tracking_id, 
        payment_mode, 
        billing_name, 
        billing_email, 
        billing_tel, 
        billing_city, 
        billing_country, 
        billing_zip, 
        total_amount, 
        status, 
        invoice_date,invoice_pdf,invoice_name,mer_amount,trans_fee,service_tax  } = requestBody;

    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Using Gmail SMTP service
        auth: {
            user: 'zubinchadha@gmail.com',  // Your Gmail email address
            pass: 'jydcahsvmthpnmiy'  // Use your app password here if using 2FA
        }
    });

    // Email setup
    const mailOptions = {
        from: 'zubinchadha@gmail.com',  // Sender email (your Gmail address)
        to: `${billing_email}`,  // Replace with your recipient's email address
        subject: `Invoice for Order ${order_number}`,
        text: `Hello ${billing_name},\n\nYou have successfully placed an order with the following details:\n\nOrder Number: ${order_number}\nCurrency: ${currency}\nPayment Mode: ${payment_mode}\nTotal Amount: ${total_amount}\n\nThank you for shopping with us!`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice for Order #${order_number}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
        }
        p {
            font-size: 14px;
            line-height: 1.6;
            margin: 5px 0;
            color: #333;
        }
        strong {
            font-weight: bold;
        }
        .invoice-table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }
        .invoice-table th, .invoice-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .invoice-table th {
            background-color: #f7f7f7;
        }
        .cta-button {
            display: inline-block;
            background-color: yellow;
            color: #ffffff;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 4px;
            text-align: center;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Invoice for Order #${order_number}</h1>
        
        <p><strong>Name:</strong> ${billing_name}</p>
        <p><strong>Email:</strong> ${billing_email}</p>
        <p><strong>Phone:</strong> ${billing_tel}</p>
        <p><strong>Address:</strong> ${billing_city}, ${billing_country}, ${billing_zip}</p>
        
        <table class="invoice-table">
            <tr>
                <th>Order Number</th>
                <td>${order_number}</td>
            </tr>
               <tr>
                <th>Tracking Id</th>
                <td>${tracking_id}</td>
            </tr>
            <tr>
                <th>Currency</th>
                <td>${currency}</td>
            </tr>
            <tr>
                <th>Payment Mode</th>
                <td>${payment_mode}</td>
            </tr>
            <tr>
                <th>Total Amount</th>
                <td>${total_amount}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>${status}</td>
            </tr>
            <tr>
                <th>Invoice Date</th>
                <td>${invoice_date}</td>
            </tr>
        </table>

        <a href="${link}" class="cta-button">View Compendium PDF</a>

        <p>Thank you for shopping with us!</p>
        
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,
attachments: [
            {
                filename: invoice_name|| 'invoice.pdf',
                content: Buffer.from(invoice_pdf, 'base64'),
                contentType: 'application/pdf',
            },
        ],

        // html: `<p>You have received a message from <strong>gibson</strong> teamwork</p><p>below is the link for the file</p><a href='${link}'>Link</a>`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Email sent successfully to zubinchadha@gmail.com` }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
    }
}


 