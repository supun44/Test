const products = [
  { id: 1, name: "Wireless Earbuds Pro", category: "Audio", price: 79 },
  { id: 2, name: "4K Action Camera", category: "Cameras", price: 129 },
  { id: 3, name: "Mechanical Keyboard", category: "Accessories", price: 99 },
  { id: 4, name: "Smart Home Hub", category: "Smart Home", price: 149 },
  { id: 5, name: "Portable SSD 1TB", category: "Storage", price: 109 },
  { id: 6, name: "Gaming Monitor 27\"", category: "Displays", price: 289 },
];

const cart = [];

const grid = document.getElementById("product-grid");
const search = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

function renderProducts(query = "") {
  grid.innerHTML = "";

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <span class="category">${product.category}</span>
      <h4>${product.name}</h4>
      <span class="price">$${product.price}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    grid.appendChild(card);
  });

  if (!filtered.length) {
    grid.innerHTML = '<p>No products match your search.</p>';
  }
}

function updateCartCount() {
  cartCount.textContent = String(cart.length);
}

grid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const productId = Number(target.dataset.id);
  const selected = products.find((product) => product.id === productId);
  if (selected) {
    cart.push(selected);
    updateCartCount();
  }
});

search.addEventListener("input", (event) => {
  renderProducts(event.target.value);
});

renderProducts();
updateCartCount();
