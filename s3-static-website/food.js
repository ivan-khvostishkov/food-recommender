/*
 * Copyright (c) 2013-2025 NoSocial.Net & Ivan Khvostishkov. Co-authored with Amazon Q
 */

let food = FoodDatabase.getFoodList();
const foodTags = FoodDatabase.getTagMap();
const foodGroups = FoodDatabase.getFoodGroups();
const renamedItems = FoodDatabase.getRenamedItems();
let customTags = {};

const DAYS_TO_FORGET = 30;
let forgetList = null;
let shoppingList = [];
let collectedItems = [];
let currentItem = null;
let currentScreen = 'mainScreen';
let touchStartX = null;
let touchStartY = null;
let currentX = null;
let currentY = null;
let cardElement = null;
let hasDragged = false;
let textSelected = false;

// Initialize app
function initApp() {
    loadFromLocalStorage();
    setupSwipeGestures();
    rotate();
    updateUI();
    loadVersionInfo();
}

// Setup swipe gestures
function setupSwipeGestures() {
    cardElement = document.getElementById('foodCard');
    const foodText = document.getElementById('foodItem');

    // Touch events
    cardElement.addEventListener('touchstart', handleTouchStart, {passive: true});
    cardElement.addEventListener('touchmove', handleTouchMove, {passive: true});
    cardElement.addEventListener('touchend', handleTouchEnd, {passive: true});

    // Mouse events for desktop
    cardElement.addEventListener('mousedown', handleMouseDown);
    cardElement.addEventListener('mousemove', handleMouseMove);
    cardElement.addEventListener('mouseup', handleMouseUp);
    cardElement.addEventListener('mouseleave', handleMouseUp);



    // Track selection state
    document.addEventListener('selectionchange', () => {
        textSelected = window.getSelection().toString().length > 0;
    });
}

// Touch/Mouse handlers
function handleTouchStart(e) {
    if (textSelected) return;
    
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    currentX = touchStartX;
    currentY = touchStartY;
    cardElement.classList.add('dragging');
}

function handleMouseDown(e) {
    if (textSelected) {
        if (!document.getElementById('foodItem').contains(e.target)) {
            window.getSelection().removeAllRanges();
            textSelected = false;
        }
        return;
    }
    hasDragged = false;
    touchStartX = e.clientX;
    touchStartY = e.clientY;
    currentX = touchStartX;
    currentY = touchStartY;
    cardElement.classList.add('dragging');
    e.preventDefault();
}

function handleTouchMove(e) {
    if (!touchStartX || textSelected) return;
    
    hasDragged = true;
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    updateCardPosition();
}

function handleMouseMove(e) {
    if (!touchStartX || textSelected) return;
    hasDragged = true;
    currentX = e.clientX;
    currentY = e.clientY;
    updateCardPosition();
}

function updateCardPosition() {
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe (accept/reject)
        const rotation = deltaX * 0.1;
        cardElement.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        cardElement.style.opacity = 1 - Math.abs(deltaX) / 300;
    } else if (deltaY > 0) {
        // Vertical swipe down (rotate)
        cardElement.style.transform = `translateY(${deltaY}px)`;
        cardElement.style.opacity = 1 - deltaY / 300;
    }
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
    const deltaY = currentY - touchStartY;
    cardElement.classList.remove('dragging');

    if (Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
            cardElement.classList.add('swiped-right');
            setTimeout(() => handleAccept(), 200);
        } else {
            cardElement.classList.add('swiped-left');
            setTimeout(() => handleReject(), 200);
        }
    } else if (deltaY > 100) {
        // Swipe down to rotate
        cardElement.style.transform = 'translateY(100px)';
        cardElement.style.opacity = '0.5';
        setTimeout(() => {
            rotate();
            cardElement.style.transform = '';
            cardElement.style.opacity = '';
        }, 200);
    } else {
        cardElement.style.transform = '';
        cardElement.style.opacity = '';
    }

    touchStartX = null;
    currentX = null;
    currentY = null;
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
        handleSearch();
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

    const recommendation = pickRecommendation();
    if (!recommendation) {
        document.getElementById('foodItem').innerHTML = "All items forgotten!<br>Wait until tomorrow.";
        return;
    }

    currentItem = recommendation;
    document.getElementById('foodItem').innerHTML = formatCardItem(currentItem);

    // Reset card animation
    cardElement.classList.remove('swiped-left', 'swiped-right');
    cardElement.style.transform = '';
    cardElement.style.opacity = '';
}

// Items of a food group; "Other" (no tags) collects items without any group tag
function isInFoodGroup(item, group) {
    const itemTags = getItemTags(item);
    if (group.tags.length === 0) {
        return !foodGroups.some(otherGroup => otherGroup.tags.some(tag => itemTags.includes(tag)));
    }
    return group.tags.some(tag => itemTags.includes(tag));
}

// First pick a food group by its pyramid weight, then a random item within it
function pickRecommendation() {
    const neverRecommended = foodGroups.filter(group => group.weight === 0);
    const candidates = food.filter(item => !forgetList.hasItem(item) &&
        !neverRecommended.some(group => isInFoodGroup(item, group)));
    const pools = foodGroups
        .filter(group => group.weight > 0)
        .map(group => ({weight: group.weight, items: candidates.filter(item => isInFoodGroup(item, group))}))
        .filter(pool => pool.items.length > 0);
    if (pools.length === 0) return null;

    let random = Math.random() * pools.reduce((sum, pool) => sum + pool.weight, 0);
    const pool = pools.find(pool => (random -= pool.weight) < 0) || pools[pools.length - 1];
    return pool.items[Math.floor(Math.random() * pool.items.length)];
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
    document.getElementById('clearSearchBtn').style.display = searchTerm === '' ? 'none' : 'block';

    if (searchTerm === '') {
        // Show all items
        loadSearchItems();
        addContainer.style.display = 'none';
    } else {
        // Filter items: "#tag" words match tags, the rest matches the name
        const words = searchTerm.split(/\s+/).filter(word => word !== '');
        const searchTags = words.filter(word => word.startsWith('#')).map(word => word.substring(1));
        const searchText = words.filter(word => !word.startsWith('#')).join(' ');
        const filtered = food.filter(item => {
            const itemTags = getItemTags(item);
            return item.toLowerCase().includes(searchText) &&
                searchTags.every(tag => itemTags.some(itemTag => itemTag.startsWith(tag)));
        });

        if (filtered.length === 0) {
            itemsList.innerHTML = '';
            updateResultCount(0);
            addContainer.style.display = searchText ? 'block' : 'none';
        } else {
            addContainer.style.display = 'none';
            displaySearchItems(filtered);
        }
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    handleSearch();
    searchInput.focus();
}

function loadSearchItems() {
    displaySearchItems([...food]);
}

// Sorted alphabetically, or in random order when Shuffle is on
function orderSearchItems(items) {
    if (!document.getElementById('shuffleToggle').checked) {
        return items.sort();
    }
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
}

function updateResultCount(count) {
    document.getElementById('resultCount').textContent = `${count} ${count === 1 ? 'result' : 'results'}`;
}

function displaySearchItems(items) {
    orderSearchItems(items);
    updateResultCount(items.length);
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'item-row';
        const formattedItem = formatListItem(item);
        const tagChips = getItemTags(item)
            .map(tag => `<span class="tag-chip" onclick="searchTag('${tag}')">#${tag}</span>`)
            .join('');
        row.innerHTML = `
            <span class="item-name">${formattedItem}</span>
            <span class="item-tags">${tagChips}</span>
            <button class="delete-btn" onclick="confirmDelete('${item.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        row.onclick = (e) => {
            if (!e.target.closest('.delete-btn') && !e.target.closest('a') && !e.target.closest('.tag-chip')) {
                selectItem(item);
            }
        };
        itemsList.appendChild(row);
    });
}

function getItemTags(item) {
    return foodTags[item] || customTags[item] || [];
}

function searchTag(tag) {
    document.getElementById('searchInput').value = '#' + tag;
    handleSearch();
}

function selectItem(item) {
    currentItem = item;
    document.getElementById('foodItem').innerHTML = formatCardItem(currentItem);
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
            delete customTags[window.itemToDelete];
            saveFoodListToLocalStore();
            loadSearchItems();
        }
    }

    window.itemToDelete = null;
}

function addNewItem() {
    const searchInput = document.getElementById('searchInput');
    // "Tofu #vegies" adds "Tofu" tagged with #vegies
    const words = searchInput.value.trim().split(/\s+/);
    const newTags = words.filter(word => word.startsWith('#') && word.length > 1)
        .map(word => word.substring(1).toLowerCase());
    const newItem = words.filter(word => !word.startsWith('#')).join(' ');

    if (newItem && !food.includes(newItem)) {
        food.push(newItem);
        if (newTags.length > 0) {
            customTags[newItem] = newTags;
        }
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
            const isCollected = collectedItems.includes(item);
            const formattedItem = formatListItem(item);
            row.innerHTML = `
                <span class="item-number">${index + 1}.</span>
                <span class="item-name ${isCollected ? 'collected' : ''}" onclick="if (!event.target.closest('a')) toggleCollected('${item.replace(/'/g, "\\'")}')">${formattedItem}</span>
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
        const collectedIndex = collectedItems.indexOf(item);
        if (collectedIndex > -1) {
            collectedItems.splice(collectedIndex, 1);
        }
        saveShoppingListToLocalStore();
        loadShoppingList();
    }
}

function toggleCollected(item) {
    const index = collectedItems.indexOf(item);
    if (index > -1) {
        collectedItems.splice(index, 1);
    } else {
        collectedItems.push(item);
    }
    saveShoppingListToLocalStore();
    loadShoppingList();
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

// Export / import of products, customizations and shopping list
const EXPORT_APP_ID = 'food-recommender';
let pendingImport = null;

function exportData() {
    const data = {
        app: EXPORT_APP_ID,
        formatVersion: 1,
        exportedAt: new Date().toISOString(),
        customAdditions: JSON.parse(localStorage.getItem('customAdditions') || '[]'),
        customDeletions: JSON.parse(localStorage.getItem('customDeletions') || '[]'),
        customTags: customTags,
        shoppingList: shoppingList,
        collectedItems: collectedItems,
        forgetList: forgetList ? forgetList.items : [],
        dontAskForget: localStorage.getItem('dontAskForget') === 'true',
        dontAskAdd: localStorage.getItem('dontAskAdd') === 'true'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `food-recommender-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function chooseImportFile() {
    const fileInput = document.getElementById('importFile');
    fileInput.value = '';
    fileInput.click();
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);
            if (data.app !== EXPORT_APP_ID) {
                throw new Error('not a Food Recommender export');
            }
            pendingImport = data;
            showDialog('importDialog');
        } catch (e) {
            alert('Could not import this file: ' + e.message);
        }
    };
    reader.readAsText(file);
}

function handleImportResponse(confirmed) {
    hideDialog('importDialog');

    if (confirmed && pendingImport) {
        const data = pendingImport;
        const asArray = value => Array.isArray(value) ? value : [];
        localStorage.setItem('customAdditions', JSON.stringify(asArray(data.customAdditions)));
        localStorage.setItem('customDeletions', JSON.stringify(asArray(data.customDeletions)));
        localStorage.setItem('customTags', JSON.stringify(data.customTags || {}));
        localStorage.setItem('shoppingList', JSON.stringify(asArray(data.shoppingList)));
        localStorage.setItem('collectedItems', JSON.stringify(asArray(data.collectedItems)));
        localStorage.setItem('forgetList', JSON.stringify(asArray(data.forgetList)));
        localStorage.setItem('dontAskForget', String(data.dontAskForget === true));
        localStorage.setItem('dontAskAdd', String(data.dontAskAdd === true));

        shoppingList = [];
        collectedItems = [];
        loadFromLocalStorage();
        rotate();
        updateUI();
        showScreen('mainScreen');
    }

    pendingImport = null;
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
            shoppingList = migrateItemNames(JSON.parse(stored));
        } catch (e) {
            shoppingList = [];
        }
    }
    const collectedStored = localStorage.getItem('collectedItems');
    if (collectedStored) {
        try {
            collectedItems = migrateItemNames(JSON.parse(collectedStored));
        } catch (e) {
            collectedItems = [];
        }
    }
}

function saveShoppingListToLocalStore() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    localStorage.setItem('collectedItems', JSON.stringify(collectedItems));
}

function loadFoodListFromLocalStore() {
    const baseFood = FoodDatabase.getFoodList();
    const additions = migrateItemNames(JSON.parse(localStorage.getItem('customAdditions') || '[]'));
    const deletions = migrateItemNames(JSON.parse(localStorage.getItem('customDeletions') || '[]'));
    customTags = JSON.parse(localStorage.getItem('customTags') || '{}');

    food = [...baseFood, ...additions.filter(item => !baseFood.includes(item))]
        .filter(item => !deletions.includes(item));
}

function saveFoodListToLocalStore() {
    const baseFood = FoodDatabase.getFoodList();
    const additions = food.filter(item => !baseFood.includes(item));
    const deletions = baseFood.filter(item => !food.includes(item));
    
    localStorage.setItem('customAdditions', JSON.stringify(additions));
    localStorage.setItem('customDeletions', JSON.stringify(deletions));
    localStorage.setItem('customTags', JSON.stringify(customTags));
}

// Map renamed or merged items to their current names, dropping duplicates
function migrateItemNames(items) {
    return [...new Set(items.map(item => renamedItems[item] || item))];
}

// Keep your existing ForgetList class and related functions
function loadForgetListFromLocalStore() {
    let forgetListString = localStorage.getItem('forgetList');
    if (forgetList == null) {
        forgetList = new ForgetList();
    }
    forgetList.loadFromJSONString(forgetListString);
    forgetList.items.forEach(forgetItem => {
        forgetItem.item = renamedItems[forgetItem.item] || forgetItem.item;
    });
}

function saveForgetListToLocalStore() {
    localStorage.setItem('forgetList', forgetList.toJSONString());
}

function hasSomethingToRotate() {
    return forgetList.items.length < food.length;
}

// Reference websites to learn more about an item
const googleSiteSearch = site => query => `https://www.google.com/search?q=${query}+site:${site}`;
const INFO_SITES = {
    cheese: {name: 'Cheese.com', url: query => `https://www.cheese.com/?q=${query}`},
    apples: {name: 'Orange Pippin', url: googleSiteSearch('orangepippin.com')},
    fish: {name: 'Good Fish Guide', url: googleSiteSearch('mcsuk.org/goodfishguide')},
    mushrooms: {name: 'First Nature', url: googleSiteSearch('first-nature.com')},
    foraged: {name: 'Wild Food UK', url: query => `https://www.wildfooduk.com/?s=${query}`},
    tomatoes: {name: 'TOMATObase', url: query => `https://tatianastomatobase.com/wiki/index.php?search=${query}`},
    produce: {name: 'Specialty Produce', url: googleSiteSearch('specialtyproduce.com')},
    wikipedia: {name: 'Wikipedia', url: query => `https://en.wikipedia.org/wiki/Special:Search?search=${query}`}
};
const RECIPES_SITE = {name: 'Recipes', url: query => `https://www.bbcgoodfood.com/search?q=${query}`};
const NUTRITION_SITE = {name: 'Nutrition', url: query => `https://fdc.nal.usda.gov/food-search?query=${query}`};
const SEASONS_URL = 'https://www.eattheseasons.co.uk/seasons';

// Split "Name (details)" into name and details
function splitItemName(item) {
    const match = item.match(/^(.+?)\s+\(([^)]+)\)$/);
    return match ? {name: match[1], details: match[2]} : {name: item, details: null};
}

function getInfoSite(item) {
    const {name, details} = splitItemName(item);
    const tags = getItemTags(item);
    if (details === 'cheese' || tags.includes('cheese')) return INFO_SITES.cheese;
    if (/\b(apples?|pears?)$/i.test(name) && !/custard/i.test(name)) return INFO_SITES.apples;
    if (tags.includes('fish') && !/sauce/i.test(name)) return INFO_SITES.fish;
    if (/mushroom|ceps|chanterelles|trompette|morel|truffle|puffball|blewit|wax caps/i.test(name)) return INFO_SITES.mushrooms;
    if (!tags.includes('meat') && /wild |alexanders|sea kale|nettles|samphire|three cornered|sorrel|meadowsweet|elderflower|rowan|sloes|purslane|borage|marigold|cornflowers|nasturtium|chive flowers|ice plant/i.test(name)) return INFO_SITES.foraged;
    if (/tomatoes$/i.test(name) && !/canned/i.test(name)) return INFO_SITES.tomatoes;
    if (details && details.startsWith('try in') && (tags.includes('fruits') || tags.includes('vegies'))) return INFO_SITES.produce;
    return INFO_SITES.wikipedia;
}

function siteLink(site, item, className) {
    const query = encodeURIComponent(splitItemName(item).name).replace(/%20/g, '+');
    return `<a href="${site.url(query)}" target="_blank" class="${className}" title="${site.name}">`;
}

// Format items in lists: "(cheese)" links to cheese.com, "(try in ...)" to the seasons guide,
// other items get an info icon linking to their reference website
function formatListItem(item) {
    const {name, details} = splitItemName(item);
    if (details === 'cheese') {
        return `${name} (${siteLink(INFO_SITES.cheese, item, 'info-link')}cheese</a>)`;
    }
    const text = details && details.startsWith('try in')
        ? `${name} (<a href="${SEASONS_URL}" target="_blank" class="info-link" title="Eat the Seasons">${details}</a>)`
        : item;
    return `${text} ${siteLink(getInfoSite(item), item, 'info-icon')}<i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
}

// Format the main card: details on second line, then links to reference websites
function formatCardItem(item) {
    const {name, details} = splitItemName(item);
    const infoSite = getInfoSite(item);
    const links = [infoSite, RECIPES_SITE, NUTRITION_SITE]
        .map(site => `${siteLink(site, item, 'info-link')}${site.name}</a>`)
        .join(' · ');
    let nameHtml = name;
    let detailsHtml = '';
    if (details === 'cheese') {
        nameHtml = `${siteLink(infoSite, item, 'plain-link')}${name}</a>`;
        detailsHtml = `<span class="month-text">${siteLink(infoSite, item, 'info-link')}cheese</a></span>`;
    } else if (details && details.startsWith('try in')) {
        detailsHtml = `<span class="month-text"><a href="${SEASONS_URL}" target="_blank" class="info-link" title="Eat the Seasons">${details}</a></span>`;
    } else if (details) {
        detailsHtml = `<span class="month-text">${details}</span>`;
    }
    return `${nameHtml} <br>${detailsHtml}<span class="card-links">${links}</span>`;
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

// Load version info from service worker
function loadVersionInfo() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // Try to get version from service worker
        fetch('/sw.js')
            .then(response => response.text())
            .then(swContent => {
                const match = swContent.match(/CACHE_NAME = ['"]([^'"]+)['"]/); 
                if (match) {
                    const cacheName = match[1];
                    const versionMatch = cacheName.match(/v([\d.]+)/);
                    if (versionMatch) {
                        document.getElementById('versionInfo').textContent = versionMatch[1];
                    } else {
                        document.getElementById('versionInfo').textContent = cacheName;
                    }
                } else {
                    document.getElementById('versionInfo').textContent = 'Unknown';
                }
            })
            .catch(() => {
                document.getElementById('versionInfo').textContent = 'Unknown';
            });
    } else {
        document.getElementById('versionInfo').textContent = 'Unknown';
    }
}


