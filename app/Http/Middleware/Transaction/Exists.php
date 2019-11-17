<?php

namespace App\Http\Middleware\Transaction;

use Closure;
use App\Transaction;

class Exists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (! Transaction::where('id', $request->route('id'))->exists()) {
            return response()->json([], 404);
        }

        return $next($request);
    }
}
