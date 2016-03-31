const ENEMY_LINE_COLOR = 0x000000;
const ENEMY_LINE_WIDTH = 2;
const ENEMY_SPEED = 1;
const ENEMY_DEATH_SPEED = 24;

function Enemy(canvas, turret, speedMultiplier, word) {
    this.canvas = canvas
    this.speedMultiplier = speedMultiplier;
    this.word = word;
    this.turret = turret;
    this.laser = null;
    this.dying = false;
    this.killed = false;
    this.showWord = false;
    this.laserFired = false;
};

Enemy.prototype.detectHit = function(graphic) {
    var enemyX = this.enemyCircle.graphicsData[0].shape.x + this.enemyCircle.x;
    var enemyY = this.enemyCircle.graphicsData[0].shape.y + this.enemyCircle.y;
    var enemyR = this.enemyCircle.graphicsData[0].shape.radius;
    var graphicX = graphic.graphicsData[0].shape.x + graphic.x;
    var graphicY = graphic.graphicsData[0].shape.y + graphic.y;
    var graphicR = graphic.graphicsData[0].shape.radius;
    
    // (((x1 - x2) ^ 2) + ((y1 - y2) ^ 2)) <= ((r1 + r2) ^ 2)
    // MAth.pow() becasue ^ is bitwise only in js
    if((Math.pow((enemyX - graphicX), 2) + Math.pow((enemyY - graphicY), 2)) < Math.pow((enemyR + graphicR), 2)) {
        return true
    }
    return false;
}

Enemy.prototype.calculateCoordinates = function() {
    this.radius = this.text.getBounds()['width'];
    this.x = (this.renderer.width + this.radius) + this.xOffset;
    this.y = this.yOffset;
}

Enemy.prototype.wordMatch = function(word) {
    //toUpper removes case sensitivity
    if(word.toUpperCase() == this.word['word'][this.word['lang1']].toUpperCase()) {
        this.laser = new Laser(this.drawingStage, this.renderer, this.turret);
        this.laser.calculateYSpeed(this);
        this.turret.pulse();
        this.laserFired = true;
        return true;
    }
    return false;
}

Enemy.prototype.initializeEnemyCircle = function() {
    this.enemyCircle = new fabric.Circle({
        radius: this.radius,
        top: this.y,
        left: this.x,
        originX: 'center',
        originY: "center",
        stroke: ENEMY_LINE_COLOR,
        strokeWidth: ENEMY_LINE_WIDTH,
        selectable: false 
    });
};

Enemy.prototype.initializeEnemyText = function() {
    this.calculateCoordinates();
    this.text = new fabric.Text(this.word['word'][this.word['lang2']] ,{
        left: this.x,
        top: this.y,
        originX: 'center', 
        originY: 'center',
        selectable: false,
        fontFamily: 'Ariel Black sans-serif',
        fontSize: '20px',
        fontWeight: 'bold',
        parentContext: this
    });
};

Enemy.prototype.initializeCorrectWord = function() {
    this.correctWord = new fabric.Text(this.word['word'][this.word['lang1']] ,{
        left: this.x,
        top: (this.y - (this.text.getBoundingRectHeight() / 2) + this.text.getBoundingRectHeight()),
        originX: 'center', 
        originY: 'center',
        selectable: false,
        fontFamily: 'Ariel Black sans-serif',
        fontSize: '14px',
        fontWeight: 'bold',
        parentContext: this
    });
};

Enemy.prototype.initialize = function() {
    this.initializeEnemyText();
    this.initializeEnemyCircle();
    this.initializeCorrectWord();
    this.calculateYSpeed();
};

Enemy.prototype.reset = function() {
    if(!this.killed){
        this.removeFromStage();
        this.destroyGraphics();
    }
    this.dying = false;
    this.killed = false;
    this.showWord = false;
    this.laserFired = false;
    this.laser = null;
    //must come at end
    this.initialize();
}

Enemy.prototype.drawNotDying = function() {
    this.drawingStage.addChild(this.text);
    if(this.showWord) {
        this.drawingStage.addChild(this.correctWord);
    }
    if(this.laser != null) {
        this.laser.draw();
    }
}

Enemy.prototype.draw = function() {
    if(!this.killed) {
        this.drawingStage.addChild(this.enemyCircle);
        if(!this.dying) {
            this.drawNotDying();
        }
    }
};

Enemy.prototype.removeEnemyCircleFromStage = function() {
    this.drawingStage.removeChild(this.enemyCircle);
}

Enemy.prototype.removeFromStage = function() {
    this.removeTextAndLaserFromStage();
    this.removeEnemyCircleFromStage();
}

Enemy.prototype.destroyEnemyCircleGraphics = function() {
    this.enemyCircle.destroy();
}

Enemy.prototype.destroyGraphics = function() {
    this.destroyEnemyCircleGraphics();
    this.removeTextAndLaserFromStage();
}

Enemy.prototype.removeTextAndLaserFromStage = function() {
    this.drawingStage.removeChild(this.text);
    if(this.laser != null) { this.drawingStage.removeChild(this.laser.laser); }
    this.drawingStage.removeChild(this.correctWord);
}

Enemy.prototype.destroyTextAndLaserGraphics = function() {
    if(this.laser != null) { this.laser.laser.destroy(); }
    this.text.destroy();
    this.correctWord.destroy();
}

Enemy.prototype.calculateRSpeed = function() {
    this.rSpeed = (this.enemyCircle.graphicsData[0].shape.radius / ENEMY_DEATH_SPEED);
}

Enemy.prototype.kill = function() {
    this.dying = true;
    this.removeTextAndLaserFromStage()
    this.destroyTextAndLaserGraphics();
    this.calculateRSpeed();
}

Enemy.prototype.calculateYSpeed = function() {
    var enemyX = this.enemyCircle.graphicsData[0].shape.x + this.enemyCircle.x;
    var enemyY = this.enemyCircle.graphicsData[0].shape.y + this.enemyCircle.y;
    
    var distanceX = enemyX - this.turret.x;
    var turnsToTarget = distanceX / (ENEMY_SPEED * this.speedMultiplier);
    var distanceY = enemyY - this.turret.y;
    this.ySpeed = distanceY / turnsToTarget;
}

Enemy.prototype.updateDying = function() {
    this.enemyCircle.graphicsData[0].shape.radius -= this.rSpeed;
    if(this.enemyCircle.graphicsData[0].shape.radius <= 0) {
        this.killed = true;
        this.removeEnemyCircleFromStage();
        this.destroyEnemyCircleGraphics();
    }
}

Enemy.prototype.updateNotDying = function() {
    this.text.x -= (ENEMY_SPEED * this.speedMultiplier);
    this.correctWord.x -= (ENEMY_SPEED * this.speedMultiplier);
    this.text.y -= this.ySpeed;
    this.correctWord.y -= this.ySpeed;
    if(this.laser != null) {
        this.laser.update();
        if(this.detectHit(this.laser.laser)) {
            this.kill();
        }
    }
}

Enemy.prototype.update = function() {
    if(!this.killed) {
        this.enemyCircle.x -= (ENEMY_SPEED * this.speedMultiplier);
        this.enemyCircle.y -= this.ySpeed;
        if(this.dying) {
            this.updateDying();
        } else {
            this.updateNotDying();
        }
    } 
};

Enemy.prototype.setXOffset = function(second, fps) {
    this.xOffset = second * fps * this.speedMultiplier * ENEMY_SPEED;
}

Enemy.prototype.setYOffset = function(offset) {
    this.yOffset = offset;
}

Enemy.prototype.hide = function() {
    if(this.laser != null) {
        this.laser.hide();
    }
    this.drawingStage.removeChild(this.enemyCircle);
    this.drawingStage.removeChild(this.text);
    this.drawingStage.removeChild(this.correctWord);
}