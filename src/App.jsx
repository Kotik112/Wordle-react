import { useState, useEffect } from 'react'
import './components/line.css';
import Line from "./components/Line.jsx";
import { fetchWord, renderTitle } from './utils.jsx';
import {MAX_GUESSES, TRY_AGAIN_MESSAGE, colors, TITLE, Key} from './constants.js';
import Popup from "./components/Popup.jsx";

function App() {
    const isLocalhost = window.location.hostname === 'localhost';

    const API_URL = isLocalhost
        ? '/api/fe/wordle-words'
        : import.meta.env.VITE_API_URL;

    const [solution, setSolution] = useState('');
    const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);
    const [allWords, setAllWords] = useState([]);

    const TRY_AGAIN_MESSAGE = "Invalid word. Please try again."

    const resetGame = () => {
        setIsGameOver(false);
        setGuesses(Array(MAX_GUESSES).fill(null));
        setCurrentGuess('');
        setPopupMessage(null);

        fetchWord(API_URL, setSolution);
    };

    // For popup "Play Again" button
    const handlePopupClose = () => {
        resetGame();
    };

    useEffect(() => {
        const fetchWord = async () => {
            const response = await fetch(API_URL)
            const data = await response.json()
            const randomWord = data[Math.floor(Math.random() * data.length)]
            setSolution(randomWord)
        };

        fetchWord()
    }, []);

    useEffect(() => {
        const fetchWord = async () => {
            const response = await fetch('/5-letter-words.json');
            const data = await response.json();
            setAllWords(data);
            const randomWord = data[Math.floor(Math.random() * data.length)];
            setSolution(randomWord);
        };

        fetchWord();
    }, []);

    useEffect(() => {
        if (popupMessage === TRY_AGAIN_MESSAGE) {
            const handleEnter = (event) => {
                if (event.key === 'Enter') {
                    setPopupMessage(null);
                }
            };
            window.addEventListener('keydown', handleEnter);
            return () => window.removeEventListener('keydown', handleEnter);
        }
    }, [popupMessage]);


    useEffect(() => {
        if (isGameOver) {
            console.log('Game over! The solution was:', solution);
            return;
        }

        const handleType = (event) => {
            // Ignore these keys
            if (event.key === Key.ESCAPE || event.key === Key.DELETE || event.key === Key.SHIFT
                || event.key === Key.CONTROL || event.key === Key.ALT) {
                return;
            }
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

        window.addEventListener('keydown', handleType);

        return () => window.removeEventListener('keydown', handleType);
    }, [currentGuess, solution, isGameOver, allWords]);

    return (
        <div className="game">
            <h1 className="game-title">
                {renderTitle(TITLE, colors)}
            </h1>
            { popupMessage &&
                <Popup message={popupMessage}
                       reloadGame={
                            popupMessage === TRY_AGAIN_MESSAGE ? () => setPopupMessage(null) : handlePopupClose
                }
                       buttonText={
                           popupMessage === TRY_AGAIN_MESSAGE ? 'OK' : 'Play Again'
                       }
                />}
            {
                guesses.map((guess, index) => {
                    const isCurrentGuess = index === guesses.findIndex(val => val == null);
                    return (
                        <Line
                            key={index}
                            guess={isCurrentGuess ? currentGuess : guess ?? ''}
                            isFinal={!isCurrentGuess && guess !== null}
                            solution={solution}
                        />
                    );
                })
            }
        </div>
    );
}

export default App
