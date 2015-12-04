<!DOCTYPE HTML>
<html>

<head>

 <meta charset="UTF-8">
 <title>@yield('title', 'Folexi - Vocabulary Game')</title>
 <meta name="description" content="Folexi is a foreign language vocabulary game.
       We use spaced repetition of words in a fun environment to maximize retention!">
       
 <link rel="stylesheet" type="text/css" href="{{URL::asset('css/flexgrid.css')}}">
 <link rel="stylesheet" type="text/css" href="{{URL::asset('css/main.css')}}">
 
 <link rel="icon" href="{{URL::asset('images/favicon.ico')}}" type="image/x-icon" />
 
 @include('template.javascript')
 @yield('js')

</head>

<body>
    @include('template.header')
    <div class='content wrapper' id='content'>
        @yield('content')
    </div>
    @include('template.footer')
</body>

</html>