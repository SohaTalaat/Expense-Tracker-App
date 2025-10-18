<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\IncomeResource;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incomes = Income::where('user_id', Auth::id())->with('category')->get();
        return IncomeResource::collection($incomes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'notes' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $validated['user_id'] = Auth::id();

        $income = Income::create($validated);
        return new IncomeResource($income->load('category'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $income = Income::where('user_id', Auth::id())->with('category')->findOrFail($id);
        return new IncomeResource($income);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $income = Income::where('user_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'notes' => 'nllable|string',
            'category_id' => 'nullable|exists:category,id'
        ]);

        $income->update($validated);
        return new IncomeResource($income->load('category'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $income = Income::where('user_id', Auth::id())->findOrFail($id);
        $income->delete();

        return response()->json(['message', 'Income Deleted Successfully']);
    }
}
