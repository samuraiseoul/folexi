<!DOCTYPE HTML>
<html>
<head>
 <meta charset="UTF-8">
 <title>@yield('title', 'Folexi - Vocab Game')</title>
 <meta name="description" content="Folexi is a foreign language vocabulary game.
       We use spaced repetition of words in a fun environment to maximize retention!">
 <link rel="stylesheet" type="text/css" href="{{URL::asset('css/main.css')}}">
 <link rel="icon" href="{{URL::asset('images/favicon.ico')}}" type="image/x-icon" />
 @include('template.javascript')
 @yield('js')
</head>
<body>
    <div class='wrapper'>
    @include('template.header')
    <div class='content' id='content'>
        @yield('content')
    </div>
    </div>
@include('template.footer')
</body>
</html>