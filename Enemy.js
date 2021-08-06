/* global
 *  loadImage, width, height, image, createVector, random, constrain
 */

class Enemy {
  constructor(name, x, y, size) {
    this.ghost = loadImage(
      "https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2Fghost.png"
    );
    this.spider = loadImage("https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2Fspider.png");
    this.name = name;
    this.size = size;
    this.pos = createVector(x, y);
    this.gravity = 0.5;
    this.yVelocity = 0;
    this.jumpForce = 15;
    this.minHeight = this.pos.y;
  }

  show() {
    switch (this.name) {
      case "ghost":
        push();
        let opacity = random(175, 230);
        tint(opacity, opacity);
        image(this.ghost, this.pos.x, this.pos.y, this.size, this.size);
        pop();
        return;
      case "spider":
        return image(this.spider, this.pos.x, this.pos.y, this.size, this.size);
    }
  }

  update() {
    switch (this.name) {
      case "ghost":
        return;
      case "spider":
        this.applyGravity();
        if (random(1) < 0.05) {
          this.jump();
        }
        return;
    }
  }
  applyGravity() {
    this.pos.y += this.yVelocity;
    this.yVelocity += this.gravity;
    this.pos.y = constrain(this.pos.y, 0, this.minHeight);
  }

  jump() {
    if (this.pos.y === this.minHeight) {
      this.yVelocity = -this.jumpForce;
    }
  }
}
