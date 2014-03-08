<?php
class UserWord extends Eloquent{
    protected $table = 'userwords';

    public function word(){
    	$this->primaryKey = 'word_id';
		
        $ret = $this->hasOne('Word', 'id');
		
		$this->primaryKey = 'id';
		
		return $ret;
    }

}