document.addEventListener('DOMContentLoaded', function() {
    // TỰ ĐỘNG ACTIVE TAB TRÊN HEADER
    function setActiveTab() {
        // Lấy tên file hiện tại, ví dụ: "contact.html"
        const currentPath = window.location.pathname.split("/").pop(); 
        const navLinks = document.querySelectorAll('header nav a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Xóa class active cũ nếu có
            link.classList.remove('active');

            // Nếu tên file khớp hoặc trường hợp trang chủ
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else if ((currentPath === "" || currentPath === "index.html") && linkPath === "index.html") {
                link.classList.add('active');
            }
        });
    }

    setActiveTab();
});