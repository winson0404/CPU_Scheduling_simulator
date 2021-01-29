import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useStyles } from "./style";
import Container from "@material-ui/core/Container";
import Form from "../../components/Form";
import {FormInput} from "../../types"
import { AnyNsRecord } from "dns";

const Landing: React.FC = () => {
	const classes = useStyles();
    const [inputField, setInputField] = useState<FormInput[]>([{
        process:'a',
        burstTime:'b',
        arrivalTime:'c',
        priority:'d'
	}])
	
	const handleChangeInput = (index:number, e:any) =>{
		const values:any = {...inputField};
		values[index][e.target.name] = e.target.value;
		console.log(values);
		debugger;
		setInputField(values);
		debugger;
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
      	<Form inputField = {inputField} handleChangeInput={handleChangeInput}/>
		</>
	);
};

export default Landing;
