# Imperial Crest Villa
A modern, responsive website for Imperial Crest Villa, a luxury accommodation blending Russian heritage with Sri Lankan hospitality in Nuwara Eliya.

## Live Demo
[View Live Website](https://imperialcrestvilla-2neju.sevalla.page/)

## Project Description
This project was a freelance website development for a friend of mine, a luxury accommodation in Nuwara Eliya, Sri Lanka. The goal was to create an elegant, responsive website that showcases their unique fusion of Russian elegance and Sri Lankan hospitality while providing an intuitive booking experience.

## Features 
- **Modern UI**: Elegant design with gradient backgrounds and smooth animations  
- **Multi-page Layout**: 8 distinct pages with seamless navigation  
- **Room Selection**: Detailed room comparisons with pricing and amenities  
- **Interactive Booking System**: Comprehensive booking form with automated price calculation  
- **Image Gallery**: Interactive image carousel with thumbnail navigation  


## Built With
- **Frontend**: React, TypeScript, Tailwind CSS  
- **Routing**: React Router DOM  
- **Icons**: Lucide React  
- **Deployment**: Sevalla  
- **Build Tool**: Vite  

## Project Structure
```
imperialCrestVilla/
├── public/
│   └── images/              # All website images
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── Header.tsx      # Navigation header
│   │   └── Footer.tsx      # Site footer
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── AboutPage.tsx   # About section
│   │   ├── RoomsPage.tsx   # Room listings
│   │   ├── DiningPage.tsx  # Dining information
│   │   ├── GalleryPage.tsx # Image gallery
│   │   ├── AttractionsPage.tsx # Attractions near by the villa
│   │   ├── BookingsPage.tsx # Advanced Booking Page
│   │   └── ContactPage.tsx # Contact form
│   ├── assets/
│   │   └── styles/         # Custom CSS files
│   ├── App.tsx             # Main app component with routing
│   └── main.tsx            # App entry point
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Installation & Setup
If you want to run this project locally:

```bash
# Clone the repository
git clone https://github.com/jabir0331/imperialCrestVilla.git

# Navigate to the directory
cd imperialCrestVilla

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will open in your browser at `http://localhost:5173`


## Key Components Overview
- **App.tsx**: Main application component with routing setup  
- **HomePage.tsx**: Hero section with call-to-action and feature highlights  
- **RoomsPage.tsx**: Display of three room types with detailed amenities  
- **BookingsPage.tsx**: Comprehensive booking form with real-time price calculation  
- **DiningPage.tsx**: Showcase of Russian and Sri Lankan culinary experiences  
- **GalleryPage.tsx**: Interactive image carousel  
- **ContactPage.tsx**: Contact form with business information and map  






