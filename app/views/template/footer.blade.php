<div class="footer">
    <div class="left"> Contact us: folexi.info@gmail.com</div>
    <div class="right">
        <a href="{{URL::to('info/faq')}}">FAQ</a> 
        <a href="{{URL::to('info/about')}}">ABOUT</a>
        @if(Auth::check())
        <span id='logout' class='clickable'>LOGOUT</span>
        @endif
    </div>
</div>