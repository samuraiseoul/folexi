function bullet(paper){
    this.paper = paper;
    var lin = new line(this.paper);
    var x1 = 0;
    var x2 = 0;
    var y1 = 0;
    var y2 = 0;
    var speedX = 0;
    var speedY= 0;
    var isShot = false;
    var enemyI = null;
    
    this.setSize = function(s){
        lin.setSize(s);
    };
    
    this.isShot = function(){
        return isShot;
    };
    
    this.getEnemyI = function(){
        return enemyI;
    };
    
    this.decrementEnemyI = function(){
        enemyI--;
    };
    
    this.isShotToTrue = function(){
        isShot = true;
    };
    
    this.lineRemove = function(){
        lin.remove();
    };
    
    this.getCoords = function(){
        return {"x" : x2 , "y" : y2};
    };

    this.draw = function(){
        lin = lin.draw();
        return this;
    };

    this.update = function(){
        x1 += speedX;
        x2 += speedX;
        y1 -= speedY;
        y2 -= speedY;
        lin.remove();
        lin = new line(this.paper);
        this.setColor(255, 0 , 0);
        this.setSize(4);
        lin.start(x1, y1);
        lin.end(x2, y2);
        this.draw();
        return this;
    };

    this.setColor = function(r, g, b){
        lin.setColor(r, g, b);
    };

    this.set = function(nx1, nx2, ny1, ny2, eI){
        x1 = nx1;
        x2 = nx2;
        y1 = ny1;
        y2 = ny2;
        enemyI = eI;
        lin.start(x1, y1);
        lin.end(x2, y2);
    };

    this.setSpeedX = function(x1, coords){
        speedX = x1;
        var distX = coords.x - x2;
        var numRoundsX = distX / speedX;;
        var distY = y2 - coords.y;
        var yS = distY / numRoundsX;
        speedY = yS;
    };    
};

