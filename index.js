const posterElement = document.getElementById("poster");
const titleElement = document.getElementById("title");
const runtimeElement = document.getElementById("runtime");
const showtimeElement = document.getElementById("showtime");
const availableTicketsElement = document.getElementById("available-tickets");
const buyTicketButton = document.getElementById("buy-ticket");
const filmsList = document.getElementById("films");

function renderMovie(movie) {
  posterElement.src = movie.poster;
  titleElement.textContent = movie.title;
  runtimeElement.textContent = movie.runtime;
  showtimeElement.textContent = movie.showtime;
  const availableTickets = movie.capacity - movie.tickets_sold;
  availableTicketsElement.textContent = availableTickets;
  if (availableTickets === 0) {
    buyTicketButton.disabled = true;
    buyTicketButton.textContent = "Sold Out";
  } else {
    buyTicketButton.disabled = false;
    buyTicketButton.textContent = "Buy Ticket";
  }
}

function renderFilmList(films) {
  filmsList.innerHTML = "";
  films.forEach((film) => {
    const filmElement = document.createElement("li");
    filmElement.classList.add("film", "item");
    filmElement.textContent = film.title;
    if (film.capacity - film.tickets_sold === 0) {
      filmElement.classList.add("sold-out");
    }
    filmElement.addEventListener("click", () => {
      renderMovie(film);
    });
    filmsList.appendChild(filmElement);
  });
}

fetch("http://localhost:3000/films")
  .then((response) => response.json())
  .then((movie) => {
    renderMovie(movie);
  });

fetch("http://localhost:3000/films")
  .then((response) => response.json())
  .then((films) => {
    renderFilmList(films);
  });

  buyTicketButton.addEventListener("click", () => {
    const movieId = 1; // Change this to the ID of the current movie being displayed
    fetch(`/films/${movieId}/buy-ticket`, { method: "POST" })
      .then((response) => response.json())
      .then((updatedMovie) => {
        renderMovie(updatedMovie);
      });
  });
  
