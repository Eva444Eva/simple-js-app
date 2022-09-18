let pokemonList = [
  { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
  { name: 'Rattata', height: 0.3, types: ['normal']},
  { name: 'Slowbro', height: 1.6, types: ['psychic', 'water']},
];

// this loop writes all the Pokemon names in the array with height
document.write('<ul>');
for (let i = 0, pl = pokemonList.length; i < pl; i++) {
  document.write('<li class="list-item">');
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');

  // Sentence below appears when Pokemon is higher that 1
  if (pokemonList[i].height >= 1) {
    document.write(" - Wow, that is big!");
  }
  document.write('</li>');
}
document.write('</ul>');


