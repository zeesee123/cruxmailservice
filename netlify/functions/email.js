exports.handler=async function(event,context){

// return {statusCode:200,body:JSON.stringify({name:'oliver'})}

if (event.httpMethod !== 'POST') {
    return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ message: 'Only POST method is allowed' })
    };
}

// Parse the request body (it will be sent as a JSON object)
const requestBody = JSON.parse(event.body);
const { name, email } = requestBody; // Extract fields from the body

// Example: You can handle the logic here (e.g., sending an email)
console.log(`Received data: Name - ${name}, Email - ${email}`);

// Return a success message
return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello ${name}, we received your email: ${email}` })
};
}