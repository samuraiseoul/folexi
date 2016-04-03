const TURRET_LINE_COLOR = 'black';
const PULSING_TURRET_LINE_COLOR = '#0040FF';
const TURRET_FILL_COLOR = 0xFFFFFF;
const TURRET_LINE_WIDTH = 2;
const TURRET_WIDTH_MODIFIER = 0.05;
const TURRET_X_OFFSET = 0.075;
const PULSE_LIMIT_MULTIPLIER = 1.25;

function Turret(canvas){
    this.canvas = canvas
    
    this.x = (this.canvas.getWidth() * TURRET_X_OFFSET);
    this.y = (this.canvas.getHeight() / 2);
    this.radius = (this.canvas.getWidth() * TURRET_WIDTH_MODIFIER);
    
    this.initializeTurret();
};

Turret.prototype.inializeTurretBase = function() {
    this.turretBase = new fabric.Circle({
        radius: this.radius,
        top: this.y,
        left: this.x,
        fill: "white",
        stroke: TURRET_LINE_COLOR,
        strokeWidth: TURRET_LINE_WIDTH,
    });   
    this.turretBase.set(DEFAULT);
};

Turret.prototype.radiusMax = function() {
    return (this.radius * PULSE_LIMIT_MULTIPLIER);
}

Turret.prototype.initializeTurret = function() {
    this.inializeTurretBase();
};
Turret.prototype.addToCanvas = function() {
    this.canvas.add(this.turretBase);  
};

Turret.prototype.finishPulse = function(laser) {
    laser.preparingToFire = false;
    laser.addToCanvas();
    this.turretBase.animate('radius', this.radius, {
        duration: 500,
        onChange: this.canvas.renderAll.bind(this.canvas),
        laser: laser
    });
}

Turret.prototype.pulse = function(laser) {
    laser.preparingToFire = true;
    this.turretBase.set({stroke: PULSING_TURRET_LINE_COLOR});
    this.turretBase.animate('radius', (this.turretBase.radius * PULSE_LIMIT_MULTIPLIER), {
        onChange: this.canvas.renderAll.bind(this.canvas), 
        duration: 500,
        turret: this,
        laser: laser,
        onComplete: function() {
            this.turret.turretBase.set({stroke: TURRET_LINE_COLOR})
            this.turret.finishPulse(this.laser);
        }
    });
};