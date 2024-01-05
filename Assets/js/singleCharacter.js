let errorMessage = document.querySelector('.errorMessage')
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
let episodesContainer = document.querySelector('.episodesContainer')
let characterName = document.querySelector('.characterName')
let characterLocation = document.querySelector('.characterLocation')
let characterImage = document.querySelector('.characterImage')
async function getSingleCharacter(id) {
    episodesContainer.innerHTML = ''

    try {
        const response = await fetch(
            `https://rickandmortyapi.com/api/character/${id}`
        )
        if (!response.ok) {
            throw new Error(response.status)
        }

        const character = await response.json()
        displayCharacter(character)
    } catch (error) {
        displayError(error.message)
    }
}

function createCard(episode) {
    let card = document.createElement('div')
    card.className = 'mx-4 my-4'
    card.innerHTML = ` <p class="text-center bg-gray-600">${episode}</p>`
    episodesContainer.appendChild(card)
}

function displayCharacter(character) {
    characterName.textContent = ` Name : ${character.name}`
    characterLocation.textContent = ` Location : ${character.location.name}`
    characterImage.src = character.image
    character.episodes.map((episode) => {
        createCard(episode)
    })
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

getSingleCharacter(id)
