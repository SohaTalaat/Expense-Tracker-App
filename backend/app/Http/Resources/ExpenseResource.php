<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'amount' => $this->amount,
            'date' => $this->date,
            'notes' => $this->notes,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
        ];
    }
}
