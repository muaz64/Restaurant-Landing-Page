        // Menu data
        const menuItems = [
            // Rice & Biryanis
            { id: 1, name: "Mutton Biryani", category: "rice", price: 350, image: "🍛", description: "Aromatic basmati rice with tender mutton and traditional spices" },
            { id: 2, name: "Chicken Biryani", category: "rice", price: 260, image: "🍚", description: "Fragrant rice with succulent chicken pieces and saffron" },
            { id: 3, name: "Vegetable Pulao", category: "rice", price: 220, image: "🥘", description: "Spiced rice with mixed vegetables and ghee" },
            { id: 4, name: "Khichuri", category: "rice", price: 150, image: "🍲", description: "Comfort food - rice and lentils cooked with vegetables" },
            
            // Fish Curry
            { id: 5, name: "Hilsa Fish Curry", category: "fish", price: 220, image: "🐟", description: "Bengali's favorite - Hilsa cooked in mustard gravy" },
            { id: 6, name: "Rui Fish Curry", category: "fish", price: 180, image: "🐠", description: "Traditional Rui fish in spicy Bengali curry" },
            { id: 7, name: "Prawn Malai Curry", category: "fish", price: 240, image: "🦐", description: "Prawns cooked in coconut milk with mild spices" },
            { id: 8, name: "Fish Fry", category: "fish", price: 160, image: "🍤", description: "Crispy fried fish marinated with turmeric and spices" },
            
            // Vegetarian
            { id: 9, name: "Aloo Posto", category: "vegetarian", price: 140, image: "🥔", description: "Potatoes cooked with poppy seed paste - Bengali classic" },
            { id: 10, name: "Shukto", category: "vegetarian", price: 120, image: "🥬", description: "Mixed vegetable curry with bitter gourd and sweet taste" },
            { id: 11, name: "Dal Tadka", category: "vegetarian", price: 100, image: "🫘", description: "Yellow lentils tempered with cumin and garlic" },
            { id: 12, name: "Begun Bharta", category: "vegetarian", price: 50, image: "🍆", description: "Mashed eggplant with onions, chilies and mustard oil" },
            { id: 13, name: "Cholar Dal", category: "vegetarian", price: 130, image: "🌰", description: "Bengal gram dal with coconut and whole spices" },
            
            // Bengali Sweets
            { id: 14, name: "Rasgulla", category: "sweets", price: 80, image: "🍡", description: "Soft cottage cheese balls in sugar syrup" },
            { id: 15, name: "Mishti Doi", category: "sweets", price: 60, image: "🍮", description: "Sweet yogurt - traditional Bengali dessert" },
            { id: 16, name: "Sandesh", category: "sweets", price: 70, image: "🧈", description: "Delicate cottage cheese sweet with cardamom" },
            { id: 17, name: "Gulab Jamun", category: "sweets", price: 90, image: "🍯", description: "Deep-fried milk dumplings in rose-flavored syrup" },
            { id: 18, name: "Kheer", category: "sweets", price: 80, image: "🥛", description: "Rice pudding with milk, sugar and cardamom" }
        ];

        // Cart functionality
        let cart = [];
        let currentCategory = 'all';

        // DOM elements
        const menuGrid = document.getElementById('menuGrid');
        const cartBtn = document.getElementById('cartBtn');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        const closeCartBtn = document.getElementById('closeCart');
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartFooter = document.getElementById('cartFooter');
        const emptyCart = document.getElementById('emptyCart');
        const checkoutBtn = document.getElementById('checkoutBtn');

        // Reservation modal elements
        const reservationModal = document.getElementById('reservationModal');
        const reserveBtn = document.getElementById('reserveBtn');
        const heroReserveBtn = document.getElementById('heroReserveBtn');
        const cancelReservationBtn = document.getElementById('cancelReservation');
        const reservationForm = document.getElementById('reservationForm');

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            renderMenu();
            setupEventListeners();
            setMinDate();
        });

        // Set minimum date for reservation to today
        function setMinDate() {
            const today = new Date().toISOString().split('T')[0];
            document.querySelector('input[type="date"]').setAttribute('min', today);
        }

        // Render menu items
        function renderMenu() {
            const filteredItems = currentCategory === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === currentCategory);

            menuGrid.innerHTML = filteredItems.map(item => `
                <div class="card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div class="p-6">
                        <div class="text-center mb-4">
                            <div class="text-5xl mb-2">${item.image}</div>
                            <h3 class="font-playfair text-xl font-bold text-gray-900 mb-2">${item.name}</h3>
                            <p class="text-gray-600 text-sm mb-4">${item.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-amber-700">৳${item.price}</span>
                                <button onclick="addToCart(${item.id})" 
                                        class="bg-amber-700 text-white px-4 py-2 rounded-full hover:bg-amber-800 transition-colors font-medium">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Setup event listeners
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

            // Cart functionality
            cartBtn.addEventListener('click', openCart);
            closeCartBtn.addEventListener('click', closeCart);
            cartOverlay.addEventListener('click', closeCart);
            checkoutBtn.addEventListener('click', checkout);

            // Reservation functionality
            reserveBtn.addEventListener('click', openReservationModal);
            heroReserveBtn.addEventListener('click', openReservationModal);
            cancelReservationBtn.addEventListener('click', closeReservationModal);
            reservationForm.addEventListener('submit', handleReservation);

            // Close modal when clicking outside
            reservationModal.addEventListener('click', function(e) {
                if (e.target === reservationModal) {
                    closeReservationModal();
                }
            });

            // Smooth scrolling for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
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
        }

        // Remove item from cart
        function removeFromCart(itemId) {
            cart = cart.filter(item => item.id !== itemId);
            updateCartUI();
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

            // Update cart items
            if (cart.length === 0) {
                emptyCart.classList.remove('hidden');
                cartFooter.classList.add('hidden');
                cartItems.innerHTML = '<div id="emptyCart" class="text-center py-12"><div class="text-6xl mb-4">🛒</div><p class="text-gray-500">Your cart is empty</p><p class="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p></div>';
            } else {
                emptyCart.classList.add('hidden');
                cartFooter.classList.remove('hidden');
                
                cartItems.innerHTML = cart.map(item => `
                    <div class="flex items-center justify-between py-4 border-b">
                        <div class="flex items-center space-x-3">
                            <span class="text-2xl">${item.image}</span>
                            <div>
                                <h4 class="font-medium text-gray-900">${item.name}</h4>
                                <p class="text-sm text-gray-600">৳${item.price} each</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="updateQuantity(${item.id}, -1)" 
                                    class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                                -
                            </button>
                            <span class="w-8 text-center font-medium">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" 
                                    class="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors">
                                +
                            </button>
                            <button onclick="removeFromCart(${item.id})" 
                                    class="ml-2 text-red-500 hover:text-red-700 transition-colors">
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
            if (cart.length === 0) return;
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Order placed successfully! 🎉\n\nTotal: ৳${total.toFixed(2)}\n\nYour authentic Bengali meal will be prepared fresh and delivered within 30-45 minutes. Thanks for choosing Delicious Bites!`);
            
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
            
            const formData = new FormData(e.target);
            const firstName = e.target.querySelector('input[type="text"]').value;
            const date = e.target.querySelector('input[type="date"]').value;
            const time = e.target.querySelector('select').value;
            const partySize = e.target.querySelectorAll('select')[1].value;
            
            alert(`Reservation confirmed! 🎉\n\n ${firstName}!\n\nYour table for ${partySize} ${partySize === '1' ? 'person' : 'people'} has been reserved for ${new Date(date).toLocaleDateString()} at ${time}.\n\nWe'll send you a confirmation email shortly. We look forward to serving you authentic Bengali cuisine at Delicious Bites!`);
            
            e.target.reset();
            closeReservationModal();
        }
    