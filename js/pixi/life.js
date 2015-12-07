const LIFE_LINE_COLOR = 0x00CD00;
const LIFE_FILL_COLOR = 0x00CD00;
const LIFE_LINE_WIDTH = 1;
const LIFE_WIDTH_MODIFIER = 0.01;
const LIFE_Y_OFFSET_MODIFIER = 0.075;
const LIFE_X_OFFSET_MODIFIER = 0.04;

function Life(drawingStage, renderer, xOffset){
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.xOffset = xOffset;
    this.lifeLost = false;
    
    // this.x = (this.renderer.width * TURRET_X_OFFSET);
    this.x = (this.renderer.width * LIFE_X_OFFSET_MODIFIER);
    this.y = (this.renderer.height * LIFE_X_OFFSET_MODIFIER);
    this.radius = (this.renderer.width * LIFE_WIDTH_MODIFIER);
    
    this.initializeLife();
};

Life.prototype.inializeLifeBase = function() {
    this.life = new PIXI.Graphics();
    this.life.beginFill(LIFE_FILL_COLOR); 
    this.life.drawCircle(this.x + (this.xOffset * (3 * this.radius)), this.y, this.radius); // drawCircle(x, y, radius)
    this.life.endFill();    
};

Life.prototype.initializeLife = function() {
    this.inializeLifeBase();
};

Life.prototype.draw = function() {
    this.drawingStage.addChild(this.life);  
};

Life.prototype.loseLife = function() {
    this.lifeLost = true;
    this.drawingStage.removeChild(this.life);
    this.life.destroy();
    this.life = new PIXI.Graphics();
    this.life.lineStyle(LIFE_LINE_WIDTH, LIFE_LINE_COLOR); //has to come before fill
    this.life.drawCircle(this.x + (this.xOffset * (3 * this.radius)), this.y, this.radius); // drawCircle(x, y, radius)
    this.life.endFill();    
}