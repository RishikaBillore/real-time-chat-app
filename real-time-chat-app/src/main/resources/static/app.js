let stompClient = null;

const username = document.getElementById("username");
const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const form = document.getElementById("message-form");
const messages = document.getElementById("messages");
const status = document.getElementById("status");

function addMessage(message) {
    const wrapper = document.createElement("div");
    wrapper.className = "message";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${message.sender} • ${new Date(message.timestamp).toLocaleTimeString()}`;

    const content = document.createElement("div");
    content.textContent = message.content;

    wrapper.appendChild(meta);
    wrapper.appendChild(content);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
}

async function loadHistory() {
    const response = await fetch("/api/messages");
    const history = await response.json();
    messages.innerHTML = "";
    history.forEach(addMessage);
}

connectButton.addEventListener("click", async () => {
    const name = username.value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    const socket = new SockJS("/ws");
    stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({}, async () => {
        status.textContent = "Connected";
        connectButton.disabled = true;
        disconnectButton.disabled = false;
        username.disabled = true;
        messageInput.disabled = false;
        sendButton.disabled = false;

        await loadHistory();

        stompClient.subscribe("/topic/public", (frame) => {
            addMessage(JSON.parse(frame.body));
        });

        stompClient.send("/app/chat.send", {}, JSON.stringify({
            sender: name,
            content: `${name} joined the chat`,
            type: "JOIN"
        }));
    }, () => {
        status.textContent = "Connection failed";
    });
});

disconnectButton.addEventListener("click", () => {
    if (stompClient) {
        stompClient.send("/app/chat.send", {}, JSON.stringify({
            sender: username.value.trim(),
            content: `${username.value.trim()} left the chat`,
            type: "LEAVE"
        }));

        stompClient.disconnect(() => {
            status.textContent = "Disconnected";
        });
    }

    connectButton.disabled = false;
    disconnectButton.disabled = true;
    username.disabled = false;
    messageInput.disabled = true;
    sendButton.disabled = true;
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!stompClient || !messageInput.value.trim()) {
        return;
    }

    stompClient.send("/app/chat.send", {}, JSON.stringify({
        sender: username.value.trim(),
        content: messageInput.value.trim(),
        type: "CHAT"
    }));

    messageInput.value = "";
    messageInput.focus();
});
