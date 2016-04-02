const LIFE_LINE_COLOR = '#00CD00';
const LIFE_FILL_COLOR = '#00CD00';
const LIFE_LINE_WIDTH = 1;
const LIFE_WIDTH_MODIFIER = 0.01;
const LIFE_Y_OFFSET_MODIFIER = 0.075;
const LIFE_X_OFFSET_MODIFIER = 0.04;

function Life(canvas, xOffset){
    this.canvas = canvas;
    this.xOffset = xOffset;
    this.lifeLost = false;
    
    this.x = (this.canvas.getWidth() * LIFE_X_OFFSET_MODIFIER);
    this.y = (this.canvas.getHeight() * LIFE_Y_OFFSET_MODIFIER);
    this.radius = (this.canvas.getWidth() * LIFE_WIDTH_MODIFIER);
    
    this.initializeLife();
};

Life.prototype.inializeLifeBase = function() {
    this.life = new fabric.Circle({
        radius: this.radius,
        top: this.y,
        originX: 'center',
        originY: "center",
        left: (this.x + (this.xOffset * (3 * this.radius))),
        stroke: LIFE_LINE_COLOR,
        strokeWidth: LIFE_LINE_WIDTH,
        fill: LIFE_FILL_COLOR,
        selectable: false
    });
};

Life.prototype.initializeLife = function() {
    this.inializeLifeBase();
};

Life.prototype.addToCanvas = function() {
    this.canvas.add(this.life);  
};

Life.prototype.disappear = function() {
    //this.life refers to the object which is passed in the animate function
    this.life.life.fill = "white";
    this.life.reappear();
}

Life.prototype.reappear = function() {
      this.life.animate('radius', this.radius, {
            duration: 1000,
            onChange: this.canvas.renderAll.bind(this.canvas)
      });
}

Life.prototype.loseLife = function() {
    this.life.animate('radius', '0', {
      onChange: this.canvas.renderAll.bind(this.canvas),
      duration: 500,
      life: this,
      onComplete: this.disappear
    });
    
    this.lifeLost = true;
}