// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  var board = new Array(8);

  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
  }

  bOne = new Piece('black');
  bTwo = new Piece('black');
  wOne = new Piece('white');
  wTwo = new Piece('white');

  board[3][4] = bOne;
  board[4][3] = bTwo;
  board[3][3] = wOne;
  board[4][4] = wTwo;

  return board;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] > 7 || pos[i] < 0) {
      return false;
    }
  }

  return true;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
    throw new Error('Not valid pos!');
  }

  let [x, y] = pos;
  // console.log(x, y);
  let pieceAtPos = this.grid[x][y];
  
  return pieceAtPos;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.getPiece(pos) === undefined ) {
    return false;
  };
  if (this.getPiece(pos).color === color) {
    return true;
  };
  return false;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if (this.getPiece(pos) === undefined) {
    return false;
  };
  return true;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  if (!piecesToFlip) {
    piecesToFlip = [];
  } else {
    piecesToFlip.push(pos);
  };
  let [x, y] = pos;
  let newPos = [x + dir[0], y + dir[1]];
  if (!this.isValidPos(newPos)){
    return [];
  };
  if (!this.isOccupied(newPos)){
    return [];
  } else if (this.getPiece(newPos).color === color){
    return piecesToFlip;
  } else {
    return this._positionsToFlip(newPos, color, dir, piecesToFlip)
  }
}

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (!this.isValidPos(pos) || this.isOccupied(pos)) {
    return false;
  };
  for (let i = 0; i < Board.DIRS.length; i++) {
    let dir = Board.DIRS[i]
    let piecesToFlip = undefined;
    if (this._positionsToFlip(pos, color, dir, piecesToFlip).length !== 0) {
      return true;
    };
  };

  return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) {
    throw new Error('Invalid move!');
  };

  let piecesToFlip = []
  
  // Get pieces to flip
  for (let i = 0; i < Board.DIRS.length; i++) {
    let dir = Board.DIRS[i];
    let flips = undefined;
    flips = this._positionsToFlip(pos, color, dir, flips);
    console.log(flips);
    piecesToFlip = piecesToFlip.concat(flips);
  };

  for (let i = 0; i < piecesToFlip.length; i++) {
    let [x, y] = piecesToFlip[i]
    this.grid[x][y].flip();
  }
  
  let piece = new Piece(color);

  let [x, y] = pos;
  this.grid[x][y] = piece;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE
