<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Route;

class WelcomeController extends Controller
{
    public function index()
    {
        return view('welcome', [
            'apiRoutes' => $this->apiRoutes()
        ]);
    }

    private function apiRoutes()
    {
        $routes = collect(Route::getRoutes()->getRoutes());

        $routes = $routes->map(function ($route) {
            $methods = $route->methods;
            unset($methods['HEAD']);
    
            preg_match_all('/\{[^\}]*\}/', $route->uri, $params);

            $params = collect($params[0])->map(function ($p) {
                $p = ltrim($p, '{');
                $p = rtrim($p, '}');
    
                return $p;
            });
    
            return [
                'method' => $methods[0],
                'path' => '/' . ltrim($route->uri, '/'),
                'params' => $params,
                'name' => $route->action['as'] ?? null
            ];
        });

        $apiRoutes = $routes->filter(function ($r) {
            return (
                Str::startsWith($r['path'], '/api')
                && $r['name'] !== null
            );
        })->values();

        return $apiRoutes;
    }
}
