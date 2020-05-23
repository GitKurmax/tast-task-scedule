import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { actions } from '../redux/mainReducer';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {TextField, Divider, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    border: '1px solid black',
    borderRadius: '15px',
    padding: '30px',
    width: '70%',
    minWidth: '600px',
    margin: '30px auto'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  list: {
      flexDirection: 'column',
      alignItems: 'start',
      
  },
  item: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      padding: '5px 0',
  },
  divider: {
      width: '100%'
  },
  dataTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
      fontSize: '20px',
      width: '100%'
  }
}));

function Main() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const filteredScedule = useSelector((state) => state.mainReducer.filteredScedule);
    const docExists = useSelector((state) => state.mainReducer.docExists);
    const [ displayHours, setDisplayHours ] = useState([]);
    const [ date, setDate ] = useState('');
    const [ time, setTime ] = useState('');
    const [ isDateChosen, setIsDateChosen ] = useState(false);
    const [ isTimeChosen, setIsTimeChosen ] = useState(false);
    const [ showHours, setShowHours ] = useState(false);
    const [ showReserved, setShowReserved ] = useState(true);

    useEffect(() => {
        const hours = [];
        for (let i=0; i < 24; i++) {
            hours.push({
                time: i < 10 ? `0${i}:00` : `${i}:00`
            })
        }

        setDisplayHours(hours);
     },[])

    const handleDateChange = (event) => {
        setDate(event.target.value);
        setIsDateChosen(true);
        setShowHours(true);
        dispatch(actions.hideExistsError())
        dispatch(actions.getScedule(event.target.value));
    }

    const handleTimeChange = (event, field) => {
        setTime(event.target.value);
        setIsTimeChosen(true);
        dispatch(actions.hideExistsError())
    }

    const submitForm = () => {
        const payload = {
            date,
            time
        }

        dispatch(actions.addSceduleToDb(payload));
    }

    const hideReserved = () => {
        const showHide = !showReserved;
        setShowReserved(showHide);
    }

    return (
        <>
            <div className="main_form">
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="date"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(event) => handleDateChange(event)}
                    />
                    <TextField
                        id="time"
                        label="time"
                        type="time"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 3600,
                        }}
                        onChange={(event) => handleTimeChange(event)}
                        disabled={!isDateChosen}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={submitForm}
                        disabled={!isDateChosen || !isTimeChosen}>Save event</Button>
                </form> 
            </div>
            <div className={clsx(classes.container, classes.list)}>
                { showHours && 
                    <>  
                        <div className={classes.dataTitle}>Date: {date}
                            <div style={{color: "red"}}>{docExists ? 'This time reserved' : ''}</div>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={hideReserved}>{showReserved ? 'hide reserved' : 'show reserved'}</Button>
                        </div>
                        {displayHours
                            .map((hour, index) => {
                                let hourStatus = 'free';
                                if (filteredScedule.includes(hour.time)) {
                                    hourStatus = 'reserved';
                                }
                                if (hourStatus === 'reserved' && !showReserved) {
                                    return; 
                                }
                            return (
                                <div style={{width: '100%', background: hourStatus==='reserved' ? 'lightpink' : 'white'}} key={index}>
                                    <div className={classes.item} >
                                        <div style={{}}>{hour.time} - </div>
                                    <div>{hourStatus}</div>
                                    </div>
                                    <Divider className={classes.divider}/>
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        </>  
    )
}

export default Main
