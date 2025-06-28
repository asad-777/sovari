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
        <span class="text-xl font-bold">PKR ${this.price}</span>
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
    "Black Minimal Tee",
    1499,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtXK3iH0UVyCtSM8VeaBoOBa4rFYij6SAylw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8cl_o_IQX4u_VYjBepbv0tXrOllZqD3byw&s",
    "Premium cotton black tee with minimal design."
  )
);

// Add more as needed...

productManager.renderAll();
