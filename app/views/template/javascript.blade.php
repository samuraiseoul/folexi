<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>
<script src="{{URL::asset('js/form_helper.js')}}"></script>
<script>
$(document).ready(function(){
    $('#logout').click(function(){
        $.ajax({ url : "{{URL::to('logout')}}" , success : function(json){
                if(json.status === "OK"){
                    location.reload();                    
                }else{
                    alert("Failed to logout!");
                }
        }}); 
    });    
});
</script>