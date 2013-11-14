 function line(paper) {
        var x1 = null;
        var x2 = null;
        var y1 = null;
        var y2 = null;   
        
        var R = 0;
        var G = 0;
        var B = 0;
        
        var lineSize = 1;
        
        this.paper = paper;
        
        var self = null;
        
        this.setSize = function(s) {
            lineSize = s;
        };

        this.setColor = function(r, g, b) {
            R = r;
            G = g;
            B = b;
        };

        this.draw = function() {
            self = this.paper.path(
                    "M " + x1 + " " + y1 +
                    " l " + (x2 - x1) + " " + (y2 - y1) + " z"
                    ).attr({
                stroke: "rgb(" + R + "," + G + "," + B + ")",
                "stroke-width": lineSize
            });
            return self;
        };

        this.start = function(x, y) {
            x1 = x;
            y1 = y;
        };

        this.end = function(x, y) {
            x2 = x;
            y2 = y;
        };

        this.stringify = function() {
            return "LINE " + x1 + ":" + y1 + " " + x2 + ":" + y2 + " " + R + "," + G + "," + B + " " + lineSize;
        };
        
    };
    
    