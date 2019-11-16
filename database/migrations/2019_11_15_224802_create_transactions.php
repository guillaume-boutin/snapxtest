<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('company_id');
            $table->unsignedTinyInteger('payment_method_id');
            $table->decimal('subtotal', 11, 2);
            $table->decimal('tps', 11, 2)->nullable()->default(null);
            $table->decimal('tvq', 11, 2)->nullable()->default(null);
            $table->date('date_of_purchase');
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('payment_method_id')->references('id')->on('payment_methods');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
