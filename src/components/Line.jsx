
import './line.css';
import Tile from "./Tile.jsx";
import './line.css'

export default function Line( { guess, isFinal, solution } ) {
    const MAX_LEN = 5;
    const tiles = [];

    if (isFinal) {
        const solutionCharCounts = {};
        for (let char of solution) {
            solutionCharCounts[char] = (solutionCharCounts[char] || 0) + 1;
        }

        const statuses = Array(MAX_LEN).fill('wrong');

        // First pass: mark correct (green) and update counts
        for (let i = 0; i < MAX_LEN; i++) {
            if (guess[i] === solution[i]) {
                statuses[i] = 'correct';
                solutionCharCounts[guess[i]]--;
            }
        }

        // Second pass: mark close (yellow) if letter exists and count > 0
        for (let i = 0; i < MAX_LEN; i++) {
            if (statuses[i] === 'correct') continue;

            if (solution.includes(guess[i]) && solutionCharCounts[guess[i]] > 0) {
                statuses[i] = 'close';
                solutionCharCounts[guess[i]]--;
            }
        }

        // Build tiles
        for (let i = 0; i < MAX_LEN; i++) {
            let className = 'tile ' + statuses[i];
            tiles.push(<Tile key={i} letter={guess[i]} className={className} />);
        }
    } else {
        // Non-final guess — no coloring
        for (let i = 0; i < MAX_LEN; i++) {
            tiles.push(<Tile key={i} letter={guess[i]} className="tile" />);
        }
    }

    return <div className="line">{tiles}</div>;
}