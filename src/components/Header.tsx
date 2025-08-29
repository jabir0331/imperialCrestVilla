import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, X, Menu } from "lucide-react";

const Header = () => {

    const [currentPage, setCurrentPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { id: '', name: 'Home' },
        { id: 'aboutUs', name: 'About Us' },
        { id: 'rooms', name: 'Rooms & Pricing' },
        { id: 'dining', name: 'Dining' },
        { id: 'nearByAttractions', name: 'Attractions' },
        { id: 'gallery', name: 'Gallery' },
        { id: 'bookYourStay', name: 'Book Now' },
        { id: 'contactUs', name: 'Contact Us' }
    ];

    const navigate = useNavigate();

    const navigateToRelevantPage = (path: string) => {
        navigate(`/${path}`);
    }
    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-green-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div className="flex items-center">
                        <Leaf className="w-8 h-8 text-green-600 mr-2" />
                        <h1 className="text-2xl font-bold text-green-800">Imperial Crest Villa</h1>
                        <span className="mt-2 ml-2 text-sm text-green-600">Nuwara Eliya</span>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        {navigation.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigateToRelevantPage(item.id)}
                                className={`text-sm font-medium transition-colors duration-200 ${currentPage === item.id
                                    ? 'text-green-800 border-b-2 border-green-500'
                                    : 'text-gray-600 hover:text-green-800'
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-50">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setCurrentPage(item.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block px-3 py-2 text-base font-medium w-full text-left ${currentPage === item.id ? 'text-green-800 bg-green-100' : 'text-gray-600'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
