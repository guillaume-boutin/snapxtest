<?php

Route::group(['prefix' => 'companies', 'as' => 'company'], function () {
    Route::get('/', 'Company\Index')->name('.index');
});