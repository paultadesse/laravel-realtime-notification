<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);



        if (auth()->attempt($request->only('email', 'password'))) {

            $token = auth()->user()->createToken('vuesaptoken')->plainTextToken;

            $response = [
                'user' => auth()->user(),
                'token' => $token
            ];

            return response($response, 200);
        }
        throw ValidationException::withMessages(
            [
                'email' => ['The Provided credentials are Incorrect.']
            ]
        );
    }

    public function logout(Request $request)
    {

        /**
         * Revoke a specific token...
         */

        $request->user()->tokens()->where('id', auth()->id())->delete();

        $response = [
            'message' => 'Logged Out'
        ];

        return response($response, 200);
    }
}
