let countLabel = document.querySelector('.countLabel')
let cardContainer = document.querySelector('.cardContainer')
let nav = document.querySelector('.nav')
let errorMessage = document.querySelector('.errorMessage')
let characters = []

async function getAllCharacters(url) {
    cardContainer.innerHTML = ''
    if (!url) url = 'https://rickandmortyapi.com/api/lsmlqslkmqd'

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.status)
        }

        const characters = await response.json()
        displayCharacters(characters)
    } catch (error) {
        displayError(error)
    }
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
        nav.innerHTML += `<button class="mr-auto" onclick="getAllCharacters('${prev}')">Prev</button>`
    }
    if (next) {
        nav.innerHTML += `<button class="right-0 absolute" onclick="getAllCharacters('${next}')">Next</button>`
    }
}

function displayCharacters(characters) {
    countLabel.textContent = ` Il y a ${characters.info.count} personnages.`
    characters.results.map((result) => {
        createCard(result.image, result.name)
    })
    createNav(characters.info.prev, characters.info.next)
}

function displayError(error) {
    switch (error) {
        case 400:
            'Page introuvable'
    }

    errorMessage.innerText = error
}

getAllCharacters()
