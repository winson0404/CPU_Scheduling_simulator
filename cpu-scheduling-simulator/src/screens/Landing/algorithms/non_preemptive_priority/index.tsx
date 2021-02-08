// passs in this format: [{process:'1', burstTime'2',arrivalTime:'3',priority:'4'},{process:'1', burstTime'2',arrivalTime:'3',priority:'4'}]
export const nonPreemptivePriority = (data: any) => {
	// const {process, burstTime, arrivalTime} = data;

	let currentTime: number = 0;
	let totalTime: number = 0;
	let firstLine:string[] = [];
	let secondLine: string[] = [];
	let burst: number[] = [];
    let priority: number[] = [];
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
        priority.push(parseInt(element.priority))
	});

	for(let i = 0; i < numProcess; ++i)
    {
        if(arrival[i] < minArrival)
        {
            minArrival = arrival[i];
        }
        totalTime += burst[i];
        arrived[i] = -1;
    }
	secondLine.push(minArrival.toString());
	totalTime += minArrival;
	currentTime += minArrival;

	while(currentTime < totalTime)
    {
        for(let i = 0; i < numProcess; ++i)
        {
            if(arrival[i] <= currentTime)
            {
                arrived[i] = priority[i];
            }
        }

        let minPriority:number= Number.MAX_VALUE;
        let minIndex:number = 0;
        for(let i = 0; i < numProcess; ++i)
        {
            if(burst[i] !== 0 && arrived[i] < minPriority && arrived[i] !== -1)
            {
                minPriority = arrived[i];
                minIndex = i;
            }
        }
        currentTime += burst[minIndex];
        turnaround[minIndex] = currentTime - initialArrival[minIndex];
        waiting[minIndex] = turnaround[minIndex] - initialBurst[minIndex];
        burst[minIndex] = 0;

        firstLine.push("P"+minIndex.toString());
        secondLine.push(currentTime.toString());
    }

	let avgTurnAround:number = 0;
	let avgWaiting:number = 0;
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
		turnAround: turnaround,
		waiting: waiting
	};

	return output;
};
