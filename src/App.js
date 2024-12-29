'use client'

import { useState } from 'react';
import { menuItems, categories } from './data/menuItems';
import Navbar from './components/NavBar';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckOutForm';
import FeedbackForm from './components/FeedBackForm';
import OrderSuccess from './components/OrderSuccess';

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCheckout, setShowCheckout] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setShowCart(false);
    setShowCheckout(false);
  };

  const handleOrderSubmit = (formData) => {
    setOrderDetails({
      ...formData,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });
    clearCart();
    setShowSuccess(true);
  };

  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar cartCount={cart.length} onCartClick={() => setShowCart(true)} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Featured Items</h1>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white text-black border border-yellow-500 p-2 rounded"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <MenuList items={filteredItems} onAddToCart={addToCart} />
        </div>

        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white text-black rounded-lg p-6 max-w-md w-full">
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                onCheckout={() => {
                  setShowCart(false);
                  setShowCheckout(true);
                }}
                onClose={() => setShowCart(false)}
              />
            </div>
          </div>
        )}

        {showCheckout && (
          <CheckoutForm
            cart={cart}
            onSubmit={handleOrderSubmit}
            onClose={() => setShowCheckout(false)}
          />
        )}

        {showSuccess && (
          <OrderSuccess
            orderDetails={orderDetails}
            onClose={() => {
              setShowSuccess(false);
              setShowFeedback(true);
            }}
          />
        )}

        {showFeedback && (
          <FeedbackForm
            onSubmit={(feedback) => {
              console.log('Feedback submitted:', feedback);
              setShowFeedback(false);
            }}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </main>
    </div>
  );
}

