document.getElementById("seller-form").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("https://giftsbash.onrender.com/api/users")
    .then(res => res.json())
    .then(users => {
      const seller = users.find(
        u => u.username === username && u.password === password && u.role === "seller"
      );
      if (seller) {
        alert("Login successful! Redirecting to Seller Dashboard...");
        window.location.href = "seller-dashboard.html";
      } else {
        alert("Invalid credentials.");
      }
    })
    .catch(err => {
      console.error("Error during login:", err);
      alert("Server error. Please try again later.");
    });
});
