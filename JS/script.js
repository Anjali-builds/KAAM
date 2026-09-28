
document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       MOBILE NAVIGATION
    =============================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }


    /* ===============================
       CUSTOMER REVIEW SLIDER
    =============================== */

    const viewport = document.querySelector(".review-viewport");
    const track = document.querySelector(".review-cards");
    const cards = track ? Array.from(track.children) : [];
    const previousButton = document.querySelector(".left-arrow");
    const nextButton = document.querySelector(".right-arrow");

    if (viewport && track && cards.length > 1) {

        const originalCards = cards.slice();
        originalCards.forEach(function (card) {
            track.appendChild(card.cloneNode(true));
        });

        let currentIndex = 0;
        let timer;
        let isAnimating = false;

        function getVisibleCards() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }

        function getStepWidth() {
            const firstCard = track.querySelector(".review-card");
            if (!firstCard) return 0;

            const cardWidth = firstCard.getBoundingClientRect().width;
            return cardWidth + 12;
        }

        function moveSlider(index, animate) {
            const visible = getVisibleCards();
            const maxIndex = originalCards.length;

            if (index >= maxIndex) {
                currentIndex = 0;
                track.style.transition = "none";
                track.style.transform = "translateX(0)";
                void track.offsetWidth;

                if (animate) {
                    currentIndex = 1;
                    track.style.transition = "transform .55s ease";
                    track.style.transform =
                        "translateX(-" + getStepWidth() + "px)";
                }
            } else {
                currentIndex = Math.max(0, index);
                track.style.transition = animate
                    ? "transform .55s ease"
                    : "none";
                track.style.transform =
                    "translateX(-" + (currentIndex * getStepWidth()) + "px)";
            }

            if (visible >= originalCards.length) {
                track.style.transform = "translateX(0)";
                currentIndex = 0;
            }
        }

        function nextSlide() {
            if (isAnimating) return;

            isAnimating = true;
            const step = getStepWidth();

            currentIndex += 1;

            track.style.transition = "transform .55s ease";
            track.style.transform =
                "translateX(-" + (currentIndex * step) + "px)";

            if (currentIndex === originalCards.length) {
                setTimeout(function () {
                    track.style.transition = "none";
                    currentIndex = 0;
                    track.style.transform = "translateX(0)";
                    void track.offsetWidth;
                    track.style.transition = "transform .55s ease";
                }, 560);
            }

            setTimeout(function () {
                isAnimating = false;
            }, 600);
        }

        function previousSlide() {
            if (isAnimating) return;

            if (currentIndex === 0) {
                track.style.transition = "none";
                currentIndex = originalCards.length;
                track.style.transform =
                    "translateX(-" + (currentIndex * getStepWidth()) + "px)";
                void track.offsetWidth;
            }

            isAnimating = true;
            currentIndex -= 1;

            track.style.transition = "transform .55s ease";
            track.style.transform =
                "translateX(-" + (currentIndex * getStepWidth()) + "px)";

            setTimeout(function () {
                isAnimating = false;
            }, 600);
        }

        function startAutoSlide() {
            clearInterval(timer);
            timer = setInterval(nextSlide, 3500);
        }

        function stopAutoSlide() {
            clearInterval(timer);
        }

        nextButton.addEventListener("click", function () {
            nextSlide();
            startAutoSlide();
        });

        previousButton.addEventListener("click", function () {
            previousSlide();
            startAutoSlide();
        });

        viewport.addEventListener("mouseenter", stopAutoSlide);
        viewport.addEventListener("mouseleave", startAutoSlide);

        window.addEventListener("resize", function () {
            currentIndex = 0;
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            startAutoSlide();
        });

        startAutoSlide();
    }


    /* ===============================
       FAQ ACCORDION
    =============================== */

    document.querySelectorAll(".faq-question").forEach(function (question) {

        question.addEventListener("click", function () {

            const item = question.closest(".faq-item");
            const isOpen = item.classList.contains("open");

            document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
                openItem.classList.remove("open");

                const openQuestion =
                    openItem.querySelector(".faq-question");

                if (openQuestion) {
                    openQuestion.setAttribute("aria-expanded", "false");
                }
            });

            if (!isOpen) {
                item.classList.add("open");
                question.setAttribute("aria-expanded", "true");
            }
        });

    });

});
