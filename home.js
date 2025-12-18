// Quản lý trạng thái các slider
const sliderStates = {
    'slider-left': 0,
    'slider-right': 0,
    'slider-hot': 0
};

/**
 * Hàm điều khiển lướt ảnh cho tất cả các slider
 * @param {string} sliderId - ID của vùng chứa slider
 */
function moveSlider(sliderId) {
    const container = document.getElementById(sliderId);
    const slides = container.querySelector('.slides');
    const dots = container.querySelectorAll('.dot');
    const totalSlides = dots.length;

    // Tăng index
    sliderStates[sliderId] = (sliderStates[sliderId] + 1) % totalSlides;
    const currentIndex = sliderStates[sliderId];

    // Di chuyển slide (dịch chuyển theo %)
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Cập nhật dấu chấm (dots)
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/**
 * Hiệu ứng Pop-up/Fade-in khi cuộn chuột
 */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach(element => {
        const revealTop = element.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Lắng nghe sự kiện cuộn chuột
window.addEventListener('scroll', revealOnScroll);

// Kích hoạt lần đầu khi vừa tải trang
window.addEventListener('load', () => {
    revealOnScroll();
});