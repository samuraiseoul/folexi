<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>
<script type="text/javascript" src="{{URL::asset('js/form_helper.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('js/jquery.validate.min.js')}}"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45806750-1', 'folexi.com');
  ga('require', 'linkid', 'linkid.js');
  ga('send', 'pageview');

</script>
<script type="text/javascript">
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