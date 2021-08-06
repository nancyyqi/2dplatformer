/* global
 *  loadImage, width, height, image
 */

class Block {
  constructor(name, x, y, size) {
    this.block1 = loadImage(
      "https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2Fplatform1.png"
    );
    this.block2 = loadImage(
      "https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2Fplatform.png"
    );
    this.name = name;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  show() {
    switch (this.name) {
      case "dirt":
        return image(this.block1, this.x, this.y, this.size, this.size);
      case "death sand":
        return image(this.block2, this.x, this.y, this.size, this.size);
    }
  }
}
