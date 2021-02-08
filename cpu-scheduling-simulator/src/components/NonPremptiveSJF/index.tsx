import { nonPreemptiveSJF } from "../../screens/Landing/algorithms";

import { Chart } from "react-google-charts";
import { structureBuilder } from "../structureBuilder";

interface Props{
    data: any;
}

export const NonPreemptiveSJF:React.FC<Props> = (props) => {
    console.log(props?.data);
    console.log(structureBuilder(props?.data,"Non Preemptive SJF: "))

	return (
		<Chart
			width={"100%"}
			height={"100px"}
			chartType="Timeline"
			loader={<div>Loading Chart</div>}
			data={structureBuilder(props?.data,"Non Preemptive SJF: ")}
			rootProps={{ "data-testid": "3" }}
		/>
        // <h1>hi</h1>
	);
};
