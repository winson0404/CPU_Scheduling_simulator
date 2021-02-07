import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useStyles } from "./style";
import Container from "@material-ui/core/Container";
import Forms from "../../components/Form";
import Tables from "../../components/Table";
import { FormInput } from "../../types";
import { Divider } from "@material-ui/core";
import {nonPremptiveSJF} from "./algorithms"

const Landing: React.FC = () => {
	const classes = useStyles();
	const initialInputField = {
		processes: [
			{
				process: "",
				burstTime: "",
				arrivalTime: "",
				priority: "",
			},
		],
		quantumValue: "",
	};

	const [gotData, setGotData] = useState<boolean>(false);
	const [inputField, setInputField] = useState(initialInputField);

	const handleSubmitForm = (data: any) => {
		setInputField(data);
		setGotData(true);
	};

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
			<Container component="main" className={classes.heroContent}>
				<Forms
					initialInputField={initialInputField}
					inputField={inputField}
					handleSubmitForm={handleSubmitForm}
				/>
				<Divider variant="middle" className= {classes.divider}/>
				{gotData ? 
				<>
					<Tables inputField={inputField} />
					{console.log(nonPremptiveSJF(inputField.processes))}
				</> : null}
			</Container>
		</>
	);
};

export default Landing;
