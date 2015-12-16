const TURRET_LINE_COLOR = 0x000000;
const TURRET_FILL_COLOR = 0xFFFFFF;
const TURRET_LINE_WIDTH = 2;
const TURRET_WIDTH_MODIFIER = 0.05;
const TURRET_X_OFFSET = 0.075;

function Turret(drawingStage, renderer){
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    
    this.x = (this.renderer.width * TURRET_X_OFFSET);
    this.y = (this.renderer.height / 2);
    this.radius = (this.renderer.width * TURRET_WIDTH_MODIFIER);
    
    this.initializeTurret();
};

Turret.prototype.inializeTurretBase = function() {
    this.turretBase = new PIXI.Graphics();
    this.turretBase.lineStyle(TURRET_LINE_WIDTH, TURRET_LINE_COLOR); //has to come before fill
    this.turretBase.beginFill(TURRET_FILL_COLOR); 
    this.turretBase.drawCircle(this.x, this.y, this.radius); // drawCircle(x, y, radius)
    this.turretBase.endFill();    
};

Turret.prototype.initializeTurret = function() {
    this.inializeTurretBase();
};

Turret.prototype.draw = function() {
    this.drawingStage.addChild(this.turretBase);  
};

Turret.prototype.hide = function() {
    this.drawingStage.removeChild(this.turretBase);
}