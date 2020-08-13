const container = document.querySelector('.container'),
	  seats = document.querySelectorAll('.row .seat:not(.occupied)'),
	  count = document.getElementById('count'),
	  total = document.getElementById('total'),
	  movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Update total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;

	const selectedIndex = [...selectedSeats].map(seat => {
		return [...seats].indexOf(seat);
	});
	localStorage.setItem('indexSelectedSeats', JSON.stringify(selectedIndex));
}

// Save selected movie index and price 
function movieData(selectedPrice, selectedMovie) {
	localStorage.setItem('priceSelectedSeats', selectedPrice);
	localStorage.setItem('movieSelectedSeats', selectedMovie);
}

// Get data from localStorage and populateUI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('indexSelectedSeats'));
	if(selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if(selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		}) 
	}

	const selectedMovie = localStorage.getItem('movieSelectedSeats');
	if(selectedMovie !== null && selectedMovie.length > 0) {
		movieSelect.selectedIndex = selectedMovie;
	}
}

// Movie select event
movieSelect.addEventListener('change', e => {
	ticketPrice = +e.target.value;
	updateSelectedCount();
	movieData(e.target.value, e.target.selectedIndex);
})


// Event Listeners
container.addEventListener('click', (e) => {
	if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');
	}
	updateSelectedCount();
})

// Initial count adn total set
updateSelectedCount();