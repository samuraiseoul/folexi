function Lose(stateManager) {
    this.stateManager = stateManager;
    this.lastUpdated = null;
    this.timeElapsed = null;
    this.oneTime = false;
}

Lose.prototype.updateLose = function() {
    if(!this.oneTime) {
        this.stateManager.states[GAME].loseLife();
        this.stateManager.states[GAME].showWords();
        this.stateManager.states[GAME].drawGame();
        this.oneTime = true;
        if(this.lastUpdated == null){ this.lastUpdated = Date.now(); }
    }
    this.timeElapsed = (Date.now() - this.lastUpdated) / 1000;
    if(this.timeElapsed >= 1) {
        this.stateManager.states[GAME].restartLevel();
        this.oneTime = false;
        this.timeElapsed = null;
        this.lastUpdated = null;
        this.stateManager.state = ((this.stateManager.gameOver) ? GAME_OVER : GAME);
        if(this.stateManager.gameOver){
            this.stateManager.states[GAME].hide();
        }
    }
}