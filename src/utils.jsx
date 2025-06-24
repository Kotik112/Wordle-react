import {Key, MAX_GUESSES, TRY_AGAIN_MESSAGE} from "./constants.js";

export const fetchWord = async (apiUrl, setSolution) => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    if (!data) {
        throw new Error(`API responded with no data`);
    }

    const randomWord = data[Math.floor(Math.random() * data.length)];
    setSolution(randomWord);
};


export const renderTitle = (text, colors) => {
    return text.split("").map((char, i) => (
        <span key={i} style={{
            color: colors[i],
            display: "inline-block",
            transform: (i === 0) ? "rotate(-10deg)" : (i === 2) ? "rotate(10deg)" : (i === 4) ? "rotate(-10deg)" : "rotate(0deg)"
        }}>{char}</span>
    ));
};

export const handleKey = (event, state) => {
    const {
        currentGuess, setCurrentGuess, setPopupMessage,
        allWords, setGuesses, solution, setIsGameOver
    } = state;
    // Ignore these keys
    if ([Key.ESCAPE, Key.ALT, Key.SHIFT, Key.CONTROL, Key.CAPS_LOCK, Key.DELETE].includes(event.key)) return;

    if (event.key === Key.BACKSPACE) {
        setCurrentGuess(oldGuess => oldGuess.slice(0, -1));
        return;
    }
    if (event.key === Key.ENTER) {
        if (currentGuess.length === 5) {
            if (!allWords.includes(currentGuess)) {
                setCurrentGuess('');
                setPopupMessage(TRY_AGAIN_MESSAGE);
                return;
            }

            const isCorrect = currentGuess === solution;
            if (currentGuess === solution) {
                setPopupMessage('You guessed the word!');
            }
            setGuesses(oldGuesses => {
                const newGuesses = [...oldGuesses];
                const firstNullIndex = newGuesses.findIndex(val => val == null);
                if (firstNullIndex !== -1) {
                    newGuesses[firstNullIndex] = currentGuess;
                }

                if (isCorrect) {
                    setIsGameOver(true);
                    setPopupMessage('You guessed the word!');
                }

                const filledGuesses = newGuesses.filter(val => val !== null).length;
                if( !isCorrect && filledGuesses === MAX_GUESSES ) {
                    setIsGameOver(true);
                    setPopupMessage('You ran out of guesses. The solution was: ' + solution);
                }

                return newGuesses;
            })
            setCurrentGuess('');

        }
        return;
    }
    if (/^[a-zA-Z]$/.test(event.key) && currentGuess.length < 5) {
        setCurrentGuess(oldGuess => oldGuess + event.key.toUpperCase());
    } else {
        console.log('Invalid key pressed:', event.key);
    }
}