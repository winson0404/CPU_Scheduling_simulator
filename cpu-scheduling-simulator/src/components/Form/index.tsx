import React, { useState } from "react";
import {
	Typography,
	Container,
	TextField,
	Button,
	IconButton,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { FormInput } from "../../types";
import useStyles from "./styles";
import { map } from "lodash";
import { Formik, Form, FieldArray, FieldProps, getIn, Field } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
	processes: yup
		.array()
		.of(yup.object().shape({ 
			burstTime: yup.string().required("Required field!") ,
			arrivalTime: yup.string().required("Required field!")})),
});

interface Props {
	inputField?: any;
	initialInputField?: any;
	handleChangeInput?: any;
	handleSubmitForm?: any;
	handleAddFields?: any;
	handldeRemoveField?: any;
}

const Input = ({ field, label, form: { errors } }: any) => {
	const errorMessage = getIn(errors, field?.name);

	return (
		<div>
			<TextField {...field} label={label} variant="filled"/>
			{errorMessage && <div style={{ color: "red", paddingLeft:"10px"}}>{errorMessage}</div>}
		</div>
	);
};

const Forms: React.FC<Props> = (props) => {
	const classes = useStyles();
	const { initialInputField, handleSubmitForm } = props;
	return (
		<Container>
			<Typography variant="h5" align="left" color="textSecondary" component="p">
				Enter processes below:
			</Typography>
			<Formik
				initialValues={initialInputField}
				onSubmit={(data) => handleSubmitForm(data)}
				validationSchema={validationSchema}
			>
				{({ values, handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<div className = {classes.root}>
							<Field name="quantumValue" component={Input} label = "Quantum"/>
						</div>
						<FieldArray name="processes" >
							{({ push, remove }) => (
								<div>
									<Button
										onClick={() =>
											push({
												process: "",
												burstTime: "",
												arrivalTime: "",
												priority: "",
											})
										}
										className={classes.generateButton}
										variant="outlined"
										// disabled={isSubmitting}
									>
										Add Process
									</Button>
									<div className={classes.root}>
										{map(values.processes, (data, index: number) => {
											return (
												<div key={index} className={classes.formContainer}>
													<h2>P{index}: </h2>
													<Field
														label="Burst Time"
														name={`processes[${index}].burstTime`}
														component={Input}
													/>
													<Field
														label="Arrival Time"
														name={`processes[${index}].arrivalTime`}
														component={Input}
													/>
													<Field
														label="Priority"
														name={`processes[${index}].priority`}
														component={Input}
													/>
													<IconButton onClick={() => remove(index)}>
														<RemoveIcon />
													</IconButton>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</FieldArray>
						<Button
							className={classes.generateButton}
							variant="outlined"
							type="submit"
							// disabled={isSubmitting}
						>
							Generate
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default Forms;
