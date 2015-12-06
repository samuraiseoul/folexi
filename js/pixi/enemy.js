const ENEMY_LINE_COLOR = 0x000000;
const ENEMY_FILL_COLOR = 0xFFFFFF;
const ENEMY_LINE_WIDTH = 2;
const ENEMY_SPEED = 1;

function Enemy(drawingStage, renderer, turret, lang1, lang2, word_id, offset) {
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.lang1 = lang1;
    this.lang2 = lang2;
    this.word_id = word_id;
    this.offset = offset;
    this.turret = turret;
    this.laser = null;
    this.killed = false;
    
    this.initializeEnemy();
};

Enemy.prototype.calculateCoordinates = function() {
    this.radius = this.text.getBounds()['width'];
    this.x = (this.renderer.width + this.radius) + (this.offset * 100);
    this.y = (this.renderer.height / 2);
}

Enemy.prototype.wordMatch = function(word) {
    if(word == this.lang1) {
        this.laser = new Laser(this.drawingStage, this.renderer, this.turret);
        this.laser.calculateYSpeed(this);
        return true;
    }
    return false;
}

Enemy.prototype.inializeEnemyCircle = function() {
    this.enemyCircle = new PIXI.Graphics();
    this.enemyCircle.lineStyle(ENEMY_LINE_WIDTH, ENEMY_LINE_COLOR); //has to come before fill
    this.enemyCircle.beginFill(ENEMY_FILL_COLOR);
    this.enemyCircle.drawCircle(this.x, this.y, this.radius); // drawCircle(x, y, radius)
    this.enemyCircle.endFill();    
};

Enemy.prototype.inializeEnemyText = function() {
    this.text = new PIXI.Text(this.lang2);
    this.calculateCoordinates();
    this.text.x = this.x - (this.text.getBounds()['width'] / 2);
    this.text.y = this.y - (this.text.getBounds()['height'] / 2);
};

Enemy.prototype.initializeEnemy = function() {
    this.inializeEnemyText();
    this.inializeEnemyCircle();
};

Enemy.prototype.draw = function() {
    if(!this.killed) {
        this.drawingStage.addChild(this.enemyCircle);
        this.drawingStage.addChild(this.text);
        if(this.laser != null) {
            this.laser.draw();
        }
    }
};

Enemy.prototype.removeFromStage = function() {
    this.drawingStage.removeChild(this.enemyCircle);
    this.drawingStage.removeChild(this.text);
    this.drawingStage.removeChild(this.laser.laser);
}

Enemy.prototype.destroyGraphics = function() {
    this.laser.laser.destroy();
    this.enemyCircle.destroy();
    this.text.destroy();
}

Enemy.prototype.kill = function() {
    this.removeFromStage();
    this.destroyGraphics();
    this.killed = true;
}

Enemy.prototype.update = function() {
    if(!this.killed) {
        this.enemyCircle.x -= ENEMY_SPEED;
        this.text.x -= ENEMY_SPEED;
        if(this.laser != null) {
            this.laser.update();
            if(this.laser.detectHit(this)) {
                this.kill();
            }
        }
    } 
};