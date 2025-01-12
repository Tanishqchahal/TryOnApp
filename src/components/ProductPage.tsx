import { useState, useEffect } from "react";
import { FiHeart, FiStar } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { createTryOnTask, pollTryOnResult } from "../services/tryOnService";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  careInstructions: string[];
  colors: string[];
  sizes: string[];
  images: string[];
  rating: number;
  reviewCount: number;
}

type ProductsRecord = Record<number, Product>;

// Sample products data - replace with actual data
const products: ProductsRecord = {
  1: {
    id: 1,
    title: "Jurassic Park Men\'s Classic",
    price: 29.99,
    originalPrice: 39.99,
    description:
      "Experience ultimate comfort with our premium organic cotton t-shirt. Designed for everyday wear, this crew neck tee combines style with sustainability.",
    features: [
      "100% GOTS certified organic cotton",
      "180 GSM medium-weight fabric",
      "Regular fit",
      "Pre-shrunk fabric",
      "Made in Portugal",
      "Reinforced shoulder seams",
    ],
    careInstructions: [
      "Machine wash cold",
      "Tumble dry low",
      "Do not bleach",
      "Iron on low heat if needed",
    ],
    colors: ["White", "Black", "Navy", "Gray", "Sage"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["https://m.media-amazon.com/images/I/5171FW+Cy0L.AC_SX569.jpg"],
    rating: 4.8,
    reviewCount: 128,
  },
  2: {
    id: 2,
    title: "Sherpa Winter Jacket",
    price: 29.99,
    originalPrice: 39.99,
    description: "Our essential jacket, perfect for any occasion.",
    features: [
      "100% GOTS certified organic cotton",
      "180 GSM medium-weight fabric",
      "Regular fit",
      "Pre-shrunk fabric",
    ],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
    colors: ["Black", "White", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://m.media-amazon.com/images/I/71rmFbrZESL.AC_SX679.jpg",
      "https://m.media-amazon.com/images/I/81F2UaAd+NL.AC_SX569.jpg",
    ],
    rating: 4.5,
    reviewCount: 89,
  },
  3: {
    id: 2,
    title: "Floral Mini Dress",
    price: 34.99,
    originalPrice: 39.99,
    description: "A vibrant and stylish floral mini dress, perfect for sunny days and special occasions.",
    features: [
      "100% GOTS certified organic cotton",
      "180 GSM medium-weight fabric",
      "Regular fit",
      "Pre-shrunk fabric",
    ],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
    colors: ["Black", "White", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://m.media-amazon.com/images/I/71YWYwFDkFL.AC_SX569.jpg",
      "https://m.media-amazon.com/images/I/61hcZgX+HyL.AC_SX569.jpg",
    ],
    rating: 4.5,
    reviewCount: 89,
  },
  4: {
    id: 2,
    title: "Cropped Hoodie",
    price: 32.99,
    originalPrice: 39.99,
    description: "A cozy and stylish cropped hoodie, perfect for layering and staying warm.",
    features: [
      "100% GOTS certified organic cotton",
      "180 GSM medium-weight fabric",
      "Regular fit",
      "Pre-shrunk fabric",
    ],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
    colors: ["Black", "White", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://m.media-amazon.com/images/I/412+sKl-XNL.AC_SX466.jpg",
      "https://m.media-amazon.com/images/I/41vviZgj1oL.AC_SX466.jpg",
    ],
    rating: 4.5,
    reviewCount: 89,
  },
  // Add more products as needed
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? products[Number(id)] : null;
  const [isTryingOn, setIsTryingOn] = useState(false);
  const [tryOnError, setTryOnError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect to home if product not found
  if (!product) {
    navigate("/");
    return null;
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    });

    navigate("/cart");
  };

  const handleTryOn = async () => {
    const selectedModel = localStorage.getItem('selectedModel');
    
    if (!selectedModel) {
      navigate('/models');
      return;
    }

    const models = [
      {
        id: 1,
        image: 'https://media.istockphoto.com/id/521071031/photo/full-length-portrait-of-a-cool-black-guy-smiling.jpg?s=612x612&w=0&k=20&c=uKhrupXqSzGyZM8LTU-QBIBdWy67P4Rja5qobqsCuas=',
      },
      {
        id: 2,
        image: 'https://as1.ftcdn.net/jpg/01/29/32/90/1000_F_129329075_UC10cJaFhL6w3NiKDZYNAE4KUlRKeDDz.jpg',
      },
      {
        id: 3,
        image: 'https://i.postimg.cc/D0wN9m48/model.jpg',
      },
    ];

    const model = models.find(m => m.id === Number(selectedModel));
    
    if (!model) {
      setTryOnError('Selected model not found');
      return;
    }

    try {
      setIsTryingOn(true);
      setTryOnError(null);
      
      const taskId = await createTryOnTask(
        model.image,
        product.images[selectedImage]
      );
      
      const resultUrl = await pollTryOnResult(taskId);
      setSelectedImage(product.images.push(resultUrl) - 1);
    } catch (error) {
      setTryOnError(error instanceof Error ? error.message : 'Failed to generate try-on image');
    } finally {
      setIsTryingOn(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover cursor-zoom-in"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          {/* Title and Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="ml-4 text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? "fill-current" : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 flex space-x-2">
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`p-2 rounded-md ${
                    selectedColor === color
                      ? "ring-2 ring-primary"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <button className="text-sm font-medium text-primary hover:text-secondary">
                Size Guide
              </button>
            </div>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {product.sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-4 text-sm font-medium rounded-md ${
                    selectedSize === size
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart and Try-on */}
          <div className="space-y-4">
            {tryOnError && (
              <div className="text-red-600 text-sm">{tryOnError}</div>
            )}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50"
              >
                Add to Cart
              </button>
              <button
                onClick={handleTryOn}
                disabled={isTryingOn}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50"
              >
                {isTryingOn ? 'Generating...' : 'Try-On'}
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FiHeart className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Description
            </h3>
            <p className="text-gray-600">{product.description}</p>

            <h4 className="text-lg font-medium text-gray-900 mt-6 mb-2">
              Features
            </h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {product.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <h4 className="text-lg font-medium text-gray-900 mt-6 mb-2">
              Care Instructions
            </h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {product.careInstructions.map(
                (instruction: string, index: number) => (
                  <li key={index}>{instruction}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
