document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("newUsername").value;
      const password = document.getElementById("newPassword").value;
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find(u => u.username === username)) {
        alert("Username already exists!");
        return;
      }
      users.push({ username, password, credits: 0 });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully!");
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem("currentUser", username);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid login!");
      }
    });
  }
});


