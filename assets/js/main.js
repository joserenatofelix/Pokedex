const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonListDetails = document.getElementById('pokemonListDetails');

var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var pokemonDetailDiv = document.getElementById("pokemon-detail");

span.onclick = function() {
    modal.style.display = "none";
  }
  
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
function pokemonSelected (element,id) {
    
   console.log(element);
   console.log(id);
   
}

function loadPokemonItens(offset, limit) {
   
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>  `
            
            <li class="pokemon ${pokemon.type}">
            <div id="${pokemon.number}">
            
            <span class="number">N°${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}" />
            </div>
            <button id="buttonDetails" onclick='loadPokemonDetail(${pokemon.number}, ${1})' type="button">
                Details
            </button>
            </li>
            
            </div>
            `).join('');
            
        pokemonList.innerHTML += newHtml;
        
           
    })
    
        
    }


 function loadPokemonDetail(id, limit) {
    console.log(id);
    console.log(limit);
    pokeApi.getPokemon(id, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>`
        <li class="pokemonDetails ${pokemon.type}">

        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="fullDetail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}" />
        </div>

        <div class="detailsBody">
        
        <label for="Height">Height</label>
        <span class="${pokemon.type}">${pokemon.height}</span>
        
        <label for="Weight">Weight</label>
        <span class="${pokemon.type}">${pokemon.weight}</span>
        
        </div>

        <div class="detailsBodyData">
        <label for="Abilities">Abilities</label>
        <span><br>${pokemon.abilities}</span>
        
        </div>

        
        </li>
        `).join('');
        console.log(newHtml);
        
        pokemonDetailDiv.innerHTML = newHtml;     
        modal.style.display = "block";   
        
    })
}

    
   loadPokemonItens(execute());
    loadPokemonDetail(id, limit);
   
   
   function execute(){
    const maxRecords = 151;
    const limit = 10;
    let offset = 0;

    loadMoreButton.addEventListener('click', () => {
        offset += limit;
    
        const qtdRecordsWithNextPage = offset + limit;
    
        if (qtdRecordsWithNextPage >= maxRecords) {
         const newLimit = maxRecords - offset ;
         loadPokemonItens(offset,newLimit);  
         loadMoreButton.parentElement.removeChild(loadMoreButton);
    
        } else {
        loadPokemonItens(offset,limit);
        }
    })
    
   }