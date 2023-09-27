console.log('hello!');


function addToCart(productName) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = cartItems.find(item => item.name === productName);

  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      cartItems.push({ name: productName, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
  displayCart();
}

function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDiv = document.getElementById('cart-items');
  cartDiv.innerHTML = '';

  cartItems.forEach(item => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML = `
          <span>${item.name} (Quantity: ${item.quantity})</span>
          <button onclick="removeFromCart('${item.name}')">Remove</button>
          <button onclick="editQuantity('${item.name}', ${item.quantity})">Edit Quantity</button>
      `;
      cartDiv.appendChild(cartItemDiv);
  });
}

function removeFromCart(productName) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cartItems.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  displayCart();
}

function editQuantity(productName, currentQuantity) {
  const newQuantity = parseInt(prompt(`Edit Quantity for ${productName}:`, currentQuantity), 10);
  
  if (!isNaN(newQuantity) && newQuantity >= 0) {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = cartItems.map(item => {
          if (item.name === productName) {
              item.quantity = newQuantity;
          }
          return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      displayCart();
  } else {
      alert('Invalid quantity. Please enter a valid number.');
  }
}

function clearCart() {
  localStorage.removeItem('cart');
  displayCart();
}

displayCart();