import { useState, useEffect } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const images = [
  '/vastrai.png',
  "https://blog.placeit.net/wp-content/uploads/2024/02/hoodie-mockup-featuring-two-women-posing-for-a-promotional-clothing-ad.png",
  "https://blog.placeit.net/wp-content/uploads/2024/02/t-shirt-mockup-of-a-woman-featuring-an-ad-for-a-valentine-s-day-sale.png"
];

const slides = [
  {
    image: images[0],
    title: "Welcome to वस्त्रAI",
    subtitle: "Fashion Redefined",
    description: "Experience the future of fashion with our AI-powered virtual try-on technology.",
    tag: "FEATURED",
    hideOverlay: true,
    imagePosition: "translate-x-[30%] scale-100"
  },
  {
    image: images[1],
    title: "Summer Collection 2024",
    subtitle: "Premium Hoodies",
    description: "Experience comfort and style with our new collection of premium hoodies.",
    tag: "NEW ARRIVAL"
  },
  {
    image: images[2],
    title: "Valentine's Day Special",
    subtitle: "Premium T-Shirts",
    description: "Share your love with our special Valentine's Day collection.",
    tag: "SPECIAL OFFER"
  }
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImage]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImage((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImage((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="relative bg-black h-[700px] overflow-hidden">
      {/* Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-all duration-1000 transform ${
            currentImage === index 
              ? 'opacity-100 translate-x-0' 
              : index > currentImage 
                ? 'opacity-0 translate-x-full'
                : 'opacity-0 -translate-x-full'
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`w-full h-full object-cover transform ${slide.imagePosition || ''}`}
            />
          </div>
          {!slide.hideOverlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          )}
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 absolute transform ${
                  currentImage === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow-lg shadow-primary/20">
                  {slide.tag}
                </span>
                <h2 className="text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                  <span className="block">{slide.title}</span>
                  <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {slide.subtitle}
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 drop-shadow-lg max-w-lg">
                  {slide.description}
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#featured"
                    className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg shadow-primary/20 group"
                  >
                    Shop Now
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#featured"
                    className="inline-flex items-center border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-primary/80 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <FiArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-primary/80 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <FiArrowRight className="w-6 h-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentImage(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentImage === index 
                ? 'w-8 bg-gradient-to-r from-primary to-secondary' 
                : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}