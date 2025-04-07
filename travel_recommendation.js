const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnClear');
const btnBook = document.getElementById('btnBook');

function findDestinations() {
    const search_value = document.getElementById('destinationInput').value.toLowerCase();

    // has the user entered a query?
    if (search_value.length === 0) {
        return false;
    }

    const result_div = document.getElementById('searchResults');
    result_div.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // const destination = data.find(item => item.name.toLowerCase() === search_value);
            const destination = data[search_value];
            console.log(destination);

            if (destination) {
                destination.forEach(element => {
                    // There is a different structure to the source data between countries and beach or temple
                    if (element.cities) {
                        var country = document.createElement('div');
                        country.className = 'titleCard';
                        country.textContent = element.name;

                        result_div.appendChild(country);

                        element.cities.forEach(city => {
                            var dest_image = document.createElement('img');
                            dest_image.className = 'destination_image';
                            dest_image.src = city.imageUrl;
        
                            var title = document.createElement('h3');
                            title.textContent = city.name;
        
                            var description = document.createElement('div');
                            description.textContent = city.description;
        
                            var card = document.createElement('div');
                            card.className = 'card';
                            card.appendChild(dest_image);
                            card.appendChild(title);
                            card.appendChild(description);    

                            result_div.appendChild(card);
                        });
                    } else {
                        var dest_image = document.createElement('img');
                        dest_image.className = 'destination_image';
                        dest_image.src = element.imageUrl;
    
                        var title = document.createElement('h3');
                        title.textContent = element.name;
    
                        var description = document.createElement('div');
                        description.textContent = element.description;
    
                        var card = document.createElement('div');
                        card.className = 'card';
                        card.appendChild(dest_image);
                        card.appendChild(title);
                        card.appendChild(description);

                        result_div.appendChild(card);
                    }
                });
            } else {
                result_div.innerHTML = 'No destination found.';
            }
        })
        .catch(error => {
            console.error(error);
        });
}

btnSearch.addEventListener('click', findDestinations);
btnReset.addEventListener('click', function() {
    btnSearch.value = '';
    document.getElementById('searchResults').innerHTML = '';
});

btnBook.addEventListener('click', function() {
    alert("Call your travel agent.");
});