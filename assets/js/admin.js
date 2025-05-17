const deposits = JSON.parse(localStorage.getItem("deposits") || "[]");
const withdrawals = JSON.parse(localStorage.getItem("withdrawals") || "[]");

const depositList = document.getElementById("depositList");
const withdrawList = document.getElementById("withdrawList");

function updateData() {
  localStorage.setItem("deposits", JSON.stringify(deposits));
  localStorage.setItem("withdrawals", JSON.stringify(withdrawals));
}

function approveDeposit(i) {
  deposits[i].status = "approved";
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === deposits[i].username);
  if (user) {
    user.credits += deposits[i].amount;
    localStorage.setItem("users", JSON.stringify(users));
  }
  updateData();
  renderLists();
}

function rejectDeposit(i) {
  deposits[i].status = "rejected";
  updateData();
  renderLists();
}

function approveWithdraw(i) {
  withdrawals[i].status = "approved";
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === withdrawals[i].username);
  if (user) {
    const totalDeduction = withdrawals[i].amount + withdrawals[i].fee;
    if(user.credits >= totalDeduction){
      user.credits -= totalDeduction;
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      alert("User has insufficient credits for withdrawal!");
      withdrawals[i].status = "pending";
    }
  }
  updateData();
  renderLists();
}

function rejectWithdraw(i) {
  withdrawals[i].status = "rejected";
  updateData();
  renderLists();
}

function renderLists() {
  depositList.innerHTML = "";
  deposits.forEach((d, i) => {
    if(d.status === "pending") {
      const li = document.createElement("li");
      li.textContent = `${d.username} - ${d.amount} (Ref: ${d.ref})`;
      const approveBtn = document.createElement("button");
      approveBtn.textContent = "Approve";
      approveBtn.onclick = () => approveDeposit(i);
      const rejectBtn = document.createElement("button");
      rejectBtn.textContent = "Reject";
      rejectBtn.onclick = () => rejectDeposit(i);
      li.appendChild(approveBtn);
      li.appendChild(rejectBtn);
      depositList.appendChild(li);
    }
  });

  withdrawList.innerHTML = "";
  withdrawals.forEach((w, i) => {
    if(w.status === "pending") {
      const li = document.createElement("li");
      li.textContent = `${w.username} - ${w.amount} (Fee: ${w.fee.toFixed(2)})`;
      const approveBtn = document.createElement("button");
      approveBtn.textContent = "Approve";
      approveBtn.onclick = () => approveWithdraw(i);
      const rejectBtn = document.createElement("button");
      rejectBtn.textContent = "Reject";
      rejectBtn.onclick = () => rejectWithdraw(i);
      li.appendChild(approveBtn);
      li.appendChild(rejectBtn);
      withdrawList.appendChild(li);
    }
  });
}

renderLists();

