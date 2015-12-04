<header class="wrapper">
    <div class='header row'>
        <div class='logo col_8'>
            <a href='{{URL::to("")}}'>FOLEXI</a>
        </div>
        <div class='nav col_2'>
            <div class="game">
                <a href='{{URL::to("game")}}'>Game</a>
            </div>
        </div>
        <div class="user_info col_2 last">
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
    </div>
</header>