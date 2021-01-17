#include <iostream>
#include <vector>
#include <queue>

#include <iostream>
#include "round_robin.h"
#include "preemptive_sjf.h"
#include "non_preemptive_sjf.h"
#include "non_preemptive_priority.h"
#include "preemptive_priority.h"

int main()
{
    int numProcess;

    std::cout << "Enter number of processes : ";
    std::cin >> numProcess;

    std::vector<int> burst;
    std::vector<int> arrival;
    std::vector<int> priority;

    std::cout << "Input the parameters in the following order:\n burst arrival priority\n";

    for(int i = 0; i < numProcess; ++i)
    {
        std::vector<int> temp;
        int input1, input2, input3;
        std::cin >> input1 >> input2 >> input3;
        burst.push_back(input1);
        arrival.push_back(input2);
        priority.push_back(input3);
    }

    std::cout << "\n";

    round_robin(numProcess, 2, burst, arrival);
    preemptive_sjf(numProcess, burst, arrival);
    non_preemptive_sjf(numProcess, burst, arrival);
    non_preemptive_priority(numProcess, burst, arrival, priority);
    preemptive_priority(numProcess, burst, arrival, priority);

    return 0;
}