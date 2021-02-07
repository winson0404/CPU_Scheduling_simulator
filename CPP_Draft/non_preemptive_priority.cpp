#include "non_preemptive_priority.h"
#include <vector>
#include <string>
#include <iostream>
#include <limits>
#include <iomanip>

void non_preemptive_priority(int numProcess, std::vector<int> burst, std::vector<int> arrival, std::vector<int> priority)
{
    int currentTime = 0;
    int totalTime = 0;
    std::string firstLine = "|";
    std::string secondLine = "";
    std::vector<int> arrived(numProcess);

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
        arrived[i] = -1;
    }
    secondLine += std::to_string(minArrival);
    totalTime += minArrival;
    currentTime += minArrival;

    while(currentTime < totalTime)
    {
        for(int i = 0; i < numProcess; ++i)
        {
            if(arrival[i] <= currentTime)
            {
                arrived[i] = priority[i];
            }
        }

        int minPriority = std::numeric_limits<int>::max();
        int minIndex = 0;
        for(int i = 0; i < numProcess; ++i)
        {
            if(burst[i] != 0 && arrived[i] < minPriority && arrived[i] != -1)
            {
                minPriority = arrived[i];
                minIndex = i;
            }
        }
        currentTime += burst[minIndex];
        turnaround[minIndex] = currentTime - initialArrival[minIndex];
        waiting[minIndex] = turnaround[minIndex] - initialBurst[minIndex];
        burst[minIndex] = 0;

        firstLine += " P" + std::to_string(minIndex) + " |";
        if(currentTime >= 10)
        {
            secondLine = secondLine + "   " + std::to_string(currentTime);
        }
        else
        {
            secondLine = secondLine + "    " + std::to_string(currentTime);
        }
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

    std::cout << "Non Preemptive Priority\n";
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