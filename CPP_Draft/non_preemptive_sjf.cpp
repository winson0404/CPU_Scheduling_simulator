#include "non_preemptive_sjf.h"
#include <vector>
#include <string>
#include <iostream>
#include <limits>

void non_preemptive_sjf(int numProcess, std::vector<int> burst, std::vector<int> arrival)
{
    int currentTime = 0;
    int totalTime = 0;
    std::string firstLine = "|";
    std::string secondLine = "0";
    std::vector<int> arrived(numProcess);

    for(int i = 0; i < numProcess; ++i)
    {
        totalTime += burst[i];
    }

    while(currentTime < totalTime)
    {
        for(int i = 0; i < numProcess; ++i)
        {
            if(arrival[i] <= currentTime)
            {
                arrived[i] = burst[i];
            }
        }

        int minBurst = std::numeric_limits<int>::max();
        int minIndex = 0;
        for(int i = 0; i < numProcess; ++i)
        {
            if(arrived[i] != 0 && arrived[i] < minBurst)
            {
                minBurst = arrived[i];
                minIndex = i;
            }
        }
        currentTime += minBurst;
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

    std::cout << "Non Preemptive SJF\n";
    std::cout << firstLine << "\n";
    std::cout << secondLine << "\n\n";
}