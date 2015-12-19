{{
Form::select(
$lang,
array(
'en' => 'English',
'ko' => 'Korean',
 "jp" => "Japanese",
 "zh" => "Chinese",
 "es" => "Spanish",
 "fr" => "French",
 "de" => "German",
 "ar" => "Arabic",
 "hi" => "Hindi",
 "ne" => "Nepali"
 ),
null,
array( 'id' => $lang)
)
}}