import React, {useState} from 'react';
import { Typography, Container, TextField, Button, IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { FormInput } from "../../types";
import useStyles from './styles';

interface Props{
    inputField?: FormInput[]
    handleChangeInput:any
}

const Form:React.FC<Props> = (props) => {
    const classes = useStyles();
    const { inputField, handleChangeInput } = props;
    return(
        <Container>
            <Typography
                variant="h5"
                align="left"
                color="textSecondary"
                component="p"
            >
                Enter processes below:
            </Typography>
            <form className={classes.root}>
                {inputField?.map((inputField,index)=>(
                    <div key = {index}>
                        {console.log("inputField===>",inputField.process)}
                        <TextField 
                            name = "process"
                            label = "Process"
                            variant = 'filled'
                            value = {inputField?.process}
                            onChange={e=>handleChangeInput(index,e)}
                        />
                        <TextField 
                            name = "burstTime"
                            label = "Burst Time"
                            variant = 'filled'
                            value = {inputField?.burstTime}
                            onChange={e=>handleChangeInput(index,e)}
                        />
                        <TextField 
                            name = "arrivalTime"
                            label = "Arrival Time"
                            variant = 'filled'
                            value = {inputField?.arrivalTime}
                            onChange={e=>handleChangeInput(index,e)}
                        />
                        <TextField 
                            name = "priority"
                            label = "Priority"
                            variant = 'filled'
                            value = {inputField?.priority}
                            onChange={e=>handleChangeInput(index,e)}
                        />
                        <IconButton>
                            <RemoveIcon/>
                        </IconButton>
                        <IconButton>
                            <AddIcon/>
                        </IconButton>
                    </div>
                ))}
                <Button className={classes.generateButton} variant="outlined" type="submit">Generate</Button>
            </form>
        </Container>
    )
}

export default Form;