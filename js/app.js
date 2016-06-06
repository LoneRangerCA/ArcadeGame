//Maximum and minimum x axis
maxx = 500;
minx = 0;

//Enemy constructor
var Enemy = function(enemy_x, enemy_y, speed) {
  this.x = enemy_x;
  this.y = enemy_y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

//Enemy update function - updates all enemies
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  if (this.x > maxx) {
    this.reset();
  }
};

//Enemy reset for when enemies reach end of maxx (x axis)
Enemy.prototype.reset = function(speed) {
  this.x = minx;
  speed = Math.random() * (maxx - minx) + minx;
  return speed;
};

//Calls function to draw the enemies
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player constructor
var Player = function() {
//    this.sprite = 'images/char-horn-girl.png';
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200; // x position
    this.y = 320;
    this.speed = 0;
};

//Player update function - updates player positions
Player.prototype.update = function(dt) {
	this.checkCollisions();
  if (this.y <= 0) {
    alert("YOU BEAT THE COCKROACHS!");
    this.reset();
	 }
};

//Player reset for when player reaches end of maxx (x axis)
Player.prototype.reset = function(speed) {
  this.x = 200; // x position
  this.y = 320;
  this.speed = 0;
  return speed;
};

//Calls function to draw the player
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Moves player with up, down, right and left arrows
Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > 0) {
    this.x -= 100;
  } else if (key === 'right' && this.x < 395) {
    this.x += 100;
  } else if (key === 'up' && this.y > 0) {
    this.y -= 83;
  } else if (key === 'down' && this.y < 400) {
    this.y += 83;
  }
};

var player = new Player();
var enemy1 = new Enemy(-120, 60, 50);
var enemy2 = new Enemy(-100, 120, 80);
var enemy3 = new Enemy(-140, 180, 30);
var enemy4 = new Enemy(-140, 60, 60);
var enemy5 = new Enemy(-100, 120, 40);
var enemy6 = new Enemy(-120, 180, 70);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

//Listens for user keypresses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
player.handleInput(allowedKeys[e.keyCode]);
  }
);

//Checks for Player collision with Enemy
Player.prototype.checkCollisions = function() {
  var len = allEnemies.length;
  for (var i = 0; i < len;  i++) {
    if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
      this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
      this.reset();
    }
  }
};