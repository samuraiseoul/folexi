const WORDS_PER_LEVEL = 3;
const CANVAS_HEIGHT_PERCENTAGE = 0.6;
const ANTIALIASING = true;
const TRANSPARENT = true;
const MAX_LIVES = 4;
const RIGHT_TO_KNOWN = 10;
const NEW_LEVEL_THRESHHOLD = 21;
const NUMBER_OF_QUADRANTS = 4;
const NUMBER_OF_SUBSECTIONS = 6;
const ENEMIES_PER_SECOND_MODIFIER = 4;
const EXPECTED_FPS = 60;
const SPEED_MODIFIER = 0.25;
const SPEED_LEVEL_DIVISOR = 5;
const EXTRA_WORDS_MODIFIER = 3;

const START_MENU = "start";
const INITIALIZE = "initialize";
const GAME = "game";
const PAUSE = "pause";
const LOSE = "lose";
const GAME_OVER = "over";
const WIN = "win";
const TUTORIAL = "tutorial";

const DEFAULT = {
    originX: 'center', 
    originY: 'center',
    selectable: false
}

const INTERACTABLE = {
    hasControls: false,
    hasBorders:false,
    hoverCursor: 'pointer',
    lockMovementX: true,
    lockMovementY: true,
    selectable: true
}

const FONT_STYLE = {
    fontFamily: 'Ariel Black, sans-serif',
    fontWeight: 'bold'
}
    
$('document').ready(function(){
    
    var canvas = new fabric.Canvas("game-canvas", {
        width: ($('#game-canvas').width()), 
        height: ($('#game-canvas').width() * CANVAS_HEIGHT_PERCENTAGE)
    });
    
    //extend fabric.Canvas
    canvas.removeAll = function() {
        this.forEachObject(function(obj) {
			canvas.remove(obj);
		});
    }
    
    var stateManager = new StateManager();

    function gameLoop() {
        stateManager.doState();
        requestAnimationFrame(gameLoop);
    }
    
    function callhook() {
        stateManager.initializeStates(canvas, START_MENU);
        gameLoop();
    }
    
    callhook();
    
    
    $(document).keyup(function(e){
        if(e.keyCode == 27 && (stateManager.state == PAUSE || stateManager.state == GAME)) {
            if(stateManager.state == PAUSE) {
                stateManager.state = GAME;
            } else if(stateManager.state == GAME) {
                stateManager.state = PAUSE;
            }
        }
    });
});