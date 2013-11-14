@extends('template.template')

@section('content')
@section('js')
<script type="text/javascript" src="{{URL::asset('js/raphael-min2.1.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/line.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/rectangle.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/circle.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/squiggle.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/text.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/triangle.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/bullet.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/hero.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/enemyWord.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/redSpecial.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/purpleSpecial.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/yellowSpecial.js')}}"></script>
<script type="application/javascript" src="{{URL::asset('js/en_ko.dic')}}"></script>
<script>
    var levels = [];
    for (var i = 0, k = 0; i < dic.length; i += 3, k++) {
        levels.push([]);
        for (var j = 0; j < 3; j++) {
            levels[k].push(dic[i + j]);
        }
    }

    $(document).ready(function() {
        var startTime = 0;
        var canvas = $('#game');
        var w = canvas.width();
        var h = (canvas.width()*.6);
        var paper = new Raphael($('#game')[0], w, h);
        Hero = new hero(paper);
        Hero.set((w*.055), (h*.47), ((w*.055)*.73));
        Hero.setSize(2);
        Hero.draw();
        enemies_on_screen = [];
        enemies = [];
        level = 0;
        extraWords = 0;
        speedMult = 0;
        var enemiesPerSec = 1;
        var killed = [];
        var killedWords = 0;
        
        var thisLevel = [];
        var knownWords = [];
        
        var seconds = 0;
        
        var lost = false;
                       
        function initiate() {
            thisLevel = levels[level].concat();
            if(knownWords.length > 0){
                var used = [];
                for(var i = 0 ; i < level+extraWords ; i++){
                    var rand = Math.floor(Math.random()*100);
                    var tmp = rand%knownWords.length;
                    var cont = false;
                    for(var j = 0 ; j < used.length ; j++){
                        if(tmp === used[j]){
                            cont = true;
                            break;
                        }
                    }
                    if(cont){
                        continue;
                    }
                    used.push(tmp);
                    thisLevel.push(knownWords[tmp]);
                }
            }
            for(var i = 0 ; i < levels[level].length ; i++){
                $('#new_word_list').append(levels[level][i][0] + " ");
            }
            //makes sure new enemies are not special.
            for (var i = 0; i < levels[level].length; i++) {
                    enemies.push(new enemyWord(paper, Hero.center(), thisLevel[i][1], thisLevel[i][0], speedMult));
            }
            for (var i = 3; i < thisLevel.length; i++) {
                    var special = Math.ceil(((Math.random()*10)%3));
                    //give 25% chance of special enemy.
                    if(special !== 3){
                    enemies.push(new enemyWord(paper, Hero.center(), thisLevel[i][1], thisLevel[i][0], speedMult));
                    }else{
                        var type = Math.ceil(((Math.random()*10)%3));
                        if(type === 1){
                            enemies.push(new redSpecial(paper, Hero.center(), thisLevel[i][1], thisLevel[i][0], speedMult));                            
                        }
                        else if(type === 2){
                            enemies.push(new yellowSpecial(paper, Hero.center(), thisLevel[i][1], thisLevel[i][0], speedMult));                            
                        }else
                            enemies.push(new purpleSpecial(paper, Hero.center(), thisLevel[i][1], thisLevel[i][0], speedMult));                            
                        }
            }
            var quadrant = 0;
            var qH = h/4;
            var qS = qH/6;
            var qA = (qH/3)*2;
            for (var i = 0; i < enemies.length; i++) {
                y = (qS)+(qH*quadrant)+((Math.random()*1000)%(qA));
                quadrant++;
                enemies[i].setByY(y, w);
                if(quadrant > 3){
                    quadrant = 0;
                }
            }
            enemies_on_screen.push(enemies[0]);
            seconds++;
        };
        
        function addOldWords() {
            for (var i = 0; i < levels[level].length; i++) {
                if((i+level)%2 === 0){
                $('#col_0').append(levels[level][i][0] + " ");
                }else{
                $('#col_1').append(levels[level][i][0] + " ");                    
                }
            }
        };
        //First initialization
        initiate();
        startTime = new Date().getTime();
         /*
          * If the words match(lowercase check)
          * then kill the enemy.
          */
        function wordMatch() {
            for (var i = 0; i < enemies_on_screen.length; i++) {
                if ($('#defense-code').val().toLowerCase() === enemies_on_screen[i].getAnswer().toLowerCase()) {   
                    $('#defense-code').val("");
                    Hero.setEnemyAngle(enemies_on_screen[i].getImpactAngle());
                    Hero.shoot(enemies_on_screen[i].getCoords(), i);
                    Hero.update();
                    kill = i;
                }
            }
        };
        
        /*
         *Checks if the circles collide.
         *Uses the radius of both circles and if it's shorter
         *than the combined length, then they have colided.
         */        
        function lose() {
            for (var i = 0; i < enemies_on_screen.length; i++) {
                if(Hero.collision(enemies_on_screen[i])){
                    return true;
                }
            }
            return false;
        };
        /*
         * If no enemies left, then you win.
         */
        function win() {
            if (enemies_on_screen.length <= 0) {
                knownWords = knownWords.concat(levels[level]);
                thisLevel = [];
                return true;
            }
            return false;
        };
        /* 
         * Clears the new word list for the next level
         * Gives the running words list the previous level's words
         * increases the level and initializes it. 
         */
        function nextLevel(){
            $("#new_word_list").html('');
            addOldWords();
            level++;
            enemiesPerSec = (Math.floor((level+1)/3))+1;
            extraWords = (Math.floor((level+1)/4));
            speedMult = 0.25*(Math.floor((level+1)/5));
            seconds = 0;
            killedWords += enemies.length;
            enemies_on_screen = [];
            enemies = [];
//            $("#level").html(level+1);
//            $("#total-words").html(killedWords);
//            $("#speed-mod").html(speedMult);
//            $("#extra-words").html(extraWords);
//            $("#out_rate").html(enemiesPerSec);
            initiate();
        };
        
        

        function update() {
            for (var i = 0; i < enemies_on_screen.length; i++) {
                enemies_on_screen[i].update();                
            }
            if(Hero.isShot()){
                enemies_on_screen = Hero.updateBullets(enemies_on_screen);
            }
        };
        //Auto Focus to input
        $('#defense-code').focus();
        //Prevent from accidentally pressing enter
        $('textarea').keypress(function(event) {
            // Check the keyCode and if the user pressed Enter (code = 13) 
            // disable it
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });
        
        var mainloop = function() {
            if (!lost) {
                if (win()) {
                    nextLevel();
                }
                var tmp = wordMatch(killed);
                if(tmp !== null){
                    killed.push(tmp);
                }
                update();
                lost = lose();
            }
        };
        
        var add_enemy_id = setInterval(function(){
            if(!lost && !win()){
                for(var i = 0 ; i < enemiesPerSec ; i++){
                    if(seconds < enemies.length){
                        enemies_on_screen.push(enemies[seconds]);
                        seconds++;
                    }
                }
            }
        }, 1500);
        //Sets the main function to load on repeat, at a framerate of 60 per sec.
        var timer_id = setInterval(mainloop, (1000 / 60));
    });
    
    

</script>
@stop


@section('content')
<div class='left'>
    <div class='ui_top'>
        <div class="input_area">
            <span class='label'>Defense Code: </span>
            <textarea id='defense-code' rows="1"></textarea>
        </div>
        <div class='word_area'>
            <span class='label'>New Words: </span>
            <div class="new_word_list" id="new_word_list"></div>
        </div>
    </div>
    <div id="game"></div>
</div>
<div class="right">    
    <div class="old_word_list" id ="old_word_list">
        <div class='ghost'></div>
        <span class='label'> Old Words: </span>
    </div>
    <div class='cols'>
        <div class='word_col' id='col_0'></div>
        <div class='word_col' id='col_1'></div>
    </div>
</div>
@stop