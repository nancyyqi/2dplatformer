/* global
 *  colorMode, HSB, createCanvas, createCanvas, Player, Enemy, image,
 *  translate, width, height, loadImage, random, loadJSON, windowWidth
 *  push, pop, noStroke, imageMode, CORNER, CENTER, Block, background
 *  text, textAlign, textSize, fill, key, loadSound
 */

// Add block collision
// Add key and door
// Implement lives
// Add attack
// Add sound when player dies

let gameState;
let c, w, h, status; // canvas variables
let data, jsonFileLoaded; // data variables
let music, collideSound; // sound variables
let menuImg, bgGameImg, winImg, gameOverImg, heartImg; // image variables
let enemies, blocks; // arrays
let player;

function preload() {
  bgGameImg = loadImage(
    "https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2Fnight.jpeg"
  );
  menuImg = loadImage(
    "https://cdn.glitch.com/7d969818-b14c-4707-90fc-4bde19e2cba7%2FMenu.jpeg?v=1628277936510"
  );
  gameOverImg = loadImage(
    "https://cdn.glitch.com/883b76b8-5c23-4a8c-bc25-2a58d45424a6%2FGame_Over_Image.jpg"
  );
  winImg = loadImage(
    "https://cdn.glitch.com/883b76b8-5c23-4a8c-bc25-2a58d45424a6%2FYou_Win_Image.jpg"
  );
  music = loadSound(
    "https://cdn.glitch.com/7d969818-b14c-4707-90fc-4bde19e2cba7%2FbgMusic.mp3?v=1628276510886"
  );
  collideSound = loadSound(
    "https://cdn.glitch.com/aa89e8c4-526c-4df5-809f-eabbe934a8c4%2Fgame%20over.mp3"
  );
}
function setup() {
  // set canvas settings
  w = windowWidth; // get window width
  h = (w * 9) / 16; // calculate canvas height to keep 16:9 aspect ratio
  c = createCanvas(w, 700);
  c.drop(gotJsonFile);
  // init variables
  player = new Player();
  jsonFileLoaded = false;
  gameState = "menu";
  // music.play();
}

function draw() {
  switch (gameState) {
    case "menu":
      background(menuImg);
      return;
    case "game":
      if (!jsonFileLoaded) {
        showLoadJSONFileMenu();
      } else {
        background(bgGameImg);
        showItems();
        player.show();
        player.handleMovement();
        player.update();
        checkCollisions();
      }
  }
}

function addItems() {
  enemies = [];
  blocks = [];
  for (let i = 0; i < data.items.length; i++) {
    if (data.items[i].type == "block") {
      blocks.push(
        new Block(
          data.items[i].name,
          data.items[i].x,
          data.items[i].y,
          data.items[i].size
        )
      );
    } else if (data.items[i].type == "enemy") {
      enemies.push(
        new Enemy(
          data.items[i].name,
          data.items[i].x,
          data.items[i].y,
          data.items[i].size
        )
      );
    }
  }
}

function showItems() {
  push();
  imageMode(CENTER);
  for (let enemy of enemies) {
    enemy.show();
    enemy.update();
  }
  for (let block of blocks) {
    block.show();
  }
  pop();
}

function keyPressed() {
  if (gameState == "menu" && key == "Enter") {
    music.stop();
    gameState = "game";
  }
  if (gameState == "gameOver" && key == "r") {
    resetGame();
  }
}

function checkCollisions() {
  for (let enemy of enemies) {
    if (player.hitEnemy(enemy)) {
      print("hit");
      if (player.lives > 0) {
        player.lives -= 10;
      } else if (player.lives <= 0) {
        gameOver();
      }
    }
  }
  for (let block of blocks) {
    if (player.hit(block)) {
      print("hit");
      player.minHeight = player.pos.y;
    }
  }
}

function showLoadJSONFileMenu() {
  background(50);
  textAlign(CENTER);
  textSize(30);
  fill(255);
  text(
    "Drag a compatible JSON file onto the canvas to load game",
    width / 2,
    height / 2
  );
}

function gotJsonFile(file) {
  // If it's a JSON file
  if (file.subtype === "json") {
    try {
      data = file.data;
      addItems();
      // music.play();
      jsonFileLoaded = true;
    } catch {
      print("There was a problem parsing the JSON File");
      return;
    }
  } else {
    print("Not a JSON file");
  }
}

function gameOver() {
  gameState = "gameOver";
  background(gameOverImg);
}
function resetGame() {
  setup();
}
