function enemyWord(paper, hero, lang1, lang2, speedM, index){
    this.paper = paper;
    this.tex = new text(this.paper);
    this.speed = (1+speedM);
    this.ySpeed = 0;
    this.circ = new circle(this.paper);
    this.x = 0;
    this.y = 0;
    this.r = 0;
    
    this.index = index;
    
    this.texSize = null;
    
    this.word = lang1;
    this.impactAngle = 0;
    this.word2 = lang2;
    this.heroCoord = hero;
};

    enemyWord.prototype.findInpactAngle = function(x1, y1) {
        this.impactAngle = (y1 / x1) * -100;
    };
        
    enemyWord.prototype.isShot = function(coords){
        if(this.x - coords.x < this.r){
            return true;
        }
        return false;
    };
    
    enemyWord.prototype.getImpactAngle = function(){
        return this.impactAngle;
    };
    
    enemyWord.prototype.getCoords = function(){
        return { "x" : this.x, "y" : this.y, "r" : this.r};
    };
    
    enemyWord.prototype.draw = function() {
        this.circ = this.circ.draw();
        this.tex = this.tex.draw();
    };

    enemyWord.prototype.getAnswer = function() {
        return this.word2;
    };

    enemyWord.prototype.kill = function() {
        this.circ.attr({stroke : "rgb(255,0,0)"}).animate({ r : 0}, 400, "linear", function(){
            this.remove();
        });
        this.tex.remove();
    };
    
     
    enemyWord.prototype.isSpecial = function(){
        return false;
    };

    enemyWord.prototype.update = function() {
        this.circ.remove();
        this.tex.remove();
        this.circ = new circle(this.paper);
        this.tex = new text(this.paper);
        this.tex.setText(this.word);
        this.x -= this.speed;
        this.y += this.ySpeed;
        this.set(this.x, this.y);
        this.draw();
    };

    enemyWord.prototype.set = function(x1, y1) {
        this.tex.setText(this.word);
        this.circ.setSize(2);
        this.circ.set(x1, y1, this.r);
        this.tex.set(x1, y1);
        this.setYSpeed();
    };

    enemyWord.prototype.setByY = function(y1, w) {
        this.tex.setText(this.word);
        if(this.texSize === null){
            var length = this.tex.size();
        }
        this.y = y1;
        this.r = length;
        this.x = (w+15) + this.r;
        this.circ.setSize(2);
        this.circ.set(this.x, this.y, this.r);
        this.tex.set(this.x, this.y);
        this.setYSpeed();   
        this.draw();
    };
   
    
    enemyWord.prototype.setYSpeed = function() {
        var distX = this.x - this.heroCoord['x'];
        var numRoundsX = distX / this.speed;
        var distY = this.heroCoord['y'] - this.y;
        var yS = distY / numRoundsX;
        this.findInpactAngle(distX, distY);
        this.ySpeed = yS;
    };
    
    enemyWord.prototype.slow = function(){
        this.circ.attr({stroke : "rgb(255,245,0)"});
        this.speed /= 2;
        this.ySpeed /= 2;
    };
    
    enemyWord.prototype.getIndex = function(){
        return this.index;
    };
    
    enemyWord.prototype.showWord = function(){
        this.tex.remove();
        this.tex = new text(this.paper);
        this.tex.setText(this.word+'\n'+this.word2);
        this.tex.set(this.x, this.y);
        this.tex.draw();
    };