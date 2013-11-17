<?php

$filename = URL::asset("dic/".$lang1."_master.dic");
error_log($filename);
$file = fopen($filename, "a+"); // opens file
if ($file == false) {
echo ( "Error in opening file" );
exit(); 
}
$filesize = filesize($filename); // file size
$filetext = fread($file, $filesize); // requires filesize for some reason.
fclose($file);
$lang1 = unserialize($filetext);



$filename = URL::asset("dic/".$lang2."_master.dic");
$file = fopen($filename, "a+"); // opens file
if ($file == false) {
echo ( "Error in opening file" );
exit(); 
}
$filesize = filesize($filename); // file size
$filetext = fread($file, $filesize); // requires filesize for some reason.
fclose($file);
$lang2 = unserialize($filetext);


$ret = array();
if(count($lang1) == count($lang2)){
    for($i = 0 ; $i < count($lang1) ; $i++){
        $ret[$lang1[$i]] = $lang2[$i];
        array_push($koEn, array($enWords[$i] => $koWords[$i]));
    }
    return Response::json(array("status" == "OK", "data" => $ret));
}else{
    return Response::json(array("status" == 'FAIL'));
}