
let pokemonRepo = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    { name: 'Rattata', height: 0.3, types: ['normal']},
    { name: 'Slowbro', height: 1.6, types: ['psychic', 'water']},
  ];
  const requiredPokemonParams = ['name', 'height', 'types'];

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

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  // return object with the new public functions assigned as keys
  return {
    getAll: getAll,
    add: add,
    findByName: findByName,
    addListItem: addListItem
  };
})();

pokemonRepo.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

pokemonRepo.getAll().forEach(function(pokemon) {
  console.log(pokemon);
  pokemonRepo.addListItem(pokemon);
});
