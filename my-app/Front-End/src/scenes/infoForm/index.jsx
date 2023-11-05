import { Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
    credit:"",
    gmi:"",
    av:"",
    EMMP:"",
    credPayment:"",
    carPayment:"",
    downPayment:"",
    slp:"",
    mortgage:""
};

const userSchema = yup.object().shape({
    credit: yup.string().required("required"),
    gmi:yup.string().required("required"),
    av:yup.string().required("required"),
    credPayment:yup.string().required("required"),
    carPayment:yup.string().required("required"),
    downPayment:yup.string().required("required"),
    slp:yup.string().required("required"),
    mortgage:yup.string().required("required")
});


const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const navigate = useNavigate();
    const handleFormSubmit = async (values) => {
        console.log(JSON.stringify(values))
        await fetch("http://localhost:3001/api/your-backend-endpoint",{
            method: "POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(values)
        }).then((res)=>{
            alert('Saved Successfully')
            navigate("/results")
        }).catch((err)=>{
           console.log(err.message) 
        })
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
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Credit Score"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.credit}
                                name = "credit"
                                error = {!!touched.credit && !!errors.credit}
                                helperText = {touched.credit && errors.credit}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Gross Monthly Income"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.gmi}
                                name = "gmi"
                                error = {!!touched.gmi && !!errors.gmi}
                                helperText = {touched.gmi && errors.gmi}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Appraised Value of Home"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.av}
                                name = "av"
                                error = {!!touched.av && !!errors.av}
                                helperText = {touched.av && errors.av}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Credit Card Payment (monthly)"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.credPayment}
                                name = "credPayment"
                                error = {!!touched.credPayment && !!errors.credPayment}
                                helperText = {touched.credPayment && errors.credPayment}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Car Payment (monthly)"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.carPayment}
                                name = "carPayment"
                                error = {!!touched.carPayment && !!errors.carPayment}
                                helperText = {touched.carPayment && errors.carPayment}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Student Loan Payment (monthly)"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.slp}
                                name = "slp"
                                error = {!!touched.slp && !!errors.slp}
                                helperText = {touched.slp && errors.slp}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Down Payment"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.downPayment}
                                name = "downPayment"
                                error = {!!touched.downPayment && !!errors.downPayment}
                                helperText = {touched.downPayment && errors.downPayment}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Estimated Monthly Mortgage"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.mortgage}
                                name = "mortgage"
                                error = {!!touched.mortgage && !!errors.mortgage}
                                helperText = {touched.mortgage && errors.mortgage}
                                sx = {{ gridColumn: "span 4"}}
                            />
                        </Box>
                        <Box display = "flex" justifyContent = "end" mt = "20px">
                            <Button type = "submit" color = "secondary" variant = "contained">
                                Submit form
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default Form;