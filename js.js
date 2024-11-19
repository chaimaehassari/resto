const products = [
    { id: "1", name: "Waffle", price: 6.50, imageUrl: "images/image-waffle-tablet.jpg" },
    { id: "2", name: "Creme Brulee", price: 7.00, imageUrl: "images/image-creme-brulee-desktop.jpg" },
    { id: "3", name: "Macaron", price: 8.00, imageUrl: "images/image-macaron-desktop.jpg" },
    { id: "4", name: "Tiramisu", price: 5.50, imageUrl: "images/image-tiramisu-desktop.jpg" },
    { id: "5", name: "Baklava", price: 4.00, imageUrl: "images/image-baklava-desktop.jpg" },
    { id: "6", name: "Pie", price: 5.50, imageUrl: "images/image-meringue-desktop.jpg" },
    { id: "7", name: "Cake", price: 4.50, imageUrl: "images/image-cake-desktop.jpg" },
    { id: "8", name: "Brownie", price: 5.50, imageUrl: "images/image-brownie-desktop.jpg" },
    { id: "9", name: "Panna Cotta", price: 6.50, imageUrl: "images/image-panna-cotta-desktop.jpg" }
  ];

  const cart = {};
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const productsContainer = document.getElementById("products-container");

  function updateCart() {
    cartItemsElement.innerHTML = "";
    let total = 0;

    for (const id in cart) {
      const item = cart[id];
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const listItem = document.createElement("li");
      listItem.textContent = `  ${item.quantity}x ${item.name}` ;
      cartItemsElement.appendChild(listItem);
    }

    cartTotalElement.textContent = total.toFixed(2);
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product", "p-4", "rounded-lg");

    productElement.dataset.id = product.id;
    productElement.dataset.price = product.price;

    productElement.innerHTML = `
      <img class="h-48 object-cover rounded-md mb-4" src="${product.imageUrl}" alt="${product.name}">
      <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
      <p class="text-lg font-bold mb-4">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart flex w-[7rem] h-[2rem] rounded-full bg-white text-xs justify-center items-center border-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
          <g fill="#C73B0F" clip-path="url(#a)">
            <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
            <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
          </g>
          <defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs>
        </svg> Add to Cart
      </button>
      <div class="quantity-controls flex w-[7rem] h-[2rem] rounded-full bg-white text-xs justify-center items-center border bg-orange-600" style="display: none;">
        <button class="decrease px-2 py-1 rounded-full bg-orange-600">−</button>
        <span class="quantity text-lg">1</span>
        <button class="increase px-2 py-1 rounded-full bg-orange-600">+</button>
      </div>
    `;

    productsContainer.appendChild(productElement);
    const addToCartButton = productElement.querySelector(".add-to-cart");
    const quantityControls = productElement.querySelector(".quantity-controls");
    const quantitySpan = productElement.querySelector(".quantity");
    const increaseButton = productElement.querySelector(".increase");
    const decreaseButton = productElement.querySelector(".decrease");

    addToCartButton.addEventListener("click", () => {
      if (!cart[product.id]) {
        cart[product.id] = { name: product.name, price: product.price, quantity: 1 };
      }
      addToCartButton.style.display = "none";
      quantityControls.style.display = "flex";
      updateCart();
    });

    increaseButton.addEventListener("click", () => {
      cart[product.id].quantity++;
      quantitySpan.textContent = cart[product.id].quantity;
      updateCart();
    });

    decreaseButton.addEventListener("click", () => {
      cart[product.id].quantity--;
      if (cart[product.id].quantity === 0) {
        delete cart[product.id];
        quantityControls.style.display = "none";
        addToCartButton.style.display = "inline-block";
      } else {
        quantitySpan.textContent = cart[product.id].quantity;
      }
      updateCart();
    });
  });