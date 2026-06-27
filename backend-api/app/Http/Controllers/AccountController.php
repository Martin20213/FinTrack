<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Http\Resources\AccountResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AccountController extends Controller
{
    public function index(): JsonResponse
    {
        $accounts = Account::orderBy('name')->get();

        $total = $accounts->sum('balance');

        $byType = $accounts->groupBy('type')->map(fn($group) => [
            'total'      => round($group->sum('balance'), 2),
            'count'      => $group->count(),
            'percentage' => $total > 0
                ? round($group->sum('balance') / $total * 100, 1)
                : 0,
        ]);

        return response()->json([
            'accounts' => AccountResource::collection($accounts),
            'summary'  => [
                'total'   => round($total, 2),
                'by_type' => $byType,
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'type'    => 'required|in:folyószámla,befektetés,készpénz,megtakarítás,egyéb',
            'balance' => 'required|numeric|min:0',
            'note'    => 'nullable|string',
        ]);

        $account = Account::create($validated);

        return response()->json(new AccountResource($account), 201);
    }

    public function update(Request $request, Account $account): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'type'    => 'required|in:folyószámla,befektetés,készpénz,megtakarítás,egyéb',
            'balance' => 'required|numeric|min:0',
            'note'    => 'nullable|string',
        ]);

        $account->update($validated);

        return response()->json(new AccountResource($account));
    }

    public function destroy(Account $account): JsonResponse
    {
        $account->delete();

        return response()->json(null, 204);
    }
}