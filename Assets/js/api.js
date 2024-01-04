let countLabel = document.querySelector('.countLabel')

async function displayAllCharacters() {
    const reponse = await fetch('https://rickandmortyapi.com/api/character')
    const characters = await reponse.json()

    countLabel.textContent = `Les ${characters.info.count} personnages.`

    let results = characters.results

    results.map((result) => {
        console.log(result)
    })
}
displayAllCharacters()
