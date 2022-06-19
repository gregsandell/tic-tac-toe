
class TTT {
    constructor(playerToken1, playerToken2) {
        this.matrix = [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]
        this.players = [playerToken1, playerToken2]
        this.playerCount = undefined
        this.playing = false;
        this.player = undefined
        this.winner = undefined
    }
    start() {
        this.matrix = [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]
        this.playing = true
        this.playerCount = 0;
        this.player = this.getPlayer()
    }
    move(player, row, col) {
        if (row > 2 || col > 2) {
            console.log('illegal move')
            return
        }
        if (!this.playing) {
            console.log('Error: No moves left because game is over')
            return
        }
        if (player !== this.getPlayer()) {
            console.log(`Error: player ${player} is out of order`)
            return
        }
        if (this.matrix[row][col]) {
            console.log(`Error: player ${player} attempted move into occupied space`)
            return
        }
        this.matrix[row][col] = player
        this.displayMove()
        if (this.isDraw()) {
            console.log('Outcome: Game ended with a draw')
            return
        }
        const winningPlayer = this.getWinner()
        ++this.playerCount
        if (winningPlayer !== 'none') {
            --this.playerCount
            this.playing = false;
            console.log(`Outcome: Player ${this.getPlayer()} won`)
        }
    }
    displayMove() {
        console.log(`${this.getPlayer()} has moved, board is now:`)
        this.matrix.forEach((arr) => {
            console.log(JSON.stringify(arr))
        })
    }
    isDraw() {
        return this.getRow(0).every(item => !!item)
            && this.getRow(1).every(item => !!item)
            && this.getRow(2).every(item => !!item)
    }
    getPlayer() {
        return this.players[this.playerCount % 2]
    }
    getWinner() {
        try {
            for (let player of this.players) {
                [0, 1, 2].forEach((idx) => {
                    // console.log(`forEach ${idx}`)
                    if (this.playerWinsRow(idx, player) || this.playerWinsColumn(idx, player)) {
                        throw this.getPlayer()
                    }
                })
                if (this.playerWinsDiagonal([0, 1, 2], player)
                    || this.playerWinsDiagonal([2, 1, 0], player)) {
                    throw this.getPlayer()
                }
            }
        } catch (player) {
            return player
        }
        return 'none'
    }
    playerWinsDiagonal(indices, player) {
        return indices.map((idx, i) => {
            return this.matrix[i][idx]
        }).every(item => !!item && item === player)
    }
    playerWinsRow(row, player) {
        return this.getRow(row).every(item => !!item && item === player)
    }
    playerWinsColumn(column, player) {
        return this.getColumn(column).every(item => !!item && item === player)
    }
    getRow(row) {
        return this.matrix[row]
    }
    getColumn(col) {
        return [this.matrix[0][col], this.matrix[1][col], this.matrix[2][col]]
    }
}


const ttt = new TTT('x', 'o')
console.log('Test 1: x wins on a diagonal')
ttt.start();
ttt.move('x', 0, 0)
ttt.move('o', 0, 1)
ttt.move('x', 1, 1)
ttt.move('o', 0, 2)
ttt.move('x', 2, 2)
console.log('Test 2: error, x plays out of turn')
ttt.start();
ttt.move('x', 0, 0)
ttt.move('x', 0, 1)
console.log('Test 3: error, o moves into occupied space')
ttt.start();
ttt.move('x', 0, 0)
ttt.move('o', 0, 0)
console.log('Test 4: o wins on a column')
ttt.start();
ttt.move('x', 0, 0)
ttt.move('o', 0, 1)
ttt.move('x', 1, 0)
ttt.move('o', 1, 1)
ttt.move('x', 2, 2)
ttt.move('o', 2, 1)
console.log('Test 5: a column is filled, but not with a single player')
ttt.start();
ttt.move('x', 0, 0)
ttt.move('o', 1, 0)
ttt.move('x', 0, 1)
ttt.move('o', 0, 2)
ttt.move('x', 2, 0)
console.log(`Winner: ${ttt.getWinner()}`)
console.log('Test 6: game ends in a draw')
ttt.start();
ttt.move('x', 0, 0)
ttt.move('o', 0, 1)
ttt.move('x', 0, 2)
ttt.move('o', 1, 1)
ttt.move('x', 1, 0)
ttt.move('o', 1, 2)
ttt.move('x', 2, 1)
ttt.move('o', 2, 0)
ttt.move('x', 2, 2)
console.log('Test 7: attempt to play after game completed')
ttt.start();
ttt.move('x', 0, 0)
ttt.move('o', 0, 1)
ttt.move('x', 1, 1)
ttt.move('o', 0, 2)
ttt.move('x', 2, 2)
ttt.move('o', 1, 2)
console.log('Test 8: o wins on the other diagonal')
ttt.start();
ttt.move('x', 0, 0)
ttt.move('o', 0, 2)
ttt.move('x', 0, 1)
ttt.move('o', 1, 1)
ttt.move('x', 2, 2)
ttt.move('o', 2, 0)
console.log('Test 9: initial move not by Player 1 defined in the constructor')
ttt.start();
ttt.move('o', 0, 2)
