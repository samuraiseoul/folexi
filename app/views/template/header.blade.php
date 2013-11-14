<div class='header'>
    <div class='logo'>
        <a href='{{URL::to("")}}'>FOLEXI</a>
    </div>
    <div class="user_info">
        <span class='center'>
            <span class='wrapper'>
                @if(Auth::check())
                Welcome <br>
                {{Auth::user()->first_name}} {{Auth::user()->last_name}}!
                @else
                <a href="{{URL::to('user/login')}}">Login</a>
                @endif
            </span>
        </span>
    </div>
    <div class='nav'>
        <div class="game">
            <a href='{{URL::to("game")}}'>Game</a>
        </div>
    </div>
</div>