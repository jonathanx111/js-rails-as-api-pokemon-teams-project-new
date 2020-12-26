const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// Global Variable Delarations and Queries
const mainContent = document.querySelector('main')

/*********** Initial Load Page Functionality ***************/
// Initial Fetch Function Call
const initialFetch = () => {
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainerObjects => {
            trainerObjects.forEach(renderTrainerInfo)
        })
}

// Rendering Trainer Info and trainer's pokemon
const renderTrainerInfo = (trainerObject) => {
    const pokemonDiv = document.createElement('div')
    const trainerNameP = document.createElement('p')
    const addPokemonButton = document.createElement('button')
    const pokemonUl = document.createElement('ul')

    // Going Through Each Trainer's Pokemon and creating a Li and appending to Ul
    pokemonLiInfoAppenedToUl = trainerObject.pokemons.forEach((pokemon) => {
        const pokemonLi = document.createElement('li')
        const releasePokemonButton = document.createElement('button')
        
        releasePokemonButton.className = 'release'
        releasePokemonButton.dataset.pokemonId = pokemon.id
        releasePokemonButton.textContent = 'Release'
        releasePokemonButton.addEventListener('click', releasePokemonEvent)

        pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`
        pokemonLi.append(releasePokemonButton)
        
        pokemonUl.append(pokemonLi)
    })

    // Assign Attributes to Html Elements
    addPokemonButton.dataset.trainerId = trainerObject.id 
    addPokemonButton.textContent = 'Add Pokemon'
    addPokemonButton.addEventListener('click', addPokemonButtonEvent)

    trainerNameP.textContent = `${trainerObject.name}`

    pokemonDiv.className = 'card'
    pokemonDiv.dataset.id = trainerObject.id

    pokemonDiv.append(trainerNameP, addPokemonButton, pokemonUl)
    mainContent.append(pokemonDiv)
}

// Add Pokemon Button Event
const addPokemonButtonEvent = (event) => {
    const pokemonDiv = event.target.closest('div')
    const pokemonUl = pokemonDiv.querySelector('ul')

    if (pokemonUl.children.length < 6) {
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: event.target.dataset.trainerId
            })
        })
        .then(response => response.json())
        .then(newPokemon => {
            renderNewPokemon(newPokemon, pokemonUl)
        })
    } else {
        alert("You Can only have 6 pokemons on your team!")
    }
}

// Add new Pokemon
const renderNewPokemon = (pokemon, pokemonUl) => {
    const pokemonLi = document.createElement('li')
    const releasepokemonButton = document.createElement('button')

    releasepokemonButton.className = 'release'
    releasepokemonButton.dataset.pokemonId = pokemon.id
    releasepokemonButton.textContent = 'Release'
    releasepokemonButton.addEventListener('click', releasePokemonEvent)

    pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`
    pokemonLi.append(releasepokemonButton)

    pokemonUl.append(pokemonLi)
}

// Release Pokemon Event
const releasePokemonEvent = (event) => {
    const pokemonId = event.target.dataset.pokemonId
    const pokemonLi = event.target.closest('li')
    fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(() => {
        pokemonLi.remove()
    })
}


// Initial Load Page Function Declaration
initialFetch()



