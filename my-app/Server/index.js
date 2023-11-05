const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(cors()); // This allows all origins for testing. In production, you should configure this more securely.

app.use(bodyParser.json());

// Define an endpoint for receiving POST requests
app.post('/api/your-backend-endpoint', (req, res) => {
    // Retrieve and process the data from the request body
    console.log(res);
    const receivedData = req.body;

    // Perform any necessary operations with the data
    // For example, save it to a database

    // Send a response back to the client
    res.json({ message: 'Data received and processed successfully' });
});

// Start the server
const port = 3001; // You can choose any available port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
