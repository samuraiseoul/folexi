<html>
    <head>
        <title>Fabric Test</title>
        <script type="text/javascript" src="{{URL::asset('js/game/fabric.min.js')}}"></script>
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
        
        <style type="text/css">
            #fabric {
                height:400px;
                width: 800px;
                margin-top:100px;
                margin-left: 100px;
                border: solid;
            }
        </style>
        
        <script type="text/javascript">
            $(document).ready(function(){
                var canvas = new fabric.Canvas('fabric', {
                    width : 800,
                    height: 400
                });
                
                var rect = new fabric.Rect({
                  left: 375,
                  top: 175,
                  width: 50,
                  height: 50,
                  rx: 3,
                  ry: 3,
                  fill: 'white',
                  strokeWidth: 4,
                  stroke: 'black'
                });
                rect.animate('angle', '-=50', { onChange: canvas.renderAll.bind(canvas), duration: 10000 });
                
                // //functions and display settings
                // rect.set({
                //   hasControls: false,
                //   hasBorders:false,
                //   hoverCursor: 'pointer',
                //   lockMovementX: true,
                //   lockMovementY: true
                // });
                // rect.on("selected", function(){console.log("HELLO!");});
                
                // canvas.add(rect);
                
                var text = new fabric.Text('START YOU ENGINES PUPPER', {left:400, top: 200, originX: 'center', originY: 'center', selectable: false, fontSize: '64', ranObj: "nsfnsfnsj"});
                
                canvas.add(text);
                
                setTimeout(function() {
                    text.set({text: "NEW TEXT!"});
                    canvas.renderAll();
                }, 5000);
                
                //movement by update animation
                function animate() {
                    setTimeout(function () {
                        rect.set({left: (rect.getLeft() - 5), top: (rect.getTop() - 5)});
                        canvas.renderAll();
                        animate();
                    }, (1000 / 60));
                }
                // animate();
                
                
                // pulse animation
                
                var circ = new fabric.Circle({
                   radius: 30,
                   top: 200,
                   originX: 'center',
                   originY: "center",
                   left: 400,
                   stroke: "black",
                   strokeWidth: 1,
                   fill: 'white'
                });
                
                circ.animate('radius', "+=30", {
                    onChange: canvas.renderAll.bind(canvas), 
                    duration: 2500,
                    onComplete: function(){
                        circ.animate('radius', "-=30", {onChange: canvas.renderAll.bind(canvas), duration: 2500});
                    }
                })
                
                
                // circ.animate('radius', '+=50', { onChange: canvas.renderAll.bind(canvas) });
                // canvas.add(circ);
                
            });
        </script>
        
        
    </head>
    <body>
        <canvas id='fabric'>
            
        </canvas>
        
        
        <i class="fa fa-heart"></i>
    </body>
</html>