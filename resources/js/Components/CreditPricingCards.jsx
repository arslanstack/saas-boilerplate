import { usePage } from "@inertiajs/react"

export default function CreditPricingCards({ packages, features }) {
    const { csrf_token } = usePage().props;
    return (
        <section className="bg-gray-900">
            <div className="py-8 px-4">
                <div className="text-center mb-8">
                    <h2 className="mb-4 text-4xl font-extrabold text-white">
                        The more credits you choose, the more you save.
                    </h2>
                </div>
                <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {packages.map((p) => (
                        <div key={p.id} class="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                            <h3 class="mb-4 text-2xl font-semibold">{p.name}</h3>
                            <p class="font-light sm:text-lg">Best option for personal use & for your next project.</p>
                            <div class="flex justify-center items-baseline my-8">
                                <span class="mr-2 text-5xl font-extrabold">${p.price}</span>
                                <span class="text-white dark:text-white">/{p.credits} Credits</span>
                            </div>
                            <ul role="list" class="mb-8 space-y-4 text-left">
                                {features.map((feature) => (
                                    <li key={feature.id} class="flex items-center space-x-3">
                                        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        <span>{feature.name}</span>
                                    </li>
                                ))}
                            </ul>
                            <form action={route("credit.buy", p)}
                                method="post"
                                className="w-full"
                            >
                                <input type="hidden" name="_token" value={csrf_token} autoComplete="off" />
                                <button
                                    type="submit"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                                >
                                    Get Started
                                </button>
                            </form>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
