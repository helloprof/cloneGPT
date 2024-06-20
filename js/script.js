// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { topics, chats } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ topics, chats }, "App Data");


function generateTopics(topics) {
    // target the main div or component
    let topicsHome = document.querySelector("#topics")
    // equivalent: document.getElementById("topics")



    topics.forEach((topic) => {
        let hr = document.createElement('hr')
        let hr2 = document.createElement('hr')

        let topicCard = document.createElement('div')

        let topicName = document.createElement('h2')
        topicName.textContent = topic.name

        let topicDescription = document.createElement('p')
        topicDescription.textContent = topic.description

        let topicIcon = document.createElement('i')
        topicIcon.className = topic.icon

        topicCard.appendChild(hr)
        topicCard.appendChild(topicIcon)
        topicCard.appendChild(topicName)
        topicCard.appendChild(topicDescription)
        topicCard.appendChild(hr2)

        topicCard.addEventListener('click', () => {
            console.log("you clicked it")

            // here's the function to generate chats 

            generateChats(topic.topicID)
        })


        topicsHome.appendChild(topicCard)
    })
}

function generateChats(TID) {
    let chatsHome = document.querySelector("#chats")
    let chatsByTopic = chats.filter(chat => chat.topicID == TID)

    chatsByTopic.forEach((chat) => {
        // design and create the card for the chats
        

        let hr = document.createElement('hr')
        let hr2 = document.createElement('hr')

        let chatCard = document.createElement('div')

        let chatDetails = document.createElement('p')
        chatDetails.textContent = chat.details

        let chatDate = document.createElement('h6')
        chatDate.textContent = chat.date

        chatCard.appendChild(hr)
        chatCard.appendChild(chatDate)
        chatCard.appendChild(chatDetails)
        chatCard.appendChild(hr2)

        chatsHome.appendChild(chatCard)
    })

}

window.addEventListener('load', (e) => {
    generateTopics(topics)
})