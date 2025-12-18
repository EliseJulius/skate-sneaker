document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const name = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;

    
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!nameRegex.test(name)) {
        alert("Họ tên không hợp lệ (chỉ được nhập chữ).");
        isValid = false;
    }

  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại phải bao gồm đúng 10 chữ số.");
        isValid = false;
    }

    if (isValid) {
        alert("🎉 Đặt hàng thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.");
        this.reset(); 
    }
});


const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('product');
const productPrice = urlParams.get('price');

if (productName) {

    document.getElementById('model').value = productName.replace(/-/g, ' ');
 
    document.querySelector('.item-name').innerText = productName.replace(/-/g, ' ');
    document.querySelector('.item-price').innerText = '$' + productPrice;
    document.querySelector('.total-price').innerText = '$' + (parseFloat(productPrice) + 18);
}