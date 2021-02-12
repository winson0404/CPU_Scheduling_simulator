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
import Content from "../../components/Content";
import { Divider, Modal } from "@material-ui/core";
import {
	nonPreemptiveSJF,
	preemptiveSJF,
	nonPreemptivePriority,
	preemptivePriority,
	roundRobin,
} from "./algorithms";

const Landing: React.FC = () => {
	const classes = useStyles();
	const initialInputField = {
		processes: [
			{
				process: "",
				burstTime: "",
				arrivalTime: "",
				priority: "0",
			},
			{
				process: "",
				burstTime: "",
				arrivalTime: "",
				priority: "0",
			},
			{
				process: "",
				burstTime: "",
				arrivalTime: "",
				priority: "0",
			}
		],
		quantumValue: "2",
	};

	const [gotData, setGotData] = useState<boolean>(false);
	const [inputField, setInputField] = useState(initialInputField);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmitForm = (data: any) => {
		setInputField(data);
		setGotData(true);
	};

	const renderModalBody = (
		<div style={{top: "50%", left: "50%", transform:"translate(-50%,-50%)"}} className={classes.paper}>
			<h2 id="simple-modal-title">About Us</h2>
			<p id="simple-modal-description">
				<b>This project is made by:</b><br/>
				 - Theerapob Loo @ Loo Wei Xiong<br/>
				 - Selwyn Darryl Kessler
			</p>
		</div>
	);

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
						Operating System Assignment
					</Typography>
					<nav>
						<Link
							variant="button"
							color="textPrimary"
							href="#"
							className={classes.link}
							onClick={handleOpen}
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
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					{renderModalBody}
				</Modal>
				<Forms
					initialInputField={initialInputField}
					inputField={inputField}
					handleSubmitForm={handleSubmitForm}
				/>
				<Divider variant="middle" className={classes.divider} />
				{gotData ? (
					<>
						<Tables inputField={inputField} />
						<Content
							data={nonPreemptiveSJF(inputField.processes)}
							title="Non Preemptive SJF:"
						/>
						<Content
							data={preemptiveSJF(inputField.processes)}
							title="Preemptive SJF:"
						/>
						<Content
							data={nonPreemptivePriority(inputField.processes)}
							title="Non Preemptive Priority:"
						/>
						<Content
							data={preemptivePriority(inputField.processes)}
							title="Preemptive Priority:"
						/>
						<Content
							data={roundRobin(
								inputField.processes,
								parseInt(inputField.quantumValue)
							)}
							title={`Round Robin (Quantum = ${inputField?.quantumValue}):`}
						/>

						{/* {console.log("non preemptive sjf==>", nonPreemptiveSJF(inputField.processes))}
						{console.log("preemptiveSJF sjf==>", preemptiveSJF(inputField.processes))} */}
					</>
				) : null}
			</Container>
		</>
	);
};

export default Landing;
