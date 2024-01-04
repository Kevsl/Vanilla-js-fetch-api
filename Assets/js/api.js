let countLabel = document.querySelector('.countLabel')
let cardContainer = document.querySelector('.cardContainer')
let nav = document.querySelector('.nav')

async function displayAllCharacters(url) {
    cardContainer.innerHTML = ''
    if (!url) url = 'https://rickandmortyapi.com/api/character'
    const reponse = await fetch(url)
    const characters = await reponse.json()

    characters.results.map((result) => {
        createCard(result.image, result.name)
    })
    createNav(characters.info.prev, characters.info.next)
    countLabel.textContent = ` Il y a ${characters.info.count} personnages.`
}

function createCard(image, name) {
    let card = document.createElement('div')
    card.className = 'mx-4 my-4'
    card.innerHTML = `<img src=${image} alt=${name} /> <p class="text-center bg-gray-600">${name}</p>`
    cardContainer.appendChild(card)
}

function createNav(prev, next) {
    nav.innerHTML = ''
    if (prev) {
        nav.innerHTML += `<button class="mr-auto" onclick="displayAllCharacters('${prev}')">Prev</button>`
    }
    if (next) {
        nav.innerHTML += `<button class="right-0 absolute" onclick="displayAllCharacters('${next}')">Next</button>`
    }
}
displayAllCharacters()
