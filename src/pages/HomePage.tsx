import {useNavigate} from 'react-router-dom';
import {Leaf, Sun, TreePine} from "lucide-react";

const HomePage = () => {

    const navigate = useNavigate();

    const navigateToBookings = () =>{
        navigate('/bookYourStay');
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-screen">
                <div className="absolute inset-0">
                    <img 
                        src="images/hero.jpg"
                        alt="Imperial Crest Villa"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center text-white px-4">
                        <h1 className="text-7xl font-extrabold mb-8">Imperial Crest Villa</h1>
                        <p className="text-3xl mb-5 font-bold">Experience Nature, Comfort & Serenity</p>
                        <p className="max-w-4xl text-xl mb-4 font-medium">
                            <i>
                                Experience the charm of Russia in the heart of Sri Lanka’s Little England,
                                where authentic Russian elegance meets pristine nature with majestic mountains,
                                lush forests, and cascading waterfalls, creating the perfect eco-friendly luxury retreat.
                            </i>
                        </p>
                        <button
                            className="bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            onClick={navigateToBookings}
                        >
                            🌿 Book Your Stay
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-b from-green-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-left mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">Why Choose Imperial Crest Villa?</h2>
                        <p className="text-xl text-green-700 font-medium">Discover the unique blend of cultures and natural beauty</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center border border-green-300 rounded-xl p-5">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Eco-Friendly Luxury</h3>
                            <p className="text-gray-600">Experience sustainable luxury with authentic Russian décor in harmony with nature.</p>
                        </div>

                        <div className="text-center border border-green-300 rounded-xl p-5">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <TreePine className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Nature Immersion</h3>
                            <p className="text-gray-600">Surrounded by pristine forests, mountains, and waterfalls with direct access to nature trails.</p>
                        </div>

                        <div className="text-center border border-green-300 rounded-xl p-5">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sun className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Wellness & Serenity</h3>
                            <p className="text-gray-600">Personalized wellness experiences in a tranquil setting that rejuvenates mind and body.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage
