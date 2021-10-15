<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\RegisteredUserNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'name' => 'required|max:255',
            'username' => 'required|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|min:6|confirmed',
        ]);

        // $email = User::where('email',$request->email)->first();
        // if($email){
        //     return redirect()
        //     ->back()
        //     ->with('message', 'Email is already exists.');
        //  }

        $user =  User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        //assume this is admin

        $admin = User::where('id', 1)->get();
        // dd($admin);
        Notification::send($admin, new RegisteredUserNotification($user));

        if (auth()->attempt($request->only('email', 'password'))) {

            $response = [
                'user' => auth()->user()
                // 'token' => $token
            ];

            return response($response, 201);
        }




        // auth()->attempt($request->only('email', 'password'));

        // return redirect()->route('dashboard');
    }
}
