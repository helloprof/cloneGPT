let generateButton = document.querySelector('#generate');


function addCard() {
    let chat = document.querySelector('#chat');

    // create the card
    let card = document.createElement('div')

    // style the card 
    card.className = 'card'

    // create image element
    let image = document.createElement('img')
    card.textContent = 'Hello World'
    image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/800px-ChatGPT_logo.svg.png"
    image.width = 100
    card.appendChild(image)

    // add image to card

    // add text to the card


    chat.appendChild(card)
}


generateButton.addEventListener('click', (e) => {
    // creating an element
    addCard()
    // maybe grab the text from input etc etc 
});