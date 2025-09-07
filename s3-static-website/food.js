let food = [
    // See https://ec.europa.eu/eurostat/cache/website/economy/food-price-monitoring/
    // See https://ec.europa.eu/eurostat/web/hicp
    // See https://www.ons.gov.uk/economy/inflationandpriceindices

    // 01.1.1 Bread and Cereals
    'Large white loaves — sliced / unsliced',
    'Bread rolls',
    'Flour',
    'Chilled pizza',
    'Pasta',
    'Breakfast cereals',
    'Gluten free breakfast cereals',
    'Sponge cakes',
    'Pack of individual cakes',
    'Selected biscuits',
    'Popcorn',
    'Quiche',
    'Large wholemeal loaf',
    'Wraps / tortillas',
    'Garlic bread',
    'Rice',
    'Dehydrated noodles / pasta',
    'Hot oat cereal',
    'Cereal bars',
    'Crumpets',
    'Crackers',
    'Couscous',
    'Yorkshire puddings',

    // 01.1.2 Meat
    'Beef',
    'Lamb',
    'Pork',
    'Chicken',
    'Pork sausages',
    'Cooked meats — e.g., ham',
    'Canned meats',
    'Chicken kievs',
    'Deli type meat',
    'Meat pies',
    'Fresh diced / minced turkey',
    'Frozen chicken nuggets',
    'Liver',
    'Meat based snacks',

    // 01.1.3 Fish
    'Fresh white fish fillets',
    'Canned tuna',
    'Frozen prawns',
    'Fresh salmon fillets',
    'Fish fingers',
    'Frozen breaded / battered white fish',

    // 01.1.4 Milk, Cheese and Eggs
    'Full-fat / semi-skimmed milk',
    'Flavoured milk',
    'Fresh cream',
    'Chilled pot dessert',
    'Eggs',
    'Parmesan',
    'Powdered baby formula',
    'Non-dairy milk drink',
    'Yoghurt',
    'Fromage frais',
    'Cheddar',
    'Soft cheese',
    'Cheese spread',

    // 01.1.6 Fruit
    'Dessert apples',
    'Pears',
    'Strawberries',
    'Oranges',
    'Avocado pears',
    'Kiwi fruit',
    'Melon',
    'Pineapple',
    'Fresh fruit snacking pot',
    'Dried fruit',
    'Salted / roasted peanuts',
    'Bananas',
    'Lemon',
    'Grapes',
    'Small oranges',
    'Plums',
    'Grapefruit',
    'Blueberries',
    'Raspberries',
    'Frozen berries',
    'Canned fruit',

    // 01.1.7 Vegetables

    'Loose / pre-packed potatoes',
    'Prepared mashed potato',
    'Crisps — single / multi-packs',
    'Corn based snacks',
    'Fresh tomatoes',
    'Cauliflower',
    'Mushrooms',
    'Lettuce',
    'Broccoli',
    'Sweet potatoes',
    'Canned pulses',
    'Canned tomatoes',
    'Frozen pre-prepared vegetables',
    'Vegetarian burger / grills',
    'Vegetable stir fry',
    'Pre-packed salad',
    'Frozen chips',
    'Vegetable crisps',
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
    'Vegetarian pickle',
    'Meat free sausages',


    // 01.1.9 Other Food Products
    'Soup',
    'Sauces — e.g., tomato ketchup, mayonnaise',
    'Dried herbs',
    'Ready cooked meals',
    'Protein powder',

    // Drinks

    // 01.2.1 Coffee, Tea and Cocoa
    'Tea bags',
    'Coffee sachets',
    'Coffee pods',
    'Flavoured tea',
    'Instant coffee',
    'Hot chocolate drink',

    // 01.2.2 Mineral Waters, Soft Drinks and Juices
    'Pure fruit juices',
    'Fruit drink',
    'Mineral water',
    'Lemonade',
    'Fizzy drinks',
    'Energy drinks',
    'Squashes (drinks)',
    'Fruit / vegetable juice smoothie',
    'Flavoured water',
    'Cola',
    'Mixer drinks',

    // Alcohol-free beer
    'Alcohol-free beer',

];

const DAYS_TO_FORGET = 7;

let forgetList = null;

function loadForgetListFromLocalStore() {
    // fetch list of items to forget from local store
    let forgetListString = localStorage.getItem('forgetList');
    if (forgetList == null) {
        forgetList = new ForgetList();
    }
    let beforeLoad = "" + forgetList;
    forgetList.loadFromJSONString(forgetListString);
    let afterLoad = "" + forgetList;
    if (beforeLoad !== afterLoad) {
        console.debug("Loaded forget list from local store: " + forgetList);
    }
}

function saveForgetListToLocalStore() {
    // store list of items to forget in local store
    localStorage.setItem('forgetList', forgetList.toJSONString());
    console.debug("New list of items to forget: " + forgetList);
}

function hasSomethingToRotate() {
    if (forgetList.items.length >= food.length) {
        alert("You've already forgotten everything! Wait until tomorrow.");
        return false;
    }
    return true;
}

function rotate() {
    loadForgetListFromLocalStore();
    forgetList.expireItemsOlderThan(DAYS_TO_FORGET);
    saveForgetListToLocalStore();
    if (!hasSomethingToRotate()) {
        return;
    }

    // repeat until item is not in forget list
    let randomNumber;
    do {
        // generate random number
        randomNumber = Math.floor(Math.random() * food.length);
    } while (forgetList.hasItem(food[randomNumber]));

    // display random food
    document.getElementById('foodItem').innerHTML = food[randomNumber];
}


class ForgetItem {
    constructor(item, date) {
        this.item = item;
        this.date = date;
    }
}


// define class forget list
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

    remove(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    cleanup() {
        this.items = [];
    }

    dateDaysAgo(days) {
        let date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    }

    expireItemsOlderThan(days) {
        // loop through items and remove those older than days
        let targetDate = this.dateDaysAgo(days);
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].date < targetDate) {
                console.debug("Removing item: " + this.items[i].item);
                this.items.splice(i, 1);
            }
        }
    }

    loadFromJSONString(forgetListString) {
        try {
            // parse items with dates
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
            console.warn("Error parsing JSON string: " + e);
            this.items = [];
        }
    }

    toJSONString() {
        return JSON.stringify(this.items);
    }


    toString() {
        let string = "";
        for (let i = 0; i < this.items.length; i++) {
            string += this.items[i].item + ", ";
        }
        return string;
    }
}


function forget() {
    // Check if user preference is stored
    const dontAskPreference = localStorage.getItem('dontAskForgetConfirmation');

    if (dontAskPreference === 'true') {
        // If user chose to not ask again and confirmed yes previously
        proceedWithForget();
    } else {
        // Show the confirmation dialog
        document.getElementById('confirmDialog').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
}

function handleConfirmResponse(confirmed) {
    // Hide the dialog and overlay
    document.getElementById('confirmDialog').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    if (confirmed) {
        // If user checked "Don't ask again"
        const dontAskAgain = document.getElementById('dontAskAgain').checked;
        if (dontAskAgain) {
            localStorage.setItem('dontAskForgetConfirmation', 'true');
        }

        proceedWithForget();
    }

    // Reset checkbox state
    document.getElementById('dontAskAgain').checked = false;
}


function basketTip() {
    // Show the tip dialog
    document.getElementById('basketTip').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function handleBasketTip() {
    // Hide the dialog and overlay
    document.getElementById('basketTip').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function proceedWithForget() {
    if (!hasSomethingToRotate()) {
        return;
    }
    let item = new ForgetItem(document.getElementById('foodItem').innerHTML, new Date());
    forgetList.add(item);
    saveForgetListToLocalStore();
    rotate();
}

// Internal: reset the "Don't ask again" preference for debugging
function _resetForgetPreference() {
    localStorage.removeItem('dontAskForgetConfirmation');
    console.info('Reset the "Don\'t ask again" preference');
}
