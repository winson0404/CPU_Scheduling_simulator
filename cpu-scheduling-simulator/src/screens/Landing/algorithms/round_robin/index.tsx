export const roundRobin = (data: any, quantum:number) => {

	let currentTime: number = 0;
	let totalTime: number = 0;
    let count:number = 0;
    let q:number[] = [];
	let firstLine:string[] = [];
	let secondLine: string[] = [];
	let burst: number[] = [];
	let arrival: number[] = [];
	let numProcess = data.length;
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
	
    let temp_pr:number[] =  new Array();
    let temp_burst:number[] = new Array();

    for(let i = 0; i < numProcess; ++i)
    {
        if(arrival[i] === 0)
        {
            temp_pr.push(i);
            temp_burst.push(burst[i]);
            count = 1;
            
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
        temp_pr.splice(minIndex,1);
        temp_burst.splice(minIndex,1);
	}
    
    //Main Loop
    while(currentTime <= totalTime)
    {
        currentTime++;

        // Checking for multiple processes arriving at the same and arranging them according to burst time.
        for(let i = 0; i < numProcess; ++i)
        {
            if(arrival[i] === currentTime)
            {
                temp_pr.push(i);
                temp_burst.push(burst[i]);
            }
        }

        while(temp_pr.length)
        {
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

            temp_pr.splice(minIndex, 1);
            temp_burst.splice(minIndex,1);
        }

        if(currentTime > minArrival){
            burst[q[0] === undefined?0:q[0]]--;
        }

        if(burst[q[0] === undefined?0:q[0]] === 0)
        {
            // console.log("q in if ",q[0] === undefined?0:q[0])
            turnaround[q[0] === undefined?0:q[0]] = currentTime  - initialArrival[q[0] === undefined?0:q[0]];
            waiting[q[0] === undefined?0:q[0]] = turnaround[q[0] === undefined?0:q[0]] - initialBurst[q[0] === undefined?0:q[0]];
            firstLine.push("P"+(q[0] === undefined?0:q[0])?.toString());
            if(true)
            {
                secondLine.push(currentTime.toString());
            }
            q.shift();
            count = 0;
        }
        else if(count >= quantum)
        {
            // console.log("q in else if ",q[0] === undefined?0:q[0])
            firstLine.push("P"+(q[0] === undefined?0:q[0])?.toString());
            if(true)
            {
                secondLine.push(currentTime.toString());
            }
            q.push(q[0] === undefined?0:q[0]);
            q.shift();
            count = 0;
        }
        count++;
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
		turnAround: turnaround,
		waiting: waiting
	};

	return output;
};
