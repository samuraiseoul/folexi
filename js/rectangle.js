function rectangle(paper) {
    var startX = null;
    var startY = null;
    var endX = null;
    var endY = null;
    var transform = null;
    var distX = null;
    var distY = null;

    var R = 0;
    var G = 0;
    var B = 0;

    var lineSize = 1;
    var self = null;
    this.paper = paper;
    
    this.setTransform = function(t){
        transform = t;
    };

    this.remove = function() {
        self.remove();
    };

    this.setColor = function(r, g, b) {
        R = r;
        G = g;
        B = b;
    };

    this.draw = function() {
        self = this.paper.rect(startX, startY, distX, distY).attr({
            stroke: "rgb(" + R + "," + G + "," + B + ")",
            "stroke-width": lineSize
        });
        if (this.transform !== null) {
            self = self.animate({transform: transform}, 250);
        }
    };

    this.setSize = function(s) {
        lineSize = s;
    };

    this.start = function(x, y) {
        startX = x;
        startY = y;
        startX *= 1;
        startY *= 1;
    };

    this.end = function(x, y) {
        endX = x;
        endY = y;
        this.calcDist();
        if (isNaN(endX)) {
            endX *= 1;
        }
        if (isNaN(endY)) {
            endY *= 1;
        }
    };

    this.calcDist = function() {
        this.calcStartEnd();
        distX = (endX - startX);
        distY = (endY - startY);
    };

    this.calcStartEnd = function() {
        if (endX < startX) {
            var t = startX;
            startX = endX;
            endX = t;
        }
        if (endY < startY) {
            var t = startY;
            startY = endY;
            endY = t;
        }
    };

    this.stringify = function() {
        return "RECTANGLE " + startX + ":" + startY + " " + endX + ":" + endY + " "
                + R + "," + G + "," + B + " " + lineSize;
    };

    this.findCenterX = function() {
        return (distX / 2) + startX;
    };

    this.findCenterY = function() {
        return (distY / 2) + startY;
    };
};

