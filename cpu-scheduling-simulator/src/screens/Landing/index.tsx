import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useStyles } from "./style";
import Container from "@material-ui/core/Container";
import Forms from "../../components/Form";
import { FormInput } from "../../types";

const Landing: React.FC = () => {
	const classes = useStyles();
	const [inputField, setInputField] = useState({processes:[
		{
			process: "",
			burstTime: "",
			arrivalTime: "",
			priority: "",
		},
	]});

	const handleChangeInput = (index: number, e: any) => {
		const values: any = { ...inputField.processes };
		values[index][e.target.name] = e.target.value;
		setInputField({processes:values});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log("inputFields==>", inputField.processes);
	};

	const handleAddFields = () => {
		// console.log([...inputField,{ process: "", burstTime: "", arrivalTime: "", priority: "" }])
		setInputField({processes:[
			...inputField.processes,
			{ process: "", burstTime: "", arrivalTime: "", priority: "" },
		]});
	};

	const handldeRemoveField = (index:number) =>{
		const values = [...inputField.processes];
		values?.splice(index,1);
		if (values.length > 0)
			setInputField({processes:values});
	}

	return (
		<>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						OS best subject
					</Typography>
					<nav>
						<Link
							variant="button"
							color="textPrimary"
							href="#"
							className={classes.link}
						>
							About Us
						</Link>
					</nav>
				</Toolbar>
			</AppBar>
			<Container maxWidth="sm" component="main" className={classes.heroContent}>
				<Typography
					component="h3"
					variant="h3"
					align="center"
					color="textPrimary"
					gutterBottom
				>
					CPU scheduling simulator
				</Typography>
			</Container>
			<Forms
				inputField={inputField}
				handleChangeInput={handleChangeInput}
				handleSubmit={handleSubmit}
				handldeRemoveField={handldeRemoveField}
				handleAddFields={handleAddFields}
			/>
		</>
	);
};

export default Landing;
