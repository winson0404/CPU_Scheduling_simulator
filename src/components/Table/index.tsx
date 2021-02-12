import React from "react";
import useStyles from "./styles";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";
import {map} from "lodash"

interface Props {
	inputField?: any;
}

const Tables: React.FC<Props> = (props: any) => {
	const classes = useStyles();
	const { inputField } = props;
	return (
        <>
        <div className = {classes.header}>Quantum = {inputField.quantumValue}</div>
		<TableContainer component={Paper} >
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.headCell} >Process</TableCell>
						<TableCell className={classes.headCell} >Burst Time</TableCell>
						<TableCell className={classes.headCell} >Arrival Time</TableCell>
						<TableCell className={classes.headCell} >Priority</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{map(inputField.processes,(row,i) => (
						<TableRow key={i}>
							<TableCell className={classes.headCell}>P{i}</TableCell>
							<TableCell className={classes.bodyCell}>{row.burstTime}</TableCell>
							<TableCell className={classes.bodyCell}>{row.arrivalTime}</TableCell>
							<TableCell className={classes.bodyCell}>{row.priority}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
        </>
	);
};

export default Tables;
