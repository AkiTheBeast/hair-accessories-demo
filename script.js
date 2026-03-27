// JavaScript for Bella Hair Demo Website

// Shopping Cart Data
let cart = [];
let currentQuickViewProduct = null;

// Product Data
const products = {
    1: {
        id: 1,
        name: 'Premium Svilena Gumica',
        price: 1890,
        image: 'https://images.pexels.com/photos/6044135/pexels-photo-6044135.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
        description: 'Luksuzna svilena gumica koja je nežna prema kosi, a istovremeno dodaje eleganciju svakoj frizuri. Savršena i za svakodnevne i za svečane prilike.',
        category: 'scrunchies'
    },
    2: {
        id: 2,
        name: 'Elegantna Kopča za Kosu',
        price: 1290,
        image: 'https://images.pexels.com/photos/6044145/pexels-photo-6044145.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
        description: 'Stilska i čvrsta kopča modernog dizajna. Savršena za pričvršćivanje kose tokom čitavog dana.',
        category: 'clips'
    },
    3: {
        id: 3,
        name: 'Udobna Traka za Kosu',
        price: 1590,
        image: 'https://images.pexels.com/photos/6044144/pexels-photo-6044144.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
        description: 'Meka i elastična traka dizajnirana za udobnost tokom celog dana. Idealna za skidanje kose s lica tokom rada ili vežbanja.',
        category: 'bands'
    },
    4: {
        id: 4,
        name: 'Set Gumica od Pamuka (3 kom)',
        price: 2490,
        image: 'https://images.pexels.com/photos/6954861/pexels-photo-6954861.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
        description: 'Komplet od 3 šarene pamučne gumice. Izrađene od visokokvalitetnog pamuka koji je prozračan i udoban za svakodnevno nošenje.',
        category: 'scrunchies'
    },
    5: {
        id: 5,
        name: 'Ukrašena Kopča s Kristalima',
        price: 1790,
        image: 'https://images.pexels.com/photos/36741058/pexels-photo-36741058.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
        description: 'Raskošna kopča sa kristalnim detaljima. Dodaje sjaj i eleganciju svakoj frizuri – idealna za svečane prilike i slavlja.',
        category: 'clips'
    },
    6: {
        id: 6,
        name: 'Sportska Traka za Kosu',
        price: 1390,
        image: 'https://images.pexels.com/photos/7446425/pexels-photo-7446425.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
        description: 'Sportska traka od materijala koji odvodi vlagu – dizajnirana za aktivan životni stil. Kosa ostaje na mestu tokom vežbanja.',
        category: 'bands'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initializeEventListeners();
});

// Initialize Event Listeners
function initializeEventListeners() {
    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactForm();
    });

    // Cart modal click handler
    document.querySelector('a[href="#cart"]').addEventListener('click', function(e) {
        e.preventDefault();
        showCart();
    });
}

// Add to Cart Function
function addToCart(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1,
            image: products[productId].image
        });
    }
    
    updateCartCount();
    showNotification('Proizvod dodat u korpu!', 'success');
}

// Add to Cart from Quick View
function addToCartFromQuickView() {
    const quantity = parseInt(document.getElementById('quick-view-quantity').value);
    const product = currentQuickViewProduct;
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    
    updateCartCount();
    
    // Close modal and show notification
    const modal = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
    modal.hide();
    showNotification('Product added to cart!', 'success');
}

// Update Cart Count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Show Cart Modal
function showCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Vaša korpa je prazna</p>';
        cartTotal.textContent = '0 RSD';
    } else {
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="mb-1 cart-item-price">${item.price} RSD</p>
                        <div class="d-flex align-items-center">
                            <label class="me-2">Qty:</label>
                            <input type="number" class="form-control form-control-sm cart-item-quantity" 
                                   value="${item.quantity}" min="1" 
                                   onchange="updateCartItemQuantity(${item.id}, this.value)">
                            <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        cartTotal.textContent = `${total} RSD`;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
}

// Update Cart Item Quantity
function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        updateCartCount();
        showCart(); // Refresh cart display
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart(); // Refresh cart display
    showNotification('Proizvod uklonjen iz korpe', 'info');
}

// Checkout Function (WhatsApp)
function checkoutWhatsApp() {
    if (cart.length === 0) {
        showNotification('Vaša korpa je prazna!', 'error');
        return;
    }

    let orderText = 'Zdravo! Želim da naručim:\n\n';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        orderText += `- ${item.name} x${item.quantity} = ${itemTotal.toLocaleString('sr-RS')} RSD\n`;
    });

    orderText += `\n*Ukupno: ${total.toLocaleString('sr-RS')} RSD*`;
    orderText += '\n\nGrad dostave: ';

    const encodedText = encodeURIComponent(orderText);
    window.open(`https://wa.me/381600000000?text=${encodedText}`, '_blank');

    // Close cart modal
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModal) cartModal.hide();
}

// Legacy checkout function
function checkout() {
    checkoutWhatsApp();
}

// Quick View Function
function quickView(productId) {
    const product = products[productId];
    currentQuickViewProduct = product;
    
    document.getElementById('quick-view-image').src = product.image;
    document.getElementById('quick-view-title').textContent = product.name;
    document.getElementById('quick-view-description').textContent = product.description;
    document.getElementById('quick-view-price').textContent = `${product.price} RSD`;
    document.getElementById('quick-view-quantity').value = 1;
    
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    modal.show();
}

// Filter Products
function filterProducts(category) {
    const products = document.querySelectorAll('.product-item');
    const buttons = document.querySelectorAll('.btn-group .btn-outline-pink');
    
    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if ((category === 'all' && btn.textContent.trim() === 'Svi proizvodi') ||
            (category === 'scrunchies' && btn.textContent.trim() === 'Gumice') ||
            (category === 'clips' && btn.textContent.trim() === 'Kopče') ||
            (category === 'bands' && btn.textContent.trim() === 'Trake')) {
            btn.classList.add('active');
        }
    });
    
    // Filter products
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            product.classList.add('fade-in');
        } else {
            product.style.display = 'none';
        }
    });
}

// Scroll Functions
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function scrollToAbout() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}

// Contact Form Handler
function handleContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, this would send data to a server
    console.log('Contact form submitted:', { name, email, message });
    
    // Show success message
    showNotification('Hvala na poruci! Javićemo vam se uskoro. 💕', 'success');
    
    // Reset form
    document.getElementById('contact-form').reset();
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)} me-2"></i>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease-out;
        max-width: 320px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        backdrop-filter: blur(10px);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #dc3545, #e74c3c)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #ffc107, #ff9800)';
            break;
        case 'info':
            notification.style.background = 'linear-gradient(135deg, #17a2b8, #3498db)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #6c757d, #495057)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

// Enhanced Add to Cart with Animation
function addToCart(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${productName} – količina ažurirana!`, 'success', 2000);
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1,
            image: products[productId].image
        });
        showNotification(`${productName} dodat u korpu! 🛒`, 'success', 2500);
    }
    
    updateCartCount();
    
    // Add cart animation
    animateCartIcon();
}

// Cart Icon Animation
function animateCartIcon() {
    const cartIcon = document.querySelector('a[href="#cart"]');
    if (cartIcon) {
        cartIcon.style.animation = 'cartBounce 0.6s ease-out';
        setTimeout(() => {
            cartIcon.style.animation = '';
        }, 600);
    }
}

// Add cart bounce animation to CSS
const cartBounceStyle = document.createElement('style');
cartBounceStyle.textContent = `
    @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2) rotate(-5deg); }
        50% { transform: scale(1.1) rotate(5deg); }
        75% { transform: scale(1.15) rotate(-2deg); }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: rgba(255,255,255,0.2);
    }
    
    .notification-message {
        flex: 1;
    }
`;
document.head.appendChild(cartBounceStyle);

// Enhanced Quick View with Loading State
function quickView(productId) {
    const product = products[productId];
    currentQuickViewProduct = product;
    
    // Show loading state
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    const modalBody = document.querySelector('#quickViewModal .modal-body');
    
    modalBody.innerHTML = `
        <div class="text-center py-4">
            <div class="loading-spinner"></div>
            <p class="mt-3 text-muted">Učitavanje detalja proizvoda...</p>
        </div>
    `;
    
    modal.show();
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        document.getElementById('quick-view-image').src = product.image;
        document.getElementById('quick-view-title').textContent = product.name;
        document.getElementById('quick-view-description').textContent = product.description;
        document.getElementById('quick-view-price').textContent = `${product.price} RSD`;
        document.getElementById('quick-view-quantity').value = 1;
        
        // Restore modal body content
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img id="quick-view-image" src="" alt="" class="img-fluid rounded">
                </div>
                <div class="col-md-6">
                    <h4 id="quick-view-title"></h4>
                    <div class="product-rating mb-2">
                        <div class="stars">
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star-half-alt text-warning"></i>
                        </div>
                        <small class="text-muted">(42 recenzije)</small>
                    </div>
                    <p id="quick-view-description"></p>
                    <h5 id="quick-view-price" class="text-pink"></h5>
                    <div class="mt-3">
                        <label class="form-label">Količina:</label>
                        <input type="number" class="form-control" value="1" min="1" max="10" id="quick-view-quantity">
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-pink w-100" onclick="addToCartFromQuickView()">
                            <i class="fas fa-cart-plus me-2"></i>Dodaj u korpu
                        </button>
                    </div>
                    <div class="mt-2">
                        <small class="text-muted">
                            <i class="fas fa-truck me-1"></i>Besplatna dostava u Pančevu
                        </small>
                    </div>
                </div>
            </div>
        `;
        
        // Set the actual content
        document.getElementById('quick-view-image').src = product.image;
        document.getElementById('quick-view-title').textContent = product.name;
        document.getElementById('quick-view-description').textContent = product.description;
        document.getElementById('quick-view-price').textContent = `${product.price} RSD`;
        document.getElementById('quick-view-quantity').value = 1;
    }, 500);
}

// Add loading spinner styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255,105,180,0.2);
        border-top: 4px solid var(--pink-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyles);

// Get Notification Icon
function getNotificationIcon(type) {
    switch(type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'info':
            return 'fa-info-circle';
        default:
            return 'fa-bell';
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all product cards
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        observer.observe(card);
    });
});

// Search functionality (if needed)
function searchProducts(query) {
    const products = document.querySelectorAll('.product-item');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('.card-title').textContent.toLowerCase();
        const description = product.querySelector('.text-muted').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add loading states
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD'
    }).format(price);
}

// Add to wishlist (placeholder function)
function addToWishlist(productId) {
    showNotification('Dodato u listu želja! (Demo funkcija)', 'info');
}

// Share product (placeholder function)
function shareProduct(productId) {
    const product = products[productId];
    if (navigator.share) {
        navigator.share({
            title: product.name,
            text: product.description,
            url: window.location.href
        });
    } else {
        showNotification('Link copied to clipboard! (Demo)', 'info');
    }
}

// Initialize tooltips (if needed)
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
