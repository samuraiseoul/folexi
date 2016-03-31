const LIFE_LINE_COLOR = 0x00CD00;
const LIFE_FILL_COLOR = 0x00CD00;
const LIFE_LINE_WIDTH = 1;
const LIFE_WIDTH_MODIFIER = 0.01;
const LIFE_Y_OFFSET_MODIFIER = 0.075;
const LIFE_X_OFFSET_MODIFIER = 0.04;

function Life(canvas, xOffset){
    this.canvas = canvas;
    this.xOffset = xOffset;
    this.lifeLost = false;
    
    this.x = (this.canvas.getWidth() * LIFE_X_OFFSET_MODIFIER);
    this.y = (this.canvas.getHeight() * LIFE_X_OFFSET_MODIFIER);
    this.radius = (this.canvas.getWidth() * LIFE_WIDTH_MODIFIER);
    
    this.initializeLife();
};

Life.prototype.inializeLifeBase = function() {
    this.life = new fabric.Circle({
        radius: this.radius,
        top: this.y,
        originX: 'center',
        originY: "center",
        left: this.x,
        stroke: LIFE_LINE_COLOR,
        strokeWidth: LIFE_LINE_WIDTH,
        fill: LIFE_FILL_COLOR,
        selectable: false
    });
};

Life.prototype.initializeLife = function() {
    this.inializeLifeBase();
};

Life.prototype.draw = function() {
    this.drawingStage.addChild(this.life);  
};

Life.prototype.loseLife = function() {
    this.life.set({
        fill: 'none'
    });
    
    this.lifeLost = true;
}

Life.prototype.hide = function() {
    this.drawingStage.removeChild(this.life);
}