const LASER_SPEED = 7.5;
const LASER_COLOR = '#0040ff';
const LASER_SIZE = 10;

function Laser(canvas, turret){
    this.canvas = canvas;
    this.turret = turret;
    
    this.initializeLaser();
};

Laser.prototype.initializeLaser = function() {
    this.laser = new fabric.Circle({
                radius: LASER_SIZE,
                top: this.turret.turretBase.top,
                originX: 'center',
                originY: "center",
                left: (this.turret.turretBase.left + this.turret.radiusMax() + LASER_SIZE),
                fill: LASER_COLOR,
                selectable: false
    });
    true;
};

Laser.prototype.calculateYSpeed = function(enemy) {
    var distanceX = enemy.x - this.laser.left;
    var turnsToTarget = distanceX / LASER_SPEED;
    var distanceY = enemy.y - this.laser.top;
    this.ySpeed = distanceY / turnsToTarget;
}

Laser.prototype.update = function() {
    if(!this.preparingToFire) {
        this.laser.left += LASER_SPEED;
        this.laser.top += this.ySpeed;
    }
}

Laser.prototype.addToCanvas = function() {
    if(!this.preparingToFire) {
        this.canvas.add(this.laser);  
    }
};