const inputElement = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const imageContainer = document.getElementById("image-container");
const pokemonType = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const statArray = [hp, attack, defense, specialAttack, specialDefense, speed];
const generalUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchData = async () => {
  try {
    imageContainer.innerHTML = "";
    types.innerHTML = "";
    let pokemonNameOrId = inputElement.value.toLowerCase();
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {
    alert("Pokemon not found");
  }
};

const fetchRandom = async () => {
  try {
    imageContainer.innerHTML = "";
    types.innerHTML = "";
    let randomNumber = Math.floor(Math.random() * 1025);
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${randomNumber}`);
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {
    alert("Pokemon not found");
  }
};

const displayPokemon = (data) => {
  const {name, id, weight, height, stats, sprites, types} = data;
  pokemonName.innerText = name.toUpperCase();
  pokemonID.innerText = "#" + id;
  pokemonWeight.innerText = "Weight: " + weight;
  pokemonHeight.innerText = "Height: " + height;
  let i = 0;
  stats.forEach(({base_stat}) => {
    statArray[i].innerText = base_stat;
    i++;
  })
  imageContainer.innerHTML += `<img id="sprite" src="${sprites.front_default}"</img>`
  types.forEach(({type}) => {
    pokemonType.innerHTML +=  `<p class="${type.name} type">${type.name.toUpperCase()}</p>` + " ";
  })
}

searchButton.addEventListener("click", fetchData);

document.addEventListener("keydown", (event) => {
  if(event.key === "Enter"){
    fetchData();
  }
})

randomButton.addEventListener("click", fetchRandom);

