let nextPageUrl = "";
let awaitRequest = false;
const BASE_URL = "https://rickandmortyapi.com/api/character";
const htmlList = document.querySelector("#characters-list");

function closeDetail() {
  document.body.classList.remove("stop-scrolling");
  document.querySelector("#modal-character-details").classList.add("hide");
}

// logica para limpiar la lista.
function cleanList() {
  htmlList.innerHTML = "";
}

function cleanTextInput() {
  document.querySelector("#search").value = "";
}

function drawCharacterModalDetails({ image, name, status, species, gender }) {
  return `
      <div class="details-close" onClick="closeDetail()">
        <p>X</p>
      </div>
      <div class="container">
      <h1 class="title">
        ${name}
      </h1>
      <section class="properties">
        <img src="${image}" loading="lazy" alt="photo of ${name}">
        <div>
          <p>Status: <span>${status}</span></p>   
          <p>Species: <span>${species}</span></p>
          <p>Gender: <span>${gender}</span></p>    
        </div>
      </section>
    </div>
  `;
}

async function getCharacter(id) {
  const character = await fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      return {};
    });

  return character;
}

const showCharacterModalDetails = (id) => async () => {
  console.log(id);
  const character = await getCharacter(id);
  const characterDetails = drawCharacterModalDetails(character);
  const modal = document.querySelector("#modal-character-details");
  modal.innerHTML = characterDetails;
  modal.setAttribute("style", `top: ${window.scrollY}px`);
  modal.classList.remove("hide");
  document.body.classList.add("stop-scrolling");
};

function drawCharacterListContainer({ image, name }) {
  return `
    <article class="character-container">
      <img class="image" src="${image}" loading="lazy" alt="photo of ${name}">
      <h2 class="title">${name}</h2>
    </article>
  `;
}

function drawCharacter(character) {
  const listItem = document.createElement("li");
  const characterContainer = drawCharacterListContainer(character);
  listItem.innerHTML = characterContainer;
  listItem.onclick = showCharacterModalDetails(character.id);
  htmlList.appendChild(listItem);
}

const handleResponse = ({ info, results }) => {
  nextPageUrl = info.next;
  results.forEach(({ id, name, status, species, gender, image }) => {
    const character = { id, name, status, species, gender, image };
    drawCharacter(character);
  });
};

function getCharacters(url) {
  awaitRequest = true;
  fetch(url)
    .then((response) => response.json())
    .then(handleResponse)
    .then(() => {
      awaitRequest = false;
    })
    .catch(console.error);
}

// funciones para el input
function debounceFunction(fn, delay) {
  let timer;
  return function () {
    const self = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, delay);
  };
}

function getInputRadioChecked() {
  const radios = Array.from(
    document.querySelectorAll("input[name='state-condition']")
  );

  return radios.find(({ checked }) => checked)?.value || "";
}

function filterCharactersByName(name) {
  cleanList();

  let url = BASE_URL;

  if (name) {
    url += `/?name=${name}`;
    const status = getInputRadioChecked();
    if (status) url += `&status=${status}`;
  }

  getCharacters(url);
}

function filterCharactersByStatus(value) {
  cleanList();
  cleanTextInput();

  const status = value ?? getInputRadioChecked();

  const url = status ? `${BASE_URL}/?status=${status}` : BASE_URL;

  getCharacters(url);
}

const debouncedFilterFn = debounceFunction(filterCharactersByName, 300);

const handleTextInput = ({ target: { value } }) => debouncedFilterFn(value);

// Funciones para el botón

function goToTheTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showButton({ heigth, scroll }) {
  const button = document.querySelector("#go-to-top");

  if (scroll > heigth) {
    return button.classList.remove("hide-button");
  }

  button.classList.add("hide-button");
}

// punto de entrada
function main() {
  getCharacters(BASE_URL);

  // listener para el scroll
  window.addEventListener("scroll", () => {
    console.log("listener");
    const windowHeight = window.innerHeight;
    const { clientHeight } = document.querySelector("#characters-list");

    if (windowHeight + window.scrollY >= clientHeight - 495) {
      if (!awaitRequest) {
        getCharacters(nextPageUrl);
      }
    }
  });

  window.addEventListener("scrollend", () => {
    const { innerHeight, scrollY } = window;

    showButton({ heigth: innerHeight, scroll: scrollY });
  });

  // listener para el text input
  document.querySelector("#search").addEventListener("input", handleTextInput);
}

main();
