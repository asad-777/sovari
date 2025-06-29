if (window.location.pathname.includes("/index.html")) {
  const images = [
    "https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp",
    "https://img.freepik.com/premium-photo/gradient-powerpoint-background-corporate-presentation_167709-225.jpg?semt=ais_hybrid&w=740",
    "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg",
  ];

  let current = 0;
  const hero = document.getElementById("hero");

  function animateSlide() {
    // Reset slide to right off-screen
    hero.classList.remove("slide-active");
    hero.classList.add("slide-enter");

    // Force reflow to trigger transition
    void hero.offsetWidth;

    // Set background and slide in
    hero.style.backgroundImage = `url(${images[current]})`;
    hero.classList.remove("slide-enter");
    hero.classList.add("slide-active");
  }

  function slideRight() {
    current = (current + 1) % images.length;
    animateSlide();
  }

  function slideLeft() {
    current = (current - 1 + images.length) % images.length;
    animateSlide();
  }

  // Initial load
  hero.style.backgroundImage = `url(${images[current]})`;
  hero.classList.add("slide-active");

  // Auto slide
  setInterval(slideRight, 5000);
  document
    .getElementById("left-btn-slide")
    .addEventListener("click", slideLeft);
  document
    .getElementById("right-btn-slide")
    .addEventListener("click", slideRight);
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
          window.location.href = `/product.html?id=${product.id}`;
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

// Only run on product.html
if (window.location.pathname.includes("product.html")) {
  const params = new URLSearchParams(location.search);
  const productId = parseInt(params.get("id"));
  const product = productManager.products.find((p) => p.id === productId);

  const sizeInput = document.getElementById("productSize");
  const qtyInput = document.getElementById("quantity");
  let size_according_price = 0;
  const updatePriceDisplay = () => {
    const selectedSize = sizeInput.value;
    const quantity = parseInt(qtyInput.value) || 1;

    if (!selectedSize || !product) return;

    if (selectedSize === "Small") size_according_price = 0;
    else if (selectedSize === "Medium") size_according_price = 1;
    else if (selectedSize === "Large") size_according_price = 2;
    else return;

    const unitPrice = product.price[size_according_price];
    const total = unitPrice * quantity;

    document.getElementById("price_id").innerHTML = `Pkr ${total}`;
  };
  // Event listeners
  sizeInput.addEventListener("change", updatePriceDisplay);
  qtyInput.addEventListener("input", updatePriceDisplay);

  document.getElementById("increase-qty").addEventListener("click", () => {
    const input = document.getElementById("quantity");
    let current = parseInt(input.value);
    if (current < 10) {
      input.value = current + 1;
      updatePriceDisplay();
    }
  });

  document.getElementById("decrease-qty").addEventListener("click", () => {
    const input = document.getElementById("quantity");
    let current = parseInt(input.value);
    if (current > 1) {
      input.value = current - 1;
      updatePriceDisplay();
    }
  });
  document.getElementById("title_id").innerHTML = product.name;
  document.getElementById("para_id").innerHTML = product.description;
  document.getElementById("image_id").src = product.image1;
  document.getElementById("image_id_1").src = product.image1;
  document.getElementById("image_id_2").src = product.image2;
  function change_to_1() {
    document.getElementById("image_id").src = product.image1;
  }
  function change_to_2() {
    document.getElementById("image_id").src = product.image2;
  }
  // go to order.html with this url
  function goToOrderPage() {
    const url = new URL("order.html", window.location.origin);
    url.searchParams.set("i", product.id);
    url.searchParams.set("s", size_according_price);
    url.searchParams.set("q", parseInt(qtyInput.value));
    window.location.href = url.toString();
  }
}

// date for the order.html
if (window.location.pathname.includes("/order.html")) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const today = new Date().toLocaleDateString("en-GB", options);

  document.getElementById("current-date").innerHTML = today;
}

// Only run on product.html
if (window.location.pathname.includes("order.html")) {
  const params = new URLSearchParams(location.search);
  const productId = parseInt(params.get("i"));
  const productSize = parseInt(params.get("s"));
  const productQuantity = parseInt(params.get("q"));
  const product = productManager.products.find((p) => p.id === productId);
  document.getElementById("productName").value = product.name;
  let size = "";
  if (productSize === 0) size = "Small";
  else if (productSize === 1) size = "Medium";
  else if (productSize === 2) size = "Large";
  document.getElementById("productSize").value = size;
  document.getElementById("productQuantity").value = productQuantity;
  document.getElementById("productPrice").value = `PKR ${
    product.price[productSize] * productQuantity
  }`;
  document.getElementById("subtotal").innerHTML = `PKR ${
    product.price[productSize] * productQuantity
  }`;
  document.getElementById("total").innerHTML = `PKR ${
    product.price[productSize] * productQuantity
  }`;
  const random4Digit = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("order-number").innerHTML = `SV-25-${random4Digit}`;
  document.getElementById("receipt-items").innerHTML = `
  <span>${product.name}</span>
  <span> - </span>
  <span>Size/${size}</span>
  <span> - </span>
  <span>Quantity/${productQuantity}</span>
  <span> - </span>
  <span>Price = ${product.price[productSize]}</span>`;
  document.getElementById(
    "order-form"
  ).action = `https://formspree.io/f/xblyqbdw`;
}
