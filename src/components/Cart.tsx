import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 p-6 bg-white rounded-lg shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item, Math.max(0, item.quantity - 1))}
                        className="p-2 hover:bg-gray-50"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 