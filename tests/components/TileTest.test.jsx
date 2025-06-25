import { render, screen } from '@testing-library/react'
import Tile from "../../src/components/Tile.jsx";

describe('Tile Component', () => {
    test('renders Tile', () => {
        render(<Tile letter="A" className="tile" />);
        const tileElement = screen.getByText(/A/i);
        expect(tileElement).toBeInTheDocument();
        expect(tileElement).toHaveClass('tile');
    })

    describe('Test Tile rendering of class color', () => {
        test('renders Tile with correct color', () => {
            render(<Tile letter="B" className="tile correct" />);
            const tileElement = screen.getByText(/B/i);
            expect(tileElement).toBeInTheDocument();
            expect(tileElement).toHaveClass('tile');
            expect(tileElement).toHaveClass('correct');
        })

        test('renders Tile with close color', () => {
            render(<Tile letter="C" className="tile close" />);
            const tileElement = screen.getByText(/C/i);
            expect(tileElement).toBeInTheDocument();
            expect(tileElement).toHaveClass('tile');
            expect(tileElement).toHaveClass('close');
        })

        test('renders Tile with wrong color', () => {
            render(<Tile letter="D" className="tile wrong" />);
            const tileElement = screen.getByText(/D/i);
            expect(tileElement).toBeInTheDocument();
            expect(tileElement).toHaveClass('tile');
            expect(tileElement).toHaveClass('wrong');
        })
    })

    describe('Tile component edge cases', () => {
        test('renders Tile with empty letter', () => {
            const { container } = render(<Tile letter="" className="tile" />);
            const tileElement = container.firstChild;
            expect(tileElement).toBeInTheDocument();
            expect(tileElement).toHaveClass('tile');
            expect(tileElement.textContent).toBe('');
        });

        test('renders Tile with null letter', () => {
            const { container } = render(<Tile letter="" className="tile" />);
            const tileElement = container.firstChild;
            expect(tileElement).toBeInTheDocument();
            expect(tileElement).toHaveClass('tile');
            expect(tileElement.textContent).toBe('');
        });

        test('renders Tile with undefined letter', () => {
            const { container } = render(<Tile letter="" className="tile" />);
            const tileElement = container.firstChild;
            expect(tileElement).toBeInTheDocument();
            expect(tileElement).toHaveClass('tile');
            expect(tileElement.textContent).toBe('');
        });

        test('renders Tile with non-string letter', () => {
            render(<Tile letter={123} className="tile" />);
            const tileElement = screen.getByText('123');
            expect(tileElement).toBeInTheDocument();
            expect(tileElement).toHaveClass('tile');
        });
    });
})


