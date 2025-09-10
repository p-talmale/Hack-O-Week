let cart = [];
let cartTotal = 0;

// Selectors
const cartIcon = document.querySelector(".fa-shopping-cart");
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsDiv = document.getElementById("cartItems");
const cartTotalP = document.getElementById("cartTotal");
const closeCartBtn = document.getElementById("closeCart");

// Add to Cart Buttons
document.querySelectorAll(".product button").forEach((button, index) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const name = product.querySelector("h3").innerText;
    const price = parseInt(product.querySelector("p").innerText.replace("₹",""));
    const imgSrc = product.querySelector("img").src;

    // Add to cart array
    cart.push({ name, price, imgSrc });
    cartTotal += price;

    // Update UI
    updateCartUI();
  });
});

// Update Cart UI
function updateCartUI() {
  cartItemsDiv.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}">
      <span>${item.name} - ₹${item.price}</span>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartTotalP.innerText = "Total: ₹" + cartTotal;

  // Update count badge on cart icon
  cartIcon.setAttribute("data-count", cart.length);
}

// Open / Close Cart
cartIcon.addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartIcon = document.querySelector(".fa-shopping-cart");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  let cart = [];

  // Open cart
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
  });

  // Close cart
  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
  });

  // Add to cart
  document.querySelectorAll(".product button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.parentElement;
      const name = product.querySelector("h3").innerText;
      const price = parseInt(product.querySelector("p").innerText.replace("₹", ""));
      const imgSrc = product.querySelector("img").src;

      cart.push({ name, price, imgSrc });
      updateCart();
    });
  });

  // Update cart display
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      cartItems.appendChild(div);
    });

    cartTotal.innerText = `Total: ₹${total}`;

    // Add Buy button once
    if (!document.getElementById("buyNow")) {
      const buyBtn = document.createElement("button");
      buyBtn.id = "buyNow";
      buyBtn.innerText = "Buy Now";
      cartSidebar.appendChild(buyBtn);

      buyBtn.addEventListener("click", () => {
        if (cart.length === 0) {
          alert("Your cart is empty!");
        } else {
          alert("Thank you for your purchase 🎉");
          cart = [];
          updateCart();
        }
      });
    }

    // Remove items
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
      });
    });
  }
});