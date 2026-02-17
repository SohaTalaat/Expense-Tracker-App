<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::where('user_id', Auth::id())->with('category')->get();
        return ExpenseResource::collection($expenses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'notes' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id'
        ]);

        $validated['user_id'] = Auth::id();
        $expense = Expense::create($validated);

        return new ExpenseResource($expense->load('category'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $expense = Expense::where('user_id', Auth::id())->with('category')->findOrFail($id);
        return new ExpenseResource($expense);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $expense = Expense::where('user_id', Auth::id())->findOrFail($id);
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'amount' => 'sometimes|numeric',
            'date' => 'sometimes|date',
            'notes' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $expense->update($validated);
        return new ExpenseResource($expense->load('category'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $expense = Expense::where('user_id', Auth::id())->findOrFail($id);
        $expense->delete();
        return response()->json(['message' => 'Expense Delted Successfully']);
    }
}
