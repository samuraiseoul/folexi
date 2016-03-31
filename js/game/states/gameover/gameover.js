const GAMEOVER_MENU_CONTAINER_LINE_COLOR = 0x000000;
const GAMEOVER_MENU_CONTAINER_LINE_WIDTH = 2;
function GameOver(canvas, stateManager){
    this.canvas = canvas;
    this.stateManager = stateManager;
    
    this.initializeMenu();
}

GameOver.prototype.calculateCoordsAndSize = function() {
    this.width = this.canvas.getWidth() * .5;
    this.height = this.canvas.getHeight() * .33; 
    this.x = this.width / 4;
    this.y = this.height / 3;
}

GameOver.prototype.initializeContainer = function() {
    this.container = new fabric.Rect({
                  left: this.x,
                  top: this.y,
                  width: this.width,
                  height: this.height,
                  rx: 15,
                  ry: 15,
                  fill: 'none',
                  strokeWidth: GAMEOVER_MENU_CONTAINER_LINE_WIDTH,
                  stroke: GAMEOVER_MENU_CONTAINER_LINE_COLOR,
                  selectable: false 
    });
}

GameOver.prototype.initializeMainMenu = function() {
    this.mainMenu = new fabric.Text("MAIN MENU", {
        left: (this.x + (this.width / 2)),
        top: (this.y + (this.container.height * .25)),
        originX: 'center', 
        originY: 'center',
        hasControls: false,
        hasBorders:false,
        hoverCursor: 'pointer',
        lockMovementX: true,
        lockMovementY: true,
        fontFamily: 'Ariel Black sans-serif',
        fontSize: '4em',
        fontWeight: 'bold',
        parentContext: this
    });
    
    this.mainMenu.on("selected", function(){
        this.parentContext.hide();
        this.parentContext.stateManager.gameOver = false;
        this.parentContext.stateManager.state = START_MENU;
    });
}

GameOver.prototype.initializeTutorial = function() {
    this.tutorial = new fabric.Text("TUTORIAL", {
        left: (this.x + (this.width / 2)),
        top: (this.y + (this.container.height * .75)),
        originX: 'center', 
        originY: 'center',
        hasControls: false,
        hasBorders:false,
        hoverCursor: 'pointer',
        lockMovementX: true,
        lockMovementY: true,
        fontFamily: 'Ariel Black sans-serif',
        fontSize: '4em',
        fontWeight: 'bold',
        parentContext: this
    });
    
    this.tutorial.on("selected", function(){
        console.log("Tutorial clicked");
    });
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