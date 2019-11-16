<?php

Route::group(['prefix' => 'transactions', 'as' => 'transaction'], function () {
    Route::get('/', 'Transaction\Index')->name('.index');
    Route::get('/{id}', 'Transaction\Show')->name('.show');
    Route::put('/{id}', 'Transaction\Update')->name('.update');
    Route::delete('/{id}', 'Transaction\Delete')->name('.delete');
});