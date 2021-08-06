/* global
 *  loadImage, createVector, height, color, rect, push, noStroke, fill, pop,
 *  image, constrain, keyIsDown, RIGHT_ARROW, LEFT_ARROW, collideRectRect, loadSound, play, scale
 */
class Player {
  constructor() {
    this.imgFacingR = loadImage(
      "https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2FcandleR.png?v=1628199245107"
    );
    this.imgFacingL = loadImage(
      "https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2FcandleL.png?v=1628199245107"
    );
    this.heartImg = loadImage(
      "https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2Fheart.png"
    );
    this.jumpSound = loadSound(
      "https://cdn.glitch.com/7d969818-b14c-4707-90fc-4bde19e2cba7%2FJump.mp3"
    );
    this.currentImg = this.imgFacingR;
    this.width = 34;
    this.heigth = 52;
    this.offset = 70;
    this.minHeight = height - (this.heigth + this.offset);
    this.pos = createVector(this.width + this.offset, this.minHeight);
    this.speed = 4;
    this.gravity = 0.5;
    this.yVelocity = 0;
    this.jumpForce = 7;
    this.lives = 500;
  }

  show() {
    image(this.currentImg, this.pos.x, this.pos.y, this.width, this.heigth);
    this.showHearts();
  }

  showHearts() {
    for (let i = 0; i < this.lives/100; i++) {
      image(this.heartImg, 40 + i * 25, 40, 20, 20);
    }
  }

  update() {
    this.applyGravity();
  }
  

  applyGravity() {
    this.pos.y += this.yVelocity;
    this.yVelocity += this.gravity;
    this.pos.y = constrain(this.pos.y, 0, this.minHeight);
  }

  handleMovement(obstacle) {
    if (keyIsDown(RIGHT_ARROW) || keyIsDown("68")) {
      this.currentImg = this.imgFacingR;
      this.pos.x += this.speed;
    }

    if (keyIsDown(LEFT_ARROW) || keyIsDown("65")) {
      this.currentImg = this.imgFacingL;
      this.pos.x -= this.speed;
    }

    if (keyIsDown("32")) {
      this.jump();
    }
  }

  jump() {
    if (this.pos.y === this.minHeight) {
      this.minHeight = height - (this.heigth + this.offset);
      this.yVelocity = -this.jumpForce;
      this.jumpSound.play();
    }
  }
  hitHorizontally(block) {
    return (
      this.pos.x < block.x + block.size && this.pos.x + this.width > block.x
    );
  }
  hitVertically(block) {
    return (
      this.pos.y < block.y + this.height && this.pos.y + this.height > block.y
    );
  }
  hitEnemy(enemy) {
    return collideRectRect(
      this.pos.x,
      this.pos.y,
      this.width,
      this.heigth,
      enemy.pos.x,
      enemy.pos.y,
      enemy.size-20,
      enemy.size
    );
  }
  hit(obstacle) {
    return collideRectRect(
      this.pos.x,
      this.pos.y,
      this.width,
      this.heigth,
      obstacle.x,
      obstacle.y - 18,
      obstacle.size,
      obstacle.size
    );
  }
}
