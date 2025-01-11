import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductPage from './components/ProductPage'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Models from './components/Models'
import { CartProvider } from './context/CartContext'

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/models" element={<Models />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App