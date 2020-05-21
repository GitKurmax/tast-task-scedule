import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { actions } from '../redux/mainReducer';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid black',
    borderRadius: '15px',
    padding: '30px',
    width: 'max-content',
    margin: '30px auto'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Main() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const scedule = useSelector((state) => state.mainReducer.scedule);
    const [ date, setDate ] = useState('2020-05-21');
    const [ time, setTime ] = useState('00:00');

    useEffect(() => {
       
    })


    const handleChange = (event, field) => {
        if (field === 'date') {
           setDate(event.target.value);
        }

        if (field === 'time') {
            setTime(event.target.value);
        }
    }

    const submitForm = () => {
        const payload = {
            date,
            time
        }

        dispatch(actions.saveScedule(payload))
    }

    return (
        <>
            <div className="main_form">
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="date"
                        type="date"
                        defaultValue={date}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(event) => handleChange(event, 'date')}
                    />
                    <TextField
                        id="time"
                        label="time"
                        type="time"
                        defaultValue={time}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300,
                        }}
                        onChange={(event) => handleChange(event, 'time')}
                    />
                    <Button variant="contained" color="primary" onClick={submitForm}>Submit</Button>
                </form> 
            </div>
            <div className="main_list">
                { scedule.map((event, index) => {
                    return (
                        <div key={index}>
                            <div>date - {event.date}</div>
                            <div>time - {event.time}</div>
                        </div>
                    )
                })}
            </div>
        </>  
    )
}

export default Main
