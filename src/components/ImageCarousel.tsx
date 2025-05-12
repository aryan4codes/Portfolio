import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import your images
import profileImg from '@/assets/profile.png';
import speechImg from '@/assets/speech.jpg';
import bikeImg from '@/assets/bike.jpg';
import sihImg from '@/assets/sih.jpg';

interface CarouselImage {
  src: string;
  alt: string;
  caption: string;
}

const images: CarouselImage[] = [
  {
    src: profileImg,
    alt: "Profile photo",
    caption: "Vibe Coder ( real vibe was Manali )"
  },
  {
    src: sihImg,
    alt: "Smart India Hackathon",
    caption: "Winner at Smart India Hackathon 2024"
  },
  {
    src: speechImg,
    alt: "Speaking at tech conference",
    caption: "Sharing knowledge with the community"
  },
  {
    src: bikeImg,
    alt: "Adventure biking",
    caption: "My true love"
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div 
      className="relative w-full h-full carousel-image"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel container */}
      <div className="w-full h-full relative">
        {/* Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div className="carousel-overlay" />
            <div className="carousel-vignette" />
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            <div className="carousel-caption justify-center">
              <span className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded text-sm md:text-lg inline-block text-center justify-center">
                {images[currentIndex].caption}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-30">
        <Button
          variant="outline"
          size="icon"
          className="bg-black/20 border border-white/20 backdrop-blur-sm hover:bg-black/40 text-white rounded-full"
          onClick={prevSlide}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-black/20 border border-white/20 backdrop-blur-sm hover:bg-black/40 text-white rounded-full"
          onClick={nextSlide}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel; 