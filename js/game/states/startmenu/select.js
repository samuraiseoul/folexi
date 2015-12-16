const SELECT_LINE_COLOR = 0x000000;
const SELECT_LINE_WIDTH = 2;
const SELECT_CORNER_ROUNDNESS = 10;
const SELECT_MENU_FILL_COLOR = 0xFFFFFF;

function Select(drawingStage, renderer, options, parentContainer) {
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.options = options;
    this.setOptionsSize();
    this.parentContainer = parentContainer;
    this.menuOpened = false;
    
    this.value = "";
}

Select.prototype.intializeContainer = function(x, y, width, height) {
    var tempContainer = new PIXI.Graphics();
    tempContainer.lineStyle(SELECT_LINE_WIDTH, SELECT_LINE_COLOR);
    tempContainer.drawRoundedRect(x, y, width, height, SELECT_CORNER_ROUNDNESS);
    tempContainer.endFill();
    //Graphic has be made a sprite to be clickable
    this.container = new PIXI.Sprite(tempContainer.generateTexture());
    //force garbage collection
    tempContainer.destroy();
    this.container.parentContext = this;
    this.container.x = x;
    this.container.y = y;
    this.container.interactive = true;
    this.container.click = function(ev) {
        this.parentContext.openMenu();
    }
}

Select.prototype.initializeText = function(x, y, width, height, startingOption) {
    this.text = new PIXI.Text(this.options[startingOption], {});
    this.text.x = x + (width / 2) - (this.text.getBounds()['width'] / 2);
    this.text.y = y + (height / 2) - (this.text.getBounds()['height'] / 2);
}

Select.prototype.initializeSelectMenu = function() {
    this.selectMenu = new PIXI.Graphics();
    this.selectMenu.beginFill(SELECT_MENU_FILL_COLOR);
    this.selectMenu.lineStyle(SELECT_LINE_WIDTH, SELECT_LINE_COLOR);
    this.selectMenu.drawRoundedRect(this.parentContainer.graphicsData[0].shape.x, this.parentContainer.graphicsData[0].shape.y, this.parentContainer.width, this.parentContainer.height, SELECT_CORNER_ROUNDNESS);
    this.selectMenu.endFill();
}

Select.prototype.setOptionsSize = function() {
    this.optionsSize = 0;
    for(var k in this.options) {
        this.optionsSize++;
    }
}

Select.prototype.initializeOptionTexts = function() {
    this.optionTexts = [];
    var i = 0;
    var selectMenuWidth = this.selectMenu.getBounds()['width'];
    var selectMenuHeight = this.selectMenu.getBounds()['height'];
    var selectMenuX = this.selectMenu.graphicsData[0].shape.x;
    var selectMenuY = this.selectMenu.graphicsData[0].shape.y;
    for(var key in this.options) {
        this.optionTexts.push(new PIXI.cocoontext.CocoonText(this.options[key], {font: "bold 4em Ariel Black, sans-serif"}));
        this.optionTexts[i].parentContext = this;
        this.optionTexts[i].optionValue = key;
        this.optionTexts[i].x = (selectMenuWidth * ((i < (this.optionsSize / 2)) ? .25 : .75)) + selectMenuX - (this.optionTexts[i].getBounds()['width'] / 2);
        this.optionTexts[i].y = ((((i < (this.optionsSize / 2)) ? i : (i - (this.optionsSize / 2))) + 1) * (selectMenuHeight / (this.optionsSize / 2))) - (selectMenuHeight / (this.optionsSize)) + selectMenuY - (this.optionTexts[i].getBounds()['height'] / 2);
        this.optionTexts[i].interactive = true;
        this.optionTexts[i].click = function() {
            this.parentContext.value = this.optionValue;
            this.parentContext.updateSelectText();
            this.parentContext.hideMenu();
            this.parentContext.menuOpened = false;
        }
        i++;
    }
}

Select.prototype.initialize = function(x, y, width, height, startingOption) {
    this.intializeContainer(x, y, width, height);
    this.initializeText(x, y, width, height, startingOption);
    this.value = startingOption;
    this.initializeSelectMenu();
    this.initializeOptionTexts();
}

Select.prototype.updateSelectText = function() {    
    this.drawingStage.removeChild(this.text);
    this.text.destroy();
    this.text = new PIXI.Text(this.options[this.value], {});
    this.text.x = this.container.x + (this.container.getBounds()['width'] / 2) - (this.text.getBounds()['width'] /2);
    this.text.y = this.container.y + (this.container.getBounds()['height'] / 2) - (this.text.getBounds()['height'] /2);
}

Select.prototype.openMenu = function() {
    this.menuOpened = true;
}

Select.prototype.hideMenu = function() {
    this.drawingStage.removeChild(this.selectMenu);
    for(var i = 0; i < this.optionTexts.length; i++) {
        this.drawingStage.removeChild(this.optionTexts[i]);
    }
}

Select.prototype.draw = function() {
    if(this.menuOpened) {
        this.drawingStage.addChild(this.selectMenu);
        for(var i = 0; i < this.optionTexts.length; i++) {
            this.drawingStage.addChild(this.optionTexts[i]);
        }
    } else {
        this.drawingStage.addChild(this.container);
        this.drawingStage.addChild(this.text);
    }
}

Select.prototype.hide = function() {
    this.drawingStage.removeChild(this.container);
    this.drawingStage.removeChild(this.text);
}