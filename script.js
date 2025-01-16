const form = document.getElementById('pokemon-form');
const input = document.getElementById('pokemon-name');
const pokemonInfoDiv = document.getElementById('pokemon-info');

async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        
        if (!response.ok) {
            throw new Error('Pokemon no encontrado');
        }

        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
        pokemonInfoDiv.style.display = 'block';
    }
}

function displayPokemonInfo(pokemon) {
    const { name, sprites, types, abilities } = pokemon;

    const typesList = types.map(typeInfo => typeInfo.type.name).join(', ');
    const abilitiesList = abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

    pokemonInfoDiv.innerHTML = `
        <img src="${sprites.front_default}" alt="${name}">
        <h3>${name}</h3>
        <p>Tipo: ${typesList}</p>
        <p>Habilidades: ${abilitiesList}</p>
    `;

    pokemonInfoDiv.style.display = 'block';
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = input.value.trim();
    if (pokemonName) {
        fetchPokemonData(pokemonName);
    }
});