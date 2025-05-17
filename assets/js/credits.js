let currentUser = localStorage.getItem("currentUser");
let users = JSON.parse(localStorage.getItem("users")) || {};
let logs = JSON.parse(localStorage.getItem("creditLogs")) || {};

if (!currentUser || !users[currentUser]) {
  alert("You must be logged in.");
  window.location.href = "index.html";
}

const historyList = document.getElementById("history-list");

function loadHistory() {
  const userLogs = logs[currentUser] || [];

  if (userLogs.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No transactions yet.";
    historyList.appendChild(li);
    return;
  }

  userLogs.forEach(log => {
    const li = document.createElement("li");
    li.textContent = `[${log.date}] ${log.type}: ${log.amount} credits. ${log.note || ""}`;
    historyList.appendChild(li);
  });
}

loadHistory();
