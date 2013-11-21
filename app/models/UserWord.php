<?php
class UserWord extends Eloquent{
    public function word(){
        return $this->belongsTo('Word');
    }
}