import { MapPin, Phone, Mail, Clock, Send, User, ChevronDown, MessageSquare } from "lucide-react"

const ContactPage = () => {
    return (
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
    )
}

export default ContactPage
