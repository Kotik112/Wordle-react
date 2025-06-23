export const fetchWord = async (apiUrl, setSolution) => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data)
    const randomWord = data[Math.floor(Math.random() * data.length)];
    setSolution(randomWord);
};