function squiggle(paper){
    this.x = [];
    this.y =[];
    this.size = 0;
            
    this.R = 0;
    this.G = 0;
    this.B = 0;
    
    this.lineSize = 1;
    
    this.paper = paper;
    };
    
    squiggle.prototype.setSize = function(s){
        this.lineSize = s;
    };
    
    squiggle.prototype.set = function(x, y){
      this.x.push(x);
      this.y.push(y);
      this.size++;
    };  
    
    squiggle.prototype.setColor = function(r, g, b){
        this.R = r;
        this.G = g;
        this.B = b;
    };
    
    squiggle.prototype.draw = function(){
        for(var i = 0; i < (this.size-1); i++){
            var tmp = new line(this.paper);
            tmp.start(this.x[i], this.y[i]);
            tmp.end(this.x[i+1], this.y[i+1]);
            tmp.setColor(this.R, this.G, this.B);
            tmp.setSize(this.lineSize);
            tmp.draw();
        }
    };
    
    squiggle.prototype.reset = function(){
        this.x = [];
        this.y = [];
        this.size = 0;
    };
    
    squiggle.prototype.stringify = function(){
        var ret = "SQUIGGLE ";
        for(var i = 0; i < this.size ; i++){
            ret += this.x[i]+":"+this.y[i];
            if(i != (this.size-1)){
                ret += ",";
            }
        }
        ret += " "+this.R+","+this.G+","+this.B+" "+this.lineSize;
        return ret;
    };