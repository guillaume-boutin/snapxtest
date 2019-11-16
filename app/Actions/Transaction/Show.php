<?php

namespace App\Actions\Transaction;

use App\Transaction;
use Lorisleiva\Actions\Action;
use App\Http\Resources\Transaction as TransactionResource;

class Show extends Action
{
    /**
     * Determine if the user is authorized to make this action.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the action.
     *
     * @return array
     */
    public function rules()
    {
        return [];
    }

    /**
     * Execute the action and return a result.
     *
     * @return mixed
     */
    public function handle()
    {
        return Transaction::find($this->get('id'));
    }

    public function jsonResponse($result)
    {
        return response()->json(new TransactionResource($result), 200);
    }
}
