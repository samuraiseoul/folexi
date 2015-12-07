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
    //Remove magic numbers. Calculate or make constants
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

Laser.prototype.detectHit = function(enemy) {
    var laserX = this.laser.graphicsData[0].shape.x + this.laser.x;
    var laserY = this.laser.graphicsData[0].shape.y + this.laser.y;
    var laserR = this.laser.graphicsData[0].shape.radius;
    var enemyX = enemy.enemyCircle.graphicsData[0].shape.x + enemy.enemyCircle.x;
    var enemyY = enemy.enemyCircle.graphicsData[0].shape.y + enemy.enemyCircle.y;
    var enemyR = enemy.enemyCircle.graphicsData[0].shape.radius;
    
    // (((x1 - x2) ^ 2) + ((y1 - y2) ^ 2)) <= ((r1 + r2) ^ 2)
    // MAth.pow() becasue ^ is bitwise only in js
    if((Math.pow((laserX - enemyX), 2) + Math.pow((laserY - enemyY), 2)) < Math.pow((laserR + enemyR), 2)) {
        return true
    }
    return false;
}