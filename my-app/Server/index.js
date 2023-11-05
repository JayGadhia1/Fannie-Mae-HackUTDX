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

app.get('/api/AI-Response', (req, res) => {
    client.generateText({
        model: 'models/text-bison-001',
        temperature: 0.7,
        candidateCount: 1,
        top_k: 40,
        top_p: 0.95,
        max_output_tokens: 1024,
        stop_sequences: [],
        prompt: {
            text: req.query.question,
        },
    }).then(result => {
        result.forEach(function(d1) {
            if (d1 != null) {
                d1.candidates.forEach(function(d2) {
                    res.send(d2.output);
                })
            }
        })
    });
})

const resultObject = {accepted: "", creditScore: 0, dti: 0, ltv: 0, fedti: 0};

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
