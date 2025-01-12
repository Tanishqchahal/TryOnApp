import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Jurassic Park Men\'s Classic',
    price: 29.99,
    image: 'https://m.media-amazon.com/images/I/5171FW+Cy0L.AC_SX569.jpg',
  },
  {
    id: 2,
    name: 'Sherpa Winter Jacket',
    price: 39.99,
    image: 'https://m.media-amazon.com/images/I/71rmFbrZESL.AC_SX679.jpg',
  },
  {
    id: 3,
    name: 'Floral Mini Dress',
    price: 34.99,
    image: 'https://m.media-amazon.com/images/I/71YWYwFDkFL.AC_SX569.jpg',
  },
  {
    id: 4,
    name: 'Cropped Hoodie',
    price: 32.99,
    image: 'https://m.media-amazon.com/images/I/412+sKl-XNL.AC_SX466.jpg',
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
              className="group block bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <button 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-primary px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic here
                  }}
                >
                  Add to Cart
                </button>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                <p className="text-gray-600 font-semibold">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}