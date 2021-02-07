// passs in this format: [{process:'1', burstTime'2',arrivalTime:'3',priority:'4'},{process:'1', burstTime'2',arrivalTime:'3',priority:'4'}]
export const roundRobin = (data: any, quantum:number) => {
	// const {process, burstTime, arrivalTime} = data;

	let currentTime: number = 0;
	let totalTime: number = 0;
    let count:number = 1;
    let q = [];
	let firstLine:string[] = [];
	let secondLine: string[] = [];
	let burst: number[] = [];
	let arrival: number[] = [];
	let numProcess = data.length;
	let arrived: number[] = new Array(numProcess).fill(0);
	let turnaround: number[] = new Array(numProcess).fill(0);
	let waiting: number[] = new Array(numProcess).fill(0);
	let initialArrival: number[] = [];
	let initialBurst: number[] = [];
	let minArrival:number = Number.MAX_VALUE;

	//get array of burstTime and arrivalTime
	data.forEach((element: any) => {
		burst.push(parseInt(element.burstTime));
		initialArrival.push(parseInt(element.arrivalTime));
		arrival.push(parseInt(element.arrivalTime));
		initialBurst.push(parseInt(element.burstTime));
	});

	for (let i = 0; i < numProcess; i++) {
		if (arrival[i] < minArrival) {
			minArrival = arrival[i];
		}
		totalTime += burst[i];
	}
	secondLine.push(minArrival.toString());
	
    let temp_pr = [];
    let temp_burst =[];

    for(let i = 0; i < numProcess; ++i)
    {
        if(arrival[i] === 0)
        {
            temp_pr.push(i);
            temp_burst.push(burst[i]);
        }
    }

	while (temp_pr.length) {
		let minBurst = temp_burst[0];
        let minPr = temp_pr[0];
        let minIndex = 0;

        for(let i = 1; i <temp_burst.length; ++i)
        {
            if(temp_burst[i] < minBurst)
            {
                minBurst = temp_burst[i];
                minPr = temp_pr[i];
                minIndex = i;
            }
        }
        q.push(temp_pr[minIndex]);

        temp_pr.splice(temp_pr[0] + minIndex);
        temp_burst.splice(temp_pr[0] + minIndex);
	}

	let avgTurnAround = 0;
	let avgWaiting = 0;
	for (let i = 0; i < numProcess; i++) {
		avgTurnAround += turnaround[i];
		avgWaiting += waiting[i];
	}
	avgTurnAround /= numProcess;
	avgWaiting /= numProcess;

	const output = {
		processSequence: firstLine,
		timeSequence: secondLine,
		avgTurnAround: avgTurnAround,
		avgWaiting: avgWaiting,
	};

	return output;
};
