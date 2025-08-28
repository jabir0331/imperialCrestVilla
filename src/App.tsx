import React, { useState } from 'react';
import { Menu, X, MapPin, Phone, Mail, Calendar, Users, Star, ChevronLeft, ChevronRight, CheckCircle, Leaf, Sun, Droplets, TreePine } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState('heritage');

  // Room prices and pricing calculation
  const roomPrices = {
    heritage: 8000,
    tsar: 12000,
    royal: 15000
  };

  // Calculate pricing: Selected Room Price + Extra Charge × (1 + 0.25 × (Number of Persons - 1))
  const calculatePrice = (roomType: string, guests: number) => {
    const selectedRoomPrice = roomPrices[roomType as keyof typeof roomPrices];
    const extraCharges = 8000;
    const calculatedExtraCharges = extraCharges * (1 + 0.25 * (guests - 1));
    return selectedRoomPrice + calculatedExtraCharges;
  };

  // Get calculated extra charges for display
  const getExtraCharges = (guests: number) => {
    const extraCharges = 8000;
    return Math.round(extraCharges * (1 + 0.25 * (guests - 1)));
  };

  const navigation = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About Us' },
    { id: 'rooms', name: 'Rooms & Pricing' },
    { id: 'dining', name: 'Dining' },
    { id: 'attractions', name: 'Attractions' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'booking', name: 'Book Now' },
    { id: 'contact', name: 'Contact' }
  ];

  const rooms = [
    {
      id: "royal",
      name: "Russian Royal Suite",
      price: "LKR 15,000",
      image: "/Room1.jpg",
      features: ["A/C", "King Bed", "Attached Bathroom", "Mountain View", "Russian Décor"]
    },
    {
      id: "tsar",
      name: "Tsar Deluxe Room",
      price: "LKR 12,000", 
      image: "/Room2.jpg",
      features: ["A/C", "Queen Bed", "Attached Bathroom", "Forest View", "Cultural Artifacts"]
    },
    {
      id: "heritage",
      name: "Heritage Standard Room",
      price: "LKR 8,000",
      image:" /Room3.jpg",
      features: ["Non-A/C", "Double Bed", "Shared Bathroom", "Garden View", "Traditional Design"]
    }
  ];

  const galleryImages = [
    "/Gallery1.jpg",
    "/Gallery2.jpg",
    "/Gallery3.jpg",
    "/Gallery4.jpg",
    "/Gallery5.jpg",
    "/Gallery6.jpg",
    "/Gallery7.jpg",
    "/Gallery8.jpg",
    "/Gallery9.jpg",
  ];

  const nextImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const Header = () => (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Leaf className="w-8 h-8 text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-green-800">Imperial Crest Villa</h1>
            <span className="ml-2 text-sm text-green-600">Nuwara Eliya</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.id 
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
                  className={`block px-3 py-2 text-base font-medium w-full text-left ${
                    currentPage === item.id ? 'text-green-800 bg-green-100' : 'text-gray-600'
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
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="/Gallery2.jpg" 
            alt="Imperial Crest Villa" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-bold mb-6">Imperial Crest Villa</h1>
            <p className="text-3xl mb-8">Experience Nature, Comfort & Serenity</p>
            <p className="text-xl mb-4">Experience the Charm of Russia in the Heart of Sri Lanka's Little England</p>
            <p className="text-lg mb-12 max-w-3xl mx-auto">
              Discover authentic Russian elegance surrounded by pristine nature, where majestic mountains, 
              lush forests, and cascading waterfalls create the perfect eco-friendly luxury retreat.
            </p>
            <button 
              onClick={() => setCurrentPage('booking')}
              className="bg-green-500 text-white px-8 py-4 text-lg font-semibold rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🌿 Book Your Stay
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Imperial Crest Villa?</h2>
            <p className="text-xl text-green-700">Discover the unique blend of cultures and natural beauty</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Eco-Friendly Luxury</h3>
              <p className="text-gray-600">Experience sustainable luxury with authentic Russian décor in harmony with nature.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TreePine className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nature Immersion</h3>
              <p className="text-gray-600">Surrounded by pristine forests, mountains, and waterfalls with direct access to nature trails.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sun className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Wellness & Serenity</h3>
              <p className="text-gray-600">Personalized wellness experiences in a tranquil setting that rejuvenates mind and body.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Imperial Crest Villa</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A unique fusion of Russian heritage and Sri Lankan hospitality in the heart of Nuwara Eliya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg" 
              alt="Villa Interior" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Imperial Crest Villa was born from a vision to create a unique cultural bridge between Russia and Sri Lanka. 
              Nestled in the picturesque hill country of Nuwara Eliya, our villa offers guests an unprecedented experience 
              of Russian elegance combined with Sri Lankan warmth.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Every corner of our villa tells a story – from the carefully curated Russian artifacts and décor to the 
              breathtaking views of the surrounding mountains and forests. We believe in offering not just accommodation, 
              but a complete cultural immersion.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our strategic location makes us the perfect base for exploring hiking trails, waterfalls, and the natural 
              beauty of Nuwara Eliya, while enjoying the comfort of our Russian-inspired luxury accommodations.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Mission</h3>
          <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
            To provide our guests with an unforgettable eco-luxury experience that celebrates Russian cultural heritage 
            while embracing Sri Lanka's pristine natural beauty. We create lasting memories through sustainable practices, 
            authentic cultural experiences, and harmonious connection with nature.
          </p>
        </div>
      </div>
    </div>
  );

  const RoomsPage = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Rooms & Pricing</h2>
          <p className="text-xl text-gray-600">
            Choose from our carefully designed rooms, each offering a unique Russian cultural experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img 
                src={room.image} 
                alt={room.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{room.name}</h3>
                <p className="text-3xl font-bold text-green-600 mb-6">{room.price}/day</p>
                <ul className="space-y-2 mb-8">
                  {room.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Leaf className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setCurrentPage('booking')}
                  className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DiningPage = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Dining Experience</h2>
          <p className="text-xl text-gray-600">
            Savor the perfect fusion of Sri Lankan and Russian cuisines
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg" 
              alt="Russian Cuisine" 
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Russian Delicacies</h3>
              <p className="text-gray-600 mb-6">
                Experience authentic Russian flavors with traditional dishes prepared by our expert chefs. 
                From hearty borscht to delicate blinis, taste the essence of Russian culinary heritage.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Traditional Borscht</li>
                <li>• Beef Stroganoff</li>
                <li>• Blinis with Caviar</li>
                <li>• Russian Tea Service</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="/SriLankan Food.jpg"
          
              alt="Sri Lankan Cuisine" 
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sri Lankan Specialties</h3>
              <p className="text-gray-600 mb-6">
                Indulge in the rich and aromatic flavors of Sri Lankan cuisine, featuring fresh local ingredients 
                and traditional spices that create an unforgettable culinary journey.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Rice & Curry</li>
                <li>• Hoppers & String Hoppers</li>
                <li>• Fresh Seafood</li>
                <li>• Ceylon Tea</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg p-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-6">Fusion Menu Highlights</h3>
          <p className="text-center text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
            Our unique fusion menu combines the best of both worlds with organic, locally-sourced ingredients, 
            creating innovative dishes that celebrate both Russian and Sri Lankan culinary traditions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Russian-Spiced Curry</h4>
              <p className="text-gray-600">Organic Sri Lankan curry with traditional Russian herbs and spices</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Ceylon Tea Infused Vodka</h4>
              <p className="text-gray-600">Premium vodka infused with organic Ceylon tea leaves from local gardens</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AttractionsPage = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nearby Attractions</h2>
          <p className="text-xl text-gray-600">
            Discover the natural wonders and adventures surrounding Imperial Crest Villa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="/Attraction1.jpg"
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

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="/Attraction9.jpg"
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

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="/Attraction5.jpg"
              alt="Forest Camping" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Forest Camping</h3>
              <p className="text-gray-600">
                Experience wilderness camping in pristine forests with guided tours and equipment provided.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="/Attraction11.jpg"
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

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="/Attraction12.jpg"
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

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="/Attraction13.jpg"
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
        </div>
      </div>
    </div>
  );

  const GalleryPage = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Gallery</h2>
          <p className="text-xl text-gray-600">
            Explore the beauty of Imperial Crest Villa and its surroundings
          </p>
        </div>

        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <img 
                src={galleryImages[currentGalleryIndex]} 
                alt="Gallery Image" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentGalleryIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentGalleryIndex(index)}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BookingPage = () => (
    <div className="py-20">
      {/* Booking Confirmation Modal */}
      {showBookingConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Confirmation</h3>
            <p className="text-gray-600 mb-6">
              Your Booking was requested successfully. Our team will contact you soon... Thank you!!!
            </p>
            <button 
              onClick={() => setShowBookingConfirmation(false)}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Book Your Stay</h2>
          <p className="text-xl text-gray-600">
            Reserve your room at Imperial Crest Villa for an unforgettable experience
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <select 
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="royal">Russian Royal Suite - LKR 15,000</option>
                  <option value="tsar">Tsar Deluxe Room - LKR 12,000</option>
                  <option value="heritage">Heritage Standard Room - LKR 8,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                <select 
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
                <div className="mt-2 text-lg font-semibold text-green-600">
                  Total Price: LKR {calculatePrice(selectedRoom, numberOfGuests).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
              <textarea 
                rows={4}
                placeholder="Any special requirements or requests..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Booking Summary</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Selected Room:</span>
                  <span className="font-semibold">
                    {selectedRoom === 'royal' ? 'Russian Royal Suite' : 
                     selectedRoom === 'tsar' ? 'Tsar Deluxe Room' : 
                     'Heritage Standard Room'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Room Price:</span>
                  <span className="font-semibold">LKR {roomPrices[selectedRoom as keyof typeof roomPrices].toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Guests:</span>
                  <span className="font-semibold">{numberOfGuests} {numberOfGuests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Extra Charges (calculated per number of persons):</span>
                  <span className="font-semibold">LKR {getExtraCharges(numberOfGuests).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold text-green-700">
                  <span>Total Amount Payable:</span>
                  <span>LKR {calculatePrice(selectedRoom, numberOfGuests).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setShowBookingConfirmation(true)}
              className="w-full bg-green-700 text-white py-4 text-lg font-semibold rounded-lg hover:bg-green-800 transition-colors duration-300 transform hover:scale-105"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-xl text-gray-600">
            Get in touch with us for bookings, inquiries, and more information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-green-600 mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">Imperial Crest Villa<br />56, Queen Elizabeth Drive<br />Nuwara Eliya, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-green-600 mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+94 52 222 3456<br />+94 77 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-green-600 mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@imperialcrestvilla.com<br />bookings@imperialcrestvilla.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>2:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Office Hours:</span>
                    <span>24/7 Reception</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option>General Inquiry</option>
                    <option>Booking Question</option>
                    <option>Service Feedback</option>
                    <option>Partnership Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={6}
                    placeholder="Please share your message or inquiry..."
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-green-700 text-white py-3 text-lg font-semibold rounded-lg hover:bg-green-800 transition-colors duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-green-50 rounded-lg p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Visit Us in Nuwara Eliya</h3>
            <p className="text-center text-gray-600 mb-6">
              Located in the heart of Sri Lanka's hill country, surrounded by breathtaking natural beauty
            </p>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.123456789!2d80.7718!3d6.9497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae380b2e0d4e7a7%3A0x1234567890abcdef!2s56%20Queen%20Elizabeth%20Dr%2C%20Nuwara%20Eliya%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1234567890123!5m2!1sen!2slk"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Imperial Crest Villa Location"
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=56+Queen+Elizabeth+Drive,+Nuwara+Eliya,+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-green-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <Leaf className="w-8 h-8 text-green-400 mr-2" />
              <h3 className="text-2xl font-bold">Imperial Crest Villa</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience eco-luxury with authentic Russian culture and Sri Lankan hospitality in harmony with nature's pristine beauty.
            </p>
            <div className="flex space-x-4">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">56, Queen Elizabeth Drive, Nuwara Eliya, Sri Lanka</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => setCurrentPage(item.id)}
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
                <Mail className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-gray-300">info@imperialcrestvilla.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Imperial Crest Villa. All rights reserved. | Sustainable luxury meets Russian culture in nature's embrace.
          </p>
        </div>
      </div>
    </footer>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'rooms': return <RoomsPage />;
      case 'dining': return <DiningPage />;
      case 'attractions': return <AttractionsPage />;
      case 'gallery': return <GalleryPage />;
      case 'booking': return <BookingPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;