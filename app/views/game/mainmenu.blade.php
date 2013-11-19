<div id="mainmenu">
    <div class='center'>
        <div id='lang' class='lang'>
        @include('dic.langSelect', array('lang' => 'lang1'))
        To: @include('dic.langSelect', array('lang' => "lang2"))
        </div>
        <span id='start_btn' class='button clickable'>START</span><br>
        <span id='tutorial_btn' class='button clickable'>TUTORIAL</span>
    </div>
</div>