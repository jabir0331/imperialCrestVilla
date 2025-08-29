import { useState, useEffect } from 'react';
import { CheckCircle, Calendar, Building, ChevronDown, DollarSign, User, UserCircle, Mail, MessageSquare, MessageCircle, Phone, Receipt } from 'lucide-react';

const BookingsPage = () => {

    const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
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

    const [selectedRoom, setSelectedRoom] = useState<RoomType>("heritage");
    const [calculatedPrice, setCalculatedPrice] = useState(0);

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

    return (
        <div className="py-20">

            {/* Booking Confirmation Modal */}
            {showBookingConfirmation && fullName && phoneNum && email && (
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
                                            onChange={(e) => setSelectedRoom(e.target.value as RoomType)}
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
                                            value={fullName}
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
                                                value={email}
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
                            {checkInDate && checkOutDate ? 'Confirm Booking' : 'Select Check-In and Check-Out Dates to Continue'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookingsPage
