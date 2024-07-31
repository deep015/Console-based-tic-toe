class Board {
    constructor() {
        this.grid = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }

    display() {
        console.clear();
        for (let i = 0; i < 3; i++) {
            let row = '';
            for (let j = 0; j < 3; j++) {
                row += this.grid[i][j];
                if (j < 2) row += '|';
            }
            console.log(row);
            if (i < 2) console.log('---------');
        }
    }

    update(row, col, player) {
        if (this.grid[row][col] === ' ') {
            this.grid[row][col] = player;
            return true;
        }
        return false;
    }

    isWin(player) {
        for (let i = 0; i < 3; i++) {
            if (this.grid[i][0] === player && this.grid[i][1] === player && this.grid[i][2] === player) return true;
            if (this.grid[0][i] === player && this.grid[1][i] === player && this.grid[2][i] === player) return true;
        }
        if (this.grid[0][0] === player && this.grid[1][1] === player && this.grid[2][2] === player) return true;
        if (this.grid[2][0] === player && this.grid[1][1] === player && this.grid[0][2] === player) return true;
        return false;
    }

    isDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[i][j] === ' ') {
                    return false;
                }
            }
        }
        return true;
    }
}

class Game {
    constructor() {
        this.board = new Board();
        this.currentPlayer = 'X';
    }

    play() {
        this.board.display();

        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const askMove = () => {
            rl.question(`Player ${this.currentPlayer}, enter your move (row and column): `, (input) => {
                const row = parseInt(input[0], 10);
                const col = parseInt(input[2], 10);

                if (this.board.update(row, col, this.currentPlayer)) {
                    this.board.display();

                    if (this.board.isWin(this.currentPlayer)) {
                        console.log(`Player ${this.currentPlayer} wins!`);
                        rl.close();
                    } else if (this.board.isDraw()) {
                        console.log("It's a draw!");
                        rl.close();
                    } else {
                        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                        askMove();
                    }
                } else {
                    console.log("Invalid move! Try again.");
                    askMove();
                }
            });
        };

        askMove();
    }
}

const game = new Game();
game.play();