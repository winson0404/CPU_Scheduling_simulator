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

// const validationSchema = yup.object({
// 	processes: yup
// 		.array()
// 		.of(yup.object().shape({ process: yup.string().required() })),
// });

interface Props {
	inputField?: any;
	handleChangeInput: any;
	handleSubmit: any;
	handleAddFields: any;
	handldeRemoveField: any;
}

const Input = ({ field, label, form: { errors } }:any) => {
	const errorMessage = getIn(errors, field.name);

	return (
		<>
			<TextField {...field} label={label} variant="filled" />
			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
		</>
	);
};

const Forms: React.FC<Props> = (props) => {
	const classes = useStyles();
	const { inputField } = props;
	return (
		<Container>
			<Typography variant="h5" align="left" color="textSecondary" component="p">
				Enter processes below:
			</Typography>
			<Formik
				initialValues={inputField}
				onSubmit={(data) => {
					console.log(data);
				}}
				// validationSchema={validationSchema}
			>
				{({ values, handleSubmit, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<FieldArray name="processes">
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
										type="submit"
										// disabled={isSubmitting}
									>
										Add Process
									</Button>
									<div>
										{map(values.processes, (inputField, index: number) => {
											return (
												<div key={index}>
													<Field
                                                        label= "Process"
														name={`processes[${index}].process`}
														component={Input}
													/>
													<Field
                                                        label= "Burst Time"
														name={`processes[${index}].burstTime`}
														component={Input}
													/>
													<Field
                                                        label= "Arrival Time"
														name={`processes[${index}].arrivalTime`}
														component={Input}
													/>
													<Field
                                                        label= "Priority"
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
						<pre>{JSON.stringify(values.processes, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default Forms;
