document.addEventListener("DOMContentLoaded", () => {
  fetch('https://giftsbash.onrender.com/api/products')
    .then(res => res.json())
    .then(gifts => {
      const container = document.getElementById("gift-list");
      if (gifts.length === 0) {
        container.textContent = "No gifts available.";
        return;
      }
      gifts.forEach(g => {
        const div = document.createElement("div");
        div.textContent = `${g.name} – $${g.price}`;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error loading products:", err);
    });
});
