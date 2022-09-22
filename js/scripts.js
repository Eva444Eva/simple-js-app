
let pokemonRepo = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    { name: 'Rattata', height: 0.3, types: ['normal']},
    { name: 'Slowbro', height: 1.6, types: ['psychic', 'water']},
  ];

  function getAll() {
    return pokemonList;
  }

  // define separate function add(item)
  function add(item) {
    if (typeof item === 'object') {
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

  // return object with the new public functions assigned as keys
  return {
    getAll: getAll,
    add: add,
    findByName: findByName
  };
})();

//this loop writes all the Pokemon names in the array with height
document.write('<ul class="list">');

pokemonRepo.getAll().forEach(pokemon => {
  // opening tag
  document.write('<li class="list-item">');

  // main info
  document.write(pokemon.name + ': ' + ' height -  '+ pokemon.height);
  
  // conditional note
  if (pokemon.height >= 1) {
    document.write(' - Wow, that is big!');
  }

  // closing tag
  document.write('</li>');
}); 

document.write('</ul>');
