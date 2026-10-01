// Smoke test: all site files are in place and parse without syntax errors
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const site = path.join(root, 's3-static-website');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const read = file => fs.readFileSync(path.join(site, file), 'utf8');

const requiredFiles = ['index.html', 'food.js', 'FoodDatabase.js', 'sw.js', 'manifest.json'];
requiredFiles.forEach(file => check(fs.existsSync(path.join(site, file)), `missing ${file}`));
if (errors.length === 0) {
    // JavaScript files and inline scripts compile
    ['food.js', 'FoodDatabase.js', 'sw.js'].forEach(file => {
        try { new vm.Script(read(file), {filename: file}); } catch (e) { errors.push(`${file}: ${e.message}`); }
    });
    const html = read('index.html');
    [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].forEach((match, i) => {
        try { new vm.Script(match[1], {filename: `index.html inline script ${i + 1}`}); } catch (e) { errors.push(`index.html inline script ${i + 1}: ${e.message}`); }
    });

    // Local files referenced by index.html and the service worker exist
    const htmlRefs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1])
        .filter(ref => !/^(https?:|data:|mailto:|#)/.test(ref));
    const swMatch = read('sw.js').match(/urlsToCache\s*=\s*\[([\s\S]*?)\]/);
    check(swMatch, 'sw.js: urlsToCache not found');
    const swRefs = swMatch ? [...swMatch[1].matchAll(/'([^']+)'/g)].map(match => match[1])
        .filter(ref => !/^https?:/.test(ref) && ref !== '/') : [];
    [...htmlRefs, ...swRefs].forEach(ref => check(fs.existsSync(path.join(site, ref.replace(/^\//, ''))), `missing referenced file ${ref}`));
    check(/const CACHE_NAME = 'food-recommender-v\d+\.\d+\.\d+'/.test(read('sw.js')), 'sw.js: CACHE_NAME has no version');

    // Food database loads and has no duplicate names
    try {
        const FoodDatabase = vm.runInNewContext(read('FoodDatabase.js') + ';FoodDatabase');
        const names = FoodDatabase.getFoodList();
        check(names.length > 0, 'FoodDatabase: empty food list');
        const dupes = names.filter((name, i) => names.indexOf(name) !== i);
        check(dupes.length === 0, `FoodDatabase: duplicate items ${dupes.join(', ')}`);
    } catch (e) {
        errors.push(`FoodDatabase.js: ${e.message}`);
    }
}

// JSON files parse; sample add-ons look like exports
const jsonFiles = [path.join(site, 'manifest.json'),
    ...fs.readdirSync(path.join(root, 'samples')).filter(file => file.endsWith('.json')).map(file => path.join(root, 'samples', file))];
jsonFiles.filter(file => fs.existsSync(file)).forEach(file => {
    const name = path.relative(root, file);
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (name.startsWith('samples')) {
            check(data.app === 'food-recommender', `${name}: app is not food-recommender`);
            check(Array.isArray(data.foodList) && data.foodList.length > 0, `${name}: empty foodList`);
        }
    } catch (e) {
        errors.push(`${name}: ${e.message}`);
    }
});

if (errors.length > 0) {
    errors.forEach(error => console.error('FAIL ' + error));
    process.exit(1);
}
console.log('Smoke test passed');
