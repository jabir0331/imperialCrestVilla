import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Mail, Calendar, Users, Star, ChevronLeft, ChevronRight, CheckCircle, Leaf, Sun, Droplets, TreePine } from 'lucide-react';
import { Globe, Clock, Utensils, Award } from 'lucide-react';
import { Building, DollarSign, User, UserCircle, MessageSquare, MessageCircle, ChevronDown, Receipt } from 'lucide-react';
import { Send } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>("heritage");
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [fullName, setFullName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');

  // Room prices and pricing calculation
  const roomPrices = {
    heritage: 8000,
    tsar: 12000,
    royal: 15000
  };

  type RoomType = keyof typeof roomPrices;

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };

  const numberOfNights = calculateNights();

  const calculatePrice = (
    roomType: RoomType,
    guests: number,
    checkInDate: string,
    checkOutDate: string
  ): number => {
    // Additional guest charges (per person per night after first guest)
    const additionalGuestRate = 2500; // LKR per additional guest per night

    // Service charges (fixed per night regardless of guests)
    const serviceCharges = 1500; // LKR per night

    // Tax rate (as percentage)
    const taxRate = 0.1; // 10% tax

    // Validate inputs
    if (guests < 1 || guests > 10) {
      throw new Error("Number of guests must be between 1 and 10");
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      throw new Error("Check-out date must be after check-in date");
    }

    // Calculate number of nights
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Base room price for selected type
    const baseRoomPrice = roomPrices[roomType];

    // Extra guest charges (after the first guest)
    const additionalGuestCount = Math.max(0, guests - 1);
    const additionalGuestCharges = additionalGuestCount * additionalGuestRate;

    // Per-night cost
    const costPerNight = baseRoomPrice + additionalGuestCharges + serviceCharges;

    // Subtotal (before tax)
    const subtotal = costPerNight * numberOfNights;

    // Tax calculation
    const taxAmount = subtotal * taxRate;

    // Total amount
    const totalAmount = subtotal + taxAmount;

    return totalAmount;
  };

  // Calculate pricing breakdown
  const calculatePricingBreakdown = () => {
    if (numberOfNights <= 0) return null;

    const baseRoomPrice = roomPrices[selectedRoom];
    const additionalGuestRate = 2500;
    const serviceChargesPerNight = 1500;
    const taxRate = 0.1;

    const additionalGuestCount = Math.max(0, numberOfGuests - 1);
    const additionalGuestCharges = additionalGuestCount * additionalGuestRate;

    // Per night costs
    const roomCostPerNight = baseRoomPrice;
    const extraGuestCostPerNight = additionalGuestCharges;
    const serviceCostPerNight = serviceChargesPerNight;
    const subtotalPerNight = roomCostPerNight + extraGuestCostPerNight + serviceCostPerNight;

    // Total costs
    const roomCostTotal = roomCostPerNight * numberOfNights;
    const extraGuestCostTotal = extraGuestCostPerNight * numberOfNights;
    const serviceCostTotal = serviceCostPerNight * numberOfNights;
    const subtotal = roomCostTotal + extraGuestCostTotal + serviceCostTotal;

    // Tax and total
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;

    return {
      perNight: {
        room: roomCostPerNight,
        extraGuests: extraGuestCostPerNight,
        service: serviceCostPerNight,
        subtotal: subtotalPerNight
      },
      total: {
        room: roomCostTotal,
        extraGuests: extraGuestCostTotal,
        service: serviceCostTotal,
        subtotal: subtotal,
        tax: taxAmount,
        total: totalAmount
      },
      details: {
        nights: numberOfNights,
        baseRoomPrice,
        additionalGuestRate,
        serviceChargesPerNight,
        taxRate: taxRate * 100, // Convert to percentage
        additionalGuestCount
      }
    };
  };

  const pricingBreakdown = calculatePricingBreakdown();

  // Get calculated extra charges for display
  const getExtraCharges = (guests: number) => {
    const extraCharges = 8000;
    return Math.round(extraCharges * (1 + 0.25 * (guests - 1)));
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      try {
        const price = calculatePrice(selectedRoom, numberOfGuests, checkInDate, checkOutDate);
        setCalculatedPrice(price);
      } catch (error) {
        console.error("Error calculating price:", error);
        // Handle error appropriately
      }
    }
  }, [selectedRoom, numberOfGuests, checkInDate, checkOutDate]);

  const navigation = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About Us' },
    { id: 'rooms', name: 'Rooms & Pricing' },
    { id: 'dining', name: 'Dining' },
    { id: 'attractions', name: 'Attractions' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'booking', name: 'Book Now' },
    { id: 'contact', name: 'Contact Us' }
  ];

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

  const [hoveredCard, setHoveredCard] = useState(null);

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

  const galleryImages = [
    "/Gallery8.jpg",
    "/Gallery1.jpg",
    "/Gallery2.jpg",
    "/Gallery3.jpg",
    "/Gallery4.jpg",
    "/Gallery5.jpg",
    "/Gallery6.jpg",
    "/Gallery7.jpg",
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
            <span className="mt-2 ml-2 text-sm text-green-600">Nuwara Eliya</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
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
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            // src="/Gallery2.jpg" 
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
              onClick={() => setCurrentPage('booking')}
              className="bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
    </div>
  );

  const AboutPage = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">About Imperial Crest Villa</h2>
          <p className="text-xl text-green-700 max-w-5xl">
            A unique fusion of Russian heritage and Sri Lankan hospitality in the heart of Nuwara Eliya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              // src="https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg" 
              src="/images/hero.jpg"
              alt="Villa Interior"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div className='text-justify text-lg text-gray-600 leading-relaxed'>
            <p className=" mb-6">
              Imperial Crest Villa was born from a vision to create a unique cultural bridge between Russia and Sri Lanka.
              Nestled in the picturesque hill country of Nuwara Eliya, our villa offers guests an unprecedented experience
              of Russian elegance combined with Sri Lankan warmth.
            </p>
            <p className="mb-6">
              Every corner of our villa tells a story – from the carefully curated Russian artifacts and décor to the
              breathtaking views of the surrounding mountains and forests. We believe in offering not just accommodation,
              but a complete cultural immersion.
            </p>
            <p>
              Our strategic location makes us the perfect base for exploring hiking trails, waterfalls, and the natural
              beauty of Nuwara Eliya, while enjoying the comfort of our Russian-inspired luxury accommodations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );

  const RoomsPage = () => (
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
                  onClick={() => setCurrentPage('booking')}
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

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #059669, #ffffff);
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #047857, #ffffff);
        }
      `}</style>
    </div>
  );
  const DiningPage = () => (

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
              onMouseLeave={() => setHoveredCard(null)}
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
                  onError={(e) => {
                    e.target.src = cuisine.fallbackImage;
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
  );

  const AttractionsPage = () => (
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

          {/* Mountain Hiking */}
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

          {/* Cascading Waterfalls */}
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

          {/* Forest Camping */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/Attraction5.jpg"
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

          {/* Lake Activities */}
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

        </div>

      </div>
    </div>
  );

  const GalleryPage = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Gallery</h2>
          <p className="text-xl text-green-700">
            Explore the beauty of Imperial Crest Villa and its surroundings
          </p>
        </div>

        <div className="relative">
          <div className="max-w-7xl mx-auto">
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
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentGalleryIndex ? 'bg-blue-400' : 'bg-gray-200'
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
      {showBookingConfirmation && fullName && phoneNum && email &&(
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Book Your Stay</h2>
          <p className="text-xl text-green-700">
            Reserve your room at Imperial Crest Villa for an unforgettable experience
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6">
            {/* Date Selection Section */}
            <div className="bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 p-6 rounded-2xl shadow-lg border border-blue-100 relative overflow-hidden mb-8">
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-12 h-12 bg-gradient-to-br from-purple-200/15 to-blue-200/15 rounded-full"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Stay Duration</h4>
                  <p className="text-sm text-gray-600">Select your check-in and check-out dates</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Room & Guest Selection */}
            <div className="bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50 p-6 rounded-2xl shadow-lg border border-green-100 relative overflow-hidden mb-8">
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-12 h-12 bg-gradient-to-br from-teal-200/15 to-green-200/15 rounded-full"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <Building size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Accommodation Details</h4>
                  <p className="text-sm text-gray-600">Choose your room type and number of guests</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Room Type
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300 appearance-none cursor-pointer"
                    >
                      <option value="royal">Russian Royal Suite - LKR 15,000</option>
                      <option value="tsar">Tsar Deluxe Room - LKR 12,000</option>
                      <option value="heritage">Heritage Standard Room - LKR 8,000</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Number of Guests
                  </label>
                  <div className="relative">
                    <select
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300 appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={20} className="text-gray-400" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Enhanced Total Price Display */}
              {checkInDate && checkOutDate && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-xl border border-green-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <DollarSign size={16} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-green-800">Total Price</p>
                        <p className="text-xs text-green-600">All inclusive</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        LKR {calculatedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guest Information Section */}
            <div className="bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 p-6 rounded-2xl shadow-lg border border-purple-100 relative overflow-hidden mb-8">
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-12 h-12 bg-gradient-to-br from-indigo-200/15 to-purple-200/15 rounded-full"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Guest Information</h4>
                  <p className="text-sm text-gray-600">Please provide your contact details</p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value = {fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <UserCircle size={20} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phoneNum}
                        required
                        onChange={(e) => setPhoneNum(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Phone size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value = {email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Mail size={20} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Special Requests Section */}
            <div className="bg-gradient-to-br from-amber-50/50 via-white to-orange-50/50 p-6 rounded-2xl shadow-lg border border-amber-100 relative overflow-hidden">
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-12 h-12 bg-gradient-to-br from-yellow-200/15 to-amber-200/15 rounded-full"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Special Requests</h4>
                  <p className="text-sm text-gray-600">Let us know how we can make your stay perfect</p>
                </div>
              </div>

              <div className="group relative z-10">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  Additional Requirements
                  <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    placeholder="Any special requirements, dietary restrictions, accessibility needs, or other requests..."
                    className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300 resize-none"
                  ></textarea>
                  <div className="absolute left-4 top-4 text-gray-400">
                    <MessageCircle size={20} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">We'll do our best to accommodate your special requests</p>
              </div>
            </div>

            {/* Booking Summary Section */}
            {/* Enhanced Booking Summary Section */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 rounded-2xl shadow-xl border border-blue-100 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  <Receipt size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Booking Summary
                  </h3>
                  <p className="text-sm text-gray-600">Review your selection and pricing details</p>
                </div>
              </div>

              {pricingBreakdown ? (
                <div className="space-y-6 text-gray-700 relative z-10">
                  {/* Stay Duration */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Stay Duration:</span>
                      <span className="font-bold text-gray-900">
                        {pricingBreakdown.details.nights} {pricingBreakdown.details.nights === 1 ? 'Night' : 'Nights'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 flex justify-between">
                      <span>Check-in: {checkInDate}</span>
                      <span>Check-out: {checkOutDate}</span>
                    </div>
                  </div>

                  {/* Per Night Breakdown */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-4">
                    <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">Cost Per Night</h4>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between">
                        <span>Room Rate ({selectedRoom === 'royal' ? 'Royal Suite' : selectedRoom === 'tsar' ? 'Tsar Room' : 'Heritage Room'}):</span>
                        <span>LKR {pricingBreakdown.perNight.room.toLocaleString()}</span>
                      </div>

                      {pricingBreakdown.details.additionalGuestCount > 0 && (
                        <div className="flex justify-between">
                          <span>Extra Guests ({pricingBreakdown.details.additionalGuestCount} × LKR {pricingBreakdown.details.additionalGuestRate.toLocaleString()}):</span>
                          <span>LKR {pricingBreakdown.perNight.extraGuests.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Service Charges:</span>
                        <span>LKR {pricingBreakdown.perNight.service.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between border-t pt-2 font-semibold">
                      <span>Subtotal per Night:</span>
                      <span>LKR {pricingBreakdown.perNight.subtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Total Breakdown */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-4">
                    <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">Total Cost</h4>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between">
                        <span>Room ({pricingBreakdown.details.nights} nights):</span>
                        <span>LKR {pricingBreakdown.total.room.toLocaleString()}</span>
                      </div>

                      {pricingBreakdown.total.extraGuests > 0 && (
                        <div className="flex justify-between">
                          <span>Extra Guests:</span>
                          <span>LKR {pricingBreakdown.total.extraGuests.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Service Charges:</span>
                        <span>LKR {pricingBreakdown.total.service.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between border-t pt-2">
                      <span>Subtotal:</span>
                      <span>LKR {pricingBreakdown.total.subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between mt-2">
                      <span>Tax ({pricingBreakdown.details.taxRate}%):</span>
                      <span>LKR {pricingBreakdown.total.tax.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between border-t pt-2 font-bold text-lg mt-3">
                      <span>Total Amount:</span>
                      <span>LKR {pricingBreakdown.total.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Please select check-in and check-out dates to see pricing details</p>
                </div>
              )}
            </div>


            <button
              type="submit"
              onClick={() => setShowBookingConfirmation(true)}
              disabled={!checkInDate || !checkOutDate}
              className={`w-full text-white py-4 text-lg font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105 ${checkInDate && checkOutDate
                  ? 'bg-green-700 hover:bg-green-800'
                  : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              {checkInDate && checkOutDate ? 'Confirm Booking' : 'Select Dates to Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen ">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="text-left mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Contact Us
            </h2>
            <p className="text-xl text-green-700">
              Get in touch with us for bookings, inquiries, and more information about Imperial Crest Villa
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

            {/* Contact Information Section */}
            <div className="bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 rounded-3xl shadow-xl p-8 border border-blue-100 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-purple-200/15 to-blue-200/15 rounded-full"></div>

              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
                  <p className="text-sm text-gray-600">Reach out to us anytime</p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">

                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                    <MapPin size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Imperial Crest Villa<br />
                      56, Queen Elizabeth Drive<br />
                      Nuwara Eliya, Sri Lanka
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Phone</h4>
                    <p className="text-gray-600 leading-relaxed">
                      +94 52 222 3456<br />
                      +94 77 123 4567
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                    <Mail size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-600 leading-relaxed">
                      info@imperialcrestvilla.com<br />
                      bookings@imperialcrestvilla.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 via-gray-50 to-gray-100 rounded-2xl border border-gray-200 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Business Hours</h4>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="font-medium">Check-in:</span>
                    <span className="font-semibold text-green-700">2:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="font-medium">Check-out:</span>
                    <span className="font-semibold text-red-700">8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="font-medium">Office Hours:</span>
                    <span className="font-semibold text-blue-700">24/7 Reception</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50 rounded-3xl shadow-xl p-8 border border-green-100 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-teal-200/15 to-green-200/15 rounded-full"></div>

              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Send size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
                  <p className="text-sm text-gray-600">We'll get back to you soon</p>
                </div>
              </div>

              <form className="space-y-6 relative z-10">

                {/* Full Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User size={20} />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail size={20} />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Subject
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300 appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Booking Question</option>
                      <option>Service Feedback</option>
                      <option>Partnership Opportunity</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      rows={6}
                      placeholder="Please share your message or inquiry..."
                      className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md group-hover:border-gray-300 resize-none"
                    ></textarea>
                    <div className="absolute left-4 top-4 text-gray-400">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 text-lg font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50 rounded-3xl shadow-xl p-8 border border-emerald-100 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-green-200/15 to-emerald-200/15 rounded-full"></div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Location Information</h3>
                <p className="text-sm text-gray-600">See our location and plan your visit with ease</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative z-10">
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

            <div className="text-center mt-6 relative z-10">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=56+Queen+Elizabeth+Drive,+Nuwara+Eliya,+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-bold text-lg gap-2"
              >
                <MapPin size={20} />
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

          <div style={{ paddingLeft: '5rem' }}>
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