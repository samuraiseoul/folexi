<div id="mainmenu">
    <div class='center'>
        <div id='lang' class='lang'>
        {{Form::select('lang1', array('en' => 'English',
                                         'ko' => 'Korean',
                                         "es" => "Spanish",
                                         "ja" => "Japanese",
                                         "fr" => "French",
                                         "ru" => "Russian",
                                         "de" => "German",
                                         "hi" => "Hindi",
                                         "ar" => "Arabic",
                                         "zh" => "Chinese"),
                                         null,
                                         array("id" => "lang1"))}}
                                 TO:         
        {{Form::select('lang2', array('en' => 'English',
                                         'ko' => 'Korean',
                                         "es" => "Spanish",
                                         "ja" => "Japanese",
                                         "fr" => "French",
                                         "ru" => "Russian",
                                         "de" => "German",
                                         "hi" => "Hindi",
                                         "ar" => "Arabic",
                                         "zh" => "Chinese"),
                                         null,
                                         array("id" => "lang2"))}}
        </div>
        <span id='start_btn' class='button clickable'>START</span><br>
        <span id='tutorial_btn' class='button clickable'>TUTORIAL</span>
    </div>
</div>