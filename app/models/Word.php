<?php
class Word extends Eloquent{
    public function synonyms(){
        return $this->hasMany('Synonym');
    }
}