// passs in this format: [{process:'1', burstTime'2',arrivalTime:'3',priority:'4'},{process:'1', burstTime'2',arrivalTime:'3',priority:'4'}]
export const preemptivePriority = (data: any) => {
	// const {process, burstTime, arrivalTime} = data;

	let currentTime: number = 0;
	let totalTime: number = 0;
    let currentProcess:number = -1;
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
    let currentPriority:number = Number.MAX_VALUE;
    let currentBurst:number = Number.MAX_VALUE;

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

    for(let i = 0; i < numProcess; ++i)
    {
        if(arrival[i] === minArrival)
        {
            arrived[i] = 1;
            if(priority[i] <= currentPriority)
            {
                currentProcess = i;
                currentBurst = burst[i];
                currentPriority = priority[i];
            }
        }
    }

	while(currentTime <= totalTime)
    {
        let previousProcess:number = currentProcess;
        let changed:boolean = false;
        for(let i = 0; i < numProcess; ++i)
        {
            if(arrival[i] === currentTime)
            {
                arrived[i] = 1;
                if(priority[i] < currentPriority)
                {
                    changed = true;
                    currentBurst = burst[i];
                    currentPriority = priority[i];
                    currentProcess = i;
                }
            }
        }
        if(currentBurst === 0 && !changed)
        {
            turnaround[currentProcess] = currentTime - initialArrival[currentProcess];
            waiting[currentProcess] = turnaround[currentProcess] - initialBurst[currentProcess];
            let minPriority:number = Number.MAX_VALUE;
            let minProcess:number = -1;

            for(let i = 0; i < numProcess; ++i)
            {
                if(arrived[i] === 1 && priority[i] < minPriority && burst[i] != 0)
                {
                    minPriority = priority[i];
                    minProcess = i;
                }
            }
            currentProcess = minProcess;
            currentBurst = burst[currentProcess];
            currentPriority = minPriority;
            changed = true;
        }
        if(changed)
        {
            firstLine.push(previousProcess.toString());
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
	};

	return output;
};
