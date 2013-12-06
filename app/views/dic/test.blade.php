<?php
    $defaults = array();
    foreach($words as $w){
        foreach($w['synonyms'] as $s){
            array_push($defaults, $s['synonym_id']);
        }
    }
?>
{{print_r($defaults,true)}}