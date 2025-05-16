let currentReceipt = [];
var total = 0;
var categories = [];
var products = [];

const getAllCategories = async () => {
    fetch('http://localhost/WEBDEV AND APPDEV/JosephDanMaliza.github.io/ADET/A06/categories.php')
        .then(response => response.json())
        .then(data => {
            categories = data;
            loadCategories();
        });
};

const getAllProducts = async (categoryID) => {
    const categoryData = { categoryID: categoryID };

    fetch('http://localhost/WEBDEV AND APPDEV/JosephDanMaliza.github.io/ADET/A06/products.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
    })
    .then(response => response.json())
    .then(data => {
        products = data; 
        loadProducts();
    });
};

function loadCategories() {
    const categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = "";
    categories.forEach(function(category) {
        categoriesContainer.innerHTML += `
            <div onclick="getAllProducts(${category.categoryID})" class="card mx-1 custom-button p-3 text-center" style="cursor:pointer;">
                <small>${category.categoryName}</small>
            </div>
        `;
    });
}

function loadProducts() {
    const maincontainer = document.getElementById("maincontainer");
    maincontainer.innerHTML = "";

    products.forEach(function(product, index) {
        let sizesHtml = "";
        if (product.sizes && product.sizes.length > 0) {
            sizesHtml += `<select class="form-select my-1" id="size-${index}">`;
            product.sizes.forEach(function(size) {
                sizesHtml += `<option value="${size.price}" data-size="${size.sizeCode}">${size.sizeCode} - ₱${parseFloat(size.price).toFixed(2)}</option>`;
            });
            sizesHtml += `</select>`;
        }

        maincontainer.innerHTML += `
            <div class="card mx-1 my-2 custom-product-button content p-1 text-center">
                <img src="${product.image}" style="width:100px; height:100px;" alt="${product.name}">
                <small>${product.name}</small>
                ${sizesHtml}
                <button onclick="handleAdd(${index})">Add</button>
            </div>
        `;
    });
}

function handleAdd(productIndex) {
    const product = products[productIndex];
    const select = document.getElementById(`size-${productIndex}`);
    const price = select ? select.value : product.price;
    const sizeCode = select ? select.options[select.selectedIndex].dataset.size : '';
    addToReceipt(price, product.name, sizeCode);
}

function addToReceipt(price, name, size) {
    const receiptContainer = document.getElementById("receipt");
    total += parseFloat(price);
    document.getElementById("totalValue").innerText = total.toFixed(2);

    currentReceipt.push({ name, price: parseFloat(price), size });

    receiptContainer.innerHTML += `
        <div class="m-3 d-flex flex-row text-center justify-content-between">
            <div class="col-3 my-2"><small>${name}</small></div>
            <div class="col-3 my-2"><small>₱${parseFloat(price).toFixed(2)}</small></div>
            <div class="col-3 my-2"><small>${size}</small></div>
        </div>
    `;
}

function checkout() {
    if (currentReceipt.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let receiptText = "Order Summary:\n\n";
    currentReceipt.forEach(item => {
        receiptText += `${item.name} (${item.size}) - ₱${item.price.toFixed(2)}\n`;
    });

    receiptText += `\nTOTAL: ₱${total.toFixed(2)}`;

    alert(receiptText);
    clearReceipt();
}

function clearReceipt() {
    currentReceipt = [];
    total = 0;
    document.getElementById("receipt").innerHTML = "";
    document.getElementById("totalValue").innerText = "0.00";
}

window.onload = function() {
    getAllCategories();
};
