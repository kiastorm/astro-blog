let balls = [];
let collideables = [];

class Ball {
  constructor(x, y, r, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = xspeed;
    this.yspeed = yspeed;

    this.fillh = random(100);
    this.fills = random(8, 100);
    this.filll = random(88, 93);
  }
  show() {
    noStroke();
    fill(this.fillh, this.fills, this.filll, 150);
    ellipse(this.x, this.y, this.r * 2);
  }
  move() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }
  bounce() {
    if (this.x > width - this.r || this.x < 0 + this.r) {
      this.xspeed *= -1;
      // this.fillh = random(360);
      // this.fills = random(8, 100);
      // this.filll = random(88, 93);
    }
    if (this.y > height - this.r || this.y < 25 + this.r) {
      this.yspeed *= -1;
      // this.fillh = random(360);
      // this.fills = random(8, 100);
      // this.filll = random(88, 93);
    }
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }
}

class Collideable {
  constructor(element) {
    this.element = element;
    const size = element.getBoundingClientRect();
    this.r = size.width / 2;
    this.x = size.left + this.r;
    this.y = size.top + this.r;
  }
  getSize() {
    return {
      x: this.x,
      y: this.y,
      r: this.r,
    };
  }
}

const forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSL);

  const ball1 = new Ball(
    window.innerWidth - 160,
    window.innerHeight - 160,
    random(80, 140),
    random(-1, 1),
    random(-1, 1)
  );
  const ball2 = new Ball(160, 160, random(80, 140), random(-1, 1), random(-1, 1));
  const ball3 = new Ball(
    160,
    window.innerHeight - 160,
    random(80, 140),
    random(-1, 1),
    random(-1, 1)
  );
  const ball4 = new Ball(
    window.innerWidth - 160,
    160,
    random(80, 140),
    random(-1, 1),
    random(-1, 1)
  );
  const ball5 = new Ball(
    window.innerWidth * 0.66,
    window.innerHeight / 2,
    random(80, 140),
    random(-1, 1),
    random(-1, 1)
  );
  let foundCollideables = document.querySelectorAll('[data-is-collideable]');

  balls.push(
    ball1,
    // ball2,
    ball3,
    // ball4,
    ball5
  );

  forEach(foundCollideables, function (index, value) {
    const collideable = new Collideable(value);
    collideables.push(collideable.getSize());
  });
}

const collide = (other) => {
  other.xspeed *= -1;
  other.yspeed *= -1;
};

function draw() {
  clear();
  noFill();
  rect(width - width, height - height, width, height);

  for (ball of balls) {
    ball.move();
    ball.bounce();
    ball.show();
    for (other of balls) {
      if (ball !== other && ball.intersects(other)) {
        collide(other);
      }
    }

    collideables.forEach((collideable) => {
      if (ball.intersects(collideable)) {
        collide(ball);
      }
    });
  }
}
