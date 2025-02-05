document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("categorySelect")) {
        loadCategoryDropdown();
        loadProductsByCategory(document.getElementById("categorySelect").value);
    }

    if (document.getElementById("productTitle")) {
        loadProductDetails();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ กำลังโหลดสินค้านำเสนอ...");
    if (typeof featuredProducts === "undefined") {
        console.error("❌ ไม่พบ featuredProducts ใน config.js");
        return;
    }
    loadFeaturedProducts();
});

/* 🚴‍♂️ โหลดสินค้านำเสนอ */
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById("featured-container");
    if (!featuredContainer) {
        console.error("❌ ไม่พบ #featured-container ใน index.html");
        return;
    }

    let allFeaturedProducts = [];

    // 🔄 ดึงสินค้าจาก products ที่มี `featured: true`
    for (const category in products) {
        const featuredItems = products[category].filter(product => product.featured);
        allFeaturedProducts = allFeaturedProducts.concat(featuredItems.map(p => ({ ...p, category })));
    }

    console.log("🔹 สินค้านำเสนอที่ดึงมา:", allFeaturedProducts);

    if (allFeaturedProducts.length === 0) {
        featuredContainer.innerHTML = "<p>❌ ไม่มีสินค้านำเสนอ</p>";
        return;
    }

    // 🔥 แสดงสินค้านำเสนอในหน้าเว็บ
    featuredContainer.innerHTML = allFeaturedProducts.map(product => `
        <div class="product">
            <img src="${product.images[0] || 'https://via.placeholder.com/250'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>💰 ${product.price.toLocaleString()} บาท</p>
            <a href="product.html?category=${product.category}&name=${encodeURIComponent(product.name)}" class="btn">ดูรายละเอียด</a>
        </div>
    `).join('');
}

function toggleFeatured(category, productName) {
    let updatedProducts = { ...products };

    // ค้นหาสินค้าที่ต้องการแก้ไข
    const productIndex = updatedProducts[category].findIndex(p => p.name === productName);
    if (productIndex === -1) return;

    // เปลี่ยนค่า featured
    updatedProducts[category][productIndex].featured = !updatedProducts[category][productIndex].featured;

    // บันทึกลง Local Storage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    console.log(`🔄 เปลี่ยนสินค้านำเสนอ: ${productName} เป็น ${updatedProducts[category][productIndex].featured}`);
    loadFeaturedProducts(); // โหลดใหม่เพื่ออัปเดตหน้าเว็บ
}


/* 📌 โหลด Dropdown หมวดหมู่ */
function loadCategoryDropdown() {
    const categorySelect = document.getElementById("categorySelect");
    if (!categorySelect) return;

    if (typeof categories === "undefined" || categories.length === 0) {
        console.error("❌ ไม่มีข้อมูลหมวดหมู่สินค้า");
        return;
    }

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.type;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });

    // โหลดสินค้าหมวดหมู่เริ่มต้น
    loadProductsByCategory(categorySelect.value);
}

/* 📌 เปลี่ยนหมวดหมู่สินค้า */
function changeCategory() {
    const selectedCategory = document.getElementById("categorySelect").value;
    loadProductsByCategory(selectedCategory);
}

async function loadProductsFromServer() {
    try {
        const response = await fetch("http://localhost:5000/get-products");
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("โหลดสินค้าล้มเหลว:", error);
        return {};
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const phoneLinks = document.querySelectorAll(".phone-link");

    phoneLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // ป้องกันการเปิดลิงก์โดยตรง
            const phoneNumber = this.getAttribute("href").replace("tel:", "");
            const confirmCall = confirm(`คุณต้องการโทรไปที่ ${phoneNumber} หรือไม่?`);

            if (confirmCall) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
    });
});

/* 🛒 โหลดสินค้าตามหมวดหมู่ */
function loadProductsByCategory(category) {
    const productContainer = document.getElementById("product-container");
    if (!productContainer) return;

    console.log(`🔎 กำลังโหลดสินค้าหมวดหมู่: ${category}`);

    // ตรวจสอบว่าหมวดหมู่มีสินค้าอยู่หรือไม่
    if (!products[category] || products[category].length === 0) {
        console.warn(`⚠️ ไม่มีสินค้าในหมวดหมู่ "${category}"`);
        productContainer.innerHTML = "<p>❌ ไม่มีสินค้าในหมวดหมู่นี้</p>";
        return;
    }

    // โหลดสินค้าลงใน HTML
    productContainer.innerHTML = products[category].map(product => `
        <div class="product">
            <img src="${product.images[0] || 'https://via.placeholder.com/250'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>💰 ${product.price.toLocaleString()} บาท</p>
            <a href="product.html?category=${category}&name=${encodeURIComponent(product.name)}" class="btn">ดูรายละเอียด</a>
        </div>
    `).join('');
}


/* 📌 โหลดรายละเอียดสินค้า */
function loadProductDetails() {
    toggleLoading(true);

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const productName = params.get("name");

    if (!category || !productName || !products[category]) {
        console.error("❌ หมวดหมู่สินค้าหรือชื่อสินค้าไม่ถูกต้อง");
        showErrorMessage("ไม่พบข้อมูลสินค้า");
        return;
    }

    const product = products[category].find(p => p.name === productName);
    if (!product) {
        console.error(`❌ ไม่พบสินค้า "${productName}" ในหมวดหมู่ "${category}"`);
        showErrorMessage("ไม่พบสินค้า");
        return;
    }

    // 🔹 อัปเดตข้อมูลสินค้า
    document.getElementById("productTitle").textContent = product.name;
    document.getElementById("productPrice").textContent = `💰 ${product.price.toLocaleString()} บาท`;
    document.getElementById("productDescription").textContent = product.description;

    const productImage = document.getElementById("productImage");
    productImage.src = product.images[0] || "https://via.placeholder.com/500x300?text=No+Image";
    productImage.onerror = () => productImage.src = "https://via.placeholder.com/500x300?text=No+Image";

    // 🔥 ถ้ามีตัวเลือกสี ให้แสดงปุ่มเปลี่ยนสี
    if (product.colors && product.colors.length > 0) {
        setupColorSelection(product);
    } else {
        document.getElementById("colorOptions").innerHTML = "<p>⚠️ ไม่มีตัวเลือกสีสำหรับสินค้านี้</p>";
    }

    console.log("✅ โหลดสินค้าสำเร็จ:", product);
    toggleLoading(false);
}




function changeColor(selectedColor) {
    const productImage = document.getElementById("productImage");
    const productTitle = document.getElementById("productTitle");
    const productPrice = document.getElementById("productPrice");
    const productDescription = document.getElementById("productDescription");

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const productName = params.get("name");

    if (!category || !productName || !products[category]) {
        console.error("❌ ไม่พบหมวดหมู่หรือชื่อสินค้า");
        return;
    }

    const product = products[category].find(p => p.name === productName);
    if (!product || !product.colorDetails || !product.colorDetails[selectedColor]) {
        console.warn(`⚠️ สี "${selectedColor}" ไม่มีในสินค้านี้`);
        return;
    }

    // อัปเดตรูปภาพสินค้า
    productImage.src = product.colorDetails[selectedColor].image || product.images[0];

    // อัปเดตรายละเอียดสินค้า
    productTitle.textContent = product.colorDetails[selectedColor].name || product.name;
    productPrice.textContent = `💰 ${product.colorDetails[selectedColor].price.toLocaleString()} บาท`;
    productDescription.textContent = product.colorDetails[selectedColor].description || product.description;

    // อัปเดตไฮไลต์สีที่เลือก
    document.querySelectorAll(".color-box").forEach(box => box.classList.remove("selected"));
    document.querySelector(`[data-color='${selectedColor}']`)?.classList.add("selected");
}




/* 📌 โหลดตัวเลือกสี */
function setupColorSelection(product) {
    const colorOptions = document.getElementById("colorOptions");
    if (!colorOptions) {
        console.error("❌ ไม่พบ #colorOptions ใน product.html");
        return;
    }

    if (!product.colors || product.colors.length === 0) {
        console.warn("⚠️ ไม่มีตัวเลือกสีสำหรับสินค้านี้");
        colorOptions.innerHTML = "<p>⚠️ ไม่มีตัวเลือกสี</p>";
        return;
    }

    colorOptions.innerHTML = product.colors.map(color => `
        <button class="color-box" data-color="${color}" 
                style="background-color: ${colorToHex(color)};" 
                onclick="changeColor('${color}')">${color}</button>
    `).join('');
}




/* 🔘 เปลี่ยนแท็บ */
function openTab(event, tabName) {
    const tabContents = document.querySelectorAll(".tab-content");
    const tabButtons = document.querySelectorAll(".tab-button");

    tabContents.forEach(tab => tab.classList.remove("active"));
    tabButtons.forEach(button => button.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

/* 🔄 ควบคุม `Loading Screen` */
function toggleLoading(show) {
    const loadingScreen = document.getElementById("loading-screen");
    if (!loadingScreen) return;
    loadingScreen.style.display = show ? "block" : "none";
}

/* 🔙 ปุ่มย้อนกลับ */
function goBack() {
    window.history.back();
}

/* 🎨 แปลงชื่อสีเป็น HEX */
function colorToHex(color) {
    const colorMap = {
        "แดง": "#FF0000", "น้ำเงิน": "#0000FF", "ดำ": "#000000",
        "ขาว": "#FFFFFF", "เขียว": "#008000", "เทา": "#808080"
    };
    return colorMap[color] || color;
}
