function hero(paper){
    this.paper = paper;
    var circ = new circle(this.paper);
    var rect = new rectangle(this.paper);
    var x = 0;
    var y = 0;
    var r = 0;
    var size = 0;
    var enemyAngle = 0;
    var front = {};
    var rX1 = 0;
    var rX2 = 0;
    var rY1 = 0;
    var rY2 = 0;
    
    rect.setSize(2);
    var bulls = [];
    
    
    
    
    this.collision = function(enemy) {
        coords = enemy.getCoords();
        xDist = Math.abs(coords.x - x);
        yDist = Math.abs(y - coords.y);
        dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        collisionDist = r + coords.r;
        if (collisionDist >= dist) {
            return true;
        } else {
            return false;
        }
    };
    
    this.bulletReset = function(i){
        bulls[i].lineRemove();
        bulls.splice(i, 1);
    };

    this.set = function(x1, y1, r1) {
        x = x1;
        y = y1;
        r = r1;
        rX1 = x + r;
        rX2 = rX1 + 25;
        rY1 = y - 5;
        rY2 = y + 5;
        circ.set(x, y, r);
        rect.start(rX1,rY1);
        rect.end(rX2,rY2);
        rect.draw();
    };

    this.setSize = function(s) {
        size = s;
        circ.setSize(size);
    };
    
    this.isShot = function(){
        if(bulls.length > 0){
            return true;
        }
        return false;
    };
    
    this.getBullets = function(){
        return bulls;
    };
    
    this.draw = function() {
//        console.log("BL: "+bulls.length);
//        console.log(bulls);
        for(var i = 0 ; i < bulls.length ; i++){
//                console.log("here");
//                console.log(bulls[i]);
//            console.log("I: "+i);    
            try{
                bulls[i].draw();
            }catch(e){
//                console.log("Error i: "+i);
//                console.log(bulls[i]);
//                console.log(e.message);
            }
        }        
        circ.draw();
        rect.remove();
        rect.setTransform("r" + enemyAngle + " " + x + " " + y);
        rect.draw();
    };
    
    this.updateBullets = function(enemies){
        var index = null;
        var kills = [];
        for(var i = 0 ; i < bulls.length ; i++){
                bulls[i].update();
                if(enemies[bulls[i].getEnemyI()].isShot(bulls[i].getCoords())){
                    kills.push(i);
                    index = bulls[i].getEnemyI();
                }
        }
        var ret = null;
        for(var i = 0 ; i < kills.length ; i++){
            if(!enemies[bulls[kills[i]].getEnemyI()].isSpecial()){
            enemies[bulls[kills[i]].getEnemyI()].kill();
            enemies.splice(bulls[kills[i]].getEnemyI(), 1);
            }else{
                if(enemies[bulls[kills[i]].getEnemyI()].type() === "red"){
                    enemies[bulls[kills[i]].getEnemyI()].kill();
                    if (enemies[bulls[kills[i]].getEnemyI()].finalKill()) {
                        enemies.splice(bulls[kills[i]].getEnemyI(), 1);
                    }
                }else if(enemies[bulls[kills[i]].getEnemyI()].type() === "purple"){
                    ret = enemies[bulls[kills[i]].getEnemyI()].killSurrounding(enemies);
                    for(var k = 0 ; k < ret.length ; k++){
                                                enemies[ret[k]].kill();
                    }
                    console.log("Purple!");
                }else if(enemies[bulls[kills[i]].getEnemyI()].type() === "yellow"){
                    slow = enemies[bulls[kills[i]].getEnemyI()].slowSurrounding(enemies_on_screen);
                    for (var k = 0; k < slow.length; k++) {
                        enemies[slow[k]].slow();
                    }
                    enemies[bulls[kills[i]].getEnemyI()].kill();
                    enemies.splice(bulls[kills[i]].getEnemyI(), 1);                    
                }
            }
            var index = bulls[kills[i]].getEnemyI();
            this.bulletReset(kills[i]);
            for (var j = 0; j < bulls.length; j++) {
                if(bulls[j].getEnemyI() > index){
                    bulls[j].decrementEnemyI();
                }
            }
        }
        if(ret !== null){
        console.log(enemies);
            enemies = $.grep(enemies, function(n, i) {
                return $.inArray(i, ret) === -1;
            });
        console.log(enemies);
        }
        return enemies;
    };

    this.center = function() {
        return {"x": x, "y": y};
    };

    this.update = function() {
        this.draw();
    };

    this.shoot = function(coords, eI) {
        findFront();
        bX = front['x'] + enemyAngle - (enemyAngle * Math.cos(enemyAngle));
        bY = front['y'] - enemyAngle * Math.sin(-enemyAngle);
        R = ((coords.x - 10) / coords.x);
        Y = bY * (R);
        var b = new bullet(this.paper);
        b.set(bX, bX + 10, bY, Y , eI);
        b.isShotToTrue();
        b.setSpeedX(15, coords);
        bulls.push(b);
    };
    
    this.setEnemyAngle = function(e){
        enemyAngle = e;
    };

    var findFront = function() {
        front = {"x": rX2, "y": ((rY1 + rY2) / 2)};
    };   
    
};
