let movies = [
    {
        id: 1,
        name: "Avengers",
        genre: "Action",
        rating: 9,
        status: "Pending",
        playStatus: "Play"
    },
    {
        id: 2,
        name: "3 Idiots",
        genre: "Comedy",
        rating: 10,
        status: "Pending",
        playStatus: "Play"
    }
];

// Display Movies

const displayMovies = () => {

    let output = "";

    movies.forEach(movie => {

        const {
            id,
            name,
            genre,
            rating,
            status,
            playStatus
        } = movie;

        output += `
        <div class="movie">

            <h3>${name}</h3>

            <p>ID : ${id}</p>

            <p>Genre : ${genre}</p>

            <p>Rating : ${rating}</p>

            <p>
                Status :
                <span class="${
                    status === "Watched"
                    ? "watched"
                    : "pending"
                }">
                    ${status}
                </span>
            </p>

            ${
                playStatus === "Play"
                ? `<button onclick="playMovie(${id})">Play</button>`
                : playStatus === "Pause"
                ? `<button onclick="pauseMovie(${id})">Pause</button>`
                : `<button onclick="watchMovie(${id})">Watch</button>`
            }

            <button onclick="toggleStatus(${id})">
                Watched
            </button>

            <button onclick="deleteMovie(${id})">
                Delete
            </button>

        </div>
        `;
    });

    document.getElementById("movieList").innerHTML =
    output;

    showStatistics();
};

// Add Movie

const addMovie = () => {

    const movieName =
    document.getElementById("movieName")
    .value.trim();

    const movieGenre =
    document.getElementById("movieGenre")
    .value.trim();

    const movieRating =
    Number(
        document.getElementById("movieRating")
        .value
    );

    if (
        movieName === "" ||
        movieGenre === "" ||
        movieRating === 0
    ) {
        alert("Please Fill All Fields");
        return;
    }

    const newMovie = {
        id: Date.now(),
        name: movieName,
        genre: movieGenre,
        rating: movieRating,
        status: "Pending",
        playStatus: "Play"
    };

    movies = [...movies, newMovie];

    document.getElementById("movieName").value = "";
    document.getElementById("movieGenre").value = "";
    document.getElementById("movieRating").value = "";

    displayMovies();
    showGenres();
};

// Search Movie

const searchMovie = () => {

    const search =
    document.getElementById("searchMovie")
    .value
    .toLowerCase()
    .trim();

    const filteredMovies =
    movies.filter(movie =>
        movie.name
        .toLowerCase()
        .includes(search)
    );

    let output = "";

    if (filteredMovies.length === 0) {

        output = `
        <h2>Movie Not Found</h2>
        `;
    }
    else {

        filteredMovies.forEach(movie => {

            output += `
            <div class="movie">

                <h3>${movie.name}</h3>

                <p>Genre : ${movie.genre}</p>

                <p>Rating : ${movie.rating}</p>

                <p>Status : ${movie.status}</p>

            </div>
            `;
        });
    }

    document.getElementById("movieList")
    .innerHTML = output;
};

// Delete Movie

const deleteMovie = (id) => {

    movies = movies.filter(
        movie => movie.id !== id
    );

    displayMovies();
    showGenres();

    document.getElementById("result").innerHTML = "";
};

// Watched Button

const toggleStatus = (id) => {

    movies = movies.map(movie => {

        if (movie.id === id) {

            return {
                ...movie,
                status:
                movie.status === "Pending"
                ? "Watched"
                : "Pending"
            };
        }

        return movie;
    });

    displayMovies();
};

// Play Movie

const playMovie = (id) => {

    movies = movies.map(movie => {

        if (movie.id === id) {

            return {
                ...movie,
                playStatus: "Pause"
            };
        }

        return movie;
    });

    displayMovies();
};

// Pause Movie

const pauseMovie = (id) => {

    movies = movies.map(movie => {

        if (movie.id === id) {

            return {
                ...movie,
                playStatus: "Watch"
            };
        }

        return movie;
    });

    displayMovies();
};

// Watch Movie

const watchMovie = (id) => {

    alert("Movie Watched Successfully!");

    movies = movies.filter(
        movie => movie.id !== id
    );

    displayMovies();
    showGenres();

    document.getElementById("result").innerHTML = "";
};

// Statistics

const showStatistics = () => {

    if (movies.length === 0) {

        document.getElementById("stats")
        .innerHTML = `
        <p>Total Movies : 0</p>
        <p>Average Rating : 0</p>
        <p>Highest Rated Movie : None</p>
        `;

        return;
    }

    let totalRating = 0;

    let highestMovie = movies[0];

    movies.forEach(movie => {

        totalRating += movie.rating;

        if (
            movie.rating >
            highestMovie.rating
        ) {
            highestMovie = movie;
        }
    });

    const averageRating =
    (totalRating / movies.length)
    .toFixed(2);

    document.getElementById("stats")
    .innerHTML = `

        <p>
        Total Movies :
        ${movies.length}
        </p>

        <p>
        Average Rating :
        ${averageRating}
        </p>

        <p>
        Highest Rated Movie :
        ${highestMovie.name}
        (${highestMovie.rating})
        </p>

    `;
};

// Dynamic Genre Buttons

const showGenres = () => {

    const genres = [
        ...new Set(
            movies.map(
                movie => movie.genre
            )
        )
    ];

    let buttons = "";

    genres.forEach(genre => {

        buttons += `
        <button
            class="genre-btn"
            onclick="showMoviesByGenre('${genre}')"
        >
            ${genre}
        </button>
        `;
    });

    document.getElementById("genreButtons")
    .innerHTML = buttons;
};

// Show Movies By Genre

const showMoviesByGenre = (genre) => {

    const filteredMovies =
    movies.filter(movie =>
        movie.genre.toLowerCase() ===
        genre.toLowerCase()
    );

    let output = `
    <h3>${genre} Movies</h3>
    `;

    filteredMovies.forEach(movie => {

        output += `
        <div class="movie">

            <h4>${movie.name}</h4>

            <p>
                Rating :
                ${movie.rating}
            </p>

            <p>
                Status :
                ${movie.status}
            </p>

        </div>
        `;
    });

    document.getElementById("result")
    .innerHTML = output;
};

// Initial Load

displayMovies();
showGenres();
