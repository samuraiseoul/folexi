function Win(stateManager) {
    this.stateManager = stateManager;
}

Win.prototype.addLevelToKnownWords = function() {
    if(this.stateManager.addedLevel) {
        for(var i = 0; i < this.stateManager.levels[this.stateManager.level].length; i++) {
            this.stateManager.levels[this.stateManager.level][i]['id'] = null;
            this.stateManager.levels[this.stateManager.level][i]['right'] = 0;
            this.stateManager.knownWords.push(this.stateManager.levels[this.stateManager.level][i]);
            this.stateManager.activeKnownWords.push(this.stateManager.levels[this.stateManager.level][i]);
        }
    }
    this.stateManager.addedLevel = false;
}

Win.prototype.incrementWordsRight = function() {
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        for(var j = 0; j < this.stateManager.activeKnownWords.length; j++) {
            if(this.stateManager.wave[i]['word']['id'] == this.stateManager.activeKnownWords[j]['word']['id']) {
                this.stateManager.activeKnownWords[j]['right']++;
            }
        }
    }
    for(var i = 0; i < this.stateManager.wave.length; i++) {
        for(var j = 0; j < this.stateManager.knownWords.length; j++) {
            if(this.stateManager.wave[i]['word']['id'] == this.stateManager.knownWords[j]['word']['id']) {
                this.stateManager.knownWords[j]['right']++;
            }
        }
    }
}

Win.prototype.sendWords = function() {
    $.ajax({
        type: "POST",
        url: PUBLIC_URL + 'dic/add-words',
        data: {lang1: this.stateManager.lang1,
            lang2: this.stateManager.lang2,
            words: this.stateManager.activeKnownWords},
        success: function(json) {
            console.log(json);
        },
        dataType: "json"
    });
}

Win.prototype.win = function() {
    this.addLevelToKnownWords();
    this.incrementWordsRight();
    this.sendWords();
    this.stateManager.addActiveWordsToArea();
    this.stateManager.clearNewWords();
    this.stateManager.wavesCompleted++;
    this.stateManager.states[GAME].createWave();
    this.stateManager.states[GAME].draw();
    this.stateManager.state = GAME;
}