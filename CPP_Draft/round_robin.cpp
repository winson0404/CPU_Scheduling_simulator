#include "round_robin.h"
#include <vector>
#include <string>
#include <queue>
#include <iostream>
#include <limits>
#include <iomanip>

void round_robin(int numProcess, int quantum, std::vector<int> burst, std::vector<int> arrival)
{
    int currentTime = 0;
    int totalTime = 0;
    int count = 1;
    std::string firstLine = "|";
    std::string secondLine = "";
    std::queue<int> q;

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

    // Checking for multiple processes arriving at time 0 and arranging them according to burst time.
    std::vector<int> temp_pr;
    std::vector<int> temp_burst;
    for(int i = 0; i < numProcess; ++i)
    {
        if(arrival[i] == 0)
        {
            temp_pr.push_back(i);
            temp_burst.push_back(burst[i]);
        }
    }

    while(temp_pr.size())
    {
        int minBurst = temp_burst[0];
        int minPr = temp_pr[0];
        int minIndex = 0;

        for(int i = 1; i <temp_burst.size(); ++i)
        {
            if(temp_burst[i] < minBurst)
            {
                minBurst = temp_burst[i];
                minPr = temp_pr[i];
                minIndex = i;
            }
        }
        q.push(temp_pr[minIndex]);

        temp_pr.erase(temp_pr.begin() + minIndex);
        temp_burst.erase(temp_burst.begin() + minIndex);
    }

    // Main Loop
    while(currentTime <= totalTime)
    {
        currentTime++;

        // Checking for multiple processes arriving at the same and arranging them according to burst time.
        for(int i = 0; i < numProcess; ++i)
        {
            if(arrival[i] == currentTime)
            {
                temp_pr.push_back(i);
                temp_burst.push_back(burst[i]);
            }
        }

        while(temp_pr.size())
        {
            int minBurst = temp_burst[0];
            int minPr = temp_pr[0];
            int minIndex = 0;

            for(int i = 1; i <temp_burst.size(); ++i)
            {
                if(temp_burst[i] < minBurst)
                {
                    minBurst = temp_burst[i];
                    minPr = temp_pr[i];
                    minIndex = i;
                }
            }
            q.push(temp_pr[minIndex]);

            temp_pr.erase(temp_pr.begin() + minIndex);
            temp_burst.erase(temp_burst.begin() + minIndex);
        }

        burst[q.front()]--;
        if(burst[q.front()] == 0)
        {
            turnaround[q.front()] = currentTime + minArrival - initialArrival[q.front()];
            waiting[q.front()] = turnaround[q.front()] - initialBurst[q.front()];
            firstLine += " P" + std::to_string(q.front()) + " |";
            if(currentTime >= 10)
            {
                secondLine = secondLine + "   " + std::to_string(currentTime + minArrival);
            }
            else
            {
                secondLine = secondLine + "    " + std::to_string(currentTime + minArrival);
            }
            q.pop();
            count = 0;
        }
        else if(count >= quantum)
        {
            firstLine += " P" + std::to_string(q.front()) + " |";
            if(currentTime >= 10)
            {
                secondLine = secondLine + "   " + std::to_string(currentTime + minArrival);
            }
            else
            {
                secondLine = secondLine + "    " + std::to_string(currentTime + minArrival);
            }
            q.push(q.front());
            q.pop();
            count = 0;
        }
        count++;
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

    std::cout << "Round Robin (Q = " << quantum << ")\n";
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