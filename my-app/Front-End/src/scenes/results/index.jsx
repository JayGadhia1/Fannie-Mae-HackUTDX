import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

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
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </>
      ) : (
        <Header title="No Data" subtitle="Please fill and submit the form to see the results." />
      )}
    </Box>
  );
};

export default Results;
