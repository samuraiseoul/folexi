const PAUSE_MENU_CONTAINER_LINE_COLOR = 0x000000;
const PAUSE_MENU_CONTAINER_LINE_WIDTH = 2;
function Pause(drawingStage, renderer, stateManager){
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.stateManager = stateManager;
    
    this.initializeMenu();
}

Pause.prototype.calculateCoordsAndSize = function() {
    this.x = this.renderer.width / 4;
    this.y = this.renderer.height / 3;
    this.width = this.renderer.width * .5;
    this.height = this.renderer.height * .33; 
}

Pause.prototype.initializeContainer = function() {    
    this.container = new PIXI.Graphics();
    this.container.lineStyle(PAUSE_MENU_CONTAINER_LINE_WIDTH, PAUSE_MENU_CONTAINER_LINE_COLOR);
    this.container.drawRoundedRect(this.x, this.y, this.width, this.height, 15);
    this.container.endFill();
    this.drawingStage.addChild(this.container);
}

Pause.prototype.initializeRestartLevel = function() {
    //have to use cocoontext Pixi plugin for clickable text
    this.restartLevel = new PIXI.cocoontext.CocoonText("RESTART LEVEL", {font: "bold 4em Ariel Black, sans-serif"});
    this.restartLevel.x = (this.x + (this.width / 2) - (this.restartLevel.getBounds()['width'] / 2));
    this.restartLevel.y = (this.y + (this.container.height * .25) - (this.restartLevel.getBounds()['height'] / 2));
    //cocoon text doesn't know of this object so give it a referencethis.restartLevel.parentState = this;
    this.restartLevel.parentState = this;
    this.restartLevel.interactive = true;
    this.restartLevel.click = function() {
        this.parentState.stateManager.states[GAME].restartLevel();
        this.parentState.hide();
        this.parentState.stateManager.state = GAME;
    }
}

Pause.prototype.initializeTutorial = function() {
    this.tutorial = new PIXI.cocoontext.CocoonText("TUTORIAL", {font: "bold 4em Ariel Black, sans-serif"});
    this.tutorial.x = (this.x + (this.width / 2) - (this.tutorial.getBounds()['width'] / 2));
    this.tutorial.y = (this.y + (this.container.height * .75) - (this.tutorial.getBounds()['height'] / 2));
    this.tutorial.interactive = true;
    this.tutorial.click = function(ev) {
        console.log(ev);
    }
}


Pause.prototype.initializeMenu = function() {
    this.calculateCoordsAndSize();
    this.initializeContainer();
    this.initializeRestartLevel();
    this.initializeTutorial();
    this.hide();
};

Pause.prototype.draw = function() {
    this.drawingStage.addChild(this.container);
    this.drawingStage.addChild(this.restartLevel);
    this.drawingStage.addChild(this.tutorial);
    this.renderer.render(this.drawingStage);
};

Pause.prototype.hide = function() {
    this.drawingStage.removeChild(this.restartLevel);
    this.drawingStage.removeChild(this.tutorial);
    this.drawingStage.removeChild(this.container);
}