<?php
class Word extends Eloquent{
    public function synonyms(){
        return $this->hasMany('Synonym', 'word_id')->orWhere('synonym_id', $this->id);
    }
}