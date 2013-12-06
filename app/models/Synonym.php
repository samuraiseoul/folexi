<?php
class Synonym extends Eloquent{
    public function word(){
        return $this->belongsTo('Word', 'synonym_id');
    }
}