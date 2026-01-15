/* ========================
   CART LOGIC (Frontend Only)
   ======================== */

let cart = [];
let totalAmount = 0;

// 1. ADD TO CART FUNCTION
function addToCart(name, price) {
    // Check if item exists
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCartUI();
    showFloatingCart();
    
    // Optional: Vibration for mobile feel
    if(navigator.vibrate) navigator.vibrate(50);
}

// 2. UPDATE UI (Counters & Totals)
function updateCartUI() {
    totalAmount = 0;
    let totalItems = 0;

    // Reset Cart HTML
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
        totalItems += item.quantity;

        // Add HTML for Item in Modal
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item-row');
        itemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong> <br>
                <small>₹${item.price} x ${item.quantity}</small>
            </div>
            <strong>₹${item.price * item.quantity}</strong>
        `;
        cartContainer.appendChild(itemDiv);
    });

    // Update Nav Badge
    document.querySelector('.cart-count').textContent = totalItems;

    // Update Floating Bar
    document.getElementById('fc-count').textContent = `${totalItems} Items`;
    document.getElementById('fc-total').textContent = `₹${totalAmount}`;

    // Update Bill Total
    document.getElementById('billTotal').textContent = `₹${totalAmount}`;

    // Handle Empty Cart
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-msg">Your cart is empty 😞</p>';
        document.getElementById('floatingCart').classList.remove('visible');
    }
}

// 3. SHOW FLOATING CART
function showFloatingCart() {
    const floatingCart = document.getElementById('floatingCart');
    if (cart.length > 0) {
        floatingCart.classList.add('visible');
    }
}

// 4. OPEN / CLOSE MODAL
function openCart() {
    document.getElementById('cartModal').classList.add('open');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('open');
}

// 5. WHATSAPP CHECKOUT (The Magic)
function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Cart is empty!");

    let message = "👋 Hi, I want to order:\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity} qty\n`;
    });
    message += `\n💰 *Total Amount: ₹${totalAmount}*`;
    message += `\n📍 Please deliver to my address.`;

    // Encode URL
    const url = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}