// Utility: get database from localStorage
function getDatabase() {
  let db = localStorage.getItem("usersDB");
  return db ? JSON.parse(db) : [];
}

// Utility: save database
function saveDatabase(db) {
  localStorage.setItem("usersDB", JSON.stringify(db));
}

// Register handler
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const role = document.getElementById("role").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!role || !email || !password) {
      alert("Please fill all required fields.");
      return;
    }

    let db = getDatabase();

    // Check duplicate email
    if (db.some(user => user.email === email)) {
      alert("Email already registered!");
      return;
    }

    let userData = { role, email, password };

    if (role === "craftsman") {
      userData.businessName = document.getElementById("businessName").value;
      userData.craftType = document.getElementById("craftType").value;
      userData.products = document.getElementById("craftProducts").value;
      userData.location = document.getElementById("craftLocation").value;
    } else if (role === "buyer") {
      userData.fullName = document.getElementById("buyerName").value;
      userData.preference = document.getElementById("buyerPreference").value;
      userData.location = document.getElementById("buyerLocation").value;
    }

    // Add to "database"
    db.push(userData);
    saveDatabase(db);

    alert("✅ Account created successfully!");
    window.location.href = "login.html";
  });
}

// Login handler
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let db = getDatabase();

    // Find user
    let foundUser = db.find(user => user.email === email && user.password === password);

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      alert(`🎉 Welcome back, ${foundUser.role === "craftsman" ? foundUser.businessName : foundUser.fullName || foundUser.email}!`);
      
      // ✅ Redirect to main marketplace page
      window.location.href = "index.html";
    } else {
      alert("❌ Invalid email or password.");
    }
  });
}

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Optional: protect index.html from unauthenticated access
if (window.location.pathname.endsWith("index.html")) {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("⚠️ Please login first!");
    window.location.href = "login.html";
  } else {
    // Optional: show welcome message
    document.addEventListener("DOMContentLoaded", () => {
      const header = document.querySelector("header h1");
      if (header) {
        header.textContent += ` - Welcome, ${currentUser.role === "craftsman" ? currentUser.businessName : currentUser.fullName}!`;
      }
    });
  }
}
