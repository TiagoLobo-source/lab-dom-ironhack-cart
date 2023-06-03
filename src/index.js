//ITERATION 1

// ITERATION 1
function updateSubtotal(product) {
  const priceElm = product.querySelector(".price span").innerText;
  const quantityElm = product.querySelector(".quantity input").value;
  const subtotal = Number(priceElm) * Number(quantityElm);

  const subtotalElm = product.querySelector(".subtotal span");

  subtotalElm.innerText = subtotal;
  return subtotal;
}

function calculateAll() {
  // ITERATION 2
  const allProducts = document.getElementsByClassName("product");
  const productsCopy = [...allProducts];
  let total = 0;
  productsCopy.forEach((product) => (total += updateSubtotal(product)));

  // ITERATION 3
  const totalElm = document.querySelector("#total-value span");
  totalElm.innerText = total;
}

//// ITERATION 4
function removeProduct(button) {
  const row = button.parentNode.parentNode;
  row.remove();
  calculateAll();
}

//ITERATION 5
function createProduct() {
  const productNameInput = document.querySelector(
    '.create-product input[placeholder="Product Name"]'
  );
  const productPriceInput = document.querySelector(
    '.create-product input[placeholder="Product Price"]'
  );
  const productName = productNameInput.value;
  const productPrice = parseFloat(productPriceInput.value).toFixed(2);

  if (productName && productPrice) {
    const tableBody = document.querySelector("#cart tbody");
    const newRow = document.createElement("tr");
    newRow.classList.add("product");

    newRow.innerHTML = `
      <td class="name">
        <span>${productName}</span>
      </td>
      <td class="price">$<span>${productPrice}</span></td>
      <td class="quantity">
        <input type="number" value="0" min="0" placeholder="Quantity" />
      </td>
      <td class="subtotal">$<span>0</span></td>
      <td class="action">
        <button class="btn btn-remove">Remove</button>
      </td>
    `;

    tableBody.appendChild(newRow);

    productNameInput.value = "";
    productPriceInput.value = "0";

    const removeButton = newRow.querySelector(".btn-remove");
    removeButton.addEventListener("click", () => removeProduct(removeButton));

    calculateAll();
  } else {
    alert("Please enter a product name and price.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculate");
  calculateBtn.addEventListener("click", calculateAll);

  const createProductBtn = document.getElementById("create");
  createProductBtn.addEventListener("click", createProduct);

  const removeButtons = document.getElementsByClassName("btn-remove");
  Array.from(removeButtons).forEach((button) => {
    button.addEventListener("click", () => removeProduct(button));
  });
});
