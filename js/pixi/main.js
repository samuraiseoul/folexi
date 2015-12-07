$('document').ready(function(){
    const WORDS_PER_LEVEL = 3;
    const CANVAS_HEIGHT_PERCENTAGE = 0.6;
    const ANTIALIASING = true;
    const TRANSPARENT = true;
    const MAX_LIVES = 4;
        
    var dic = null;
    var levels = [];
    var knownWords = null;
    var wave = [];
    var life = [];
    var turret = null;
    var doneInitializing = false;
    var canvas = $("#game-canvas");
    var typingArea = $("#typing-area");
    var stage = new PIXI.Container();
    var renderer = null;
    var lost = false;
    var win = false;
    var lastUpdated = null;
    var timeElapsed = null;
    
    var lang1 = 'en';
    var lang2 = 'ko';
    var wordLevel = 1;
    
    function initializeLife() {
        for(var i = 0; i < MAX_LIVES; i++) {
            life.push(new Life(stage, renderer, i));
        }
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
        initializeLife();
        
        renderer.backgroundColor = 0xFFFFFF;
        renderer.render(stage);
    }
    
    function updateEnemies() {
        for(var i = 0; i < wave.length; i++) {
            wave[i].update();
        }
    }
    
    function checkForLoss() {
        for(var i = 0; i < wave.length; i++) {
            if(!wave[i].killed && wave[i].detectHit(turret.turretBase)) {
                return true;
            }
        }
        return false;
    }
    
    function checkForWin() {
        var killed = 0;
        for(var i = 0; i < wave.length; i++) {
            if(wave[i].killed) {
                killed++;
            }
        }
        if(killed == wave.length) {
            return true;
        }
        return false;
    }
    
    function checkWordCorrect() {
        for(var i = 0; i < wave.length; i++) {
            if(wave[i].wordMatch(typingArea.val())) {
                typingArea.val("");
            }
        }
    }
    
    function showWords() {
        for(var i = 0; i < wave.length; i++) {
            wave[i].showWord = true;
        }
    }
    
    function restartLevel() {
        lost = false;
        timeElapsed = null;
        lastUpdated = null;
        for(var i = 0; i < wave.length; i++) {
            wave[i].reset();
        }
    }
    
    function loseLife() {
        var lives = 0;
        for(var i = 0; i < life.length; i++) {
            if(!life[i].lifeLost) {
                lives++;
            }
        }
        life[lives - 1].loseLife();
    }
    
    var oneTime = false;
    function update() {
        if(lost) {
            if(!oneTime) {
                loseLife();
                showWords();
                oneTime = true;
                if(lastUpdated == null){ lastUpdated = Date.now(); }
            }
            timeElapsed = (Date.now() - lastUpdated) / 1000;
            console.log(timeElapsed);
            if(timeElapsed >= 5) {
                restartLevel();
                oneTime = false;
                typingArea.val("");
            }
        } else {
            updateEnemies();
            checkWordCorrect();
            lost = checkForLoss();
            win = checkForWin();
            if(win) {
                console.log("WIN");
            }
        }
    }
    
    function drawEnemies() {
        for(var i = 0; i < wave.length; i++) {
            wave[i].draw();
        }
    }
    
    function drawLives() {
        for(var i = 0; i < life.length; i++) {
            life[i].draw();
        }
    }
    
    function draw() {
        turret.draw();
        drawEnemies();
        drawLives();
        renderer.render(stage);
    }
    
    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
    
    function focusOnTypingArea() {
        typingArea.focus();
        typingArea.keypress(function(event) {
            // prevent Enter (code = 13)
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });
    }
    
    function start() {
        initializeGameBoard();
        
        turret = new Turret(stage, renderer);
        createWave(turret);

        focusOnTypingArea();
        gameLoop();
    }
        
    function getWords(callback) {
        $.ajax({
            type: "POST",
            url: PUBLIC_URL + "dic/get",
            data: {
                lang1: lang1,
                lang2: lang2,
                level : wordLevel
            },
            success: function(json) {
                dic = json.data.dic;
                makeLevels();
                callback(start);
            },
            dataType: "json"
        });
    };
    
    function getKnownWords(callback) {
        $.ajax({
            type: "POST",
            url: PUBLIC_URL + "dic/get-known-words",
            data: {
                lang1: lang1,
                lang2: lang2
            },
            success: function(json) {
                if(json.status === "OK"){
                    knownWords = json.data;
                    callback();
                }
            },
            dataType: "json"
        });
    }
    
    function initialize() {
        getWords(getKnownWords);
    }
    
    function completedKnownWords() {
        var wordsCompleted = 0;
        for(var i = 0; i < knownWords.length; i++) {
            if(knownWords[i]['right'] >= 10) {
                wordsCompleted++;
            }
        }
        return wordsCompleted;
    }
    
    function knownWordInWave(index, level) {
        for(var i = 0; i < level.length; i++) {
            if(level[i] === knownWords[index]) {
                return true;
            }
        }
        return false;
    }
    
    function convertWordsToEnemies(level) {
        var enemies = [];
        for(var i = 0; i < level.length; i++) {
            if(typeof level[i]["word"] === undefined) {
                enemies.push(new Enemy(stage, renderer, turret, level[i]['lang1'], level[i]['lang2'], level[i]['id'], i));
                continue;
            }
            enemies.push(new Enemy(stage, renderer, turret, level[i]['word'][level[i]['lang1']], level[i]['word'][level[i]['lang2']], level[i]['word']['id'], i));
        }
        return enemies;
    }
    
    function randomKnownWords(turret) {
        var level = [];
        while(level.length != WORDS_PER_LEVEL) {
            var index = Math.ceil(((Math.random() * 10) % knownWords.length));
            if(knownWordInWave(index, level)) {
                continue;
            } else {
                level.push(knownWords[index]);
            }
        }
        return convertWordsToEnemies(level, turret);
    }
    
    function createWave(turret) {
        if((knownWords - completedKnownWords()) <= 21) {
            wave = convertWordsToEnemies(levels[knownWords / WORDS_PER_LEVEL], turret);
        } else {
        wave = randomKnownWords(turret); 
        }
    }
    
    function makeLevels() {
        var blankWords = 0;
        for(var i = 0; i < dic.length; i++) {
            //skip words that don't exist in selected languages
            if(dic[i]['lang2'] == "" || dic[i]['lang1'] == "") {
                blankWords++;
                continue;
            }
            //add array if starting a new level 
            //subtract blank word count to be sure there are no arrays of 2
            if(i == 0 || (i - blankWords) % WORDS_PER_LEVEL == 0) {
                levels.push([]);
            }
            //Math.floor forces integer division
            levels[Math.floor((i - blankWords) / WORDS_PER_LEVEL)].push(dic[i]);
        }
    }
    
    function callhook() {
        initialize();
    }
    
    callhook();
});