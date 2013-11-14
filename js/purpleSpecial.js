function purpleSpecial(paper, hero, lang1, lang2, speedM){
    this.shot = 0;
    enemyWord.call(this, paper, hero, lang1, lang2, speedM);    
};

purpleSpecial.prototype = Object.create(enemyWord.prototype);
purpleSpecial.prototype.constructor = purpleSpecial;

purpleSpecial.prototype.inRange = function(coords){
    var distX = Math.abs((coords.x - this.x));
    var distY = Math.abs((coords.y - this.y));
    var dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    var collDist = coords.r + (this.r*2);
    if(collDist >= dist){
        return true;
    }else{
        return false;
    }
};

purpleSpecial.prototype.killSurrounding = function(enemies){
    var kills = [];
    for(var i = 0 , len = enemies.length ; i < len ; i++){
        if(this.inRange(enemies[i].getCoords())){
            kills.push(i);
        }
    }
    return kills;
};

purpleSpecial.prototype.type = function(){
    return "purple";
};


purpleSpecial.prototype.isSpecial = function(){
        return true;
};

purpleSpecial.prototype.set = function(x, y){
    enemyWord.prototype.set.call(this, x, y);
    this.circ.setColor(175,0,255);
};