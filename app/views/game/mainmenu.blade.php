<div id="mainmenu">
    <div class='center'>
        <div id='lang' class='lang'>
        @include('dic.langSelect', array('lang' => 'lang1'))
        To: @include('dic.langSelect', array('lang' => "lang2"))
        <br><br>
        Level: {{
        Form::select
        (
        'level', 
        array(
        '1' => 'One',
        '2' => 'Two',
        '3' => 'Three',
        '4' => 'Four',
        '5' => 'Five',
        '6' => 'Six'
        ),
        null,
        array('id' => 'level')
        )
        }}
        </div>
        <span id='start_btn' class='button clickable'>START</span><br>
        <span id='tutorial_btn' class='button clickable'>TUTORIAL</span>
    </div>
</div>