import React, { useEffect, useRef, useState } from "react";

// Game board size and initial game settings
const BOARD_SIZE = 400; // pixels
const SNAKE_SIZE = 20;  // each segment of the snake

interface Position {
    x: number;
    y: number;
}

const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [snake, setSnake] = useState<Position[]>([{ x: 0, y: 0 }]); // Initial snake position
    const [food, setFood] = useState<Position>({ x: 100, y: 100 });   // Initial food position
    const [direction, setDirection] = useState<Position>({ x: SNAKE_SIZE, y: 0 });

    // Draw the game on the canvas
    const drawGame = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context) return;

        // Clear the canvas
        context.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

        // Draw the snake
        context.fillStyle = "green";
        snake.forEach(segment => {
            context.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE);
        });

        // Draw the food
        context.fillStyle = "red";
        context.fillRect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);
    };

    // Move the snake and handle game logic
    const moveSnake = () => {
        setSnake(prevSnake => {
            const newSnake = [...prevSnake];
            const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
            newSnake.unshift(head);  // Add new head to the front

            // Check if the snake eats food
            if (head.x === food.x && head.y === food.y) {
                setFood({
                    x: Math.floor((Math.random() * BOARD_SIZE) / SNAKE_SIZE) * SNAKE_SIZE,
                    y: Math.floor((Math.random() * BOARD_SIZE) / SNAKE_SIZE) * SNAKE_SIZE,
                });
            } else {
                newSnake.pop(); // Remove the last segment if no food eaten
            }
            return newSnake;
        });
    };

    // Handle key events to change the snake's direction
    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowUp":
                if (direction.y === 0) setDirection({ x: 0, y: -SNAKE_SIZE });
                break;
            case "ArrowDown":
                if (direction.y === 0) setDirection({ x: 0, y: SNAKE_SIZE });
                break;
            case "ArrowLeft":
                if (direction.x === 0) setDirection({ x: -SNAKE_SIZE, y: 0 });
                break;
            case "ArrowRight":
                if (direction.x === 0) setDirection({ x: SNAKE_SIZE, y: 0 });
                break;
        }
    };

    // Game loop
    useEffect(() => {
        const interval = setInterval(() => {
            moveSnake();
            drawGame();
        }, 200); // Adjust speed by changing the interval time
        return () => clearInterval(interval);
    }, [snake, food, direction]);

    // Set up key event listener
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction]);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Snake Game</h1>
            <canvas
                ref={canvasRef}
                width={BOARD_SIZE}
                height={BOARD_SIZE}
                style={{
                    border: "1px solid black",
                    backgroundColor: "#eee",
                    display: "block",
                    margin: "auto"
                }}
            />
        </div>
    );
};

export default Game;