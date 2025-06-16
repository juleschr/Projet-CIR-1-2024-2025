all: main

main.o : main.c  functions.h trtment_choice.c
	gcc -c  main.c trtment_choice.c

functions.o : functions.c functions.h
	gcc -c functions.c

trtment_choice.o : trtment_choice.c functions.h
	gcc -c trtment_choice.c
main: main.o functions.o trtment_choice.o
	gcc -o main main.o functions.o trtment_choice.o

