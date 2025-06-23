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