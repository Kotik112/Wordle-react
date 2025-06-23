import fs from 'fs';
/**
 * This script reads a text file containing words, filters for 5-letter words,
 * converts them to uppercase, and saves them as a JSON array in a specified file.
 *
 * Usage:
 * 1. Place your words in a file named 'words.txt' in the same directory as this script.
 * 2. Run the script using Node.js: `node generate-dictionary.js`
 * 3. The output will be saved in 'public/5-letter-words.json'.
 *
 * @file generate-dictionary.js
 * @author Arman Iqbal
 * @description Generates a dictionary of 5-letter words from a text file.
 */
const words = fs.readFileSync('./words.txt', 'utf8').split('\n');
const fiveLetterWords = words
    .map(word => word.trim().toUpperCase())
    .filter(word => word.length === 5 && /^[A-Z]+$/.test(word));

fs.writeFileSync('../public/5-letter-words.json', JSON.stringify(fiveLetterWords, null, 2));
console.log('✅ Dictionary saved to public/5-letter-words.json');