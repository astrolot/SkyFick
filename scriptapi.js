const API_KEY = "api_key=521ca0d89dacadb79870e89d634c6d82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('main');
const slideoutForm = document.getElementById('slideout-form');
const navForm = document.getElementById('nav-form');
const slideoutSearch = document.getElementById('slideout-search');
const navSearch = document.getElementById('nav-search');

// Function to fetch random movies
function getRandomMovies() {
    const page = Math.floor(Math.random() * 10) + 1; // Generate a random page number between 1 and 10
    const API_URL = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&${API_KEY}`;
    
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            showMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to fetch popular movies or search movies
function fetchMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            showMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to display movies
function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        const colorClass = getColor(vote_average);
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${colorClass}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// Function to determine color based on vote average
function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

// Call getRandomMovies when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getRandomMovies();
});

// Event listener for form submission (slideout menu)
slideoutForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const searchTerm = slideoutSearch.value.trim();
    if (searchTerm) {
        fetchMovies(`${searchURL}&query=${searchTerm}`);
    }
});

// Event listener for form submission (navigation menu)
navForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const searchTerm = navSearch.value.trim();
    if (searchTerm) {
        fetchMovies(`${searchURL}&query=${searchTerm}`);
    }
});
