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
import { FormInput } from "../../types";
import { Divider } from "@material-ui/core";

const About: React.FC = () => {
	const classes = useStyles();

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
			</Container>
		</>
	);
};

export default About;
