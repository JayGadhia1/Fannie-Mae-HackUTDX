import { Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
//import { updateScoutForm } from "../../addScoutingFormData"


let resultObject = {accepted: "", creditScore: 0, dti: 0, ltv: 0, fedti: 0, ai_response: ""};

const Results = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")
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
}
export default Results;