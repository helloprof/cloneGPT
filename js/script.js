// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { topics, chats, priorChats } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ topics, chats, priorChats }, "App Data");


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
        topicCard.className = "topic-card"

        // topicCard.appendChild(hr)
        topicCard.appendChild(topicIcon)
        topicCard.appendChild(topicName)
        topicCard.appendChild(topicDescription)
        // topicCard.appendChild(hr2)

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

function generatePriorChats(priorChats) {
    let sidebar = document.querySelector(".sidebar")
    // let button = 

    // sidebar.innerHTML = ""
    let chatsHome = document.querySelector("#chats")

    priorChats.forEach((priorChat) => {
        let button = document.createElement('a')
        button.textContent = priorChat.details
        button.className = "priorChatButton"
        let loader = document.getElementById("loader");


        button.addEventListener('click', () => {
            // console.log(priorChat.details)

            // openAPICall()
            button.style.border = "1px solid red"

            loader.style.display = "block";
            chatsHome.classList.add("disabled");
            sidebar.classList.add("disabled");

            openAPICall(`${priorChat.details} ---- return the response in html instead markdown`, document)
        })


        sidebar.appendChild(button)

    })

}

function openAPICall(content, document) {
    let formObjectReqBody = {
        messages: [{ role: "system", content: content }],
        model: "gpt-4o-mini",
    }

    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify(formObjectReqBody),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " // add your API key here
        },
    }).then((response) => {
       response.json().then((data) => {
            console.log(data.choices[0].message.content)
            let chatsHome = document.querySelector("#chats")
            let sidebar = document.querySelector(".sidebar")

            loader.style.display = "none";
            chatsHome.classList.remove("disabled");

            sidebar.classList.remove("disabled");


            console.log(chatsHome)
            // let hr = document.createElement('hr')

            // let hr2 = document.createElement('hr')

            // let hr = document.createElement('hr')
            // let hr2 = document.createElement('hr')

            let chatCard = document.createElement('div')
            chatCard.className = "chat-card"


            let chatDetails = document.createElement('p')
            chatDetails.innerHTML = data.choices[0].message.content

            let chatDate = document.createElement('h6')
            // Convert Unix timestamp to JavaScript Date object
            const timestamp = data.created;
            const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

            // Format the date to a readable format
            const formattedDate = date.toISOString().split('T')[0];; // Example format: 2024-07-25T12:34:56.789Z

            chatDate.textContent = formattedDate

            // chatCard.appendChild(hr)
            chatCard.appendChild(chatDate)
            chatCard.appendChild(chatDetails)
            // chatCard.appendChild(hr2)

            chatsHome.appendChild(chatCard)
        })
    }).catch((err) => {
        console.log(err)
    })
}

window.addEventListener('load', (e) => {
    generateTopics(topics)
    generatePriorChats(priorChats)
})