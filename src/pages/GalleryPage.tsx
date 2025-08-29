import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GalleryPage = () => {

    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

    const galleryImages = [
        "images/gallery/Gallery8.jpg",
        "images/gallery/Gallery1.jpg",
        "images/gallery/Gallery2.jpg",
        "images/gallery/Gallery3.jpg",
        "images/gallery/Gallery4.jpg",
        "images/gallery/Gallery5.jpg",
        "images/gallery/Gallery6.jpg",
        "images/gallery/Gallery7.jpg",
    ];

    const nextImage = () => {
        setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
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
    )
}

export default GalleryPage;
