let roomIndex = localStorage.getItem("roomIndex");
if (roomIndex === null) location.href = "dashboard.html";

let rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
let currentRoom = rooms[roomIndex];
let currentUser = localStorage.getItem("currentUser");

document.getElementById("roomTitle").textContent = currentRoom.roomName;
document.getElementById("roomBet").textContent = currentRoom.bet;

function updateRoom() {
  rooms[roomIndex] = currentRoom;
  localStorage.setItem("rooms", JSON.stringify(rooms));
}

function joinTeam(team) {
  if (currentRoom.red.includes(currentUser) || currentRoom.blue.includes(currentUser)) {
    alert("You already joined a team.");
    return;
  }
  if (team === "Red") currentRoom.red.push(currentUser);
  else currentRoom.blue.push(currentUser);
  updateRoom();
  alert(`Joined Team ${team}`);
}

function sendChat() {
  const msgInput = document.getElementById("chatInput");
  const msg = msgInput.value.trim();
  if (!msg) return;
  currentRoom.chat.push({ user: currentUser, msg });
  updateRoom();
  msgInput.value = "";
  renderChat();
}

function renderChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";
  currentRoom.chat.forEach(({ user, msg }) => {
    const p = document.createElement("p");
    p.textContent = `${user}: ${msg}`;
    chatBox.appendChild(p);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

renderChat();

