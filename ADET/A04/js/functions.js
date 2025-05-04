let currentReceipt = [];
var total = 0;

function loadCategories() {
    var categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = "";
    products.forEach(function(product, index) {
        categoriesContainer.innerHTML += `
            <div onclick="loadProducts('${index}')" class="card mx-1 custom-button p-3 text-center">
                <small>${product.category}</small>
            </div>
        `;
    });
}

function loadProducts(categoryIndex) {
    var maincontainer = document.getElementById("maincontainer");
    maincontainer.innerHTML = "";

    products[categoryIndex].contents.forEach(function(content, productIndex) {
        var sizesHtml = "";

        if (content.sizes && content.sizes.length > 0) {
            sizesHtml += `<select class="form-select my-1" id="size-${categoryIndex}-${productIndex}" onchange="updatePrice(${categoryIndex}, ${productIndex})">`;
            content.sizes.forEach(function(size) {
                sizesHtml += `
                    <option value="${size.price}" data-size="${size.code}">
                        ${size.code} - ₱${size.price}
                    </option>`;
            });
            sizesHtml += `</select>`;
        }

        maincontainer.innerHTML += `
            <div class="card mx-1 my-2 custom-product-button content p-1 text-center">
                <img src="${content.image}" style="width:100px; height:100px;">
                <small>${content.name}</small>
                ${sizesHtml}
                <button onclick="handleAdd(${categoryIndex}, ${productIndex})">Add</button>
            </div>
        `;
    });
}

function handleAdd(categoryIndex, productIndex) {
    var content = products[categoryIndex].contents[productIndex];
    var selectedSize = document.getElementById(`size-${categoryIndex}-${productIndex}`);
    
    var sizePrice = selectedSize ? selectedSize.value : content.price;
    var sizeCode = selectedSize ? selectedSize.options[selectedSize.selectedIndex].dataset.size : '';
    
    addToReceipt(sizePrice, content.code, content.name, sizeCode);
}

function addToReceipt(price, name, size) {
    var receiptContainer = document.getElementById("receipt");
    total = parseFloat(total) + parseFloat(price);
    totalValueElement = document.getElementById("totalValue");
    totalValueElement.innerHTML = total;

    currentReceipt.push({
      name: name,
      price: parseFloat(price),
      size: size
    });

    receiptContainer.innerHTML += `
        <div class="m-3 d-flex flex-row text-center justify-content-between">
            <div class="col-3 my-2"><small>${name}</small></div>
            <div class="col-3 my-2"><small>₱${price}</small></div>
            <div class="col-3 my-2"><small>${size}</small></div>
        </div>
    `;
}

function updatePrice(categoryIndex, productIndex) {
    var content = products[categoryIndex].contents[productIndex];
    var selectedSize = document.getElementById(`size-${categoryIndex}-${productIndex}`);
    
    var sizePrice = selectedSize ? selectedSize.value : content.price;
    console.log('Updated Price:', sizePrice);
}

function checkout() {
  if (currentReceipt.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let receiptText = "Order Summary:\n\n";
  currentReceipt.forEach(function(item) {
    receiptText += `${item.name} (${item.size}) - ₱${item.price}\n`;
  });

  receiptText += `\nTOTAL: ₱${total}`;

  alert(receiptText); 

  clearReceipt();
}

function clearReceipt() {
currentReceipt = [];
total = 0;
document.getElementById("receipt").innerHTML = "";
document.getElementById("totalValue").innerText = "0";
}

window.onload = function() {
  loadCategories();
  loadProducts(0);
};
