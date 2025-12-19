document.addEventListener('DOMContentLoaded', function() {
    handleUrlParameters();
    handleFormValidation();
    handleLiveUpdate();

    function formatVND(amount) {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
    }

    function handleLiveUpdate() {
        const sizeInputs = document.querySelectorAll('input[name="size"]');
        const colorInputs = document.querySelectorAll('input[name="color"]');
        const summaryMeta = document.getElementById('summary-meta');

        function updateMeta() {
            const selectedSize = document.querySelector('input[name="size"]:checked')?.value || '--';
            const selectedColor = document.querySelector('input[name="color"]:checked')?.value || '--';
            summaryMeta.innerText = `Color: ${selectedColor} | Size: ${selectedSize}`;
        }

        sizeInputs.forEach(input => {
            input.addEventListener('change', updateMeta);
        });

        colorInputs.forEach(input => {
            input.addEventListener('change', updateMeta);
        });
    }

    function handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product'); 
        const productPrice = parseFloat(urlParams.get('price')) || 0;
        const productImg = urlParams.get('img');
        const productSize = urlParams.get('size');
        const productColor = urlParams.get('color');

        const hasProductDiv = document.getElementById('has-product');
        const noProductDiv = document.getElementById('no-product');

        if (productName && hasProductDiv) {
            hasProductDiv.style.display = 'block';
            noProductDiv.style.display = 'none';

            const shippingFee = 30000;
            const total = productPrice + shippingFee;

            document.getElementById('summary-name').innerText = productName;
            document.getElementById('summary-price').innerText = formatVND(productPrice);
            document.getElementById('subtotal-val').innerText = formatVND(productPrice);
            document.getElementById('total-val').innerText = formatVND(total);

            if (productImg) document.getElementById('summary-img').src = productImg;
            
            document.getElementById('summary-meta').innerText = `Color: ${productColor || '--'} | Size: ${productSize || '--'}`;

            if (productSize) {
                const sizeInput = document.querySelector(`input[name="size"][value="${productSize}"]`);
                if (sizeInput) sizeInput.checked = true;
            }
            if (productColor) {
                const colorInput = document.querySelector(`input[name="color"][value="${productColor}"]`);
                if (colorInput) colorInput.checked = true;
            }
        } else {
            if(hasProductDiv) hasProductDiv.style.display = 'none';
            if(noProductDiv) noProductDiv.style.display = 'block';
        }
    }

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

            const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
            if (!nameRegex.test(name)) {
                alert("Vui lòng nhập họ tên hợp lệ.");
                isValid = false;
            }

            const phoneRegex = /^\d{10}$/;
            if (isValid && !phoneRegex.test(phone)) {
                alert("Số điện thoại không hợp lệ (phải có 10 số).");
                isValid = false;
            }

            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                submitBtn.innerText = "ĐANG XỬ LÝ...";
                submitBtn.disabled = true;

                setTimeout(() => {
                    if(modal) modal.style.display = 'flex';
                    this.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });

        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
                window.location.href = 'san-pham.html';
            };
        }
    }
});