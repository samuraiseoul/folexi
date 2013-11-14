function triangle(paper){
    this.x = [];
    this.y = [];
            
    this.R = 0;
    this.G = 0;
    this.B = 0;
    this.lineSize = 1;
        
    this.paper = paper;
};    

triangle.prototype.setColor = function(r, g, b) {
    this.R = r;
    this.G = g;
    this.B = b;
};

triangle.prototype.set = function(x,y,n){
    this.x[n] = x;
    this.y[n] = y;
};

triangle.prototype.reset = function(){
    this.x = [];
    this.y = [];
};

    triangle.prototype.setSize = function(s){
        this.lineSize = s;
    };
    
triangle.prototype.draw = function(){
    tmp = new line(this.paper);
    tmp.start(this.x[0], this.y[0]);
    tmp.end(this.x[1], this.y[1]);
    tmp.setColor(this.R, this.G, this.B);
    tmp.setSize(this.lineSize);
    tmp.draw();
    tmp.end(this.x[2], this.y[2]);
    tmp.draw();
    tmp.start(this.x[1], this.y[1]);
    tmp.draw();
};

triangle.prototype.stringify = function(){
    return "TRIANGLE "
            +this.x[0]+":"+this.y[0]+" "+this.x[1]+":"+this.y[1]+" "+this.x[2]+":"+this.y[2]+
            " "+this.R+","+this.G+","+this.B+" "+this.lineSize;
};