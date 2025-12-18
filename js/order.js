
document.addEventListener('DOMContentLoaded', function() {
    handleUrlParameters();
    handleFormValidation();

    // 1. XỬ LÝ DỮ LIỆU TỪ TRANG CHI TIẾT SẢN PHẨM SANG
    function handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        const productName = urlParams.get('product'); 
        const productPrice = urlParams.get('price');
        const productImg = urlParams.get('img');
        const productSize = urlParams.get('size');
        const productColor = urlParams.get('color');

        const hasProductDiv = document.getElementById('has-product');
        const noProductDiv = document.getElementById('no-product');

        if (productName && hasProductDiv && noProductDiv) {
            hasProductDiv.style.display = 'block';
            noProductDiv.style.display = 'none';

            document.querySelector('.item-name').innerText = productName.replace(/-/g, ' ');
            document.querySelector('.item-price').innerText = '$' + productPrice;
            document.getElementById('subtotal-val').innerText = '$' + productPrice;
            
            const total = parseFloat(productPrice) + 18;
            document.getElementById('total-val').innerText = '$' + total.toFixed(2);

            if (productImg) document.getElementById('summary-img').src = productImg;
            document.getElementById('summary-meta').innerText = `Color: ${productColor || '--'} | Size: ${productSize || '--'}`;
        } else if (hasProductDiv && noProductDiv) {
            hasProductDiv.style.display = 'none';
            noProductDiv.style.display = 'block';
        }
    }

    // 2. VALIDATE FORM ĐẶT HÀNG
    function handleFormValidation() {
        const orderForm = document.getElementById('orderForm');
        const modal = document.getElementById('successModal');
        const closeBtn = document.getElementById('closeModal');
        
        if (!orderForm) return;

        orderForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            let isValid = true;
            const name = document.getElementById('fullname').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email') ? document.getElementById('email').value.trim() : "";

            const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
            if (!nameRegex.test(name)) {
                alert("Vui lòng nhập họ tên chỉ bao gồm chữ cái.");
                isValid = false;
            }

            const phoneRegex = /^\d{10}$/;
            if (isValid && !phoneRegex.test(phone)) {
                alert("Số điện thoại không hợp lệ (10 số).");
                isValid = false;
            }

            if (isValid && email && !email.includes('@')) {
                alert("Email không đúng định dạng.");
                isValid = false;
            }

            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.innerText = "PROCESSING...";
                submitBtn.disabled = true;

                setTimeout(() => {
                    if(modal) modal.style.display = 'flex';
                    this.reset();
                    submitBtn.innerText = "SAVE & CONTINUE";
                    submitBtn.disabled = false;
                }, 1000);
            }
        });

        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };
        }
    }
});