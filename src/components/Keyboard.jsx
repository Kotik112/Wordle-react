import '../styles/keyboard.css'

export default function Keyboard({ onKeyPress, keyStatuses }) {
    const KEYBOARD_ROWS = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    return (
        <div className="keyboard">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map((key, keyIndex) => {
                        // Get status from keyStatuses map (e.g., correct/close/wrong)
                        const status = keyStatuses?.[key.toUpperCase()] || '';

                        return (
                            <button
                                key={keyIndex}
                                className={`keyboard-key ${status}`}
                                onClick={() => onKeyPress(key)}
                            >
                                {key}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}