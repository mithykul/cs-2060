// Configuration
const FLOOR_SIZE = 50;
const CELL_SIZE = 10;

// Turtle state
let turtle = {
    x: 0,
    y: 0,
    direction: 0, // 0: right, 90: down, 180: left, 270: up
    penDown: false
};

// Floor state
let floor = Array(FLOOR_SIZE).fill().map(() => Array(FLOOR_SIZE).fill(false));

// Initialize the floor
function initializeFloor() {
    const floorElement = document.getElementById('floor');
    floorElement.style.width = `${FLOOR_SIZE * CELL_SIZE}px`;
    floorElement.style.height = `${FLOOR_SIZE * CELL_SIZE}px`;

    // Create cells
    for (let y = 0; y < FLOOR_SIZE; y++) {
        for (let x = 0; x < FLOOR_SIZE; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.width = `${CELL_SIZE}px`;
            cell.style.height = `${CELL_SIZE}px`;
            cell.style.left = `${x * CELL_SIZE}px`;
            cell.style.top = `${y * CELL_SIZE}px`;
            cell.id = `cell-${x}-${y}`;
            floorElement.appendChild(cell);
        }
    }

    // Create turtle
    const turtleElement = document.createElement('div');
    turtleElement.className = 'turtle';
    turtleElement.id = 'turtle';
    floorElement.appendChild(turtleElement);
    updateTurtlePosition();
}

// Update turtle's visual position
function updateTurtlePosition() {
    const turtleElement = document.getElementById('turtle');
    turtleElement.style.left = `${turtle.x * CELL_SIZE}px`;
    turtleElement.style.top = `${turtle.y * CELL_SIZE}px`;
    turtleElement.style.transform = `rotate(${turtle.direction}deg)`;
}

// Mark or unmark a cell
function markCell(x, y, marked) {
    const cell = document.getElementById(`cell-${x}-${y}`);
    if (cell) {
        cell.className = marked ? 'cell marked' : 'cell';
        floor[y][x] = marked;
    }
}

// Move turtle in specified direction
function moveTurtle(direction) {
    let newX = turtle.x;
    let newY = turtle.y;
    let newDirection = turtle.direction;

    switch (direction) {
        case 'up':
            newY = Math.max(0, turtle.y - 1);
            newDirection = 270;
            break;
        case 'down':
            newY = Math.min(FLOOR_SIZE, turtle.y + 1);
            newDirection = 90;
            break;
        case 'left':
            newX = Math.max(0, turtle.x - 1);
            newDirection = 180;
        case 'right':
            newX = Math.min(FLOOR_SIZE, turtle.x + 1);
            newDirection = 0;
    }

    if (turtle.penDown) {
        markCell(turtle.x, turtle.y, true);
    }

    turtle.x = newX;
    turtle.y = newY;
    turtle.direction = newDirection;
}

// Toggle pen state
function togglePen() {
    turtle.penDown = !turtle.penDown;
    document.getElementById('penStatus').textContent = turtle.penDown ? 'Down' : 'Up';
}

// Reset floor
function resetFloor() {
    for (let y = 0; y < FLOOR_SIZE; y++) {
        for (let x = 0; x < FLOOR_SIZE; x++) {
            markCell(x, y, false);
        }
    }
    turtle.x = 0;
    turtle.y = 0;
    turtle.direction = 0;
    turtle.penDown = false;
    document.getElementById('penStatus').textContent = 'Up';
    updateTurtlePosition();
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveTurtle('up');
            break;
        case 'ArrowDown':
            moveTurtle('down');
            break;
        case 'ArrowLeft':
            moveTurtle('left');
            break;
        case 'ArrowRight':
            moveTurtle('right');
        case ' ':
            togglePen();
            break;
        case 'r':
        case 'R':
            resetFloor();
            break;
    }
});

// Initialize when page loads
window.onload = function() {
    initializeFloor();
}; 
