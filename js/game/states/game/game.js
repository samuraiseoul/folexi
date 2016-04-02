function Game(canvas, stateManager) {
    this.canvas = canvas;
    this.typingArea = $("#typing-area");
    this.stateManager = stateManager;
    
    this.extraWords = 0;
    this.wordsPerSecond = 0;
    this.speedMultiplier = 1;
    this.waveSpeedMultiplier = 0;
    this.enemiesPerSecond = 0;
    this.turret = null;
    this.life = [];
}

Game.prototype.initialize = function() {
    this.turret = new Turret(this.canvas);
    this.initializeLife();
    this.createWave();
    this.focusOnTypingArea();
    this.draw();
}

Game.prototype.focusOnTypingArea = function() {
    this.typingArea.focus();
    this.typingArea.keypress(function(event) {
        // prevent Enter (code = 13)
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
}
    
Game.prototype.update = function() {
    this.updateEnemies();
    this.checkWordCorrect();
    this.checkForLoss();
    this.checkForWin();
}
    
Game.prototype.drawEnemies = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        this.stateManager.wave[i].addAllToCanvas();
    }
}
    
Game.prototype.drawLives = function() {
    for(var i = 0; i < this.life.length; i++) {
        this.life[i].addToCanvas();
    }
}
    
Game.prototype.draw = function() {
    this.canvas.removeAll();
    this.turret.addToCanvas();
    this.drawEnemies();
    this.drawLives();
}
    
    
Game.prototype.checkForLoss = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        if(!this.stateManager.wave[i].killed && this.stateManager.wave[i].detectHit(this.turret.turretBase)) {
            this.stateManager.state = LOSE;
        }
    }
}
    
Game.prototype.checkForWin = function() {
    var killed = 0;
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        if(this.stateManager.wave[i].killed) {
            killed++;
        }
    }
    if(killed == this.stateManager.wave.length) {
        this.stateManager.state = WIN;
    }
}
    
Game.prototype.checkWordCorrect = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        //laserFired check must come first to short circuit
        if(!this.stateManager.wave[i].laserFired && this.stateManager.wave[i].wordMatch(this.typingArea.val().trim())) {
            this.typingArea.val("");
            return;
        }
    }
}
    
Game.prototype.initializeLife = function() {
    this.life = [];
    for(var i = 0; i < MAX_LIVES; i++) {
        this.life.push(new Life(this.canvas, i));
    }
}
    
Game.prototype.updateEnemies = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        this.stateManager.wave[i].update();
    }
}

Game.prototype.createEnemy = function(word) {
    return new Enemy(this.canvas, this.turret, this.speedMultiplier, word);
}
    
Game.prototype.addLevelToWave = function() {
    if(this.stateManager.activeKnownWords.length <= NEW_LEVEL_THRESHHOLD) {
        for(var i = 0; i < this.stateManager.levels[this.stateManager.level].length; i++) {
            this.stateManager.wave.push(this.createEnemy(this.stateManager.levels[this.stateManager.level][i]));
        }
        this.stateManager.addNewWordsToArea();
        this.stateManager.addedLevel = true;
    } else {
        this.extraWords += WORDS_PER_LEVEL;
    }
}
    
Game.prototype.addExtraWordsToWave = function() {
    for(var i = 0; i < this.extraWords; i++) {
        this.stateManager.wave.push(this.createEnemy(this.stateManager.activeKnownWords[Math.floor(Math.random() * this.stateManager.activeKnownWords.length)]));
    }
}
    
Game.prototype.calculateYOffsets = function() {
    var quadrantHeight = this.canvas.getHeight() / NUMBER_OF_QUADRANTS;
    var subSectionHeight = quadrantHeight / NUMBER_OF_SUBSECTIONS;
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        var quadrant = Math.floor(Math.random() * NUMBER_OF_QUADRANTS);
        var subSection = Math.floor(Math.random() * NUMBER_OF_SUBSECTIONS);
        this.stateManager.wave[i].setYOffset((quadrantHeight * quadrant) + (subSectionHeight * subSection));
    }
}
    
Game.prototype.calculateEnemiesPerSecond = function() {
    this.enemiesPerSecond = Math.floor(this.stateManager.wavesCompleted / ENEMIES_PER_SECOND_MODIFIER) + 1;
}
    
Game.prototype.calculateXOffsets = function() {
    this.calculateEnemiesPerSecond();
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        this.stateManager.wave[i].setXOffset((i / this.enemiesPerSecond), EXPECTED_FPS);
    }
}
    
Game.prototype.calculateEnemyOffsets = function() {
    this.calculateYOffsets();
    this.calculateXOffsets();
}
    
Game.prototype.calculateLevel = function() {
    this.stateManager.level = Math.floor(this.stateManager.activeKnownWords.length / WORDS_PER_LEVEL);
}
    
Game.prototype.initializeWave = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        this.stateManager.wave[i].initialize();
    }
}
    
Game.prototype.calculateSpeedMultiplier = function() {
    this.speedMultiplier = (Math.floor(this.stateManager.wavesCompleted / SPEED_LEVEL_DIVISOR) * SPEED_MODIFIER) + 1;
}
    
Game.prototype.calculateExtraWords = function() {
    this.extraWords = this.stateManager.wavesCompleted + Math.floor(this.stateManager.wavesCompleted / EXTRA_WORDS_MODIFIER);
}
    
Game.prototype.createWave = function() {
    this.stateManager.wave = [];
    this.calculateLevel();
    this.calculateSpeedMultiplier();
    this.calculateExtraWords();
    this.addLevelToWave();
    this.addExtraWordsToWave();
    this.calculateEnemyOffsets();
    this.initializeWave();
}

Game.prototype.restartLevel = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        this.stateManager.wave[i].reset();
    }
    this.typingArea.val("");
    this.draw();
}

Game.prototype.showWords = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        this.stateManager.wave[i].showWord = true;
    }
}

Game.prototype.loseLife = function() {
    var lives = 0;
    for(var i = 0; i < this.life.length; i++) {
        if(!this.life[i].lifeLost) {
            lives++;
        }
    }
    this.life[lives - 1].loseLife();
    if((lives - 1) == 0) {
        this.stateManager.gameOver = true;
    }
}

Game.prototype.hide = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        this.stateManager.wave[i].hide();
    }
    for(var i = 0; i < this.life.length; i++) {
        this.life[i].hide();
    }
    this.turret.hide();
    this.renderer.render(this.drawingStage);
}