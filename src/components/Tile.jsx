import '../styles/tile.css'

export default function Tile({ letter = '', className = 'tile' }) {

    return (
        <div className={className}>
            {letter}
        </div>
    );

}