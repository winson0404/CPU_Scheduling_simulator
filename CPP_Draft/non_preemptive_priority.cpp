#include "non_preemptive_priority.h"
#include <vector>
#include <string>
#include <iostream>
#include <limits>

void non_preemptive_priority(int numProcess, std::vector<int> burst, std::vector<int> arrival, std::vector<int> priority)
{
    int currentTime = 0;
    int totalTime = 0;
    std::string firstLine = "|";
    std::string secondLine = "0";
    std::vector<int> arrived(numProcess);

    for(int i = 0; i < numProcess; ++i)
    {
        totalTime += burst[i];
        arrived[i] = -1;
    }

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

    std::cout << "Non Preemptive Priority\n";
    std::cout << firstLine << "\n";
    std::cout << secondLine << "\n\n";
}