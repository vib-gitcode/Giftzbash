document.getElementById("seller-form").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("https://giftsbash.onrender.com/api/users")
    .then(res => res.json())
    .then(users => {
      const seller = users.find(
        u => u.username.toLowerCase() === username.toLowerCase() &&
             u.password === password &&
             u.role === "seller"
      );

      if (seller) {
        alert(`Welcome, ${seller.username}! Redirecting...`);
        window.location.href = "seller-dashboard.html";
      } else {
        alert("❌ Invalid seller credentials.");
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      alert("⚠️ Could not reach the server. Try again.");
    });
});
