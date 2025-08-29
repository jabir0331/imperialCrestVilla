import { useNavigate } from "react-router-dom";
import { Leaf, MapPin, Phone, Mail } from "lucide-react"

const Footer = () => {

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
        <footer className="bg-green-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1">
                        <div className="flex items-center mb-4">
                            <Leaf className="w-8 h-8 text-green-400 mr-2" />
                            <h3 className="text-2xl font-bold">Imperial Crest Villa</h3>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md text-justify">
                            Experience eco-luxury with authentic Russian culture and Sri Lankan hospitality in harmony with nature's pristine beauty.
                        </p>
                    </div>

                    <div className="lg:pl-20">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {navigation.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => navigateToRelevantPage(item.id)}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 text-green-400 mr-2" />
                                <span className="text-gray-300">+94 52 222 3456</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 text-green-400 mr-3" />
                                <span className="text-gray-300">info@imperialcrestvilla.com</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Location Info</h4>
                        <div className="space-y-3">
                            <div className="flex ">
                                <MapPin className="w-5 h-5 text-green-400 mr-3" />
                                <span className="text-gray-300">No. 56, <br />Queen Elizabeth Drive, <br />Nuwara Eliya, Sri Lanka</span>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="border-t border-green-800 mt-12 pt-8 text-center">
                    <p className="text-gray-400">
                        &copy; 2025 Imperial Crest Villa. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
