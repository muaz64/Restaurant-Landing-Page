// Menu data
const menuItems = [
    // Mejbani Special
    { id: 1, name: "Mejbani Gosht", category: "mezbani", price: 950, image: "🥩", description: "A famous Chittagonian dish, slow-cooked beef with a special blend of traditional Mezbani spices." },
    { id: 2, name: "Kala Bhuna", category: "meat", price: 850, image: "🍖", description: "A dark, highly aromatic, and tender beef curry cooked for hours with a blend of spices." },
    
    // Bhorta & Bhaji
    { id: 3, name: "Aloo Bhorta", category: "bhorta_bhaji", price: 80, image: "🥔", description: "A popular comfort food: spicy mashed potatoes with onions, chili, and mustard oil." },
    { id: 4, name: "Dal Bhorta", category: "bhorta_bhaji", price: 90, image: "🥣", description: "Spicy mashed lentil paste, a staple of Bengali village cuisine." },
    { id: 5, name: "Begun Bhorta", category: "bhorta_bhaji", price: 110, image: "🍆", description: "Smoky mashed eggplant with onions, garlic, and a fiery kick." },
    { id: 6, name: "Shutki Bhorta", category: "bhorta_bhaji", price: 150, image: "🌶️", description: "Dried fish paste with a pungent and spicy flavor, a Chittagonian favorite." },
    
    // Fish & Prawn
    { id: 7, name: "Ilish Polao", category: "fish", price: 450, image: "🐟", description: "Fragrant rice cooked with Hilsa fish, a delicacy of Bengal." },
    { id: 8, name: "Chingri Malai Curry", category: "fish", price: 380, image: "🦐", description: "Prawns cooked in a creamy coconut milk gravy, a rich and popular dish." },
    { id: 9, name: "Rui Kalia", category: "fish", price: 280, image: "🐠", description: "A classic Bengali fish curry with large pieces of Rui fish cooked in a spicy, onion-based gravy." },
    
    // Meat & Poultry
    { id: 10, name: "Murgir Jhol", category: "meat", price: 290, image: "🍗", description: "A light and flavorful chicken curry, perfect with plain rice or paratha." },
    { id: 11, name: "Duck Curry", category: "meat", price: 350, image: "🦆", description: "Tender pieces of duck in a rich, spicy curry, a winter specialty." },
    { id: 12, name: "Mutton Biryani", category: "meat", price: 390, image: "🍛", description: "Aromatic basmati rice with tender mutton and traditional spices." },
    
    // Rice & Pulao
    { id: 13, name: "Plain Rice", category: "rice", price: 50, image: "🍚", description: "Steamed fluffy white rice, the perfect accompaniment to any curry." },
    { id: 14, name: "Basmati Polao", category: "rice", price: 150, image: "🍚", description: "Fragrant basmati rice cooked with spices and ghee, a flavorful side dish." },
    { id: 15, name: "Khichuri", category: "rice", price: 180, image: "🍲", description: "A comforting blend of rice and lentils, cooked with ginger and spices." },

    // Sweets & Drinks
    { id: 16, name: "Mishti Doi", category: "sweets", price: 60, image: "🍮", description: "Sweet yogurt, a beloved Bengali dessert." },
    { id: 17, name: "Lassi", category: "sweets", price: 70, image: "🥤", description: "A refreshing yogurt drink, available in sweet or salty." },
    { id: 18, name: "Borhani", category: "sweets", price: 80, image: "🍹", description: "A spicy and savory yogurt drink, traditionally served with heavy meals like Biryani." },
    { id: 19, name: "Rosogolla", category: "sweets", price: 50, image: "🍡", description: "Soft, spongy cheese balls soaked in a light sugar syrup." },
    { id: 20, name: "Kheer", category: "sweets", price: 80, image: "🥛", description: "A creamy rice pudding with milk, sugar, and cardamom." }
];

// Cart and UI state
let cart = [];
let currentCategory = 'all';

// DOM elements
const menuGrid = document.getElementById('menuGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const emptyCartMessage = document.getElementById('emptyCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Reservation modal elements
const reservationModal = document.getElementById('reservationModal');
const reserveBtn = document.getElementById('reserveBtn');
const heroReserveBtn = document.getElementById('heroReserveBtn');
const cancelReservationBtn = document.getElementById('cancelReservation');
const reservationForm = document.getElementById('reservationForm');
const orderFoodBtn = document.getElementById('orderFoodBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupEventListeners();
    setMinDate();
});

// Set minimum date for reservation to today
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.setAttribute('min', today);
    }
}

// Render menu items
function renderMenu() {
    const filteredItems = currentCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="card-hover bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-6 text-center">
            <div class="text-5xl mb-4">${item.image}</div>
            <h3 class="font-playfair text-xl font-bold text-gray-900 mb-2">${item.name}</h3>
            <p class="text-gray-600 text-sm mb-4">${item.description}</p>
            <div class="mt-auto w-full flex justify-between items-center">
                <span class="text-2xl font-bold text-amber-700">৳${item.price}</span>
                <button class="add-to-cart-btn bg-amber-700 text-white px-4 py-2 rounded-full hover:bg-amber-800 transition-colors font-medium" data-item-id="${item.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners using event delegation
function setupEventListeners() {
    // Menu category buttons
    document.querySelectorAll('.menu-category').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.menu-category').forEach(b => {
                b.classList.remove('active', 'bg-amber-700', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            this.classList.add('active', 'bg-amber-700', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            currentCategory = this.dataset.category;
            renderMenu();
        });
    });

    // Event delegation for "Add to Cart" buttons
    menuGrid.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(e.target.dataset.itemId);
            addToCart(itemId);
        }
    });

    // Cart functionality
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', checkout);
    orderFoodBtn.addEventListener('click', () => {
        const menuSection = document.getElementById('menu');
        menuSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Event delegation for cart item buttons
    cartItemsContainer.addEventListener('click', e => {
        const target = e.target;
        const button = target.closest('button');
        if (button) {
            if (button.classList.contains('quantity-btn')) {
                const itemId = parseInt(button.dataset.itemId);
                const change = parseInt(button.dataset.change);
                updateQuantity(itemId, change);
            } else if (button.classList.contains('remove-btn')) {
                const itemId = parseInt(button.dataset.itemId);
                removeFromCart(itemId);
            }
        }
    });

    // Reservation functionality
    reserveBtn.addEventListener('click', openReservationModal);
    heroReserveBtn.addEventListener('click', openReservationModal);
    cancelReservationBtn.addEventListener('click', closeReservationModal);
    reservationForm.addEventListener('submit', handleReservation);

    // Close modals with Escape key and outside click
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeCart();
            closeReservationModal();
        }
    });
    reservationModal.addEventListener('click', function(e) {
        if (e.target === reservationModal) {
            closeReservationModal();
        }
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
    
    // Add bounce animation to cart button
    cartCount.classList.add('cart-badge');
    setTimeout(() => cartCount.classList.remove('cart-badge'), 500);
    showToast(`${item.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        cart = cart.filter(cartItem => cartItem.id !== itemId);
        updateCartUI();
        showToast(`${item.name} removed from cart.`, 'error');
    }
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update cart count
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }

    // Render cart items
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartFooter.classList.add('hidden');
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyCartMessage);
    } else {
        emptyCartMessage.classList.add('hidden');
        cartFooter.classList.remove('hidden');
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between py-4 border-b">
                <div class="flex items-center space-x-3">
                    <span class="text-2xl">${item.image}</span>
                    <div>
                        <h4 class="font-medium text-gray-900">${item.name}</h4>
                        <p class="text-sm text-gray-600">৳${item.price} each</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="quantity-btn w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors" data-item-id="${item.id}" data-change="-1" aria-label="Decrease quantity of ${item.name}">
                        -
                    </button>
                    <span class="w-8 text-center font-medium">${item.quantity}</span>
                    <button class="quantity-btn w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors" data-item-id="${item.id}" data-change="1" aria-label="Increase quantity of ${item.name}">
                        +
                    </button>
                    <button class="remove-btn ml-2 text-red-500 hover:text-red-700 transition-colors" data-item-id="${item.id}" aria-label="Remove ${item.name}">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Update total
    cartTotal.textContent = `৳${totalPrice.toFixed(2)}`;
}

// Cart functions
function openCart() {
    cartSidebar.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.add('translate-x-full');
    cartOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showToast(`Order placed! Total: ৳${total.toFixed(2)}. Your meal is on its way.`, 'success');
    
    cart = [];
    updateCartUI();
    closeCart();
}

// Reservation functions
function openReservationModal() {
    reservationModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    reservationModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function handleReservation(e) {
    e.preventDefault();
    
    const form = e.target;
    const firstName = form.querySelector('#firstName').value;
    const date = form.querySelector('#date').value;
    const time = form.querySelector('#time').value;
    const partySize = form.querySelector('#partySize').value;
    
    showToast(`Reservation for ${firstName} confirmed for ${new Date(date).toLocaleDateString()} at ${time}.`, 'success');
    
    form.reset();
    closeReservationModal();
}

// Toast notification function
function showToast(message, type = 'info') {
    const toastClasses = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        warning: 'bg-yellow-600',
        info: 'bg-gray-900'
    };
    
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transition-all z-50 ${toastClasses[type]} show`;
    toastMessage.textContent = message;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}