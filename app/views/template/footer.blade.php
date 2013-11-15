<div class="footer">
    <div class="left"> Created by: Scott Lavigne</div>
    <div class="right">
        <a href="{{URL::to('info/faq')}}">FAQ</a> 
        <a href="{{URL::to('info/about')}}">ABOUT</a>
        @if(Auth::check())
        <span id='logout' class='clickable'>LOGOUT</span>
        @endif
    </div>
</div>