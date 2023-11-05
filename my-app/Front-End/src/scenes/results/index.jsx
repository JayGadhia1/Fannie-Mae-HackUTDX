import { Box } from "@mui/material";
import Header from "../../components/Header";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import Form from './index';

 let resultObject = {accepted: "", creditScore: 0, dti: 0, ltv: 0, fedti: 0, ai_response: ""};

const Results = () => {
    const data = [
        { name: 'Credit Card', value: parseInt(Form.value) },
        { name: 'Car', value: parseInt(Form.value) },
        { name: 'Student Loans', value: parseInt(Form.value) },
        { name: 'Down Payment', value: parseInt(Form.value) },
        { name: 'Estimated Monthly Mortgage', value: parseInt(Form.value) },
      ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a94e77'];

    fetch("http://localhost:3001/api/get-data", {
        method: "GET", 
        headers: {
            "Content-Type": "application/json", // You can set headers if needed
        },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            return response.json(); // Parse the response as JSON
        })
        .then((data) => {
            // Handle the data received from the server
            resultObject = data;
            console.log(resultObject);
        })
        .catch((error) => {
            // Handle any errors that occur during the request
            console.error(error);
        });
     
        return (
            <Box m="20px">
              {resultObject.accepted === "Accepted" ? (
                <>
                  <Header title="NAH" subtitle="Submit information accordingly for each section" />
                  <PieChart width={800} height={400}>
                    <Pie
                      data={data}
                      cx={120}
                      cy={200}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </>
              ) : (
                // Render something else when resultObject.accepted is not "Accepted"
                <Header title="Not Accepted" subtitle="Your application was not accepted." />
              )}
            </Box>
          );
        };
        
        export default Results;