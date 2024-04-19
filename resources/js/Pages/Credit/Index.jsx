import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { Head } from '@inertiajs/react';
import CreditPricingCards from "@/Components/CreditPricingCards";

export default function Index({ packages, features, success, error }) {

    const { auth } = usePage().props;
    const availableCredits = auth.user.available_credits;
    return (
        <AuthenticatedLayout>
            <Head title="Your Credits" />
            <div
                className="max-w-7xl mx-auto sm:px-6 lg:px-8"
            >
                {success && <div
                    className="rounded-lg bg-emerald-500 text-gray-100 p-3 mb-4"
                >
                    {success}
                </div>}
                {error && <div
                    className="rounded-lg bg-red-500 text-gray-100 p-3 mb-4"
                >
                    {error}
                </div>}

                <div
                    className="bg-white mt-2 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg relative"
                >
                    <div
                        className="flex flex-col gap-3 items-center p-4"
                    >
                        <img src="/img/coin.png" alt="coins" className="w-[100px]" />
                        <h3
                            className="text-white text-2xl"
                        >
                            You have {availableCredits} credits.
                        </h3>
                    </div>

                    <CreditPricingCards
                        packages={packages.data}
                        features={features.data}
                    />
                </div>

            </div>
        </AuthenticatedLayout>
    )
}

