let food = FoodDatabase.getFoodList();

const DAYS_TO_FORGET = 7;
let forgetList = null;
let shoppingList = [];
let currentItem = null;
let currentScreen = 'mainScreen';
let touchStartX = null;
let touchStartY = null;
let currentX = null;
let currentY = null;
let cardElement = null;

// Initialize app
function initApp() {
    loadFromLocalStorage();
    setupSwipeGestures();
    rotate();
    updateUI();
}

// Setup swipe gestures
function setupSwipeGestures() {
    cardElement = document.getElementById('foodCard');

    // Touch events
    cardElement.addEventListener('touchstart', handleTouchStart, {passive: true});
    cardElement.addEventListener('touchmove', handleTouchMove, {passive: true});
    cardElement.addEventListener('touchend', handleTouchEnd, {passive: true});

    // Mouse events for desktop
    cardElement.addEventListener('mousedown', handleMouseDown);
    cardElement.addEventListener('mousemove', handleMouseMove);
    cardElement.addEventListener('mouseup', handleMouseUp);
    cardElement.addEventListener('mouseleave', handleMouseUp);
}

// Touch/Mouse handlers
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    currentX = touchStartX;
    currentY = touchStartY;
    cardElement.classList.add('dragging');
}

function handleMouseDown(e) {
    touchStartX = e.clientX;
    touchStartY = e.clientY;
    currentX = touchStartX;
    currentY = touchStartY;
    cardElement.classList.add('dragging');
    e.preventDefault();
}

function handleTouchMove(e) {
    if (!touchStartX) return;
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    updateCardPosition();
}

function handleMouseMove(e) {
    if (!touchStartX) return;
    currentX = e.clientX;
    currentY = e.clientY;
    updateCardPosition();
}

function updateCardPosition() {
    const deltaX = currentX - touchStartX;
    const rotation = deltaX * 0.1;
    cardElement.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
    cardElement.style.opacity = 1 - Math.abs(deltaX) / 300;
}

function handleTouchEnd() {
    handleSwipeEnd();
}

function handleMouseUp() {
    if (!touchStartX) return;
    handleSwipeEnd();
}

function handleSwipeEnd() {
    const deltaX = currentX - touchStartX;
    cardElement.classList.remove('dragging');

    if (Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
            cardElement.classList.add('swiped-right');
            setTimeout(() => handleAccept(), 200);
        } else {
            cardElement.classList.add('swiped-left');
            setTimeout(() => handleReject(), 200);
        }
    } else {
        cardElement.style.transform = '';
        cardElement.style.opacity = '';
    }

    touchStartX = null;
    currentX = null;
}

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    currentScreen = screenId;

    if (screenId === 'searchScreen') {
        document.querySelectorAll('.icon-btn')[0].classList.add('active');
        loadSearchItems();
    } else if (screenId === 'shoppingScreen') {
        document.querySelectorAll('.icon-btn')[1].classList.add('active');
        loadShoppingList();
    } else if (screenId === 'infoScreen') {
        document.querySelectorAll('.icon-btn')[2].classList.add('active');
    }
}

// Main functions
function rotate() {
    loadForgetListFromLocalStore();
    forgetList.expireItemsOlderThan(DAYS_TO_FORGET);
    saveForgetListToLocalStore();

    if (!hasSomethingToRotate()) {
        document.getElementById('foodItem').innerHTML = "All items forgotten!<br>Wait until tomorrow.";
        return;
    }

    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * food.length);
    } while (forgetList.hasItem(food[randomNumber]));

    currentItem = food[randomNumber];
    document.getElementById('foodItem').innerHTML = currentItem;

    // Reset card animation
    cardElement.classList.remove('swiped-left', 'swiped-right');
    cardElement.style.transform = '';
    cardElement.style.opacity = '';
}

function handleReject() {
    const dontAsk = localStorage.getItem('dontAskForget') === 'true';

    if (dontAsk) {
        proceedWithForget();
    } else {
        document.getElementById('forgetItemName').textContent = currentItem;
        showDialog('forgetDialog');
    }
}

function handleAccept() {
    const dontAsk = localStorage.getItem('dontAskAdd') === 'true';

    if (dontAsk) {
        proceedWithAdd();
    } else {
        document.getElementById('addItemName').textContent = currentItem;
        showDialog('addDialog');
    }
}

function handleForgetResponse(confirmed) {
    hideDialog('forgetDialog');

    if (confirmed) {
        if (document.getElementById('dontAskForget').checked) {
            localStorage.setItem('dontAskForget', 'true');
        }
        proceedWithForget();
    } else {
        // Reset card position
        cardElement.classList.remove('swiped-left');
        cardElement.style.transform = '';
        cardElement.style.opacity = '';
    }

    document.getElementById('dontAskForget').checked = false;
}

function handleAddResponse(confirmed) {
    hideDialog('addDialog');

    if (confirmed) {
        if (document.getElementById('dontAskAdd').checked) {
            localStorage.setItem('dontAskAdd', 'true');
        }
        proceedWithAdd();
    } else {
        // Reset card position
        cardElement.classList.remove('swiped-right');
        cardElement.style.transform = '';
        cardElement.style.opacity = '';
    }

    document.getElementById('dontAskAdd').checked = false;
}

function proceedWithForget() {
    if (!hasSomethingToRotate()) return;

    let item = new ForgetItem(currentItem, new Date());
    forgetList.add(item);
    saveForgetListToLocalStore();
    rotate();
}

function proceedWithAdd() {
    if (!shoppingList.includes(currentItem)) {
        shoppingList.push(currentItem);
        saveShoppingListToLocalStore();
        updateUI();
    }
    rotate();
}

// Search functionality
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const itemsList = document.getElementById('itemsList');
    const addContainer = document.getElementById('addItemContainer');

    if (searchTerm === '') {
        // Show all items
        loadSearchItems();
        addContainer.style.display = 'none';
    } else {
        // Filter items
        const filtered = food.filter(item =>
            item.toLowerCase().includes(searchTerm)
        );

        if (filtered.length === 0) {
            itemsList.innerHTML = '';
            addContainer.style.display = 'block';
        } else {
            addContainer.style.display = 'none';
            displaySearchItems(filtered);
        }
    }
}

function loadSearchItems() {
    const sortedFood = [...food].sort();
    displaySearchItems(sortedFood);
}

function displaySearchItems(items) {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'item-row';
        row.innerHTML = `
            <span class="item-name">${item}</span>
            <button class="delete-btn" onclick="confirmDelete('${item.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        row.onclick = (e) => {
            if (!e.target.closest('.delete-btn')) {
                selectItem(item);
            }
        };
        itemsList.appendChild(row);
    });
}

function selectItem(item) {
    currentItem = item;
    document.getElementById('foodItem').innerHTML = currentItem;
    showScreen('mainScreen');
}

function confirmDelete(item) {
    document.getElementById('deleteItemName').textContent = item;
    showDialog('deleteDialog');
    window.itemToDelete = item;
}

function handleDeleteResponse(confirmed) {
    hideDialog('deleteDialog');

    if (confirmed && window.itemToDelete) {
        const index = food.indexOf(window.itemToDelete);
        if (index > -1) {
            food.splice(index, 1);
            saveFoodListToLocalStore();
            loadSearchItems();
        }
    }

    window.itemToDelete = null;
}

function addNewItem() {
    const searchInput = document.getElementById('searchInput');
    const newItem = searchInput.value.trim();

    if (newItem && !food.includes(newItem)) {
        food.push(newItem);
        saveFoodListToLocalStore();
        searchInput.value = '';
        handleSearch();
    }
}

// Shopping list functions
function loadShoppingList() {
    const shoppingListEl = document.getElementById('shoppingList');
    const emptyCart = document.getElementById('emptyCart');

    if (shoppingList.length === 0) {
        shoppingListEl.style.display = 'none';
        emptyCart.style.display = 'flex';
    } else {
        shoppingListEl.style.display = 'block';
        emptyCart.style.display = 'none';

        shoppingListEl.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'item-row';
            row.innerHTML = `
                <span class="item-number">${index + 1}.</span>
                <span class="item-name">${item}</span>
                <button class="delete-btn" onclick="removeFromCart('${item.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            shoppingListEl.appendChild(row);
        });
    }

    updateUI();
}

function removeFromCart(item) {
    const index = shoppingList.indexOf(item);
    if (index > -1) {
        shoppingList.splice(index, 1);
        saveShoppingListToLocalStore();
        loadShoppingList();
    }
}

// Reset functionality
function confirmReset() {
    showDialog('resetDialog');
}

function handleResetResponse(confirmed) {
    hideDialog('resetDialog');

    if (confirmed) {
        localStorage.clear();
        forgetList = new ForgetList();
        shoppingList = [];
        location.reload();
    }
}

// Dialog functions
function showDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// UI Updates
function updateUI() {
    const cartCount = document.getElementById('cartCount');
    const shoppingCount = document.getElementById('shoppingCount');

    if (shoppingList.length > 0) {
        cartCount.style.display = 'flex';
        cartCount.textContent = shoppingList.length;
    } else {
        cartCount.style.display = 'none';
    }

    if (shoppingCount) {
        shoppingCount.textContent = shoppingList.length;
    }
}

// Storage functions
function loadFromLocalStorage() {
    loadForgetListFromLocalStore();
    loadShoppingListFromLocalStore();
    loadFoodListFromLocalStore();
}

function loadShoppingListFromLocalStore() {
    const stored = localStorage.getItem('shoppingList');
    if (stored) {
        try {
            shoppingList = JSON.parse(stored);
        } catch (e) {
            shoppingList = [];
        }
    }
}

function saveShoppingListToLocalStore() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function loadFoodListFromLocalStore() {
    const stored = localStorage.getItem('foodList');
    if (stored) {
        try {
            const customFood = JSON.parse(stored);
            food = [...food, ...customFood];
        } catch (e) {
            console.error('Error loading custom food list');
        }
    }
}

function saveFoodListToLocalStore() {
    // Only save custom additions/deletions
    localStorage.setItem('foodList', JSON.stringify(food));
}

// Keep your existing ForgetList class and related functions
function loadForgetListFromLocalStore() {
    let forgetListString = localStorage.getItem('forgetList');
    if (forgetList == null) {
        forgetList = new ForgetList();
    }
    forgetList.loadFromJSONString(forgetListString);
}

function saveForgetListToLocalStore() {
    localStorage.setItem('forgetList', forgetList.toJSONString());
}

function hasSomethingToRotate() {
    return forgetList.items.length < food.length;
}

// ForgetItem and ForgetList classes (keep your existing implementation)
class ForgetItem {
    constructor(item, date) {
        this.item = item;
        this.date = date;
    }
}

class ForgetList {
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }

    hasItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].item === item) {
                return true;
            }
        }
        return false;
    }

    expireItemsOlderThan(days) {
        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - days);
        this.items = this.items.filter(item => item.date >= targetDate);
    }

    loadFromJSONString(forgetListString) {
        try {
            this.items = JSON.parse(forgetListString, function (key, value) {
                if (key === "date") {
                    return new Date(value);
                }
                return value;
            });
            if (this.items === null) {
                this.items = [];
            }
        } catch (e) {
            this.items = [];
        }
    }

    toJSONString() {
        return JSON.stringify(this.items);
    }
}
