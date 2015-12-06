$('document').ready(function(){
    var app = playground({
         width: 800,
         height: 400,
        render: function() {
            this.layer.clear("#000088");
            this.layer.fillStyle("#ffffff");
            this.layer.fillRect(32, 32, 64, 64);
        }
    }); 
});