CC=g++

output: main.o round_robin.o non_preemptive_sjf.o preemptive_sjf.o non_preemptive_priority.o preemptive_priority.o
	g++ main.o round_robin.o non_preemptive_sjf.o preemptive_sjf.o non_preemptive_priority.o preemptive_priority.o -o output

main.o: main.cpp
	g++ -c main.cpp

round_robin.o: round_robin.cpp round_robin.h
	g++ -c round_robin.cpp

non_preemptive_sjf.o: non_preemptive_sjf.cpp non_preemptive_sjf.h
	g++ -c non_preemptive_sjf.cpp

preemptive_sjf.o: preemptive_sjf.cpp preemptive_sjf.h
	g++ -c preemptive_sjf.cpp

non_preemptive_priority.o: non_preemptive_priority.cpp non_preemptive_priority.h
	g++ -c non_preemptive_priority.cpp

preemptive_priority.o: preemptive_priority.cpp preemptive_priority.h
	g++ -c preemptive_priority.cpp

clean:
	rm *.o output