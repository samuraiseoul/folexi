function text(paper){
    var self = null;
    this.paper = paper;
    var word = "";  
    var x = 0;
    var y = 0;
    var length = 0;
    var set = false;
    if(!$('#text-ruler').length){
        $('body').append("<span id='text-ruler' style='font-size:14px'></span>");
        $('#text-ruler').hide();
    }
    var lengthX = function(){
        $('#text-ruler').html(word);
        return $('#text-ruler').width();
    };
    var lengthY = function(){
        $('#text-ruler').html(word);
        return $('#text-ruler').height();
    };
    
    

    this.setText = function(word1) {
        word = word1;
        if(!set){
            xSize = lengthX();
            ySize = lengthY();
            set = true;
        }
    };

    this.set = function(x1, y1) {
        x = x1;
        y = y1;
    };

    this.draw = function() {
        return self = this.paper.text(x, y, word).attr({'font-size': '14px', "id": "enemy-" + word});
    };

    this.size = function() {
        if (xSize > ySize) {
            return xSize;
        } else {
            return ySize;
        }
    };
    
};