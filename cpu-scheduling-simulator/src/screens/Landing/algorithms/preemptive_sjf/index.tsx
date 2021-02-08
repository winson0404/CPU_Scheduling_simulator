// passs in this format: [{process:'1', burstTime'2',arrivalTime:'3',priority:'4'},{process:'1', burstTime'2',arrivalTime:'3',priority:'4'}]
export const preemptiveSJF = (data: any) => {
	// const {process, burstTime, arrivalTime} = data;

	let currentTime: number = 0;
	let totalTime: number = 0;
    let currentProcess:number = 0;
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
    let currentBurst:number= Number.MAX_VALUE;

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
	totalTime += minArrival;
	currentTime += minArrival;
    for(let i = 0; i < numProcess; ++i)
    {
        if(arrival[i] === minArrival)
        {
            arrived[i] = 1;
            if(burst[i] <= currentBurst)
            {
                currentProcess = i;
                currentBurst = burst[i];
            }
        }
    }

	while (currentTime <= totalTime) {

        let previousProcess:number = currentProcess;
        let changed:boolean = false;

		for(let i = 0; i < numProcess; ++i)
        {
            if(arrival[i] === currentTime)
            {
                arrived[i] = 1;
                if(burst[i] < currentBurst)
                {
                    changed = true;
                    currentBurst = burst[i];
                    currentProcess = i;
                }
            }
        }

		if(currentBurst === 0 && !changed)
        {
            turnaround[currentProcess] = currentTime - initialArrival[currentProcess];
            waiting[currentProcess] = turnaround[currentProcess] - initialBurst[currentProcess];
            let minBurst:number = Number.MAX_VALUE;
            let minProcess:number = -1;
            for(let i = 0; i < numProcess; ++i)
            {
                if(arrived[i] === 1 && burst[i] < minBurst && burst[i] !== 0)
                {
                    minBurst = burst[i];
                    minProcess = i;
                }
            }
            currentProcess = minProcess;
            currentBurst = minBurst;
            changed = true;
        }
        if(changed)
        {
            firstLine.push("P"+(previousProcess).toString());
            if(true)
            {
                secondLine.push(currentTime.toString());
            }
            if(currentTime >= totalTime)
            {
                break;
            }
        }
        currentTime++;
        burst[currentProcess]--;
        currentBurst--;
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
