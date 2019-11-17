<?php

Route::group(['prefix' => 'payment-methods', 'as' => 'paymentMethod'], function () {
    Route::get('/', 'PaymentMethod\Index')->name('.index');
});