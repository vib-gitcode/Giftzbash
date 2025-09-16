function loadProducts() {
  fetch('https://giftsbash.onrender.com/api/products')
    .then(res => res.json())
    .then(products => {
      const list = document.getElementById("product-list");
      if (products.length === 0) {
        list.innerHTML = "<p>No products yet.</p>";
        return;
      }
      list.innerHTML = "";
      products.forEach((p, i) => {
        const div = document.createElement("div");
        div.textContent = `${p.name} – $${p.price}`;
        list.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error loading products:", err);
    });
}

document.getElementById("add-product-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;

  fetch('https://giftsbash.onrender.com/api/add-product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadProducts();
  })
  .catch(err => {
    console.error("Error adding product:", err);
    alert("Failed to add product.");
  });
});

loadProducts();
