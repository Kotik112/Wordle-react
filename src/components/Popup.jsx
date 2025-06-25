import '../styles/popup.css';

export default function Popup({message, reloadGame, buttonText}) {
    return (
        <div className="popup">
            <div className="popup-content">
                <p>{message}</p>
                <button className="play-again-button" onClick={reloadGame}>{buttonText}</button>
            </div>
        </div>
    );
}