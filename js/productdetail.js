document.getElementById('btn-order-now').addEventListener('click', function() {
    const name = document.querySelector('.product-title').innerText;
    const price = "120"; 
    const img = document.querySelector('.main-product-img').src;
    
    const size = document.querySelector('input[name="size"]:checked')?.value || "";
    const color = document.querySelector('input[name="color"]:checked')?.value || "";

    const url = `order.html?product=${encodeURIComponent(name)}&price=${price}&img=${encodeURIComponent(img)}&size=${size}&color=${color}`;

    window.location.href = url;
});

document.addEventListener('DOMContentLoaded', function() {
    const orderBtn = document.getElementById('btn-order-now');

    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            const name = document.querySelector('.p-detail-name').innerText;
            const priceRaw = document.querySelector('.p-detail-price').innerText;
            const img = document.querySelector('.detail-image-col img').src;


            const price = priceRaw.replace(/[^0-9]/g, '');

            const url = `order.html?product=${encodeURIComponent(name)}&price=${price}&img=${encodeURIComponent(img)}`;

            window.location.href = url;
        });
    }
});