
let pokemonRepo = (function() {
  let pokemonList = [];
  const requiredPokemonParams = ['name', 'detailsUrl'];
  const API_BASE_URL = 'https://pokeapi.co/api/v2/';

  function getAll() {
    return pokemonList;
  }

  // define separate function add(item)
  function add(item) {
    if (typeof item === 'object' && requiredPokemonParams.every(key => Object.keys(item).includes(key))) {
      pokemonList.push(item);
    } else {
      // do nothing
    }
  } 

  function findByName(nameToFind) {
    const result = pokemonList.find(function(pokemon) {
      return pokemon.name === nameToFind;
    });
    return result; 
  }

  function addListItem(pokemon) {
    const pokemonListElement = document.querySelector(".pokemon-list");
    const pokemonElement = document.createElement("li");
    const button = document.createElement("button");

    pokemonListElement.appendChild(pokemonElement);

    pokemonElement.classList.add('list-item');
    pokemonElement.appendChild(button);

    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemon-details-modal');
    button.addEventListener('click', event => {
      if (pokemon.detailsLoaded) {
        updateDetailData(pokemon);
      } else {
        loadDetails(pokemon).then(_ => {
          updateDetailData(pokemon);
        });
      }  
    });
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(response => response.json())
      .then(details => {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
        pokemon.detailsLoaded = true;
      });
  }

  function updateDetailData(pokemon) {
    let formattedTypes = pokemon.types.map(item => item.type.name).join(', ');

    document.querySelector('#modal-pokemon-name').innerText = pokemon.name;
    document.querySelector('#modal-pokemon-height').innerText = pokemon.height;
    document.querySelector('#modal-pokemon-types').innerText = formattedTypes;
    document.querySelector('#modal-pokemon-image').src = pokemon.imageUrl;
  }

  function loadList() {
    const endpoint = 'pokemon';
    const params = 'limit=150&offset=0';

    return fetch(`${API_BASE_URL}${endpoint}?${params}`)
      .then(response => response.json())
      .then(data => {
        data?.results?.forEach(pokemon => {
          add({
            name: pokemon.name,
            detailsUrl: pokemon.url,
          });
        });
        pokemonList.forEach(pokemon => {
          addListItem(pokemon);
        });
      });
  }

  // return object with the new public functions assigned as keys
  return {
    add: add,
    findByName: findByName,
    getAll: getAll,
    loadDetails: loadDetails,
    loadList: loadList,
  };
})();

pokemonRepo.loadList();
