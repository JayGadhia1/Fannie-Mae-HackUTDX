const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(cors()); // This allows all origins for testing. In production, you should configure this more securely.

app.use(bodyParser.json());




const {
    TextServiceClient
} = require("@google-ai/generativelanguage");
const {
    GoogleAuth
} = require("google-auth-library");

const API_KEY = "AIzaSyB1KCxHoM7x6gg_pys5O4f0DwzmgTOl_DY";

const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});



const prompt = "What can I do to improve my Loan-to-Value ratio, Debt-to-income ratio, my Front-end-debt-to-income ratio, and my credit score?";





// app.get('/api/AI-Response', (req, res) => {
//     client.generateText({
//         model: 'models/text-bison-001',
//         temperature: 0.7,
//         candidateCount: 1,
//         prompt: {
//             text: prompt,
//         },
//     }).then((result) => {
//        console.log(result[0].candidates[0].output);
//     });
//     res.json
// })




const resultObject = {accepted: "", creditScore: 0, dti: 0, ltv: 0, fedti: 0, ai_response: ""};






// Define an endpoint for receiving POST requests
app.post('/api/your-backend-endpoint', (req, res) => {
    // Retrieve and process the data from the request body
    //console.log(res);
    const receivedData = req.body;

    resultObject.creditScore = parseInt(receivedData.credit);
    resultObject.dti = (parseInt(receivedData.mortgage) + parseInt(receivedData.carPayment) + parseInt(receivedData.credPayment))/(parseInt(receivedData.gmi)) * 100;
    resultObject.ltv = ((parseInt(receivedData.av) - parseInt(receivedData.downPayment)) / parseInt(receivedData.av)) * 100;
    resultObject.fedti = (parseInt(receivedData.mortgage) / parseInt(receivedData.gmi)) * 100;

    if(resultObject.ltv >= 80){
        if(resultObject.ltv <= 95){
            resultObject.accepted = "Risky";
        } else{
            resultObject.accepted = "Rejected";
        }
    } else if (resultObject.dti > 36){
        if(resultObject.dti <= 43){
            resultObject.accepted = "Risky";
        } else{
            resultObject.accepted = "Rejected";
        }
    } else if (resultObject.fedti > 28){
        resultObject.accepted = "Rejected";
    } else if(resultObject.creditScore < 640){
        resultObject.accepted = "Rejected";
    } else{
        resultObject.accepted = "Accepted";
    }

    if (resultObject.accepted != "Accepted")
        client.generateText({
            model: 'models/text-bison-001',
            temperature: 0.7,
            candidateCount: 1,
            prompt: {
                text: prompt,
            },
        }).then((result) => {
            console.log(result[0].candidates[0].output.toString());
            resultObject.ai_response = (result[0].candidates[0].output.toString());
        });

    // Send a response back to the client
    res.json({ message: 'Data received and processed successfully' });
});




app.get('/api/get-data', (req, res) => {
    // You can perform any data retrieval or processing here
    const responseData = resultObject;
    
    // Send a JSON response
    res.json(responseData);
});





// Start the server
const port = 3001; // You can choose any available port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
