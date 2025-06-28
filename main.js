if (window.location.pathname.includes("/index.html")) {
  const images = [
    "https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp",
    "https://img.freepik.com/premium-photo/gradient-powerpoint-background-corporate-presentation_167709-225.jpg?semt=ais_hybrid&w=740",
    "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg",
  ];

  let current = 0;
  const hero = document.getElementById("hero");

  function updateBackground() {
    hero.style.backgroundImage = `url(${images[current]})`;
    current = (current + 1) % images.length;
  }

  updateBackground(); // Set initial
  setInterval(updateBackground, 3000);
}
class Product {
  constructor(id, name, price, image1, image2, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image1 = image1;
    this.image2 = image2;
    this.description = description;
  }

  render() {
    return `
    <div
      class="bg-white p-6 rounded-xl border border-zinc-300/20 shadow-lg hover:-translate-y-2 hover:border-4 hover:shadow-xl duration-300 group cursor-pointer"
      data-id="${this.id}"
    >
      <div class="relative w-full h-48 rounded-lg overflow-hidden mb-4">
        <img
          src="${this.image1}"
          alt="${this.name}"
          class="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
        />
        <img
          src="${this.image2}"
          alt="${this.name}"
          class="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />
      </div>
      <h3 class="text-xl font-bold mb-2">${this.name}</h3>
      <p class="text-gray-600 mb-4">${this.description}</p>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold">PKR ${this.price[0]}</span>
        <div
          class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-900 transition select-none "
        >
          Order Now
        </div>
      </div>
    </div>
  `;
  }
}

class ProductManager {
  constructor(containerId) {
    this.products = [];
    this.container = document.getElementById(containerId);
  }

  addProduct(product) {
    this.products.push(product);
  }

  renderAll() {
    this.container.innerHTML = this.products.map((p) => p.render()).join("");

    // Add click listeners to each product card
    this.products.forEach((product) => {
      const card = this.container.querySelector(`[data-id="${product.id}"]`);
      if (card) {
        card.addEventListener("click", () => {
          window.location.href = `/order.html?id=${product.id}`;
        });
      }
    });
  }
}

const productManager = new ProductManager("product-list");

productManager.addProduct(
  new Product(
    1,
    "Black Nigga",
    [1000, 1400, 1500],
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtXK3iH0UVyCtSM8VeaBoOBa4rFYij6SAylw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8cl_o_IQX4u_VYjBepbv0tXrOllZqD3byw&s",
    "Premium 2pac inspired nigger for sale"
  )
);

// Add more as needed...
if (window.location.pathname.includes("/index.html")) {
  productManager.renderAll();
}
// date for the order.html
if (window.location.pathname.includes("/order.html")) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const today = new Date().toLocaleDateString("en-GB", options);

  document.getElementById("current-date").innerHTML = today;
}

// Only run on order.html
if (window.location.pathname.includes("order.html")) {
  const params = new URLSearchParams(location.search);
  const productId = parseInt(params.get("id"));
  const product = productManager.products.find((p) => p.id === productId);

  const sizeInput = document.getElementById("productSize");
  const qtyInput = document.getElementById("quantity");
  const priceInput = document.getElementById("productPrice");
  document.getElementById("receipt-items").innerHTML = `
      <div class="flex justify-between items-center gap-4 w-full text-sm border-b">
      <i class="fa-solid fa-arrow-right"></i>
        <span>  ${product.name}</span> - 
        <span>Please Select</span> - 
        <span>1</span>
        <span>PKR 0.0</span>
      </div>
    `;

  const updatePriceDisplay = () => {
    const selectedSize = sizeInput.value;
    const quantity = parseInt(qtyInput.value) || 1;

    if (!selectedSize || !product) return;

    let size_according_price = 0;
    if (selectedSize === "Small") size_according_price = 0;
    else if (selectedSize === "Medium") size_according_price = 1;
    else if (selectedSize === "Large") size_according_price = 2;
    else return;

    const unitPrice = product.price[size_according_price];
    const total = unitPrice * quantity;

    priceInput.value = total;

    document.getElementById("receipt-items").innerHTML = `
      <div class="flex justify-between gap-4 w-full text-sm">
        <span>${product.name}</span> - 
        <span>${selectedSize}</span> - 
        <span>${quantity}</span>
        <span>PKR ${total}</span>
      </div>
    `;

    document.getElementById("subtotal").innerText = `PKR ${total}`;
    document.getElementById("total").innerText = `PKR ${total}`;
  };

  if (product) {
    document.getElementById("productName").value = product.name;
    document.getElementById("order-number").innerText = Math.floor(
      10000 + Math.random() * 90000
    );

    // Event listeners
    sizeInput.addEventListener("change", updatePriceDisplay);
    qtyInput.addEventListener("input", updatePriceDisplay);

    // Optional: initialize if a default size is preselected
    if (sizeInput.value) updatePriceDisplay();
  }
  document.getElementById("increase-qty").addEventListener("click", () => {
    const input = document.getElementById("quantity");
    let current = parseInt(input.value);
    if (current < 10) {
      input.value = current + 1;
      updatePriceDisplay(); // 👈 trigger update manually
    }
  });

  document.getElementById("decrease-qty").addEventListener("click", () => {
    const input = document.getElementById("quantity");
    let current = parseInt(input.value);
    if (current > 1) {
      input.value = current - 1;
      updatePriceDisplay(); // 👈 trigger update manually
    }
  });
}
