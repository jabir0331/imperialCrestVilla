import { useNavigate } from 'react-router-dom'
import '../assets/styles/RoomsPage.css'

const RoomsPage = () => {
    const navigate = useNavigate();

    const navigateToBookings = () => {
        navigate('/bookYourStay');
    }

    const rooms = [
        {
            id: "royal",
            name: "Russian Royal Suite",
            price: "LKR 15,000",
            image: "/images/RussianRoyalSuiteImg1.jpg",
            features: [
                "Premium A/C with Climate Control",
                "Luxury King Bed with Tufted Headboard",
                "Marble En-suite Bathroom",
                "Crystal Chandelier Lighting",
                "Panoramic Mountain View",
                "Ornate Russian Palace Décor",
                "Premium Silk Curtains & Drapes",
                "Marble Flooring with Area Rugs",
                "Elegant Seating Area",
                "Classical Architectural Details"
            ]
        },
        {
            id: "tsar",
            name: "Tsar Deluxe Room",
            price: "LKR 12,000",
            image: "/images/TsarDeluxeRoomImg1.jpg",
            features: [
                "Central A/C System",
                "Plush Queen Bed with Upholstered Headboard",
                "Modern En-suite Bathroom",
                "Contemporary Designer Lighting",
                "Forest & Landscape Views",
                "Minimalist Russian-Inspired Design",
                "Floor-to-Ceiling Windows",
                "Polished Stone Flooring",
                "Comfortable Reading Chair",
                "Clean Architectural Lines"
            ]
        },
        {
            id: "heritage",
            name: "Heritage Standard Room",
            price: "LKR 8,000",
            image: "/images/HeritageStandardRoomImg1.jpg",
            features: [
                "Natural Ventilation with Fan Option",
                "Classic Double Bed with Ornate Frame",
                "Shared Heritage-Style Bathroom",
                "Traditional Sconce Lighting",
                "Garden & Courtyard Views",
                "Authentic 18th Century French Design",
                "Antique Furnishings & Décor",
                "Parquet Wood Flooring",
                "Period-Appropriate Seating",
                "Hand-Carved Architectural Elements",
                "Fresh Floral Arrangements"
            ]
        }
    ];

    return (
        <div className="py-20 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-left mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Luxurious Rooms</h2>
                    <p className="text-xl text-green-700 max-w-5xl">
                        Immerse yourself in the grandeur of Russian imperial heritage with our meticulously crafted suites
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {rooms.map((room, index) => (
                        <div key={index} className={`group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl ${index === 0 ? 'ring-4 ring-amber-200' : ''
                            }`}>
                            {/* Premium Badge for Royal Suite */}
                            {index === 0 && (
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        ★ PREMIUM
                                    </span>
                                </div>
                            )}

                            {/* Image Section with Overlay */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                {/* Room Name Overlay */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white text-2xl font-bold drop-shadow-lg mb-1">{room.name}</h3>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8">
                                {/* Price Section */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                                            {room.price}
                                        </p>
                                        <p className="text-gray-500 text-sm">per night</p>
                                    </div>
                                    <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                                        <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-green-700 text-xs font-semibold">FEATURED</span>
                                    </div>
                                </div>

                                {/* Features Grid */}
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        Room Amenities
                                    </h4>
                                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto custom-scrollbar">
                                        {room.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start bg-gradient-to-r from-green-50 to-amber-50 p-3 rounded-lg border border-green-100 hover:shadow-md transition-shadow duration-200">
                                                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm leading-relaxed font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={navigateToBookings}
                                    className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-800 hover:to-green-900 transform hover:translateY-[-2px] transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <span className="flex items-center justify-center">
                                        Reserve This Room
                                        <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default RoomsPage
