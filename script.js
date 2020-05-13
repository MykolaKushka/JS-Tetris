let main = document.querySelector(".main");

let playfield = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
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
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  ];

  let gameSpeed = 400;

  // Draw play field
  const draw = () => {
    let mainInnerHTML = "";

    for (let y in playfield) {
        for (let x in playfield[y]) {
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


  // Move tetro down
  const canTetroMoveDown = () => {
    for (let y = 0; y < playfield.length; y++) {
        for (let x in playfield[y]) {
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
        for (let x in playfield[y]) {
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

  // Fix tetro
  const fixTetro = () => {
    for (let y in playfield) {
        for (let x in playfield[y]) {
        if (playfield[y][x] === 1) {
          playfield[y][x] = 2;
        }
      }
    }
  }


  draw();
  
  function startGame() {
    moveTetroDown();
    draw();
    setTimeout(startGame, gameSpeed);
  }
  
  setTimeout(startGame, gameSpeed);