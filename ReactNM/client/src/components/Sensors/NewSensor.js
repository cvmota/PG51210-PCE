import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import React, {useState} from 'react'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function NewSensor() {

    const baseURL = "http://localhost:3001/sensors/add";
    const type_of_sensor = [
        {
            value: 'cardiac',
            label: 'Cardiac',
        },
        {
            value: 'blood',
            label: 'Blood',
        }
    ];

    const [sensorid, setSensorId] = useState(0);
    const [sensornum, setSensorNum] = useState(0);
    const [sensortype, setSensorType] = useState("");
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarType, setSnackbarType] = React.useState("success");


    const validate = () => {
        let errors = {};
        let isValid = true;

        if (!sensorid) {
            errors.sensorid = "Sensor id is required.";
            isValid = false;
        }

        if (!sensornum) {
            errors.sensornum = "Sensor num is required.";
            isValid = false;
        }

        if (!sensortype) {
            errors.sensortype = "Sensor type is required.";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            fetch(baseURL, {
                method: 'POST',
                body: JSON.stringify({
                    sensorid: sensorid,
                    sensornum: sensornum,
                    sensortype: sensortype
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                response.json().then(data => {
                    setSnackbarMessage(data.message);
                    if (response.ok && data.success) {
                        setSnackbarType("success");
                        window.location.reload(false);
                    } else {
                        setSnackbarType("error");
                    }
                    setSnackbarOpen(true);
                })
            })
        } catch (error) {
            setSnackbarMessage("Erro a criar o sensor!");
            setSnackbarType("error");
            setSnackbarOpen(true);
            console.log(error.message);
        }
    };


    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="sensor-id" label="Sensor id" variant="outlined" required type="number" size="small"
                       onChange={(event) => setSensorId(event.target.value)}
                       error={errors.sensorid ? true : false}
                       helperText={errors.sensorid}
            />
            <TextField id="sensor-num" label="Sensor num" variant="outlined" required type="number" size="small"
                       onChange={(event) => setSensorNum(event.target.value)}
                       error={errors.sensornum ? true : false}
                       helperText={errors.sensornum}
            />
            <TextField
                id="sensor-type"
                select
                label="Select"
                defaultValue=""
                size="small"
                onChange={(event) => setSensorType(event.target.value)}
                error={errors.sensortype ? true : false}
                helperText={errors.sensortype ? errors.sensortype : "Please select the type of sensor"}
            >
                {type_of_sensor.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <div>
                <Button variant="contained" size="small" onClick={handleSubmit}>
                    Create
                </Button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                sx={{maxWidth: '800px'}}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarType}
                    sx={{width: '100%'}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Box>
    );
}