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