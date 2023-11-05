import { Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
    id:"",
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
        //values.preventDefault();
        values.id = values.date + "_Sample Report";
        fetch("https://olivine-whispering-ear.glitch.me/scoutingReports",{
            method: "POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(values)
        }).then((res)=>{
            alert('Saved Successfully')
        }).catch((err)=>{
           console.log(err.message) 
        })
        navigate("/results");
        //updateScoutForm(values);
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
                                value = {values.date}
                                name = "date"
                                error = {!!touched.date && !!errors.date}
                                helperText = {touched.date && errors.date}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Gross Monthly Income"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.scout}
                                name = "scout"
                                error = {!!touched.scout && !!errors.scout}
                                helperText = {touched.scout && errors.scout}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Appraised Value of Home"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.dxId}
                                name = "dxId"
                                error = {!!touched.dxId && !!errors.dxId}
                                helperText = {touched.dxId && errors.dxId}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Est. Monthly Mortgage Payment"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.dxId}
                                name = "dxId"
                                error = {!!touched.dxId && !!errors.dxId}
                                helperText = {touched.dxId && errors.dxId}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Credit Card Payment (monthly)"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.player}
                                name = "player"
                                error = {!!touched.player && !!errors.player}
                                helperText = {touched.player && errors.player}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Car Payment (monthly)"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.event}
                                name = "event"
                                error = {!!touched.event && !!errors.event}
                                helperText = {touched.event && errors.event}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Student Loan Payment (monthly)"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.team}
                                name = "team"
                                error = {!!touched.team && !!errors.team}
                                helperText = {touched.team && errors.team}
                                sx = {{ gridColumn: "span 4"}}
                            />
                            <TextField
                                fullWidth
                                variant = "filled"
                                type = "text"
                                label = "Down Payment"
                                onBlur = {handleBlur}
                                onChange = {handleChange}
                                value = {values.report}
                                name = "report"
                                error = {!!touched.report && !!errors.report}
                                helperText = {touched.report && errors.report}
                                sx = {{ gridColumn: "span 4"}}
                            />
                        </Box>
                        <Box display = "flex" justifyContent = "end" mt = "20px">
                            <Button type = "submit" color = "secondary" variant = "contained">
                                Submit Report
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default Form;