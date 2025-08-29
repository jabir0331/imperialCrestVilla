const AttractionsPage = () => {
    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Nearby Attractions</h2>
                    <p className="text-xl text-green-700">
                        Discover the natural wonders and adventures surrounding Imperial Crest Villa
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Tea Plantations */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src="images/attractions/Attraction11.jpg"
                            alt="Tea Plantations"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Tea Plantations</h3>
                            <p className="text-gray-600">
                                Tour world-famous Ceylon tea plantations and learn about traditional tea processing methods.
                            </p>
                        </div>
                    </div>

                    {/* Mountain Hiking */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src="images/attractions/Attraction1.jpg"
                            alt="Hiking Trails"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Mountain Hiking</h3>
                            <p className="text-gray-600">
                                Explore scenic hiking trails with breathtaking views of tea plantations and mountain ranges.
                            </p>
                        </div>
                    </div>

                    {/* Cascading Waterfalls */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src="images/attractions/Attraction9.jpg"
                            alt="Waterfalls"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Cascading Waterfalls</h3>
                            <p className="text-gray-600">
                                Visit stunning waterfalls just minutes away from the villa for a refreshing natural experience.
                            </p>
                        </div>
                    </div>

                    {/* Forest Camping */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src="images/attractions/Attraction5.jpg"
                            alt="Forest Camping"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Forest Camping</h3>
                            <p className="text-gray-600">
                                Experience wilderness camping with guided tours and equipment provided.
                            </p>
                        </div>
                    </div>

                    {/* Wildlife Safari */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src="images/attractions/Attraction13.jpg"
                            alt="Wildlife Safari"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Wildlife Safari</h3>
                            <p className="text-gray-600">
                                Discover exotic wildlife and bird species in nearby national parks and nature reserves.
                            </p>
                        </div>
                    </div>

                    {/* Lake Activities */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src="images/attractions/Attraction12.jpg"
                            alt="Lake Activities"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Lake Activities</h3>
                            <p className="text-gray-600">
                                Enjoy boating, fishing, and water sports at beautiful Lake Gregory and surrounding lakes.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AttractionsPage
