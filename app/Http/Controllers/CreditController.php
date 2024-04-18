<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Http\Resources\PackageResource;
use App\Models\Feature;
use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreditController extends Controller
{
    public function index()
    {
        $packages = Package::all();
        $features = Feature::where('status', 1)->get();
        return Inertia('Credit/Index', [
            'packages' => PackageResource::collection($packages),
            'features' => FeatureResource::collection($features),
            'success' => session('success'),
            'error' => session('error')
        ]);
    }

    public function buyCredits(Package $package)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

        $checkout_session = $stripe->checkout->sessions->create([
            // 'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $package->name . ' - ' . $package->credits . ' credits',
                    ],
                    'unit_amount' => $package->price * 100,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('credit.success', [], true),
            'cancel_url' => route('credit.cancel', [], true),
        ]);

        Transaction::create([
            'status' => 0,
            'amount' => $package->price,
            'credits' => $package->credits,
            'user_id' => auth()->id(),
            'package_id' => $package->id,
            'session_id' => $checkout_session->id
        ]);

        return redirect($checkout_session->url);
    }

    public function success()
    {
        return redirect()->route('credit.index')->with('success', 'Credits purchased successfully!');
    }

    public function cancel()
    {
        return to_route('credit.index')->with('error', 'Error processing purchase, Please try later!');
    }

    public function webhook()
    {
        $endpoint_secret = env('STRIPE_WEBHOOK_KEY');
        $payload  = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            return response('', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response('', 400);
        }

        // handle event
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $transaction = Transaction::where('session_id', $session->id)->first();
                $transaction->status = 1;
                $transaction->save();
                $user = $transaction->user;
                $user->credits += $transaction->credits;
                $user->save();
                break;
            case 'checkout.session.async_payment_failed':
                $session = $event->data->object;
                $transaction = Transaction::where('session_id', $session->id)->first();
                $transaction->status = 2;
                $transaction->save();
                break;
            default:
                echo 'Received unknown event type' . $event->type;
        }

        return response('', 200);
    }
}
