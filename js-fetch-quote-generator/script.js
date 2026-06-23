const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const counterText = document.getElementById("counter");

let quoteCount = 0;

let currentQuote = "";
let currentAuthor = "";

let favorites = [];

// Random Background Color
function changeBackground() {

    const colors =[
        "red",
        "Blue",
        "pink",
        "Green",
        "yellow",
        "purple",
        "Orange"
    ];
     const randomIndex = Math.floor(Math.random() * colors.length);
        

    document.body.style.backgroundColor = colors[randomIndex];
}

// Fetch Quote
async function getQuote() {

    quoteText.textContent = "Loading...";
    authorText.textContent = "";

    try {

        const response =
            await fetch(
                "https://dummyjson.com/quotes/random"
            );

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        currentQuote = data.quote;
        currentAuthor = data.author;

        quoteText.textContent =
            `"${data.quote}"`;

        authorText.textContent =
            `— ${data.author}`;

        quoteCount++;

        counterText.textContent =
            quoteCount;

        changeBackground();

    } catch (error) {

        quoteText.textContent =
            "Something went wrong. Please try again.";

        authorText.textContent = "";

    }
}

// Generate Button
document
    .getElementById("generateBtn")
    .addEventListener("click", getQuote);

// Copy Button
document
    .getElementById("copyBtn")
    .addEventListener("click", () => {

        navigator.clipboard.writeText(
            `${currentQuote} - ${currentAuthor}`
        );

        alert("Quote Copied!");
    });

// Save Favorite
document
    .getElementById("favoriteBtn")
    .addEventListener("click", () => {

        if (!currentQuote) return;

        favorites.push({
            quote: currentQuote,
            author: currentAuthor
        });

        displayFavorites();
    });

// Display Favorites
function displayFavorites() {

    const list =
        document.getElementById("favoriteList");

    list.innerHTML = "";

    favorites.forEach((item) => {

        const li =
            document.createElement("li");

        li.textContent =
            `"${item.quote}" - ${item.author}`;

        list.appendChild(li);

    });

}
