import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, createContext, useContext, Fragment } from 'react';

export default function Feature (feature, answer, children){
    const { auth } = usePage().props;

    const availableCredits = auth.user.available_credits;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {feature.name}
                </h2>
            }
        >
            <Head title='Feature 1' />
            <div className='py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {answer !== null && (
                        <div className='mb-3 py-3 px-5 rouded text-black text-xl'>
                            Result : {answer}
                        </div>
                    )}
                    <div className='overflow-hidden shadow-sm sm:rounded-lg relative'>
                        {availableCredits !== null && feature.requried_credits > availableCredits && (
                            <div className='absolute left-0 top-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center bg-white/70 gap-3'>
                                <div className='text-3xl font-semibold text-red-500'>Insufficient Credits</div>
                                <div className='text-lg font-semibold text-red-500'>You need {feature.requried_credits} credits to access this feature</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

{/* https://youtu.be/BdGvI3W0f9E?t=2027 */}