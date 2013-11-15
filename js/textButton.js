function textButton(paper, x1, y1, word1, fS1){
    var self = null;
    this.paper = paper;
    var word = word1;  
    var x = x1;
    var y = y1;    
    var fS = fS1;
    
    this.setFontSize = function(fS1){
        fS = fS1+"px";
    };
    
    this.draw = function() {
        if(self === null){
            self = this.paper.text(x, y, word).attr({'font-size': fS, "id": "enemy-" + word});
            self.node.setAttribute("class","clickable");
            self.node.setAttribute("id", word.toLowerCase()+"_button");
//            self.click(function(){
//                paper.clear();
//                console.log("Clicked!");
//            });
        }
    };
}