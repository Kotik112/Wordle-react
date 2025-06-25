import { useState, useEffect } from 'react'
import './styles/game.css';
import Line from "./components/Line.jsx";
import { fetchWord, renderTitle, handleKey } from './utils/utils.jsx';
import {MAX_GUESSES, TRY_AGAIN_MESSAGE, colors, TITLE, Key} from './utils/constants.js';
import Popup from "./components/Popup.jsx";
import Keyboard from "./components/Keyboard.jsx";
import words from './assets/5-letter-words.json';

function App() {
    // Derived variables
    const API_URL = window.location.hostname === 'localhost'
        ? '/api/fe/wordle-words'
        : import.meta.env.VITE_API_URL;

    // State variables
    const [solution, setSolution] = useState('');
    const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);
    const [allWords, setAllWords] = useState([]);
    const [keyStatuses, setKeyStatuses] = useState({});

    /**
     *
     */
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

    const handleVirtualKeyPress = (key) => {
        const fakeEvent = { key: key === '⌫' ? 'Backspace' : key };
        window.dispatchEvent(new KeyboardEvent('keydown', fakeEvent));
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
        const getAllWords = () => {
            setAllWords(words);
        };

        getAllWords();
    }, []);

    useEffect(() => {
        if (popupMessage === TRY_AGAIN_MESSAGE) {
            const handleEnter = (event) => {
                if (event.key === Key.ENTER) {
                    setPopupMessage(null);
                }
            };
            window.addEventListener('keydown', handleEnter);
            return () => window.removeEventListener('keydown', handleEnter);
        }
    }, [popupMessage]);


    useEffect(() => {
        if (isGameOver) return;

        const handler = (event) => handleKey(event, {
            currentGuess, setCurrentGuess, setPopupMessage, allWords,
            setGuesses, solution, setIsGameOver, keyStatuses, setKeyStatuses
        });

        window.addEventListener('keydown', handler);

        return () => window.removeEventListener('keydown', handler);
    }, [currentGuess, solution, isGameOver, allWords, keyStatuses]);

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
            <Keyboard onKeyPress={handleVirtualKeyPress} keyStatuses={keyStatuses}/>
        </div>
    );
}

export default App
