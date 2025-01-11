import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Classic White Tee',
    price: 29.99,
    image: 'https://placehold.co/300x400',
  },
  {
    id: 2,
    name: 'Black Essential',
    price: 29.99,
    image: 'https://placehold.co/300x400',
  },
  {
    id: 3,
    name: 'Navy Premium',
    price: 34.99,
    image: 'https://placehold.co/300x400',
  },
  {
    id: 4,
    name: 'Gray Comfort',
    price: 32.99,
    image: 'https://placehold.co/300x400',
  },
];

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`} 
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-primary px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic here
                  }}
                >
                  Add to Cart
                </button>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}