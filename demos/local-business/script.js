/* ========================
   ENHANCED CART LOGIC WITH QUANTITY CONTROLS
   ======================== */

let cart = [];
let totalAmount = 0;

// 1. ADD TO CART FUNCTION
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCartUI();
    showFloatingCart();
    updateProductButtons();
    showToast(`${name} added to cart!`, 'success');
    
    if(navigator.vibrate) navigator.vibrate(50);
}

// 2. UPDATE QUANTITY
function updateQuantity(name, change) {
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartUI();
            updateProductButtons();
        }
    }
}

// 3. REMOVE FROM CART
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
    updateProductButtons();
    showToast(`${name} removed from cart`, 'error');
}

// 4. UPDATE UI (Counters & Totals)
function updateCartUI() {
    totalAmount = 0;
    let totalItems = 0;

    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
        totalItems += item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} each</div>
            </div>
            <div class="cart-item-controls">
                <div class="cart-qty-controls">
                    <button class="cart-qty-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span class="cart-qty-display">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    document.querySelector('.cart-count').textContent = totalItems;
    document.getElementById('fc-count').textContent = `${totalItems} Items`;
    document.getElementById('fc-total').textContent = `₹${totalAmount}`;
    document.getElementById('billTotal').textContent = `₹${totalAmount}`;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-msg">Your cart is empty 😞</p>';
        document.getElementById('floatingCart').classList.remove('visible');
    }
}

// 5. UPDATE PRODUCT BUTTONS
function updateProductButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
        const priceRow = card.querySelector('.price-row');
        const addBtn = priceRow.querySelector('.add-btn');
        const quantityControls = priceRow.querySelector('.quantity-controls');
        
        if (addBtn) {
            const onclickAttr = addBtn.getAttribute('onclick');
            const matches = onclickAttr.match(/addToCart\('([^']+)',\s*(\d+)\)/);
            if (matches) {
                const productName = matches[1];
                const cartItem = cart.find(item => item.name === productName);
                
                if (cartItem) {
                    addBtn.outerHTML = `
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity('${productName}', -1)">-</button>
                            <span class="qty-display">${cartItem.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity('${productName}', 1)">+</button>
                        </div>
                    `;
                }
            }
        } else if (quantityControls) {
            const qtyDisplay = quantityControls.querySelector('.qty-display');
            if (qtyDisplay) {
                const productName = quantityControls.querySelector('.qty-btn').getAttribute('onclick').match(/'([^']+)'/)[1];
                const cartItem = cart.find(item => item.name === productName);
                
                if (cartItem) {
                    qtyDisplay.textContent = cartItem.quantity;
                } else {
                    // Find original price from other products or set default
                    const price = 28; // Default price, should be extracted properly
                    quantityControls.outerHTML = `<button class="add-btn" onclick="addToCart('${productName}', ${price})">ADD</button>`;
                }
            }
        }
    });
}

// 6. SHOW FLOATING CART
function showFloatingCart() {
    const floatingCart = document.getElementById('floatingCart');
    if (cart.length > 0) {
        floatingCart.classList.add('visible');
    }
}

// 7. TOAST NOTIFICATIONS
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
}

// 8. OPEN / CLOSE MODAL
function openCart() {
    document.getElementById('cartModal').classList.add('open');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('open');
}

// 9. WHATSAPP CHECKOUT
function checkoutWhatsApp() {
    if (cart.length === 0) {
        showToast('Cart is empty!', 'error');
        return;
    }

    let message = "👋 Hi, I want to order:\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity} qty (₹${item.price * item.quantity})\n`;
    });
    message += `\n💰 *Total Amount: ₹${totalAmount}*`;
    message += `\n📍 Please deliver to my address.`;

    const url = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    showToast('Redirecting to WhatsApp...', 'success');
}

// 10. SCROLL TO SECTION
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 11. INITIALIZE
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
});