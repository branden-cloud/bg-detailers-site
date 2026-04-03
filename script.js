document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const navLinks = document.querySelectorAll(".site-nav a");
    const sections = document.querySelectorAll("section[id]");
    const contactForm = document.querySelector(".contact-form");
    const footerYear = document.querySelector(".footer-year");
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");

    const baRange = document.querySelector("#ba-range");
    const baAfterImage = document.querySelector("#ba-after-image");
    const baHandle = document.querySelector("#ba-handle");

    const faqItems = document.querySelectorAll(".faq-item");
    const faqButtons = document.querySelectorAll(".faq-question");

    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    const handleHeaderScroll = () => {
        if (!header) return;

        if (window.scrollY > 16) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    handleHeaderScroll();
    window.addEventListener("scroll", handleHeaderScroll);

    const updateActiveNav = () => {
        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;

            if (href.startsWith("#")) {
                link.classList.remove("active");
                if (href === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            }
        });
    };

    if (sections.length > 0) {
        updateActiveNav();
        window.addEventListener("scroll", updateActiveNav);
    }

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) return;

        if (!href.startsWith("#") && href === currentPath) {
            link.classList.add("active");
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                if (siteNav && siteNav.classList.contains("open")) {
                    siteNav.classList.remove("open");
                    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
                }
                return;
            }

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();

            const headerOffset = header ? header.offsetHeight : 0;
            const targetPosition =
                target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });

            if (siteNav && siteNav.classList.contains("open")) {
                siteNav.classList.remove("open");
                if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", (event) => {
            const clickedInsideNav = siteNav.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideNav && !clickedToggle && siteNav.classList.contains("open")) {
                siteNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.ok) {
                    window.location.href = "thank-you.html";
                } else {
                    alert("Form submission failed. Please try again.");
                    console.error("Formspree response failed:", response.status);
                }
            } catch (error) {
                alert("Error submitting form.");
                console.error("Submit error:", error);
            }
        });
    }

    if (baRange && baAfterImage && baHandle) {
        const updateBeforeAfter = () => {
            const value = baRange.value;
            baAfterImage.style.width = `${value}%`;
            baHandle.style.left = `${value}%`;
        };

        baRange.addEventListener("input", updateBeforeAfter);
        updateBeforeAfter();
    }

    const sliders = document.querySelectorAll("[data-before-after]");

    sliders.forEach((slider) => {
        const range = slider.querySelector(".ba-range");
        const afterWrap = slider.querySelector(".ba-after-wrap");
        const handle = slider.querySelector(".ba-handle");

        if (!range || !afterWrap || !handle) return;

        const updateSlider = () => {
            const value = `${range.value}%`;
            afterWrap.style.width = value;
            handle.style.left = value;
        };

        range.addEventListener("input", updateSlider);
        updateSlider();
    });

    if (faqButtons.length > 0) {
        faqButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const faqItem = button.parentElement;

                faqItems.forEach((item) => {
                    if (item !== faqItem) {
                        item.classList.remove("active");
                    }
                });

                faqItem.classList.toggle("active");
            });
        });
    }

    const revealItems = document.querySelectorAll(
        ".service-card, .pricing-card, .why-point, .gallery-card, .gallery-showcase-card, .testimonial-card, .faq-item, .service-area-card, .contact-card, .review-feature-card, .trust-pill, .gallery-stat-card"
    );

    revealItems.forEach((item) => item.classList.add("reveal"));

    const revealOnScroll = () => {
        revealItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                item.classList.add("visible");
            }
        });
    };

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});