let currentUser = localStorage.getItem("currentUser");
if (!currentUser) location.href = "login.html";

let users = JSON.parse(localStorage.getItem("users") || "[]");
let user = users.find(u => u.username === currentUser);
document.getElementById("userDisplay").textContent = user.username;
document.getElementById("creditDisplay").textContent = user.credits;

function updateUser() {
  const idx = users.findIndex(u => u.username === currentUser);
  users[idx] = user;
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("creditDisplay").textContent = user.credits;
}

function depositCredits() {
  const amount = parseFloat(document.getElementById("depositAmount").value);
  const ref = document.getElementById("gcashRef").value;
  if (!amount || !ref) return alert("Fill all deposit fields");
  const deposits = JSON.parse(localStorage.getItem("deposits") || "[]");
  deposits.push({ username: user.username, amount, ref, status: "pending" });
  localStorage.setItem("deposits", JSON.stringify(deposits));
  alert("Deposit submitted!");
}

function withdrawCredits() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  if (!amount || user.credits < amount) return alert("Invalid or insufficient credits");
  const fee = amount * 0.05;
  const withdrawals = JSON.parse(localStorage.getItem("withdrawals") || "[]");
  withdrawals.push({ username: user.username, amount, fee, status: "pending" });
  localStorage.setItem("withdrawals", JSON.stringify(withdrawals));
  alert("Withdraw request submitted!");
}

function createRoom() {
  const roomName = document.getElementById("roomName").value;
  const roomBet = parseFloat(document.getElementById("roomBet").value);
  if (!roomName || !roomBet) return alert("Fill room details");
  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  rooms.push({ roomName, bet: roomBet, red: [], blue: [], chat: [] });
  localStorage.setItem("rooms", JSON.stringify(rooms));
  loadRooms();
}

function loadRooms() {
  const roomList = document.getElementById("roomList");
  roomList.innerHTML = "";
  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  rooms.forEach((room, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${room.roomName} - Bet: ${room.bet} <button onclick="enterRoom(${i})">Join</button>`;
    roomList.appendChild(li);
  });
}
function enterRoom(index) {
  localStorage.setItem("roomIndex", index);
  location.href = "room.html";
}

function loadHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  const deposits = JSON.parse(localStorage.getItem("deposits") || "[]").filter(d => d.username === user.username);
  const withdrawals = JSON.parse(localStorage.getItem("withdrawals") || "[]").filter(w => w.username === user.username);
  [...deposits, ...withdrawals].forEach(tx => {
    const li = document.createElement("li");
    li.textContent = `${tx.status.toUpperCase()}: ${tx.amount}`;
    list.appendChild(li);
  });
}

loadRooms();
loadHistory();
