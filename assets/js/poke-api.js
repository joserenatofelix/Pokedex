const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    


    const types = pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    
    return pokemon;
    
}

function convertPokeApiDataToPokemon(pokeDetail) {
    const pokemon = new PokemonData();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.baseExperience = pokeDetail.base_experience;
    pokemon.hp = pokeDetail.stats.find((stat) => stat.stat.name === 'hp').base_stat;
    pokemon.attack = pokeDetail.stats.find((stat) => stat.stat.name === 'attack').base_stat;
    pokemon.def = pokeDetail.stats.find((stat) => stat.stat.name === 'defense').base_stat;
    pokemon.sptattack = pokeDetail.stats.find((stat) => stat.stat.name === 'special-attack').base_stat;
    pokemon.spdef = pokeDetail.stats.find((stat) => stat.stat.name === 'special-defense').base_stat;
    pokemon.speed = pokeDetail.stats.find((stat) => stat.stat.name === 'speed').base_stat;

    return pokemon;
    
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then(((response) => response.json()))
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonFullDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then(((response) => response.json()))
    .then(convertPokeApiDataToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map((pokeApi.getPokemonFullDetail)))//antes getPokemonDetail
    
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemon =  (numeroPokemon, limit) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${numeroPokemon -1}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map((pokeApi.getPokemonFullDetail)))
    
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonDetails) => pokemonDetails)
}