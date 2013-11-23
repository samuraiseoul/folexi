{{
Form::select(
$lang,
array(
'en' => 'English',
'ko' => 'Korean',
 "jp" => "Japanese",
 "zh" => "Chinese",
 "es" => "Spanish",
 "fr" => "French"
 ),
null,
array( 'id' => $lang)
)
}}