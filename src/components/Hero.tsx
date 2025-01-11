export default function Hero() {
  return (
    <div className="relative bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            <span className="block">Summer Collection 2024</span>
            <span className="block text-primary">Premium T-Shirts</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Discover our new collection of premium cotton t-shirts.
          </p>
          <div className="mt-8">
            <a
              href="#featured"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}