const ENEMY_LINE_COLOR = "black";
const ENEMY_LINE_WIDTH = 2;
const ENEMY_SPEED = 1;
const ENEMY_DEATH_SPEED = 24;

function Enemy(canvas, turret, speedMultiplier, word) {
    this.canvas = canvas
    this.speedMultiplier = speedMultiplier;
    this.word = word;
    this.turret = turret;
    this.laser = null;
    this.killed = false;
    this.showWord = false;
};

Enemy.prototype.detectHit = function(graphic) {
    return this.enemyCircle.intersectsWithObject(graphic);
}

Enemy.prototype.calculateCoordinates = function() {
    this.radius = this.text.getWidth();
    this.x = (this.canvas.getWidth() + this.radius) + this.xOffset;
    this.y = this.yOffset;
}

Enemy.prototype.wordMatch = function(word) {
    //toUpper removes case sensitivity
    if(word.toUpperCase() == this.word['word'][this.word['lang1']].toUpperCase()) {
        this.laser = new Laser(this.canvas, this.turret);
        this.laser.calculateYSpeed(this);
        this.turret.pulse(this.laser);
        return true;
    }
    return false;
}

Enemy.prototype.initializeEnemyCircle = function() {
    this.enemyCircle = new fabric.Circle({
        radius: this.radius,
        top: this.y,
        left: this.x,
        fill: 'white',
        stroke: ENEMY_LINE_COLOR,
        strokeWidth: ENEMY_LINE_WIDTH
    });
    this.enemyCircle.set(DEFAULT);
};

Enemy.prototype.initializeEnemyText = function() {
    this.text = new fabric.Text(this.word['word'][this.word['lang2']] ,{
        left: this.x,
        top: this.y,
        fontSize: '20',
        parentContext: this
    });
    this.text.set(DEFAULT);
    this.text.set(FONT_STYLE);
    this.calculateCoordinates();
    this.text.set({left: this.x, top: this.y});
};

Enemy.prototype.initializeCorrectWord = function() {
    this.correctWord = new fabric.Text(this.word['word'][this.word['lang1']] ,{
        left: this.x,
        top: (this.y - (this.text.getHeight() / 2) + this.text.getHeight()),
        fontSize: '14',
        parentContext: this
    });
    this.correctWord.set(DEFAULT);
    this.correctWord.set(FONT_STYLE);
};

Enemy.prototype.initialize = function() {
    this.initializeEnemyText();
    this.initializeEnemyCircle();
    this.initializeCorrectWord();
    this.calculateYSpeed();
};

Enemy.prototype.reset = function() {
    this.killed = false;
    this.showWord = false;
    this.laser = null;
    //must come at end
    this.initialize();
}

Enemy.prototype.addAllToCanvas = function() {
    if(!this.killed) {
        this.canvas.add(this.enemyCircle);
        this.canvas.add(this.text);
        if(this.showWord) {
            this.canvas.add(this.correctWord);
        }
        if(this.laser != null) {
            this.laser.addToCanvas();
        }
    }
};

Enemy.prototype.animateDeath = function() {
    this.enemyCircle.animate({'radius':0, 'opacity':0}, {onChange: this.canvas.renderAll.bind(this.canvas), duration: 1000, enemy: this, onComplete: function(){this.enemy.killed = true;}});
    this.text.animate('opacity', '0', {onChange: this.canvas.renderAll.bind(this.canvas), duration: 250});
}

Enemy.prototype.kill = function() {
    this.laser = null;
    this.animateDeath();
}

Enemy.prototype.calculateYSpeed = function() {
    var enemyX = this.enemyCircle.getLeft();
    var enemyY = this.enemyCircle.getTop();
    
    var distanceX = enemyX - this.turret.x;
    var turnsToTarget = distanceX / (ENEMY_SPEED * this.speedMultiplier);
    var distanceY = enemyY - this.turret.y;
    this.ySpeed = distanceY / turnsToTarget;
}

Enemy.prototype.updateObjects = function() {
    this.enemyCircle.left -= (ENEMY_SPEED * this.speedMultiplier);
    this.enemyCircle.top -= this.ySpeed;
    this.text.left -= (ENEMY_SPEED * this.speedMultiplier);
    this.correctWord.left -= (ENEMY_SPEED * this.speedMultiplier);
    this.text.top -= this.ySpeed;
    this.correctWord.top -= this.ySpeed;
    if(this.laser != null && !this.laser.preparingToFire) {
        this.laser.update();
        if(this.detectHit(this.laser.laser)) {
            this.kill();
        }
    }
}

Enemy.prototype.update = function() {
    if(!this.killed) {
        this.updateObjects();
    } 
};

Enemy.prototype.setXOffset = function(second, fps) {
    this.xOffset = second * fps * this.speedMultiplier * ENEMY_SPEED;
}

Enemy.prototype.setYOffset = function(offset) {
    this.yOffset = offset;
}