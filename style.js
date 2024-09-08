const chatLog = document.getElementById('chat');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const buttonIcon = document.getElementById('buttonIcon');
const info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') {
        return;
    }
    else if (message === 'developer') {
        userInput.value = '';
        appendMessage('user', message);
        setTimeout(() => {
            appendMessage('bot', 'This Source Coded By Reza Mehdikhanlou \nYoutube : @AsmrProg');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }


    appendMessage('user', message);
    userInput.value = '';

	let data = {
        model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: `'${message}'`
			}
		]
	}

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
			Accept: "application/json",
            'x-rapidapi-key': '37f7dd60c9msh2955cfd8dda5bd5p13c72fjsn5a622ad4962e',
		    'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',

        },
        body: JSON.stringify(data)
        
    };
    
    fetch('https://chat-gpt26.p.rapidapi.com/', options)
	.then(function(response){
		return response.json();
	}).then((jsonData) => {
        appendMessage('bot', jsonData.choices[0].message.content);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }).catch((err) => {
        if (err.name === 'TypeError') {
            appendMessage('bot', 'Error : Check Your Api Key!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });
}

function appendMessage(sender, message) {
    info.style.display = "none";

    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const chatElement = document.createElement('div');
    const messageElement = document.createElement('div');
    const text = document.createElement('p');
    const imgElement = document.createElement('div');
    const img = document.createElement('img');
    img.src = 'https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-on-transparent-background-png.png';

    chatElement.classList.add("chat-box");
    img.classList.add('image');
    messageElement.classList.add(sender);
    messageElement.innerText = message;
    text.textContent = message;

    if (sender === 'user') {
        messageElement.classList.add(sender);
    } else {
        messageElement.classList.add(sender);
        imgElement.setAttribute('id', 'bot-icon');
        imgElement.appendChild(img)
    }

    chatElement.appendChild(imgElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;

}