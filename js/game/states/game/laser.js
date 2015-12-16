const LASER_SPEED = 7.5;
const LASER_COLOR = 0xFF0000;
const LASER_SIZE = 10;

function Laser(drawingStage, renderer, turret){
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.turret = turret;
    
    this.initializeLaser();
};

Laser.prototype.initializeLaser = function() {
    this.laser = new PIXI.Graphics();
    this.laser.beginFill(LASER_COLOR); 
    this.laser.drawCircle(this.turret.x, this.turret.y, LASER_SIZE); // drawCircle(x, y, radius)
    this.laser.endFill();    
};

Laser.prototype.calculateYSpeed = function(enemy) {
    var distanceX = enemy.x - this.turret.x;
    var turnsToTarget = distanceX / LASER_SPEED;
    var distanceY = enemy.y - this.turret.y;
    this.ySpeed = distanceY / turnsToTarget;
}

Laser.prototype.update = function() {
    this.laser.x += LASER_SPEED;
    this.laser.y += this.ySpeed;
}

Laser.prototype.draw = function() {
    this.drawingStage.addChild(this.laser);  
};

Laser.prototype.hide = function() {
    this.drawingStage.removeChild(this.laser);
}