const root = document.getElementById("root");

class SnakeGame {
  constructor(pos) {
    this.clear();
  }

  randomNumber = (array) => {
    const random = Math.floor(Math.random() * array?.length);
    return array[random];
  };
  randPos() {
    const pos = this.randomNumber(this.Occ);
    return pos;
  }
  makeArr(array) {
    let arr = [];
    array.forEach((x) => {
      array.forEach((y) => {
        arr.push(`${x}-${y}`);
      });
    });
    return arr;
  }
  drawGrid() {
    this.Occ.forEach((el) => {
      root.appendChild(this.drawBox(el));
    });
  }
  drawBox(id) {
    const [x, y] = id.split("-");
    const el = document.createElement("div");
    el.classList.add("piece-square");
    if ((parseInt(x) + parseInt(y)) % 2 == 0) {
      el.classList.add("black");
    }

    el.setAttribute("id", `${x}-${y}`);
    el.textContent = `${x}${y}`;
    return el;
  }
  makeOccupied() {
    const div = document.getElementById(`${this.pos.x}-${this.pos.y}`);
    div.classList.remove("current");
    div.classList.add("occupied");
  }
  left() {
    if (this.pos.y > this.mat[0]) {
      this.makeOccupied();
      this.pos.y -= 1;
      this.move();
    }
  }

  right() {
    if (this.pos.y < this.mat.slice(-1)[0]) {
      this.makeOccupied();
      this.pos.y += 1;
      this.move();
    }
  }

  up() {
    if (this.pos.x > this.mat[0]) {
      this.makeOccupied();
      this.pos.x -= 1;
      this.move();
    }
  }

  down() {
    if (this.pos.x < this.mat.slice(-1)[0]) {
      this.makeOccupied();
      this.pos.x += 1;
      this.move();
    }
  }
  move() {
    this.Occ = this.Occ.filter(
      (item) => item !== `${this.pos.x}-${this.pos.y}`
    );
    this.cahangeMealPos();
    const div = document.getElementById(`${this.pos.x}-${this.pos.y}`);
    div.classList.remove("occupied", "meal");
    div.classList.add("current");
    console.log(this.pos);
    this.winAction();
  }
  drawMeal() {
    let div = document.getElementById(this.mealPos);
    div.classList.remove("meal");
    this.mealPos = this.randPos();
    if (this.mealPos) {
      div = document.getElementById(this.mealPos);
      div.classList.add("meal");
    }
  }

  cahangeMealPos() {
    if (this.mealPos) {
      const [x, y] = this.mealPos.split("-");
      if (this.pos.x === parseInt(x) && this.pos.y === parseInt(y)) {
        this.point += 1;
        this.drawMeal();
      }
    }
  }

  winAction() {
    if (!this.mealPos) {
      alert(`your point is ${this.point}`);
    }
  }
  clear() {
    this.mat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.pos = { x: 1, y: 1 };
    this.Occ = this.makeArr(this.mat);
    this.drawGrid();
    this.mealPos = this.randPos();
    this.move();
    this.drawMeal();
    this.point = 0;
  }
}

const game = new SnakeGame("aaa");

//extra

const playHuman = () => {
  document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft") {
      game.left();
      console.log("Left key");
    } else if (event.key == "ArrowUp") {
      game.up();
      console.log("Up key");
    } else if (event.key == "ArrowRight") {
      game.right();
      console.log("Right key");
    } else if (event.key == "ArrowDown") {
      game.down();
      console.log("Down key");
    }
  });
};

const playAuto = () => {
  let moves = [
    1, 1, 2, 3, 2, 1, 1, 2, 3, 2, 1, 1, 2, 3, 2, 1, 1, 2, 3, 2, 2, 2, 2, 2, 4,
    2, 3, 4, 4,
  ];
  automate(moves);
};

const action = (move) => {
  let basicMoves = { up: 1, down: 2, left: 3, right: 4 };
  if (move === basicMoves.left) {
    game.left();
    console.log("Left key");
  } else if (move === basicMoves.up) {
    game.up();
    console.log("Up key");
  } else if (move === basicMoves.right) {
    game.right();
    console.log("Right key");
  } else if (move === basicMoves.down) {
    game.down();
    console.log("Down key");
  }
};

const automate = (arr, delay = 200) => {
  const promises = arr.map((elem, i) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        action(elem);
        resolve();
      }, i * delay);
    });
  });

  Promise.all(promises).then(() => {
    console.log("All elements logged.");
  });
};

playAuto();