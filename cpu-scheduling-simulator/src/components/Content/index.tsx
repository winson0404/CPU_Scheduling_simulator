import useStyles from "../algoStyles";
import { Chart } from "react-google-charts";
import { structureBuilder } from "../structureBuilder";
import { Container, Typography, Divider } from "@material-ui/core";

interface Props {
	data: any;
	title: string;
}

const Content: React.FC<Props> = (props) => {
	const classes = useStyles();
	const { data, title } = props;
	return (
		<Container component="main" className={classes.heroContent}>
			<Divider variant="middle" className={classes.algoDivider} />
			<Typography
				variant="h5"
				align="left"
				color="textSecondary"
				component="p"
				className={classes.header}
			>
				{title}
			</Typography>
			<Container component="main" className={classes.contentContainer}>
				<Chart
					width={"100%"}
					height={"100px"}
					chartType="Timeline"
					loader={<div>Loading Chart</div>}
					data={structureBuilder(data, title)}
					options={{
						timeline: {
							showRowLabels: false
						},
					}}
					rootProps={{ "data-testid": "3" }}
				/>
				<Typography
				variant="h6"
				align="left"
				color="textSecondary"
				component="p"
				className={classes.header}
			>
				Waiting Time (P0 to P{(data.waiting.length - 1)}): {data.waiting.toString().replace(/,/g,", ")} <br/>
				Turnaround Time (P0 to P{(data.waiting.length - 1)}): {data.turnAround.toString().replace(/,/g,", ")}<br/>
				Average Waiting Time: {data.avgWaiting.toString()} <br/>
				Average Turnaround Time: {data.avgTurnAround.toString()}
			</Typography>
			</Container>
		</Container>
	);
};

export default Content;
