const SELECT_LINE_COLOR = 0x000000;
const SELECT_LINE_WIDTH = 2;
const SELECT_CORNER_ROUNDNESS = 10;

function Select(drawingStage, renderer, options) {
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.options = options;
    
    this.value = "";
}

Select.prototype.initialize = function(x, y, width, height, startingOption) {
    var tempContainer = new PIXI.Graphics();
    tempContainer.lineStyle(SELECT_LINE_WIDTH, SELECT_LINE_COLOR);
    tempContainer.drawRoundedRect(x, y, width, height, SELECT_CORNER_ROUNDNESS);
    tempContainer.endFill();
    //Graphic has be made a sprite to be clickable
    this.container = new PIXI.Sprite(tempContainer.generateTexture());
    //force garbage collection
    tempContainer.destroy();
    this.container.x = x;
    this.container.y = y;
    this.container.interactive = true;
    this.container.click = function(ev) {
        console.log(ev);
    }
    
    this.text = new PIXI.Text(this.options[startingOption], {});
    this.text.x = x + (width / 2) - (this.text.getBounds()['width'] /2);
    this.text.y = y + (height / 2) - (this.text.getBounds()['height'] /2);
    
    this.value = startingOption;
}

Select.prototype.draw = function() {
    this.drawingStage.addChild(this.container);
    this.drawingStage.addChild(this.text);
}

Select.prototype.hide = function() {
    this.drawingStage.removeChild(this.container);
    this.drawingStage.removeChild(this.text);
}