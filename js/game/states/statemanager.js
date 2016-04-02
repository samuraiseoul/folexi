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
    this.menuOpened = false;
    this.wordLevel = 1;
    this.addedLevel = false;
    this.gameOver = false;
    this.oldArea = $('#old_area');
    this.newArea = $('#new_area');
}

StateManager.prototype.doState = function() {
    switch(this.state) {
        case START_MENU:
            this.states[START_MENU].draw();
            break;
        case INITIALIZE:
            this.states[INITIALIZE].initialize();
            this.states[INITIALIZE].draw();
            break;
        case GAME:
            this.states[GAME].update();
            this.states[GAME].draw();
            break;
        case PAUSE:
            this.states[PAUSE].draw();
            break;
        case LOSE:
            this.states[LOSE].update();
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

StateManager.prototype.initializeStates = function(canvas, startingState) {
    this.states[START_MENU] = new StartMenu(canvas, this);
    this.states[INITIALIZE] = new Initialize(canvas, this);
    this.states[GAME] = new Game(canvas, this);
    this.states[WIN] = new Win(this);
    this.states[LOSE] = new Lose(this);
    this.states[GAME_OVER] = new GameOver(canvas, this);
    this.states[PAUSE] = new Pause(canvas, this);
    this.states[TUTORIAL] = new Tutorial(canvas, this);
    
    this.state = startingState;
}



StateManager.prototype.addActiveWordsToArea = function() {
    this.oldArea.html("");
    for(var i = 0; i < this.activeKnownWords.length; i++) {
        this.oldArea.append("<div class='col_3'>" + this.activeKnownWords[i]['word'][this.lang1] + "</div>");
    }
    for(var i = 0; i < $('#old_area div.col_3').length; i+=4) {
        $('#old_area div.col_3').slice(i, i+4).wrapAll("<div class='row'></div>");    
    }
}

StateManager.prototype.clearNewWords = function() {
    this.newArea.html("");
}

StateManager.prototype.addNewWordsToArea = function() {
    this.clearNewWords();
    for(var i = 0; i < this.levels[this.level].length; i++) {
        this.newArea.append(this.levels[this.level][i]['word'][this.lang1] + " ");
    }
}