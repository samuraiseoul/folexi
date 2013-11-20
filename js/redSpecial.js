function redSpecial(paper, hero, lang1, lang2, speedM, index){
    this.shot = 0;
    enemyWord.call(this, paper, hero, lang1, lang2, speedM, index);    
};

redSpecial.prototype = Object.create(enemyWord.prototype);
redSpecial.prototype.constructor = redSpecial;

//redSpecial.prototype.isShot = function(){
//    if(enemyWord.prototype.isShot(this)){
//        this.shot++;
//        return true;
//    }else{
//        return false;
//    }
//};

redSpecial.prototype.match = function(){
    this.shot++;
};

redSpecial.prototype.kill = function(){
//    this.shot++;
    if(this.finalKill()){
        enemyWord.prototype.kill.call(this);
    }
};

redSpecial.prototype.type = function(){
    return "red";
};

redSpecial.prototype.finalKill = function(){
    console.log("s: "+this.shot);
    return (this.shot >= 2);
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