const TURRET_LINE_COLOR = 0x000000;
const PULSING_TURRET_LINE_COLOR = 0x0040FF;
const TURRET_FILL_COLOR = 0xFFFFFF;
const TURRET_LINE_WIDTH = 2;
const TURRET_WIDTH_MODIFIER = 0.05;
const TURRET_X_OFFSET = 0.075;

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
        originX: 'center',
        originY: "center",
        left: this.x,
        stroke: TURRET_LINE_COLOR,
        strokeWidth: TURRET_LINE_WIDTH,
        selectable: false
    });   
};

Turret.prototype.initializeTurret = function() {
    this.inializeTurretBase();
};
Turret.prototype.draw = function() {
    this.drawingStage.addChild(this.turretBase);  
};

Turret.prototype.hide = function() {
    this.drawingStage.removeChild(this.turretBase);
};