#include "preemptive_sjf.h"
#include <vector>
#include <string>
#include <iostream>
#include <limits>
#include <iomanip>

void preemptive_sjf(int numProcess, std::vector<int> burst, std::vector<int> arrival)
{
    int currentTime = 0;
    int totalTime = 0;
    std::string firstLine = "|";
    std::string secondLine = "";
    std::vector<int> arrived(numProcess);
    int currentProcess = 0;
    int currentBurst = std::numeric_limits<int>::max();

    std::vector<int> turnaround(numProcess);
    std::vector<int> waiting(numProcess);
    std::vector<int> initialArrival = arrival;
    std::vector<int> initialBurst = burst;

    int minArrival = std::numeric_limits<int>::max();
    for(int i = 0; i < numProcess; ++i)
    {
        if(arrival[i] < minArrival)
        {
            minArrival = arrival[i];
        }
        totalTime += burst[i];
    }
    secondLine += std::to_string(minArrival);
    totalTime += minArrival;
    currentTime += minArrival;

    for(int i = 0; i < numProcess; ++i)
    {
        if(arrival[i] == minArrival)
        {
            arrived[i] = 1;
            if(burst[i] <= currentBurst)
            {
                currentProcess = i;
                currentBurst = burst[i];
            }
        }
    }

    while(currentTime <= totalTime)
    {
        int previousProcess = currentProcess;
        bool changed = false;
        for(int i = 0; i < numProcess; ++i)
        {
            if(arrival[i] == currentTime)
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
        if(currentBurst == 0 && !changed)
        {
            turnaround[currentProcess] = currentTime - initialArrival[currentProcess];
            waiting[currentProcess] = turnaround[currentProcess] - initialBurst[currentProcess];
            int minBurst = std::numeric_limits<int>::max();
            int minProcess = -1;
            for(int i = 0; i < numProcess; ++i)
            {
                if(arrived[i] == 1 && burst[i] < minBurst && burst[i] != 0)
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
            firstLine += " P" + std::to_string(previousProcess) + " |";
            if(currentTime >= 10)
            {
                secondLine = secondLine + "   " + std::to_string(currentTime);
            }
            else
            {
                secondLine = secondLine + "    " + std::to_string(currentTime);
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

    double avgTurnaround = 0;
    double avgWaiting = 0;
    for(int i = 0; i < numProcess; ++i)
    {
        avgTurnaround += turnaround[i];
        avgWaiting += waiting[i];
    }
    avgTurnaround /= numProcess;
    avgWaiting /= numProcess;

    std::cout << "Preemptive SJF\n";
    std::cout << firstLine << "\n";
    std::cout << secondLine << "\n\n";
    std::cout << std::setw(20);
    std::cout << std::left << "Turnaround Time : ";
    for(int time : turnaround)
    {
        std::cout.width(2);
        std::cout << time << " ";
    }
    std::cout << std::setw(21);
    std::cout << std::left << "\nWaiting Time : ";
    for(int time : waiting)
    {
        std::cout.width(2);
        std::cout << time << " ";
    }

    std::cout << std::setw(32) << "\n\nAverage Turnaround Time : " << avgTurnaround << "\n";
    std::cout << std::setw(30) << "Average Waiting Time : " << avgWaiting << "\n";

    std::cout << "\n\n";
}