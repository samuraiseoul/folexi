function StateManager() {
    this.state = ''
    this.states = {};
    
    
    this.dic = null;
    this.levels = [];
    this.knownWords = null;
    this.activeKnownWords = [];
    this.level = 0;
    this.wave = [];
    this.wavesCompleted = 0;
    
    this.lang1 = '';
    this.lang2 = '';
    this.wordLevel = 1;
    this.addedLevel = false;
    this.gameOver = false;
}

StateManager.prototype.doState = function() {
    switch(this.state) {
        case START_MENU:
            this.states[START_MENU].draw();
            break;
        case INITIALIZE:
            this.states[INITIALIZE].initialize();
            break;
        case GAME:
            this.states[GAME].updateGame();
            this.states[GAME].drawGame();
            break;
        case PAUSE:
            this.states[PAUSE].draw();
            break;
        case LOSE:
            this.states[LOSE].updateLose();
            break;
        case GAME_OVER:
            this.states[GAME_OVER].draw();
            break;
        case WIN:
            this.states[WIN].win();
            break;
        case TUTORIAL:
            tutorial();
            break;
        default:
            console.log("UNKOWN GAME STATE: " + this.state);
    }
}

StateManager.prototype.initializeStates = function(stage, renderer, startingState) {
    this.states[START_MENU] = new StartMenu(stage, renderer, this);
    this.states[INITIALIZE] = new Initialize(this);
    this.states[GAME] = new Game(stage, renderer, this);
    this.states[WIN] = new Win(this);
    this.states[LOSE] = new Lose(this);
    this.states[GAME_OVER] = new GameOver(stage, renderer, this);
    this.states[PAUSE] = new Pause(stage, renderer, this);
    this.states[TUTORIAL] = new Tutorial(stage, renderer, this);
    
    this.state = startingState;
}