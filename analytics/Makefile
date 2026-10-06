CC = gcc
CFLAGS = -Wall -Wextra -O2 -Iinclude
TARGET = bin/maternal_analyzer
SRCS = src/normalization.c src/gap_calculator.c src/accessibility_index.c src/main.c
OBJS = $(SRCS:.c=.o)

.PHONY: all clean run

all: $(TARGET)

$(TARGET): $(OBJS)
	@mkdir -p bin
	$(CC) $(CFLAGS) -o $@ $(OBJS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f src/*.o $(TARGET)
	rm -rf bin
