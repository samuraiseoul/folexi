$('document').ready(function(){
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
        
    var dic = null;
    var levels = [];
    var knownWords = null;
    var activeKnownWords = [];
    var wave = [];
    var addedLevel = false;
    var level = 0;
    var extraWords = 0;
    var wordsPerSecond = 0;
    var speedMultiplier = 1;
    var waveSpeedMultiplier = 0;
    var wavesCompleted = 0;
    var enemiesPerSecond = 0;
    var life = [];
    var turret = null;
    var doneInitializing = false;
    var canvas = $("#game-canvas");
    var typingArea = $("#typing-area");
    var stage = new PIXI.Container();
    var renderer = null;
    var lost = false;
    var hasWon = false;
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
            //laserFired check must come first to short circuit
            if(!wave[i].laserFired && wave[i].wordMatch(typingArea.val())) {
                typingArea.val("");
                return;
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
    
    function addLevelToKnownWords() {
        if(addedLevel) {
            for(var i = 0; i < levels[level].length; i++) {
                levels[level][i]['id'] = null;
                levels[level][i]['right'] = 0;
                knownWords.push(levels[level][i]);
                activeKnownWords.push(levels[level][i]);
            }
        }
        addedLevel = false;
    }
    
    function incrementWordsRight() {
        for(var i = 0; i < wave.length; i++) {
            for(var j = 0; j < activeKnownWords.length; j++) {
                if(wave[i]['word']['id'] == activeKnownWords[j]['word']['id']) {
                    activeKnownWords[j]['right']++;
                }
            }
        }
        for(var i = 0; i < wave.length; i++) {
            for(var j = 0; j < knownWords.length; j++) {
                if(wave[i]['word']['id'] == knownWords[j]['word']['id']) {
                    knownWords[j]['right']++;
                }
            }
        }
    }
    
    function sendWords() {
        $.ajax({
            type: "POST",
            url: PUBLIC_URL + 'dic/add-words',
            data: {lang1: lang1,
                lang2: lang2,
                words: activeKnownWords},
            success: function(json) {
                console.log(json);
            },
            dataType: "json"
        });
    }
    
    function win() {
        addLevelToKnownWords();
        incrementWordsRight();
        sendWords();
        wavesCompleted++;
        createWave();
        hasWon = false;
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
            if(timeElapsed >= 5) {
                restartLevel();
                oneTime = false;
                typingArea.val("");
            }
        } else {
            updateEnemies();
            checkWordCorrect();
            lost = checkForLoss();
            hasWon = checkForWin();
            if(hasWon) {
                win();
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
    
    function createEnemy(word) {
        return new Enemy(stage, renderer, turret, speedMultiplier, word);
    }
    
    function addLevelToWave() {
        if(activeKnownWords.length <= NEW_LEVEL_THRESHHOLD) {
            for(var i = 0; i < levels[level].length; i++) {
                wave.push(createEnemy(levels[level][i]));
            }
            addedLevel = true;
        } else {
            extraWords += WORDS_PER_LEVEL;
        }
    }
    
    function addExtraWordsToWave() {
        for(var i = 0; i < extraWords; i++) {
            wave.push(createEnemy(activeKnownWords[Math.floor(Math.random() * activeKnownWords.length)]));
        }
    }
    
    function calculateYOffsets() {
        var quadrantHeight = renderer.height / NUMBER_OF_QUADRANTS;
        var subSectionHeight = quadrantHeight / NUMBER_OF_SUBSECTIONS;
        for(var i = 0; i < wave.length; i++) {
            var quadrant = Math.floor(Math.random() * NUMBER_OF_QUADRANTS);
            var subSection = Math.floor(Math.random() * NUMBER_OF_SUBSECTIONS);
            wave[i].setYOffset((quadrantHeight * quadrant) + (subSectionHeight * subSection));
        }
    }
    
    function calculateEnemiesPerSecond() {
        enemiesPerSecond = Math.floor(wavesCompleted / ENEMIES_PER_SECOND_MODIFIER) + 1;
    }
    
    function calculateXOffsets() {
        calculateEnemiesPerSecond();
        for(var i = 0; i < wave.length; i++) {
            wave[i].setXOffset((i / enemiesPerSecond), EXPECTED_FPS);
        }
    }
    
    function calculateEnemyOffsets() {
        calculateYOffsets();
        calculateXOffsets();
    }
    
    function calculateLevel() {
        level = Math.floor(activeKnownWords.length / WORDS_PER_LEVEL);
    }
    
    function initializeWave() {
        for(var i = 0; i < wave.length; i++) {
            wave[i].initialize();
        }
    }
    
    function calculateSpeedMultiplier() {
        speedMultiplier = (Math.floor(wavesCompleted / SPEED_LEVEL_DIVISOR) * SPEED_MODIFIER) + 1;
    }
    
    function calculateExtraWords() {
        extraWords = wavesCompleted + Math.floor(wavesCompleted / EXTRA_WORDS_MODIFIER);
    }
    
    function createWave() {
        wave = [];
        calculateLevel();
        calculateSpeedMultiplier();
        calculateExtraWords();
        addLevelToWave();
        addExtraWordsToWave();
        calculateEnemyOffsets();
        initializeWave();
    }
    
    function start() {
        initializeGameBoard();
        
        turret = new Turret(stage, renderer);
        createWave();

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
    
    function makeActiveKnownWords() {
        activeKnownWords = [];
        for(var i = 0; i < knownWords.length; i++) {
            if(knownWords[i]['right'] <= RIGHT_TO_KNOWN) {
                activeKnownWords.push(knownWords[i]);
            }
        }
    }
    
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
                    makeActiveKnownWords();
                    callback();
                }
            },
            dataType: "json"
        });
    }
    
    function initialize() {
        getWords(getKnownWords);
    }
    
    function isBlankOrNull(str) {
        return (str == "" || str == null);
    }
    
    function makeLevels() {
        var blankWords = 0;
        for(var i = 0; i < dic.length; i++) {
            //skip words that don't exist in selected languages
            if(isBlankOrNull(dic[i]['lang2']) || isBlankOrNull(dic[i]['lang1'])) {
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



    // function completedKnownWords() {
    //     var wordsCompleted = 0;
    //     for(var i = 0; i < knownWords.length; i++) {
    //         if(knownWords[i]['right'] >= 10) {
    //             wordsCompleted++;
    //         }
    //     }
    //     return wordsCompleted;
    // }
    
    // function knownWordInWave(index, level) {
    //     for(var i = 0; i < level.length; i++) {
    //         if(level[i] === knownWords[index]) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    
    // function convertWordsToEnemies(level) {
    //     var enemies = [];
    //     for(var i = 0; i < level.length; i++) {
    //         if(typeof level[i]["word"] === undefined) {
    //             enemies.push(new Enemy(stage, renderer, turret, level[i]['lang1'], level[i]['lang2'], level[i]['id'], i));
    //             continue;
    //         }
    //         enemies.push(new Enemy(stage, renderer, turret, level[i]['word'][level[i]['lang1']], level[i]['word'][level[i]['lang2']], level[i]['word']['id'], i));
    //     }
    //     return enemies;
    // }
    
    // function randomActiveKnownWords(turret) {
    //     var level = [];
    //     while(level.length != WORDS_PER_LEVEL) {
    //         var index = Math.ceil(((Math.random() * 10) % knownWords.length));
    //         if(knownWordInWave(index, level)) {
    //             continue;
    //         } else {
    //             level.push(knownWords[index]);
    //         }
    //     }
    //     return convertWordsToEnemies(level, turret);
    // }
    
    // convertActiveKnownWordToEnemy(word, turret) {
    //     return new Enemy(stage, renderer, turret, word['word'][level[i]['lang1']], level[i]['word'][level[i]['lang2']], level[i]['word']['id'], i);
    // }
    
    // function addExtraActiveKnownWordsToWave(turret, extraWordsIfNoLevel) {
    //     for(var i = 0; i < (extraWords + extraWordsIfNoLevel); i++) {
    //         wave.push(convertActiveKnownWordToEnemy(Math.floor(Math.random() * myArray.length)), turret);
    //     }
    // }
    
    // function createWave(turret) {
    //     if(activeKnownWords.length <= GET_LEVEL_AMMOUNT) {
    //         wave = convertWordsToEnemies(levels[knownWords / WORDS_PER_LEVEL], turret); 
    //         addExtraActiveKnownWordsToWave(turret, 0);
    //     } else {
    //         addExtraActiveKnownWordsToWave(turret, WORDS_PER_LEVEL);
    //     }
    // }
    