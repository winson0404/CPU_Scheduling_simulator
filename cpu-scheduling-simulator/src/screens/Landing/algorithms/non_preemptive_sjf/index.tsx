// passs in this format: [{process:'1', burstTime'2',arrivalTime:'3',priority:'4'},{process:'1', burstTime'2',arrivalTime:'3',priority:'4'}]
export const nonPreemptiveSJF = (data: any) => {
	// const {process, burstTime, arrivalTime} = data;

	let currentTime: number = 0;
	let totalTime: number = 0;
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
	totalTime += minArrival;
	currentTime += minArrival;

	while (currentTime < totalTime) {
		for (let i = 0; i < numProcess; i++) {
			if (arrival[i] <= currentTime) {
				arrived[i] = burst[i];
			}
		}

		let minBurst = Number.MAX_VALUE;
		let minIndex = 0;
		for (let i = 0; i < numProcess; i++) {
			if (arrived[i] !== 0 && arrived[i] < minBurst) {
				minBurst = arrived[i];
				minIndex = i;
			}
		}
		currentTime += minBurst;
		turnaround[minIndex] = currentTime - initialArrival[minIndex];
		waiting[minIndex] = turnaround[minIndex] - initialBurst[minIndex];
		burst[minIndex] = 0;

		firstLine.push("P"+(minIndex).toString());
		secondLine.push(currentTime.toString());
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
		avgTurnAround: avgTurnAround.toFixed(2),
		avgWaiting: avgWaiting.toFixed(2),
		turnAround: turnaround,
		waiting: waiting
	};

	return output;
};
