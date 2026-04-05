const API = "http://localhost:5000";

/* TOGGLE UI */

function showLogin() {
  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("signupBox").classList.add("hidden");
}

function showSignup() {
  document.getElementById("signupBox").classList.remove("hidden");
  document.getElementById("loginBox").classList.add("hidden");
}

/* AUTH */

async function signup() {
  await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: document.getElementById("signupName").value,
      email: document.getElementById("signupEmail").value,
      password: document.getElementById("signupPassword").value,
      role: document.getElementById("signupRole").value
    })
  });

  alert("Signup successful");
  showLogin();
}

async function login() {
  const role = document.getElementById("loginRole").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    })
  });

  if (res.status !== 200) {
    alert("Login failed");
    return;
  }

  const data = await res.json();
  const tokenData = JSON.parse(atob(data.token.split('.')[1]));

  if (tokenData.role !== role) {
    alert("Role mismatch");
    return;
  }

  localStorage.setItem("token", data.token);
  window.location = "dashboard.html";
}
