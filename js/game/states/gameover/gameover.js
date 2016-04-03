const GAMEOVER_MENU_CONTAINER_LINE_COLOR = '#000000';
const GAMEOVER_MENU_CONTAINER_LINE_WIDTH = 2;
function GameOver(canvas, stateManager){
    this.canvas = canvas;
    this.stateManager = stateManager;
    
    this.initializeMenu();
}

GameOver.prototype.calculateCoordsAndSize = function() {
    this.width = this.canvas.getWidth() * .5;
    this.height = this.canvas.getHeight() * .33; 
    this.x = this.canvas.getWidth() / 2;
    this.y = this.canvas.getHeight() / 2;
}

GameOver.prototype.initializeContainer = function() {
    this.container = new fabric.Rect({
        left: this.x,
        top: this.y,
        width: this.width,
        height: this.height,
        rx: 15,
        ry: 15,
        fill: 'white',
        strokeWidth: GAMEOVER_MENU_CONTAINER_LINE_WIDTH,
        stroke: GAMEOVER_MENU_CONTAINER_LINE_COLOR
    });
    this.container.set(DEFAULT);
}

GameOver.prototype.initializeGameOver = function() {
    this.gameOver = new fabric.Text("GAME OVER!", {
        left: this.x,
        top: (this.canvas.getHeight() * .17),
        fontSize: '86',
    });
    this.gameOver.set(DEFAULT);
    this.gameOver.set(FONT_STYLE);
}

GameOver.prototype.initializeMainMenu = function() {
    this.mainMenu = new fabric.Text("MAIN MENU", {
        left: this.x,
        top: (this.y - (this.container.height * .25)),
        fontSize: '40',
        parentContext: this
    });
    this.mainMenu.set(DEFAULT);
    this.mainMenu.set(FONT_STYLE);
    this.mainMenu.set(INTERACTABLE);
    
    this.mainMenu.on("selected", function(){
        // this.parentContext.hide();
        this.parentContext.stateManager.gameOver = false;
        this.parentContext.stateManager.state = START_MENU;
    });
}

GameOver.prototype.initializeTutorial = function() {
    this.tutorial = new fabric.Text("TUTORIAL", {
        left: this.x,
        top: (this.y + (this.container.height * .25)),
        fontSize: '40',
        parentContext: this
    });
    this.tutorial.set(DEFAULT);
    this.tutorial.set(FONT_STYLE);
    this.tutorial.set(INTERACTABLE);
    
    this.tutorial.on("selected", function(){
        console.log("Tutorial clicked");
    });
}


GameOver.prototype.initializeMenu = function() {
    this.calculateCoordsAndSize();
    this.initializeContainer();
    this.initializeGameOver()
    this.initializeMainMenu();
    this.initializeTutorial();
};

GameOver.prototype.draw = function() {
    this.canvas.removeAll();
    this.canvas.add(this.container);
    this.canvas.add(this.gameOver);
    this.canvas.add(this.mainMenu);
    this.canvas.add(this.tutorial);
};