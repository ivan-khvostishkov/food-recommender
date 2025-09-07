// See https://ec.europa.eu/eurostat/cache/website/economy/food-price-monitoring/
// See https://ec.europa.eu/eurostat/web/hicp
// See https://www.ons.gov.uk/economy/inflationandpriceindices

let food = [
    // 01.1.1 Bread and Cereals (HICP monitored)
    'Wholemeal bread',
    'White bread',
    'Bread rolls',
    'Flour',
    'Pasta',
    'Rice',
    'Breakfast cereals',
    'Hot oat cereal',
    'Biscuits (sweet snacks / cookies)',
    'Crackers (savory with cheese)',
    'Couscous',
    'Quinoa',
    'Pearl barley',
    'Buckwheat',

    // 01.1.2 Meat (HICP monitored)
    'Beef',
    'Lamb',
    'Pork',
    'Chicken',
    'Fresh diced turkey',
    'Pork sausages',
    'Ham',
    'Bacon',
    'Liver',

    // 01.1.3 Fish (HICP monitored)
    'Fresh white fish fillets',
    'Canned tuna',
    'Fresh salmon fillets',
    'Frozen prawns',
    'Sardines',
    'Mackerel',
    'Cod',
    'Herring',

    // 01.1.4 Milk, Cheese and Eggs (HICP monitored)
    'Semi-skimmed milk',
    'Full-fat milk',
    'Butter',
    'Eggs',
    'Yoghurt',
    'Cheddar',
    'Parmesan',
    'Soft cheese',
    'Greek yogurt',
    'Cottage cheese',
    'Mozzarella',
    'Feta cheese',
    
    // Common Cheeses
    'Brie (cheese)',
    'Camembert (cheese)',
    'Gouda (cheese)',
    'Edam (cheese)',
    'Emmental (cheese)',
    'Gruyere (cheese)',
    'Stilton (cheese)',
    'Roquefort (cheese)',
    'Gorgonzola (cheese)',
    'Cheshire (cheese)',
    'Lancashire (cheese)',
    'Neufchatel (cheese)',
    'Munster (cheese)',
    'Comte (cheese)',
    'Beaufort (cheese)',
    'Reblochon (cheese)',
    'Saint-Nectaire (cheese)',
    'Cantal (cheese)',
    'Maroilles (cheese)',
    'Livarot (cheese)',
    'Pont-l\'Eveque (cheese)',
    'Epoisses (cheese)',
    'Langres (cheese)',
    'Chaource (cheese)',
    'Saint-Marcellin (cheese)',
    'Crottin de Chavignol (cheese)',
    'Sainte-Maure (cheese)',
    'Pouligny-Saint-Pierre (cheese)',
    'Banon (cheese)',
    'Cabecou (cheese)',
    'Picodon (cheese)',
    'Pecorino (cheese)',
    'Provolone (cheese)',
    'Caciocavallo (cheese)',
    'Ricotta (cheese)',
    'Fontina (cheese)',
    'Asiago (cheese)',
    'Manchego (cheese)',
    'Mimolette (cheese)',
    'Port-Salut (cheese)',
    'Saint-Paulin (cheese)',
    'Fourme (cheese)',
    'Blue Cheshire (cheese)',
    'Coulommiers (cheese)',
    'Vacherin (cheese)',
    'Tomme (cheese)',
    'Appenzell (cheese)',
    'Sbrinz (cheese)',
    'Tilsitt (cheese)',
    'Limburger (cheese)',
    'Herve (cheese)',
    'Laguiole (cheese)',
    'Rollot (cheese)',
    'Saint-Florentin (cheese)',
    'Soumaintrain (cheese)',
    'Vendome (cheese)',
    'Brillat-Savarin (cheese)',
    'Excelsior (cheese)',
    'Fontainebleau (cheese)',
    'Petit-Suisse (cheese)',
    'Broccio (cheese)',
    'Venaco (cheese)',
    'Chevrotin (cheese)',
    'Rigotte (cheese)',
    'Selles-sur-Cher (cheese)',
    'Pelardon (cheese)',
    'Chabichou (cheese)',
    "Carre de l'Est (cheese)",
    'Gerome (cheese)',
    'Gris de Lille (cheese)',
    'Olivet (cheese)',
    'Pithiviers (cheese)',
    'Feuille de Dreux (cheese)',
    'Gaperon (cheese)',
    'Bouton-de-Culotte (cheese)',
    'Baguette de Thierache (cheese)',
    'Brousse (cheese)',
    'Fribourg (cheese)',
    'Katschkawalj (cheese)',

    // 01.1.6 Fruit (HICP monitored)
    'Apples',
    'Pears',
    'Strawberries',
    'Oranges',
    'Bananas',
    'Lemon',
    'Grapes',
    'Plums',
    'Grapefruit',
    'Blueberries',
    'Raspberries',
    'Kiwi fruit',
    'Melon',
    'Pineapple',
    'Avocado',
    'Dried fruit',

    // 01.1.7 Vegetables (HICP monitored)
    'Potatoes',
    'Fresh tomatoes',
    'Cauliflower',
    'Mushrooms',
    'Lettuce',
    'Broccoli',
    'Sweet potatoes',
    'Canned pulses',
    'Canned tomatoes',
    'Pre-packed salad',
    'Peppers',
    'Cabbage',
    'Carrots',
    'Onions',
    'Cucumbers',
    'Courgettes',
    'Green beans',
    'Canned baked beans',
    'Canned sweetcorn',
    'Frozen peas',
    'Spinach',
    'Kale',
    'Brussels sprouts',

    // Legumes & Nuts
    'Lentils',
    'Chickpeas',
    'Black beans',
    'Kidney beans',
    'Almonds',
    'Walnuts',
    'Pumpkin seeds',
    'Sunflower seeds',

    // Seasonal Items - January
    'Citrus fruits (January)',
    'Winter squash (January)',
    'Leeks (January)',

    // Borough Market - Here & Now
    'Kale (January)',
    'Swede (January)',
    'Pomegranate (January)',
    'Lychees (January)',
    'January King cabbage (January)',
    'Conference pears (January)',
    'Figs (January)',
    'Sea kale (January)',
    'Shetland black potatoes (January)',
    'Dover sole (January)',
    'Bass (January)',
    'Herring (January)',
    'Sprats (January)',
    'Scallops (January)',
    'Venison (January)',
    'Pheasant (January)',
    'Woodcock (January)',
    'Partridge (January)',
    'Winter black truffle (January)',

    // Seasonal Items - February
    'Blood oranges (February)',
    'Parsnips (February)',
    'Purple sprouting broccoli (February)',

    // Borough Market - Here & Now
    'Forced rhubarb (February)',
    'Winter cauliflower (February)',
    'Seville oranges (February)',
    'Salt marsh lamb (February)',
    'Pork collar (February)',
    'Sea bass (February)',
    'Crab (February)',
    'Lobster (February)',
    'Clams (February)',
    'Mussels (February)',
    'Wild garlic (February)',
    'Black trompette mushrooms (February)',
    'Chanterelles (February)',
    'Kumquats (February)',
    'Israeli oranges (February)',
    'Israeli clementines (February)',

    // Seasonal Items - March
    'Rhubarb (March)',
    'Spring onions (March)',
    'Watercress (March)',

    // Borough Market - Here & Now
    'Wild garlic (March)',
    'Jersey royals (March)',
    'Spring greens (March)',
    'Ortanique (March)',
    'Cape plums (March)',
    'Heirloom tomatoes (March)',
    'Spanish aubergines (March)',
    'Dover sole (March)',
    'Turbot (March)',
    'Pollack (March)',
    'Gurnard (March)',
    'Plaice (March)',
    'Brill (March)',
    'Three cornered leek (March)',
    'Wild alexanders (March)',
    'Morel mushrooms (March)',
    'Black garlic (March)',
    'Mustard leaves (March)',
    'Red frills lettuce (March)',
    'Claytonia (March)',
    'Komatsuna (March)',
    'Grey mullet (March)',
    'Whiting (March)',

    // Seasonal Items - April
    'Asparagus (April)',
    'Artichokes (April)',
    'Spring lamb (April)',

    // Borough Market - Here & Now
    'Morel mushrooms (April)',
    'Rocket (April)',
    'Sorrel (April)',
    'Kentish wild garlic (April)',
    'Alexander (April)',
    'Lollo rosso lettuce (April)',
    'French breakfast radish (April)',
    'Punterella (April)',
    'Rapini (April)',
    'Frisée (April)',
    'Butterhead lettuce (April)',
    'Cavolo nero (April)',
    'Jerome cauliflower (April)',
    'Mayflower cauliflower (April)',
    'Hannibal leeks (April)',
    'Dogfish (April)',
    'Wild sea trout (April)',
    'British wild salmon (April)',
    'English rose veal (April)',
    'Curly kale (April)',
    'Outdoor rhubarb (April)',
    'Baby artichokes (April)',
    'Jerusalem artichokes (April)',

    // Seasonal Items - May
    'New potatoes (May)',
    'Radishes (May)',
    'Strawberries (May)',

    // Borough Market - Here & Now
    'Spring cabbage (May)',
    'Samphire (May)',
    'Fresh peas (May)',
    'St George mushrooms (May)',
    'Alexanders (May)',
    'Wild garlic (May)',
    'Claytonia (May)',
    'Bulls blood leaves (May)',
    'Jersey Royals (May)',
    'Broad beans (May)',
    'Lobsters (May)',
    'Langoustines (May)',
    'Black bream (May)',
    'Stawley goats cheese (May)',
    'Mousseron mushrooms (May)',
    'Three cornered leeks (May)',
    'Wild asparagus (May)',
    'Wild fennel (May)',
    'Artichokes (May)',
    'Chicory (May)',
    'Celeriac (May)',
    'Frissee (May)',
    'Radicchio (May)',
    'Wet garlic (May)',
    'Nasturtium root (May)',
    'Cuttlefish (May)',
    'John dory (May)',
    'Monkfish (May)',
    'Squid (May)',
    'American signal crayfish (May)',

    // Seasonal Items - June
    'Elderflowers (June)',
    'Broad beans (June)',
    'Gooseberries (June)',

    // Borough Market - Here & Now
    'Redcurrants (June)',
    'Lettuce (June)',
    'Early cherries (June)',
    'English cherries (June)',
    'Hass avocados (June)',
    'Apricots (June)',
    'Peaches (June)',
    'Nectarines (June)',
    'Fresh figs (June)',
    'Santa tomatoes (June)',
    'Greek melons (June)',
    'Wild asparagus (June)',
    'Nasturtiums (June)',
    'Cornflowers (June)',
    'Borage flowers (June)',
    'Nettles (June)',
    'Crystal cucumbers (June)',
    'Innes Log cheese (June)',
    'Haford cheddar (June)',
    'Wild sea bass (June)',
    'Wild salmon (June)',
    'Grey mullet (June)',
    'Black bream (June)',
    'Darjeeling first flush tea (June)',

    // Seasonal Items - July
    'Raspberries (July)',
    'Courgettes (July)',
    'Fennel (July)',

    // Borough Market - Here & Now
    'Blackcurrants (July)',
    'French beans (July)',
    'Summer herbs (July)',
    'Greengages (July)',
    'Red gooseberries (July)',
    'Douglas tomatoes (July)',
    'Cherry plum tomatoes (July)',
    'Yellow courgettes (July)',
    'Yellow French beans (July)',
    'Purple French beans (July)',
    'Courgette flowers (July)',
    'Broad bean flowers (July)',
    'Chocolate mint tip (July)',
    'Viola thyme flowers (July)',
    'Chive flowers (July)',
    'Elderflower (July)',
    'Meadowsweet (July)',
    'Trompette de la mort (July)',
    'Razor clams (July)',
    'Scottish squid (July)',
    'Cuttlefish (July)',
    'Doddington cheese (July)',
    'Scottish chanterelles (July)',
    'English ceps (July)',
    'Kohlrabi (July)',
    'Runner beans (July)',
    'English corn on the cob (July)',
    'Doughnut peaches (July)',
    'Turkish figs (July)',
    'William pears (July)',
    'Sakura tomatoes (July)',
    'San marzano tomatoes (July)',
    'Taster tomatoes (July)',
    'Marigold flowers (July)',
    'Green oakleaf lettuce (July)',
    'Red oakleaf lettuce (July)',
    'Lollo biondi (July)',
    'Alexander cheese (July)',
    'Howard cheese (July)',

    // Seasonal Items - August
    'Blackberries (August)',
    'Sweetcorn (August)',
    'Tomatoes (August)',

    // Borough Market - Here & Now
    'Peaches (August)',
    'Runner beans (August)',
    'Beetroot (August)',
    'Red grouse (August)',
    'Common snipe (August)',
    'Red stag (August)',
    'Fallow stag (August)',
    'Sika stag (August)',
    'Roe bucks (August)',
    'Cornish sardines (August)',
    'Dwarf beans (August)',
    'English kohlrabi (August)',
    'Red beetroot (August)',
    'White beetroot (August)',
    'Candy stripe beetroot (August)',
    'Black cabbage (August)',
    'Patty pan squashes (August)',
    'Purple spring onions (August)',
    'Oak leaf lettuce (August)',
    'Little gem lettuce (August)',
    'Lollo rosso (August)',
    'Cos lettuce (August)',
    'Red cos lettuce (August)',
    'Red batavia lettuce (August)',
    'Crystal lemons (August)',
    'Victoria plums (August)',
    'Red santa rosa plums (August)',
    'Ragstone cheese (August)',
    'Kentish cobnuts (August)',
    'Black figs (August)',
    'Italia grapes (August)',
    'Muscat grapes (August)',
    'Purple vitelotte potatoes (August)',
    'Cambodian palm sugar (August)',
    'Old Ford cheese (August)',
    'Stichelton cheese (August)',

    // Seasonal Items - September
    'Apples (September)',
    'Pears (September)',
    'Plums (September)',

    // Borough Market - Here & Now
    'Damsons (September)',
    'Cobnuts (September)',
    'Autumn squash (September)',
    'Russet apples (September)',
    'Cox apples (September)',
    'Bramley apples (September)',
    'Chegworth Beauty apples (September)',
    'Boskoop Rouge apples (September)',
    'Early Windsor apples (September)',
    'Spartan apples (September)',
    'Saturn apples (September)',
    'Blenheim Orange apples (September)',
    'Rabbits (September)',
    'Field mushrooms (September)',
    'Ceps (September)',
    'Pied de mouton (September)',
    'Hedgehog mushrooms (September)',
    'Rowan berries (September)',
    'Wild horseradish (September)',
    'Onion squashes (September)',
    'Giant puffball mushroom (September)',
    'Lemon sole (September)',
    'Gurnards (September)',
    'Walkers Spice Road cheese (September)',
    'Nicks Kitchen cheese (September)',
    'English truffles (September)',
    'Wet walnuts (September)',
    'Green walnuts (September)',
    'Cavolo nero cabbage (September)',
    'English green cabbage (September)',
    'Marrows (September)',
    'Wild plums (September)',
    'Patty pan squash (September)',
    'Crown prince squash (September)',
    'Egremont russet apples (September)',
    'Crimson crisp apples (September)',
    'Doyenne du comice pears (September)',
    'Conference pears (September)',
    'Williams pears (September)',
    'Forelle pears (September)',
    'Rododendro honey (September)',
    'Mallard (September)',

    // Seasonal Items - October
    'Pumpkins (October)',
    'Chestnuts (October)',
    'Wild mushrooms (October)',

    // Borough Market - Here & Now
    'Quinces (October)',
    'Walnuts (October)',
    'Medlars (October)',
    'Black cabbage (October)',
    'Crown prince squash (October)',
    'Festival squash (October)',
    'Onion squash (October)',
    'Marjories Seedling plums (October)',
    'Crimson crisp apples (October)',
    'Rainbow chard (October)',
    'Trooping funnels (October)',
    'Blewits (October)',
    'Charcoal burners (October)',
    'Wax caps (October)',
    'Parasol mushrooms (October)',
    'Rowan conserve (October)',
    'Oxtail (October)',
    'Ox cheek (October)',
    'Pig cheeks (October)',
    'Wild rabbit (October)',
    'Rosas Fire cheese (October)',
    'Sussex Mansion cheese (October)',
    'Romanesque cauliflower (October)',
    'Chicoria (October)',
    'Puntarella (October)',
    'Delicata squash (October)',
    'Turks turban (October)',
    'Ice plant (October)',
    'White borage flower (October)',
    'Brill (October)',
    'Turbot (October)',

    // Seasonal Items - November
    'Brussels sprouts (November)',
    'Cranberries (November)',
    'Celeriac (November)',

    // Borough Market - Here & Now
    'Pheasant (November)',
    'Venison (November)',
    'Sloes (November)',
    'Whiting (November)',
    'Wild bass (November)',
    'Sprats (November)',
    'Monkfish liver (November)',
    'Hare (November)',
    'Salt marsh lamb (November)',
    'Organic komatsuna (November)',
    'Sprout tops (November)',
    'Red curly kale (November)',
    'Rapini (November)',
    'Puntarella (November)',
    'Chervil root (November)',
    'Parsley root (November)',
    'French globe artichokes (November)',
    'Baby violet artichokes (November)',
    'Jerusalem artichokes (November)',
    'Persimmons (November)',
    'Brogdale apples (November)',
    'Ottobratica olive oil (November)',
    'Carolea olive oil (November)',
    'Chard (November)',
    'Savoy cabbage (November)',
    'Grey mullet (November)',
    'Halibut (November)',
    'Gomashio spice blend (November)',
    'Bermondsey Hard Pressed cheese (November)',
    'Red sprouts (November)',
    'Spaghetti squash (November)',
    'Swedes (November)',
    'Turnips (November)',
    'Hipsi cabbage (November)',
    'Frisee (November)',
    'Escarole (November)',
    'Braeburn apples (November)',
    'Jonagold apples (November)',
    'Gala apples (November)',
    'Goldfinger clementines (November)',
    'Custard apples (November)',
    'Orleans reinette apples (November)',
    'Allington pippin apples (November)',
    'Epine du mas apples (November)',
    'Prinses marijke apples (November)',
    'Laxtons superb apples (November)',
    'Old Fred apples (November)',
    'Riseley cheese (November)',
    'Baron bigod cheese (November)',

    // Seasonal Items - December
    'Winter cabbage (December)',
    'Clementines (December)',
    'Turnips (December)',

    // Borough Market - Here & Now
    'Forced chicory (December)',
    'Winter roots (December)',
    'Tangerines (December)',
    'Salsify (December)',
    'Romanesque broccoli (December)',
    'Kentish parsnips (December)',
    'Brussels sprout tops (December)',
    'Spanish oranges (December)',
    'Egyptian pomegranates (December)',
    'Cox apples (December)',
    'Russet apples (December)',
    'Gala apples (December)',
    'Braeburn apples (December)',
    'Bronze turkeys (December)',
    'Norfolk Black turkeys (December)',
    'Kelly Bronze turkeys (December)',
    'Norfolk Red turkeys (December)',
    'Geese (December)',
    'Cockerels (December)',
    'Ptarmigan (December)',
    'Wild duck (December)',
    'Teal (December)',
    'Traditional suet (December)',
    'Maris piper potatoes (December)',
    'Jerusalem artichokes (December)',
    'Black cabbage (December)',
    'Puntarella (December)',
    'Red topaz apples (December)',
    'Sharon fruit (December)',
    'Persimmon (December)',
    'Stichelton stilton (December)',
    'Colston Basset stilton (December)',
    'Arthurs Spice Road cheese (December)',
    'Mulled wine spices (December)',
    'Mint pepper jelly (December)',
    'Onion and chilli chutney (December)',
    'Prosciutto di Casentino (December)',
    'Rock Steady sauce (December)',
    'Banana and ginger chutney (December)',
    'Marron glacé (December)',
    'Escargot (December)',
    'Cumin cheese (December)',
    'Chilli cheese (December)',
    'Kirkhams Lancashire (December)',
    'Extra matured Lancashire (December)',

    // 01.2.1 Coffee, Tea and Cocoa (HICP monitored)
    'Tea bags',
    'Instant coffee',
    'Green tea',
    'Herbal tea',

    // 01.2.2 Mineral Waters, Soft Drinks and Juices (HICP monitored)
    'Pure fruit juices',
    'Fresh orange juice',
    'Fresh apple juice',
    'Mineral water',
    'Fruit / vegetable juice smoothie',
    'Alcohol-free beer',

    // 01.1.9 Other Food Products (HICP monitored)
    'Soup',
    'Mayonnaise',
    'Tomato ketchup',
    'Mustard',
    'Vinegar',
    'Salt',
    'Sugar',
    'Honey',
    'Jam',
    'Dried herbs',
    'Extra virgin olive oil',
    'Rapeseed oil',
    'Protein powder',

    // Additional Healthy Items
    'Coconut oil',
    'Avocado oil',
    'Fresh herbs (basil, parsley, cilantro)',
    'Turmeric',
    'Ginger',
    'Cinnamon',
    
    // Menu-specific ingredients
    'Oat flakes',
    'Rye flakes', 
    'Semolina',
    'Coconut flakes',
    'Almond flakes',
    'Croissants',
    'Celery',
    'Cocoa',
    'Capers',
    'Horseradish',
    'Olives',
    'Walnut oil',
    'Fish sauce',
    'Sweet chili sauce',
    'Sour cream',
    'Wine (cooking)',
    'Zucchini',
    'Buckwheat noodles',
    'Sesame seeds',
    'Soy sauce',
    'Pork ribs',
    'Sea bream',
    'Curry powder',
    'Mini eggplants',
    'Coconut cream',
    'Paprika',
    'Chili pepper',
    'Cornichons',
    'Veal',
    'Beef tongue',
    'Polenta',
    'Raisins',
    'Tarragon',
    'Masala spices',
    'Rum (cooking)',
    'Vanilla',
    'Durian',
    'Goat cheese',
    'Pistachios',
    'Waffles',
    'Papaya'

];

// TODO: move food list so a separate JS file?

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
