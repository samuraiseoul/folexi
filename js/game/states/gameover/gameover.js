const GAMEOVER_MENU_CONTAINER_LINE_COLOR = 0x000000;
const GAMEOVER_MENU_CONTAINER_LINE_WIDTH = 2;
function GameOver(drawingStage, renderer, stateManager){
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.stateManager = stateManager;
    
    this.initializeMenu();
}

GameOver.prototype.calculateCoordsAndSize = function() {
    this.x = this.renderer.width / 4;
    this.y = this.renderer.height / 3;
    this.width = this.renderer.width * .5;
    this.height = this.renderer.height * .33; 
}

GameOver.prototype.initializeContainer = function() {    
    this.container = new PIXI.Graphics();
    this.container.lineStyle(GAMEOVER_MENU_CONTAINER_LINE_WIDTH, GAMEOVER_MENU_CONTAINER_LINE_COLOR);
    this.container.drawRoundedRect(this.x, this.y, this.width, this.height, 15);
    this.container.endFill();
}

GameOver.prototype.initializeMainMenu = function() {
    //have to use cocoontext Pixi plugin for clickable text
    this.mainMenu = new PIXI.cocoontext.CocoonText("MAIN MENU", {font: "bold 4em Ariel Black, sans-serif"});
    this.mainMenu.x = (this.x + (this.width / 2) - (this.mainMenu.getBounds()['width'] / 2));
    this.mainMenu.y = (this.y + (this.container.height * .25) - (this.mainMenu.getBounds()['height'] / 2));
    //cocoon text doesn't know of this object so give it a reference
    this.mainMenu.parentState = this;
    this.mainMenu.interactive = true;
    this.mainMenu.click = function() {
        this.parentState.hide();
        this.parentState.stateManager.gameOver = false;
        this.parentState.stateManager.state = START_MENU;
    }
}

GameOver.prototype.initializeTutorial = function() {
    this.tutorial = new PIXI.cocoontext.CocoonText("TUTORIAL", {font: "bold 4em Ariel Black, sans-serif"});
    this.tutorial.x = (this.x + (this.width / 2) - (this.tutorial.getBounds()['width'] / 2));
    this.tutorial.y = (this.y + (this.container.height * .75) - (this.tutorial.getBounds()['height'] / 2));
    this.tutorial.interactive = true;
    this.tutorial.click = function(ev) {
        console.log(ev);
    }
}


GameOver.prototype.initializeMenu = function() {
    this.calculateCoordsAndSize();
    this.initializeContainer();
    this.initializeMainMenu();
    this.initializeTutorial();
};

GameOver.prototype.draw = function() {
    this.drawingStage.addChild(this.container);
    this.drawingStage.addChild(this.mainMenu);
    this.drawingStage.addChild(this.tutorial);
    this.renderer.render(this.drawingStage);
};

GameOver.prototype.hide = function() {
    this.drawingStage.removeChild(this.mainMenu);
    this.drawingStage.removeChild(this.tutorial);
    this.drawingStage.removeChild(this.container);
}