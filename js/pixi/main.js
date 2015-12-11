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
    
$('document').ready(function(){

    
    var canvas = $("#game-canvas");
    var stage = new PIXI.Container();
    var renderer = null;
    var stateManager = new StateManager();

    function gameLoop() {
        stateManager.doState();
        requestAnimationFrame(gameLoop);
    }
    
    function initializeGameBoard() {
        canvas.height(canvas.width() * CANVAS_HEIGHT_PERCENTAGE);
        renderer = PIXI.autoDetectRenderer(
            canvas.width(),
            canvas.height(),
            {view:document.getElementById("game-canvas")},
            TRANSPARENT,
            ANTIALIASING
        );
        // initializeLife();
        
        renderer.backgroundColor = 0xFFFFFF;
        renderer.render(stage);
    }
    
    function callhook() {
        initializeGameBoard();
        stateManager.initializeStates(stage, renderer, START_MENU);
        gameLoop();
    }
    
    callhook();
    
    
    $(document).keyup(function(e){
        if(e.keyCode == 27 && (stateManager.state == PAUSE || stateManager.state == GAME)) {
            if(stateManager.state == PAUSE) {
                stateManager.states[PAUSE].hide();
                stateManager.state = GAME;
            } else if(stateManager.state == GAME) {
                stateManager.state = PAUSE;
            }
        }
    });
});