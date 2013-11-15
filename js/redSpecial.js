function redSpecial(paper, hero, lang1, lang2, speedM){
    this.shot = 0;
    enemyWord.call(this, paper, hero, lang1, lang2, speedM);    
};

redSpecial.prototype = Object.create(enemyWord.prototype);
redSpecial.prototype.constructor = redSpecial;

redSpecial.prototype.kill = function(){
    this.shot++;
    if(this.finalKill()){
        enemyWord.prototype.kill.call(this);
    }
};

redSpecial.prototype.type = function(){
    return "red";
};

redSpecial.prototype.finalKill = function(){
    return (this.shot === 2);
};

redSpecial.prototype.isSpecial = function(){
        return true;
};

redSpecial.prototype.set = function(x, y){
    enemyWord.prototype.set.call(this, x, y);
    this.circ.setColor(255, 0, 0);
};

redSpecial.prototype.purpleKill = function(){
    this.shot = 1;
};