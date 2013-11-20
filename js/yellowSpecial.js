function yellowSpecial(paper, hero, lang1, lang2, speedM, index){
    this.shot = 0;
    this.special = true;
    this.R = 255;
    this.G = 245;
    this.B = 0;
    enemyWord.call(this, paper, hero, lang1, lang2, speedM, index);    
};

yellowSpecial.prototype = Object.create(enemyWord.prototype);
yellowSpecial.prototype.constructor = yellowSpecial;

yellowSpecial.prototype.kill = function() {
    console.log("r: "+this.r);
        this.circ.animate({ r : (this.r * 2.5)}, 400, "linear", function(){
            this.attr({stroke : "rgb(255,0,0)"}).animate({ r : 0}, 400, "linear", function(){
                this.remove();
                });
            });
        this.tex.remove();
    };

yellowSpecial.prototype.inRange = function(coords){
    var distX = Math.abs((coords.x - this.x));
    var distY = Math.abs((coords.y - this.y));
    var dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    var collDist = coords.r + (this.r*2.5);
    if(collDist >= dist){
        return true;
    }else{
        return false;
    }
};

yellowSpecial.prototype.slowSurrounding = function(enemies){
    var slow = [];
    for(var i = 0 , len = enemies.length ; i < len ; i++){
        if(this.inRange(enemies[i].getCoords())){
            slow.push(i);
        }
    }
    this.special = false;
    this.R = 255;
    this.G = 245;
    this.B = 0;
    return slow;
};

yellowSpecial.prototype.type = function(){
    return "yellow";
};


yellowSpecial.prototype.isSpecial = function(){
        return this.special;
};

yellowSpecial.prototype.set = function(x, y){
    enemyWord.prototype.set.call(this, x, y);
    this.circ.setColor(this.R, this.G, this.B);
};