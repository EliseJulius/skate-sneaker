
// Khởi chạy các chức năng
handleUrlParameters();
handleFormValidation();

// 1. XỬ LÝ DỮ LIỆU TỪ TRANG CHI TIẾT SẢN PHẨM SANG
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Lấy thông tin từ URL
    const productName = urlParams.get('product'); 
    const productPrice = urlParams.get('price');
    const productImg = urlParams.get('img');
    const productSize = urlParams.get('size');
    const productColor = urlParams.get('color');

    const hasProductDiv = document.getElementById('has-product');
    const noProductDiv = document.getElementById('no-product');

    // Kiểm tra xem có dữ liệu sản phẩm hay không
    if (productName && hasProductDiv && noProductDiv) {
        hasProductDiv.style.display = 'block';
        noProductDiv.style.display = 'none';

        // Đổ dữ liệu vào cột Summary
        document.querySelector('.item-name').innerText = productName.replace(/-/g, ' ');
        document.querySelector('.item-price').innerText = '$' + productPrice;
        document.getElementById('subtotal-val').innerText = '$' + productPrice;
        
        // Tính tổng tiền (Giá + $18 ship)
        const total = parseFloat(productPrice) + 18;
        document.getElementById('total-val').innerText = '$' + total.toFixed(2);

        // Đổ ảnh và thông tin phụ
        if (productImg) document.getElementById('summary-img').src = productImg;
        document.getElementById('summary-meta').innerText = `Color: ${productColor || '--'} | Size: ${productSize || '--'}`;
    } else if (hasProductDiv && noProductDiv) {
        // Nếu không có sản phẩm (vào trực tiếp từ Header)
        hasProductDiv.style.display = 'none';
        noProductDiv.style.display = 'block';
    }
}

// 2. VALIDATE FORM ĐẶT HÀNG
function handleFormValidation() {
    const orderForm = document.getElementById('orderForm');
    
    if (!orderForm) return; // Nếu trang không có form này thì thoát để tránh lỗi

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Chặn việc load lại trang khi bấm gửi
        
        let isValid = true;
        const name = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email') ? document.getElementById('email').value.trim() : "";

        // Kiểm tra Họ tên: chỉ cho phép chữ và khoảng trắng
        // Hỗ trợ tiếng Việt có dấu
        const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
        if (!nameRegex.test(name)) {
            alert("Vui lòng nhập họ tên chỉ bao gồm chữ cái.");
            isValid = false;
        }

        // Kiểm tra Số điện thoại: Phải đủ 10 chữ số
        const phoneRegex = /^\d{10}$/;
        if (isValid && !phoneRegex.test(phone)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.");
            isValid = false;
        }

        // Kiểm tra Email (nếu có)
        if (isValid && email && !email.includes('@')) {
            alert("Địa chỉ email không đúng định dạng.");
            isValid = false;
        }

        // Nếu tất cả đều đúng
        if (isValid) {
    const submitBtn = this.querySelector('button[type="submit"]');
    const modal = document.getElementById('successModal');
    
    submitBtn.innerText = "PROCESSING...";
    submitBtn.disabled = true;

    setTimeout(() => {
        // Thay vì alert, ta hiện modal
        modal.style.display = 'flex';
        this.reset(); // Xóa form
        submitBtn.innerText = "SAVE & CONTINUE";
        submitBtn.disabled = false;
    }, 1000);
}

// Thêm sự kiện đóng modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('successModal').style.display = 'none';
};
    });
}

// TỰ ĐỘNG ACTIVE TAB TRÊN HEADER
function setActiveTab() {
    const currentPath = window.location.pathname.split("/").pop(); 
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Nếu tên file trong href khớp với URL hiện tại
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else if (currentPath === "" && linkPath === "index.html") {
            // Trường hợp trang chủ (đôi khi URL chỉ là /)
            link.classList.add('active');
        }
    });
}

// Gọi hàm ngay khi trang load
setActiveTab();