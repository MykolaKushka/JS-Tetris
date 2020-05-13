let main = document.querySelector(".main");

let playfield = [
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  ];

  let gameSpeed = 400;

  // Draw play field
  const draw = () => {
    let mainInnerHTML = "";

    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                mainInnerHTML += '<div class="cell movingCell"></div>';
              } else if (playfield[y][x] === 2) {
                mainInnerHTML += '<div class="cell fixedCell"></div>';
              } else {
                mainInnerHTML += '<div class="cell"></div>';
              }
        }
    }

    main.innerHTML = mainInnerHTML;
  }


  // Move tetro to the down
  const canTetroMoveDown = () => {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] === 1) {
          if (y === playfield.length - 1 || playfield[y + 1][x] === 2) {
            return false;
          }
        }
      }
    }
  
    return true;
  }

  const moveTetroDown = () => {
    if (canTetroMoveDown()) {
        for (let y = playfield.length - 1; y >= 0; y--) {
        for (let x = 0; x < playfield[y].length; x++) {
          if (playfield[y][x] === 1) {
            playfield[y + 1][x] = 1;
            playfield[y][x] = 0;
          }
        }
      }
    } else {
        fixTetro();
    }
  }


// Move tetro to the left
const canTetroMoveLeft = () => {
    for (let y = 0; y < playfield.length; y++) {
      for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] === 1) {
          if (x === 0 || playfield[y][x - 1] === 2) {
            return false;
          }
        }
      }
    }
  
    return true;
  }
  
  const moveTetroLeft = () => {
    if (canTetroMoveLeft()) {
      for (let y = playfield.length - 1; y >= 0; y--) {
        for (let x = 0; x < playfield[y].length; x++) {
          if (playfield[y][x] === 1) {
            playfield[y][x - 1] = 1;
            playfield[y][x] = 0;
          }
        }
      }
    }
  }


// Move tetro to the Right
const canTetroMoveRight = () => {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (x === 9 || playfield[y][x + 1] === 2) {
          return false;
        }
      }
    }
  }

  return true;
}

const moveTetroRight = () => {
  if (canTetroMoveRight()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = 9; x >= 0; x--) {
        if (playfield[y][x] === 1) {
          playfield[y][x + 1] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  }
}



  // Fix tetro
  const fixTetro = () => {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] === 1) {
          playfield[y][x] = 2;
        }
      }
    }

    playfield[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
    playfield[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
  }

  document.onkeydown = (e) => {
    if (e.keyCode === 37) {
      moveTetroLeft();
    } else if (e.keyCode === 39) {
      moveTetroRight();
    } else if (e.keyCode === 40) {
      moveTetroDown();
    }
    draw();
  };

  draw();
  
  const startGame = () => {
    moveTetroDown();
    draw();
    setTimeout(startGame, gameSpeed);
  }
  
  setTimeout(startGame, gameSpeed);