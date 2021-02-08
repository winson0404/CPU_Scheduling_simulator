export const structureBuilder = (data: any, algorithmName: string) => {
	const output: any = [
		[
			{ type: "string", id: "Position" },
			{ type: "string", id: "Name" },
			{ type: "number", id: "Start" },
			{ type: "number", id: "End" },
		],
	];

    for (let i = 0; i < data?.processSequence?.length; i++){
        let tempOutput = [];

        tempOutput.push(algorithmName);
        tempOutput.push(data?.processSequence[i]);
        tempOutput.push(parseInt(data?.timeSequence[i])*1000);
        tempOutput.push(parseInt(data?.timeSequence[i+1])*1000);

        // console.log("tempOutput==>", tempOutput);
        output.push(tempOutput);
    }

	return output;
};
