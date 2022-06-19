# tic-tac-toe
A plain JavaScript coded game of Tic Tac Toe, played from the command line.

The code repository is at https://github.com/gregsandell/tic-tac-toe.

# Build
There is no build.  Just paste all the contents of `index.js` into a terminal window.

# Running the game

`const ttt = new TTT(string player1, string player2)` creates the game 
for players that will be identified by the two strings.  Example:
```javascript
const ttt = new TTT('X', 'O')
```
The player identified by the `X` (player1) will be expected to make the first move.

`ttt.start()` begins a new game.  If a game is in 
progress, it will be cancelled.  When a game has 
completed with a win or a draw, you have to call 
`ttt.start()` again.

`ttt.move(string playerToken, int row, int column)` 
makes a move.  The game board is represented by a 3x3 matrix, 
and the `row` and `column` args are indices for that matrix.

For example the following moves chosen by player `X`
will result in a diagonal win from left to right.

```javascript
ttt.move('X', 0, 0)
ttt.move('X', 1, 1)
ttt.move('X', 2, 3)
```
