import fs from 'fs';

const words = fs.readFileSync('./words.txt', 'utf8').split('\n');
const fiveLetterWords = words
    .map(word => word.trim().toUpperCase())
    .filter(word => word.length === 5 && /^[A-Z]+$/.test(word));

fs.writeFileSync('../public/5-letter-words.json', JSON.stringify(fiveLetterWords, null, 2));
console.log('✅ Dictionary saved to public/5-letter-words.json');