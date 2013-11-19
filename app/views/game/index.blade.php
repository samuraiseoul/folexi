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
<script type="text/javascript" src="{{URL::asset('js/textButton.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/lean-slider.js')}}"></script>
<link rel="stylesheet" href="{{ URL::asset('css/lean-slider.css')}}" type="text/css" />
<script type="text/javascript">
    $(document).ready(function() {
        $('#slider').leanSlider({
            pauseTime: false,
            directionNav: '#slider-direction-nav',
            controlNav: '#slider-control-nav',
            prevText: '<span class="arrow left"> < </span>',
            nextText: '<span class="arrow right"> > </span>'
        });
        $('#tutorial').hide();
        $('#pausemenu').hide();
        $('#lose_menu').hide();
    });
</script>
<script type="text/javascript">
    var dic = {};
    var levels = [];
    var lang1 = "en";
    var lang2 = "en";
    
    $(document).ready(function(){
        $("#lang1").change(function(){
            lang1 = $('#lang1').val();
        });        
        
        $("#lang2").change(function(){
            lang2 = $('#lang2').val();
        });        
    }); 

    $(document).ready(function(){
        var startTime = 0;
        var canvas = $('#game');
        var w = canvas.width();
        var h = (canvas.width()*.6);
        var paper = new Raphael($('#game')[0], w, h);
        enemies_on_screen = [];
        killed = [];
        enemies = [];
        level = 0;
        extraWords = 0;
        speedMult = 0;
        var enemiesPerSec = 1;
        var mainmenu = true;
        var killedWords = 0;
        var paused = false;
        var thisLevel = [];
        var knownWords = [];
        
        var seconds = 0;
        
        var lost = false;
        
        function oldWordsToLevel(){
            if(knownWords.length > 0){
//                console.log("l: "+level+" eW: "+extraWords);
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
//                    console.log("tmp: "+tmp+" kWs:");
//                    console.log(knownWords);
                    thisLevel.push(knownWords[tmp]);
                }
            }            
        }
        function setEnemies(){
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
        }
        function createEnemies(){//makes sure new enemies are not special.
//            console.log(level);
//            console.log(levels);
//            console.log(thisLevel);
            for (var i = 0; i < levels[level].length; i++) {
                    enemies.push(new enemyWord(paper, Hero.center(), thisLevel[i][1],
                    thisLevel[i][0], speedMult, thisLevel[i][2]));
            }
            for (var i = 3; i < thisLevel.length; i++) {
                    var special = Math.ceil(((Math.random()*10)%3));
                    //give 25% chance of special enemy.
                    if(special < 2){
                    enemies.push(new enemyWord(paper, Hero.center(), thisLevel[i][1],
                    thisLevel[i][0], speedMult, thisLevel[i][2]));
                    }else{
                        var type = Math.ceil(((Math.random()*10)%8));
                        if(type < 3){
                            enemies.push(new redSpecial(paper, Hero.center(), 
                            thisLevel[i][1], thisLevel[i][0], speedMult, thisLevel[i][2]));                            
                        }
                        else if(type < 7){
                            enemies.push(new yellowSpecial(paper, Hero.center(),
                            thisLevel[i][1], thisLevel[i][0], speedMult , thisLevel[i][2]));                            
                        }else
                            enemies.push(new purpleSpecial(paper, Hero.center(),
                        thisLevel[i][1], thisLevel[i][0], speedMult, thisLevel[i][2]));                            
                        }
            }
            setEnemies();
        }
                       
        function initiate() {
            thisLevel = levels[level].concat();
            oldWordsToLevel();
            for(var i = 0 ; i < levels[level].length ; i++){
                $('#new_word_list').append(levels[level][i][0] + " ");
            }
            createEnemies();
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
                    dic[enemies_on_screen[i].getIndex()][3]++;
                    Hero.update();
                    kill = i;
                    //can only type in one word at a time.
                    break;
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
                console.log(dic);
                knownWords = knownWords.concat(levels[level]);
//                console.log(levels[level]);
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
            killedWords += enemies.length;
            seconds = 0;
            enemies_on_screen = [];
            enemies = [];
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
        function start(){
            Hero = new hero(paper);
            Hero.set((w*.055), (h*.47), ((w*.055)*.73));
            Hero.setSize(2);
            Hero.draw();
            //First initialization
            initiate();
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
        }
        
        $('#menu').width(w);
        $('#menu').height(h);
        
        function reset(){
            killed = [];
            enemies_on_screen = [];
            enemies = [];
            knownWords = [];
            thisLevel = [];
            seconds = 0;
            paper.clear();
            level = 0;
            extraWords = 0;
            speedMult = 0;
            enemiesPerSec = 1;
            paused = false;
            mainmenu = true;
        }
        
        $("#start_btn").click(function(){
                $('#menu').hide();
                paper.clear();
                mainmenu = false;
//                console.log("l1: "+lang1+" l2: "+lang2);
                $.ajax({
                    type : "POST",
                    url : "{{URL::to('dic/get')}}",
                    data : {lang1 : lang1,
                            lang2 : lang2},
                    success : function( json ) {
//                        console.log(json.data.dic);
                                dic = json.data.dic;
                                    ajaxDone = true;
                                },
                    dataType : "json",
                    async : false
                });
//                console.log(dic);
                levels = [];
                for (var i = 0, k = 0; i < dic.length; i += 3, k++) {
                    levels.push([]);
                    for (var j = 0; j < 3; j++) {
                        levels[k].push(dic[i + j]);
                    }
                }
//                    console.log(levels);
                start();
        });
        $("#tutorial_btn").click(function(){
            $("#pausemenu").hide();
            $('#mainmenu').hide();
            $('#tutorial').show();
        });
        $("#pause_tutorial_btn").click(function(){
            $("#pausemenu").hide();
            $('#mainmenu').hide();
            $('#tutorial').show();
        });
        $('#exit').click(function(){
            if(lost){
                $('#lose_menu').show();
            }else if(!paused){
                $('#mainmenu').show();
            }else{
                $('#pausemenu').show();
            }
            $('#tutorial').hide();            
        });
        
        $('#mainmenu_btn').click(function(){
            reset();
            console.log("HERE");
            $("#new_word_list").html('');
            $('.word_col').html('');
            $('#pausemenu').hide();
            $('#mainmenu').show();         
            $('#defense-code').prop("disabled", false);
        });
        function restartLevel(){
            killed = [];
            enemies_on_screen = [];
            enemies = [];
            paper.clear();
            paused = false;
            thisLevel = [];
            seconds = 0;
            start();            
        }
        $('#restart_btn').click(function(){
            $('#pausemenu').hide();
            $('#menu').hide();
            $("#new_word_list").html('');
            $('#defense-code').prop("disabled", false);
            restartLevel();
        });
        
        $(document).keyup(function(e) { 
            if (e.which === 27) {
                paused = !paused;
                if(paused){
                    $('#menu').show();
                    $('#tutorial').hide();
                    $('#mainmenu').hide();
                    $('#pausemenu').show();
                    $('#defense-code').prop("disabled", true);
                }else{
                    $('#tutorial').hide();
                    $('#mainmenu').hide();
                    $('#pausemenu').hide();
                    $('#menu').hide();
                    $('#defense-code').prop("disabled", false);
                }
            }
        });
        var loseMenu = false;
        function loseMenuDisplay(){
            loseMenu = true;
            $('#menu').show();
            $('#tutorial').hide();
            $('#mainmenu').hide();
            $('#pausemenu').hide();
            $('#lose_menu').show();
        }
        $('#lose_restart_btn').click(function(){
            console.log("here!");
            $('#pausemenu').hide();
            $('#lose_menu').hide();
            $('#menu').hide();
            $("#new_word_list").html('');
            lost = false;
            loseMenu = false;
            restartLevel();
        });
        $("#lose_tutorial_btn").click(function(){
            $("#pausemenu").hide();
            $('#mainmenu').hide();
            $('#lose_menu').hide();
            console.log("lost: "+lost);
            $('#tutorial').show();
        });
        $('#lose_mainmenu_btn').click(function(){
            $('#lose_menu').hide();
            reset();
            $("#new_word_list").html('');
            $('.word_col').html('');
            $('#pausemenu').hide();
            $('#mainmenu').show();         
            lost = false;
            loseMenu = false;
        });
        var mainloop = function() {
            if(!mainmenu){
                if(!paused){
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
                    }else{
                        if(!loseMenu){
                            loseMenuDisplay();
                        }
                    }
                }
            }
        };
        
        
        var add_enemy_id = setInterval(function(){            
            if(!mainmenu){
                if(!paused){
                    if (!lost) {
                        if(!lost && !win()){
                            for(var i = 0 ; i < enemiesPerSec ; i++){
                                if(seconds < enemies.length){
                                    enemies_on_screen.push(enemies[seconds]);
                                    seconds++;
                                }
                            }
                        }
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
<div class="game_container">
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
    <div id='menu' class='menu'>
            @include('game/mainmenu')
            @include('game/tutorial')
            @include('game/pause')
            @include('game/losemenu')
    </div>
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
</div>
@stop