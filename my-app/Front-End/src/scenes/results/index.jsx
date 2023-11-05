import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { PieChart, Pie, Cell, Legend, Tooltip, Label } from 'recharts';

let resultObject = {accepted: "", creditScore: 0, dti: 0, ltv: 0, fedti: 0, ai_response: ""};

const Results = () => {
  // Define state to hold the parsed form data for the pie chart
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Retrieve and parse the stored form data when the component mounts
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      const preparedData = [
        { name: 'Credit Card', value: parseInt(formData.credPayment) },
        { name: 'Car', value: parseInt(formData.carPayment) },
        { name: 'Student Loans', value: parseInt(formData.slp) },
        { name: 'Down Payment', value: parseInt(formData.downPayment) },
        { name: 'Estimated Monthly Mortgage', value: parseInt(formData.mortgage) },
      ];
      setChartData(preparedData);
    }
  }, []);
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a94e77'];

  return (
    <Box m="20px">
      {chartData && chartData.length > 0 ? (
        <>
          <Header title="Financial Overview" subtitle="See your financial commitments breakdown" />
          <PieChart width={800} height={400}>
            <Pie
              data={chartData}
              cx={120}
              cy={200}
              innerRadius={100}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                value="Total Debt"
                position="center"
                style={{
                    fill: '#fff',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAnchor: 'middle',
                }}
                />
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="left" verticalAlign="bottom" />
          </PieChart>
        </>
      ) : (
        <Header title="No Data" subtitle="Please fill and submit the form to see the results." />
      )}
    </Box>
  );
});
}

export default Results;
