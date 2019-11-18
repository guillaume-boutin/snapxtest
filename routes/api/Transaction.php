<?php

use App\Http\Middleware\Transaction\Exists;

Route::group(['prefix' => 'transactions', 'as' => 'transaction'], function () {
    Route::get('/', 'Transaction\Index')->name('.index');
    Route::post('/', 'Transaction\Create')->name('.create');

    Route::group(['middleware' => Exists::class], function () {
        Route::get('/{id}', 'Transaction\Show')->name('.show');
        Route::put('/{id}', 'Transaction\Update')->name('.update');
        Route::delete('/{id}', 'Transaction\Delete')->name('.delete');
    });
});