
const AboutPage = () => {
    return (
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
                            src="/images/hero.jpg"
                            alt="Villa Interior"
                            className="rounded-lg shadow-lg w-full h-96 object-cover"
                        />
                    </div>
                    <div className='text-justify text-md text-gray-600 leading-relaxed'>
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
    )
}

export default AboutPage;
