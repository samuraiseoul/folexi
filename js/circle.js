function circle(paper) {
        var x = null;
        var y = null;
        var r = null;
        
        var x1 = null;
        var y1 = null;
        var R = 0;
        var G = 0;
        var B = 0;
        var lineSize = 1;
        
        this.paper = paper;
        
        var self = this;
               
    this.set = function(x1, y1, r1){
        x = x1;
        y = y1;
        r = r1;
    };
    
    this.colorOut = function(){
              console.log("Red: "+R+" G: "+G+" B: "+B);
        };
    
    this.setSize = function(s){
        lineSize = s;
    };
    
    this.setColor = function(r, g, b) {      
        R = r;
        G = g;
        B = b;
    };
    
    this.draw = function(){
        return this.paper.circle(x, y, r).attr({
                                    stroke : "rgb("+R+","+G+","+B+")",
                                    "stroke-width" : lineSize
                            });
    };
    
    this.start = function(x, y){
        x1 = x;
        y1 = y;
    };
    
    this.end = function(x2, y2){
        x = ((x1 + x2)/2);
        y = ((y1 + y2)/2);
        
        r = ((Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2))/2));
    };
    
    this.stringify = function(){
        return "CIRCLE "+x+":"+y+" "+r+" "+R+","+G+","+B+" "+lineSize;
    };
        
    };//class end