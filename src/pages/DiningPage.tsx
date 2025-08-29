import { useState } from "react";
import { Award, Clock, Star, Utensils, Users, Globe } from "lucide-react";

const DiningPage = () => {

    const [hoveredCard, setHoveredCard] = useState('');

    const cuisineExperiences = [
        {
            id: 'russian',
            title: 'Russian Culinary Heritage',
            image: '/images/russianFoodMenu.jpg',
            fallbackImage: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
            description: 'Immerse yourself in the rich traditions of Russian cuisine. Our villa offers an authentic culinary journey through the hearty, comforting flavors that define Russian gastronomy.',
            highlights: [
                'Traditional Borscht & Soups',
                'Authentic Beef Stroganoff',
                'Delicate Blinis & Caviar',
                'Premium Russian Tea Service'
            ],
            experience: 'Heritage Cooking',
            region: 'Eastern European',
            availability: 'Daily',
            chefSpecialty: 'Traditional Russian Techniques',
            gradient: 'from-red-500 via-red-600 to-red-700',
            accentColor: 'red'
        },
        {
            id: 'srilankan',
            title: 'Sri Lankan Spice Journey',
            image: '/images/sriLankanFoodMenu.jpg',
            fallbackImage: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
            description: 'Discover the vibrant world of Sri Lankan cuisine at our villa. Experience the perfect harmony of spices, coconut, and fresh ingredients that create unforgettable island flavors.',
            highlights: [
                'Aromatic Rice & Curry',
                'Fresh Hoppers & String Hoppers',
                'Ocean-Fresh Seafood',
                'Authentic Ceylon Tea'
            ],
            experience: 'Spice Mastery',
            region: 'South Asian',
            availability: 'Daily',
            chefSpecialty: 'Traditional Spice Blending',
            gradient: 'from-green-500 via-emerald-600 to-teal-700',
            accentColor: 'emerald'
        }
    ];

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Dining Experience</h2>
                    <p className="text-xl text-green-700">
                        Savor the perfect fusion of Sri Lankan and Russian cuisines
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {cuisineExperiences.map((cuisine) => (
                        <div
                            key={cuisine.id}
                            className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 ${hoveredCard === cuisine.id ? 'shadow-2xl' : ''
                                }`}
                            onMouseEnter={() => setHoveredCard(cuisine.id)}
                            onMouseLeave={() => setHoveredCard('')}
                        >
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${cuisine.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10`} />

                            {/* Experience Badge */}
                            <div className="absolute top-4 left-4 z-20">
                                <div className={`bg-gradient-to-r ${cuisine.gradient} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}>
                                    <Award size={12} />
                                    AUTHENTIC EXPERIENCE
                                </div>
                            </div>

                            {/* Availability Badge */}
                            <div className="absolute top-4 right-4 z-20">
                                <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                    <Clock size={14} />
                                    {cuisine.availability}
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={cuisine.image}
                                    alt={cuisine.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        e.currentTarget.src = cuisine.fallbackImage;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                {/* Floating Info Card */}
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{cuisine.experience}</p>
                                            <p className="text-xs text-gray-600">{cuisine.region} Tradition</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-semibold">Villa Exclusive</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 relative z-10">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                    {cuisine.title}
                                </h3>

                                {/* Villa Feature Info */}
                                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Utensils size={14} />
                                        {cuisine.chefSpecialty}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={14} />
                                        Villa Guests
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                    {cuisine.description}
                                </p>

                                {/* Available Experiences */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                                        <Globe size={18} className={`text-${cuisine.accentColor}-500`} />
                                        Available Culinary Experiences
                                    </h4>
                                    {cuisine.highlights.map((highlight, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group/highlight"
                                        >
                                            <div className={`w-2 h-2 bg-gradient-to-r ${cuisine.gradient} rounded-full`} />
                                            <span className="text-gray-700 group-hover/highlight:text-gray-900 transition-colors font-medium">
                                                {highlight}
                                            </span>
                                            <div className="ml-auto">
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Experience CTA */}
                                <div className="mt-8">
                                    <button className={`w-full bg-gradient-to-r ${cuisine.gradient} text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg`}>
                                        Experience {cuisine.title.split(' ')[0]} Cuisine
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default DiningPage
