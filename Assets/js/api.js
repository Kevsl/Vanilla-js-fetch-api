let countLabel = document.querySelector('.countLabel')
let cardContainer = document.querySelector('.cardContainer')
let nav = document.querySelector('.nav')
let errorMessage = document.querySelector('.errorMessage')
let characters = []

async function getAllCharacters(url) {
    cardContainer.innerHTML = ''
    if (!url) url = 'https://rickandmortyapi.com/api/character'

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.status)
        }

        const characters = await response.json()
        displayCharacters(characters)
    } catch (error) {
        displayError(error.message)
    }
}

function createCard(image, name, id) {
    let card = document.createElement('div')
    card.className = 'mx-4 my-4'
    card.innerHTML = ` <a href="./personnage.html?id=${id}"><img src=${image} alt=${name} /> <p class="text-center bg-gray-600">${name}</p></a>`
    cardContainer.appendChild(card)
}

function createNav(prev, next) {
    nav.innerHTML = ''
    if (prev) {
        nav.innerHTML += `<button class="mr-auto" onclick="getAllCharacters('${prev}')">Prev</button>`
    }
    if (next) {
        nav.innerHTML += `<button class="right-0 absolute" onclick="getAllCharacters('${next}')">Next</button>`
    }
}

function displayCharacters(characters) {
    countLabel.textContent = ` Il y a ${characters.info.count} personnages.`
    characters.results.map((result) => {
        createCard(result.image, result.name, result.id)
    })
    createNav(characters.info.prev, characters.info.next)
}

function displayError(error) {
    let messageToDisplay = ''
    switch (error) {
        case '404':
            messageToDisplay = 'Page introuvable'
            break
        case '400':
            messageToDisplay = 'Bad request'
            break
        default:
            messageToDisplay = 'Problème technique, sorry'
    }
    errorMessage.innerText = messageToDisplay
}

getAllCharacters()
console.log(window.location.href)
