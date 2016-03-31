const LASER_SPEED = 7.5;
const LASER_COLOR = 0X0040ff;
const LASER_SIZE = 10;

function Laser(canvas, turret){
    this.canvas = canvas;
    this.turret = turret;
    
    this.initializeLaser();
};

Laser.prototype.initializeLaser = function() {
    this.laser = new fabric.Circle({
                radius: LASER_SIZE,
                top: this.turret.y,
                originX: 'center',
                originY: "center",
                left: (this.turret.x + this.turret.maximumRadius - (LASER_SIZE / 2)),
                fill: LASER_COLOR,
                selectable: false
    });
};

Laser.prototype.calculateYSpeed = function(enemy) {
    var distanceX = enemy.x - this.turret.x;
    var turnsToTarget = distanceX / LASER_SPEED;
    var distanceY = enemy.y - this.turret.y;
    this.ySpeed = distanceY / turnsToTarget;
}

Laser.prototype.update = function() {
    if(!this.turret.isPulsing) {
        this.laser.x += LASER_SPEED;
        this.laser.y += this.ySpeed;
    }
}

Laser.prototype.draw = function() {
    if(!this.turret.isPulsing) {
        this.drawingStage.addChild(this.laser);  
    }
};

Laser.prototype.hide = function() {
    this.drawingStage.removeChild(this.laser);
}