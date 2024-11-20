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
    const [gameOver, setGameOver] = useState<boolean>(false); // Game over state

    // Correct position if out of bounds
    const correctPosition = (position: Position) => {
        const newPosition : Position = { x: position.x, y: position.y };
        if (position.x < 0)
            newPosition.x = BOARD_SIZE + position.x;
        if (position.y < 0)
            newPosition.y = BOARD_SIZE + position.y;
        if (position.x >= BOARD_SIZE)
            newPosition.x = position.x - BOARD_SIZE;
        if (position.y >= BOARD_SIZE)
            newPosition.y = position.y - BOARD_SIZE;

        return newPosition;
    }

    // // check end game criteria
    // const checkEndGame = (snake : Position[]) => {
    //     return snake.slice(1).includes(snake[0]);
    // }

    // Check if the game is over
    const checkEndGame = (snake: Position[]) => {
        const [head, ...body] = snake;
        return body.some(segment => segment.x === head.x && segment.y === head.y); // Head collides with body
    };
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

            // handle snake went out of bounds
            for (var i =0;i<newSnake.length;i++) {
                var segment = newSnake[i];
                var corrected : Position = correctPosition(segment);
                if (corrected === segment) break; else newSnake[i] = corrected;
            }

            // Check if the snake eats food
            if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
                setFood({
                    x: Math.floor((Math.random() * BOARD_SIZE) / SNAKE_SIZE) * SNAKE_SIZE,
                    y: Math.floor((Math.random() * BOARD_SIZE) / SNAKE_SIZE) * SNAKE_SIZE,
                });
            } else {
                newSnake.pop(); // Remove the last segment if no food eaten
            }

            // Check if the game is over
            if (checkEndGame(newSnake)) {
                setGameOver(true);
                return prevSnake; // Return previous state to stop movement
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
        if (gameOver) return; // Stop game loop when game is over
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

{gameOver && (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    border: "1px solid black",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                }}>
                    <h2>Game Over</h2>
                    <button
                        onClick={() => {
                            setSnake([{ x: 0, y: 0 }]); // Reset snake
                            setFood({ x: 100, y: 100 }); // Reset food
                            setDirection({ x: SNAKE_SIZE, y: 0 }); // Reset direction
                            setGameOver(false); // Restart the game
                        }}
                    >
                        Restart
                    </button>
                </div>
            )}
        </div>
    );
};

export default Game;