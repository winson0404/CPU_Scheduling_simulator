import useStyles from "../algoStyles";
import { Chart } from "react-google-charts";
import { structureBuilder } from "../structureBuilder";
import { Container, Typography, Divider } from "@material-ui/core";
import { AnyNaptrRecord } from "dns";

interface Props {
	data: any;
	title: string;
}

const Content: React.FC<Props> = (props) => {
	const classes = useStyles();
	const { data, title } = props;
	let totalWaiting = 0;
	let totalTurnaround = 0;
	const getTotalWaiting = () => {
		data?.waiting?.forEach((element:any)=>{
			totalWaiting+= element;
		});
	}
	const getTotalTurnaround = () => {
		data?.turnAround?.forEach((element:any)=>{
			totalTurnaround+= element;
		});
	}
	getTotalWaiting();
	getTotalTurnaround();
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
				Waiting Time (P1 to P{(data.waiting.length)}): {data.waiting.toString().replace(/,/g,", ")} <br/>
				Turnaround Time (P1 to P{(data.waiting.length)}): {data.turnAround.toString().replace(/,/g,", ")}<br/>
				Total Waiting Time: {totalWaiting.toString()} <br/>
				Total Turnaround Time: {totalTurnaround.toString()} <br/>
				Average Waiting Time: {data.avgWaiting.toString()} <br/>
				Average Turnaround Time: {data.avgTurnAround.toString()}
			</Typography>
			</Container>
		</Container>
	);
};

export default Content;
