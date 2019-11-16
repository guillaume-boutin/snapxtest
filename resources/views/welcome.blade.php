<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <meta name="api-routes" content="{{ $apiRoutes->toJson() }}">
    </head>

    <body>
        <div id="app"></div>
    </body>
</html>
