const PAUSE_MENU_CONTAINER_LINE_COLOR = '#000000';
const PAUSE_MENU_CONTAINER_LINE_WIDTH = 2;
function Pause(canvas, stateManager){
    this.canvas = canvas;
    this.stateManager = stateManager;
    
    this.initializeMenu();
}

Pause.prototype.calculateCoordsAndSize = function() {
    this.width = this.canvas.getWidth() * .5;
    this.height = this.canvas.getHeight() * .33; 
    this.x = this.canvas.getWidth() / 4;
    this.y = this.canvas.getHeight() / 3;
}

Pause.prototype.initializeContainer = function() {    
    this.container = new fabric.Rect({
                  left: this.x,
                  top: this.y,
                  width: this.width,
                  height: this.height,
                  rx: 15,
                  ry: 15,
                  fill: 'white',
                  strokeWidth: PAUSE_MENU_CONTAINER_LINE_WIDTH,
                  stroke: PAUSE_MENU_CONTAINER_LINE_COLOR,
                  selectable: false 
    });
}

Pause.prototype.initializeRestartLevel = function() {
    this.restartLevel = new fabric.Text("RESTART LEVEL", {
        left: (this.x + (this.width / 2)),
        top: (this.y + (this.container.height * .25)),
        originX: 'center', 
        originY: 'center',
        hasControls: false,
        hasBorders:false,
        hoverCursor: 'pointer',
        lockMovementX: true,
        lockMovementY: true,
        fontFamily: 'Ariel Black, sans-serif',
        fontSize: '40',
        fontWeight: 'bold',
        parentContext: this
    });
    
    this.restartLevel.on("selected", function(){
        this.parentContext.stateManager.states[GAME].restartLevel();
        this.parentContext.stateManager.state = GAME;
    });
}

Pause.prototype.initializeTutorial = function() {
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
        fontFamily: 'Ariel Black, sans-serif',
        fontSize: '40',
        fontWeight: 'bold',
        parentContext: this
    });
    
    this.tutorial.on("selected", function(){
        console.log("Tutorial clicked");
    });
}


Pause.prototype.initializeMenu = function() {
    this.calculateCoordsAndSize();
    this.initializeContainer();
    this.initializeRestartLevel();
    this.initializeTutorial();
};

Pause.prototype.draw = function() {
    this.canvas.removeAll();
    this.canvas.add(this.container);
    this.canvas.add(this.restartLevel);
    this.canvas.add(this.tutorial);
};