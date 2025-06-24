import '../styles/keyboard.css'

export default function Keyboard({ onKeyPress }) {
    const KEYBOARD_ROWS = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    return (
        <div className="keyboard">
            {KEYBOARD_ROWS.map((row, index) => (
                <div className="keyboard-row" key={index}>
                    {row.map((key, index) => (
                        <button
                        key={index}
                        className="keyboard-key"
                        onClick={() => onKeyPress(key)}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}