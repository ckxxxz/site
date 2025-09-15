document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 2000);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.header');
        if (parallax) {
            parallax.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const currentSlideElement = document.getElementById('current-slide');
    const totalSlidesElement = document.getElementById('total-slides');
    let currentSlide = 0;

    totalSlidesElement.textContent = totalSlides;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        currentSlideElement.textContent = index + 1;
    }

    showSlide(currentSlide);

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);

    // Яндекс Карты
    function initYandexMap() {
        if (typeof ymaps === 'undefined') {
            setTimeout(initYandexMap, 100);
            return;
        }

        ymaps.ready(function () {
            var map = new ymaps.Map('map-container', {
                center: [44.708764, 37.786914],
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            });

            var marker = new ymaps.Placemark([44.708764, 37.786914], {
                balloonContent: 'Набережная адмирала Серебрякова<br>Жемчужина Новороссийска',
                iconCaption: 'Набережная'
            }, {
                preset: 'islands#blueDotIcon',
                iconColor: '#1a6fb0'
            });

            map.geoObjects.add(marker);
            marker.balloon.open();

            var circle = new ymaps.Circle([
                [44.708764, 37.786914],
                150
            ], {
                balloonContent: "Зона набережной",
                fillColor: "#0a2a5f",
                fillOpacity: 0.2,
                strokeColor: "#1a6fb0",
                strokeOpacity: 0.8,
                strokeWidth: 2
            });

            map.geoObjects.add(circle);
        });
    }

    setTimeout(initYandexMap, 1000);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature, .fact-card, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const headerTitle = document.querySelector('.header-title');
    const originalText = headerTitle.textContent;
    headerTitle.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            headerTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            document.querySelector('.cta-container').style.opacity = '1';
            document.querySelector('.cta-container').style.transform = 'translateY(0)';
        }
    }
    
    document.querySelector('.cta-container').style.opacity = '0';
    document.querySelector('.cta-container').style.transform = 'translateY(20px)';
    document.querySelector('.cta-container').style.transition = 'all 0.5s ease';
    
    setTimeout(typeWriter, 1000);
});
