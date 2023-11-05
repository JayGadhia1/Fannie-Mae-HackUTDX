import { Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
//import { updateScoutForm } from "../../addScoutingFormData"

const initialValues = {
    date:"",
    scout:"",
    dxId:"",
    player:"",
    event:"",
    report:"",
    team:"",
};

const userSchema = yup.object().shape({
    date: yup.string().required("required"),
    scout:yup.string().required("required"),
    dxId:yup.string().required("required"),
    player:yup.string().required("required"),
    event:yup.string().required("required"),
    report:yup.string().required("required"),
    team:yup.string().required("required"),
});


const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const navigate = useNavigate();
    const handleFormSubmit = (values) => {
        try {
            fetch("http://localhost:3001/api/your-backend-endpoint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            .then((res) => {
                if (res.ok) {
                    // Successful response handling
                    return res.json();
                } else {
                    // Handle non-successful responses here
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                // Handle the data received from the server
                alert('Saved Successfully');
                navigate("/results");
            })
            .catch((err) => {
                // Handle errors from the fetch or response processing
                console.log(err.message);
            });
        } catch (error) {
            // Handle any other errors that might occur in the function
            console.log(error);
        }
    }
    

    return(
        <Box m = "20px">
            <Header title = "Wanna Purchase a Home?" subtitle = "Submit information accordingly for each section "/>
            <Formik
                onSubmit = {handleFormSubmit}
                initialValues = {initialValues}
                validationSchema={userSchema}
            >
                {({values, errors, touched, handleBlur, handleChange, handleSubmit}) =>(
                    <form onSubmit = {handleSubmit}>
                        <Box display = "grid" gap = "30px" gridTemplateColumns = "repeat(4, minmax(0, 1fr))" sx = {{"& > div": {gridColumn : isNonMobile ? undefined : "span 4"},}}>
                            
                        </Box>
                        <Box display = "flex" justifyContent = "end" mt = "20px">
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default Form;