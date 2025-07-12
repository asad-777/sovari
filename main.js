if (
  window.location.pathname === "/" ||
  window.location.pathname.endsWith("/index.html")
) {
  let images = [];
  if (window.innerWidth > 768) {
    // Screen is tablet or desktop
    images = [
      "./images/IMG_111.png",
      "./images/IMG_112.png",
      "./images/IMG_113.png",
    ];
  } else {
    // Screen is mobile
    images = [
      "https://wallpapers.com/images/featured/f1-phone-m20bpwsc2e6qh7ti.jpg",
      "https://preview.redd.it/ferrari-f40-legacy-tour-wallpapers-for-mobile-phone-day-two-v0-qj8e6fe8uu3c1.jpg?width=640&crop=smart&auto=webp&s=225154fc12bffd7dcaae8fd2c0cd33864d6994da",
      "https://i.pinimg.com/originals/d7/5f/27/d75f272562ed36d562e283a4e7d94456.jpg",
    ];
  }

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
  constructor(id, name, price, images, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.images = images;
    this.description = description;
  }

  render() {
    return `
    <div
      class="bg-zinc-300/10 backdrop-blur-lg p-6 rounded-2xl shadow-md border-b border-2 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer max-w-xs"
      data-id="${this.id}"
    >
      <!-- Image hover switch -->
      <div class="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5">
        <img
          src="${this.images[0]}"
          alt="${this.name}"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
        />
        <img
          src="${this.images[1]}"
          alt="${this.name}"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        />
      </div>

      <!-- Product Text Info -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-black truncate">${this.name}</h3>
        <p class="text-sm text-gray-600 leading-snug h-12 overflow-hidden">${
          this.description
        }</p>
      </div>

      <!-- Pricing -->
      <div class="flex justify-between px-4 items-center mt-4">
        <span class="text-lg font-black text-lime-600">PKR ${
          this.price[0]
        }</span>
        <span class="text-sm line-through text-red-900">PKR ${
          this.price[0] + 350
        }</span>
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
    "BMW M4 Competition",
    [1799, 1799, 1799],
    [
      "./images/IMG_a1417.jpg",
      "./images/IMG_a1414.jpg",
      "./images/IMG_1524.JPG",
      "./images/IMG_1521.JPG",
    ],
    "180 gsm cotton fabric black down shoulder T-shirt baggy with BMW M4 Design"
  )
);

productManager.addProduct(
  new Product(
    2,
    "RedBull F1",
    [1799, 1799, 1799],
    [
      "./images/IMG_1441.JPG",
      "./images/IMG_1440.JPG",
      "./images/IMG_1529.JPG",
      "./images/IMG_1528.JPG",
    ],
    "180 gsm cotton fabric black down shoulder T-shirt baggy with F1 RedBull Design"
  )
);

productManager.addProduct(
  new Product(
    3,
    "Ferrari F40",
    [1799, 1799, 1799],
    [
      "./images/IMG_1458.JPG",
      "./images/IMG_1456.JPG",
      "./images/IMG_1519.JPG",
      "./images/IMG_1518.JPG",
    ],
    "180 gsm cotton fabric black down shoulder T-shirt baggy with Ferrari F40 Design"
  )
);
// Add more as needed...
if (
  window.location.pathname === "/" ||
  window.location.pathname.endsWith("/index.html")
) {
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
  document.getElementById("image_id").src = product.images[0];
  document.getElementById("image_id_1").src = product.images[0];
  document.getElementById("image_id_2").src = product.images[1];
  document.getElementById("image_id_3").src = product.images[2];
  document.getElementById("image_id_4").src = product.images[3];
  function change_to_1() {
    document.getElementById("image_id").src = product.images[0];
  }
  function change_to_2() {
    document.getElementById("image_id").src = product.images[1];
  }
  function change_to_3() {
    document.getElementById("image_id").src = product.images[2];
  }
  function change_to_4() {
    document.getElementById("image_id").src = product.images[3];
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
    product.price[productSize] * productQuantity + 150
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
  ).action = `https://formspree.io/f/mrbknowy`;
}
