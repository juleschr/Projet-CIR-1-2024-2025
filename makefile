all: main

main.o : main.c  functions.h
	gcc -c  main.c 

functions.o : functions.c functions.h
	gcc -c functions.c

main: main.o functions.o
	gcc -o main main.o functions.o

