import '../styles/tile.css'

export default function Tile({ letter, className }) {

    return (
        <div className={className}>
            {letter}
        </div>
    );

}