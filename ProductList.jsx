import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const plantsArray = [
  {
    category: "Air Purifying",
    plants: [
      { name: "Snake Plant", cost: 15, image: "https://images.unsplash.com/photo-1593480792376-788880a6b845" },
      { name: "Spider Plant", cost: 12, image: "https://images.unsplash.com/photo-1598889151240-6922d9518cc3" },
      { name: "Peace Lily", cost: 18, image: "https://images.unsplash.com/photo-1593125298836-eebbf9f85ff5" },
      { name: "Boston Fern", cost: 14, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b" },
      { name: "Aloe Vera", cost: 10, image: "https://images.unsplash.com/photo-1596547609652-9bfc856c1056" },
      { name: "English Ivy", cost: 16, image: "https://images.unsplash.com/photo-1647413391781-5c8e3100db50" }
    ]
  },
  {
    category: "Succulents",
    plants: [
      { name: "Jade Plant", cost: 11, image: "https://images.unsplash.com/photo-1551893665-f843f600794e" },
      { name: "Echeveria", cost: 9, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
      { name: "Zebra Haworthia", cost: 8, image: "https://images.unsplash.com/photo-1603436326446-7533f0bb820a" },
      { name: "String of Pearls", cost: 15, image: "https://images.unsplash.com/photo-1620127581974-9721665a3d4f" },
      { name: "Burro's Tail", cost: 13, image: "https://images.unsplash.com/photo-1645037920359-b1d5d301ba16" },
      { name: "Panda Plant", cost: 10, image: "https://images.unsplash.com/photo-1623861218579-2ef531fb7f10" }
    ]
  },
  {
    category: "Low Light Tolerance",
    plants: [
      { name: "ZZ Plant", cost: 20, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361" },
      { name: "Pothos", cost: 12, image: "https://images.unsplash.com/photo-1610486846152-09419f85461c" },
      { name: "Cast Iron Plant", cost: 22, image: "https://images.unsplash.com/photo-1611082103444-150cc8eb8082" },
      { name: "Chinese Evergreen", cost: 17, image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e" },
      { name: "Parlor Palm", cost: 14, image: "https://images.unsplash.com/photo-1623861218579-2ef531fb7f10" },
      { name: "Philodendron", cost: 15, image: "https://images.unsplash.com/photo-1598889151240-6922d9518cc3" }
    ]
  }
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <a onClick={() => { setShowCart(false); onHomeClick(); }}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a onClick={() => setShowCart(true)}>Cart ({totalQuantity})</a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="products-container">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h3 style={{ textAlign: 'center', marginTop: '20px' }}>{category.category}</h3>
              <div className="product-grid">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h4>{plant.name}</h4>
                    <p>${plant.cost}</p>
                    <button 
                      className="add-button" 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                    >
                      {isAddedToCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
