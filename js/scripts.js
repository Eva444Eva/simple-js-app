
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

    button.addEventListener('click', (event) => {
      showDetails(pokemon);
    });
  }

  function showDetails(pkmn) {
    if (pkmn.detailsLoaded) {
      console.log(pkmn);
    } else {
      loadDetails(pkmn).then(_ => {
        console.log(pkmn);
      });
    }
  }

  function loadList() {
    const endpoint = 'pokemon';
    const params = 'limit=150&offset=0';

    return fetch(`${API_BASE_URL}${endpoint}?${params}`)
      .then(response => response.json())
      .then(data => {
        data?.results?.forEach(pkmn => {
          add({
            name: pkmn.name,
            detailsUrl: pkmn.url,
          });
        });
        pokemonList.forEach(pkmn => {
          addListItem(pkmn);
        });
      });
  }

  function loadDetails(pkmn) {
    return fetch(pkmn.detailsUrl)
      .then(response => response.json())
      .then(details => {
        pkmn.imageUrl = details.sprites.front_default;
        pkmn.height = details.height;
        pkmn.types = details.types;
        pkmn.detailsLoaded = true;
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
// pokemonRepo.loadList().then(_ => {
//   console.log(pokemonRepo.getAll());
// });
