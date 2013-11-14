var g_masterPathArray;
var g_masterDrawingBox;
var g_masterPaper;

function initDrawing() {
    var g_masterPaper = Raphael(10, 10, 700, 500);

    var masterBackground = g_masterPaper.rect(10, 10, 600, 400);
    masterBackground.attr("fill", "#eee");
    masterBackground.mousemove(function(event) {
        var evt = event;
        var IE = document.all ? true : false;
        var x, y;
        if (IE) {
            x = evt.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            y = evt.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
        }
        else {
            x = evt.pageX;
            y = evt.pageY;
        }

        // subtract paper coords on page
        this.ox = x - 10;
        this.oy = y - 10;
    });

    var start = function() {
        g_masterPathArray = new Array();
    },
            move = function(dx, dy) {
        if (g_masterPathArray.length == 0) {
            g_masterPathArray[0] = ["M", this.ox, this.oy];
            g_masterDrawingBox = g_masterPaper.path(g_masterPathArray);
            g_masterDrawingBox.attr({stroke: "#000000", "stroke-width": 3});
        }
        else
            g_masterPathArray[g_masterPathArray.length] = ["L", this.ox, this.oy];

        g_masterDrawingBox.attr({path: g_masterPathArray});
    },
            up = function() {
        ;
    };

    masterBackground.drag(move, start, up);
    return g_masterPaper;
}
