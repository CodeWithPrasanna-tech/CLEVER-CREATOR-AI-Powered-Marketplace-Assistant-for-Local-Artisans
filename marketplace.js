// Temporary Products Database
function getProductsDB() {
  let db = localStorage.getItem("productsDB");
  return db ? JSON.parse(db) : [];
}

function saveProductsDB(db) {
  localStorage.setItem("productsDB", JSON.stringify(db));
}

// Load Seller Dashboard
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Redirect if not logged in
if (!currentUser) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// SELLER DASHBOARD
const productForm = document.getElementById("productForm");
if (productForm && currentUser.role === "craftsman") {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const productName = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("imageURL").value || "https://via.placeholder.com/150";

    let products = getProductsDB();
    products.push({
      sellerEmail: currentUser.email,
      businessName: currentUser.businessName,
      productName,
      category,
      price,
      image
    });
    saveProductsDB(products);

    alert("✅ Product uploaded successfully!");
    productForm.reset();
    loadSellerProducts();
  });

  function loadSellerProducts() {
    const sellerProductsDiv = document.getElementById("sellerProducts");
    const products = getProductsDB().filter(p => p.sellerEmail === currentUser.email);
    sellerProductsDiv.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.productName}">
        <h3>${p.productName}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>
      </div>
    `).join('');
  }

  loadSellerProducts();
}

// BUYER MARKETPLACE
if (currentUser.role === "buyer") {
  window.location.href = "index.html"; // redirect buyers to index
}
