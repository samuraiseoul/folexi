function life(element, width, height, lives, css){
    this.e = element;
    this.w = width;
    this.h = height;
    this.lives = lives;
    this.lost = 0;
    if(typeof css !== "undefined"){
        this.css = css;
    }else{
        this.css = {};
    }
    
    this.e.css('position', "absolute");
    this.draw();
}

// margin: 10px 0 0 5px

life.prototype.draw = function(){
    this.e.width(this.w);
    this.e.height(this.h);
    this.e.html("");
    for(var i = 0 ; i < this.lives ; i++){
        this.e.append("<i class='fa fa-heart'></i>");
    }
    for(var i = 0 ; i < this.lost ; i++){
        this.e.append("<i class='fa fa-heart-o'></i>");
    }
    $('.fa-heart').css(this.css);
    $('.fa-heart-o').css(this.css);
};

life.prototype.killed = function(){
    if(this.lives > 0){
        this.lives--;
        this.lost++;
    }
    this.draw();
};

life.prototype.plusOne = function(){
    if(this.lost > 0){
        this.lives++;
        this.lost--;
    }
    this.draw();
};

life.prototype.defeated = function(){
    return (this.lives === 0);
};

life.prototype.hide = function(){
    this.e.hide();
};

life.prototype.show = function(){
    this.e.show();
};

life.prototype.reset = function(){
    this.lives += this.lost;
    this.lost = 0;
    this.draw();
};