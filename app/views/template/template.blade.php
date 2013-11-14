<!DOCTYPE HTML>
<html>
<head>
 <meta charset="UTF-8">
 <title>@yield('title', 'Lang - Learn Language')</title>
 <meta name="description" content="Awesome Description Here">
 <link rel="stylesheet" type="text/css" href="{{URL::asset('css/main.css')}}">
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