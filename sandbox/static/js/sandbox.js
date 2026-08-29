// Lenis Smooth Scroll
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Setup GSAP
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Feature 1: Magnetic Buttons
const magneticButtons = document.querySelectorAll('.magnetic-btn');
magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: "power2.out"
        });
        
        const btnText = btn.querySelector('.btn-text');
        if(btnText) {
            gsap.to(btnText, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
        const btnText = btn.querySelector('.btn-text');
        if(btnText) {
            gsap.to(btnText, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        }
    });
});

// Feature 2: Scroll-Bound Marquee
let currentScroll = 0;
let isScrollingDown = true;
let tween = gsap.to(".marquee-part", {
    xPercent: -100,
    repeat: -1,
    duration: 5,
    ease: "linear"
}).totalProgress(0.5);

gsap.set(".marquee-inner", { xPercent: -50 });

window.addEventListener("scroll", () => {
    if (window.pageYOffset > currentScroll) {
        isScrollingDown = true;
    } else {
        isScrollingDown = false;
    }
    
    // Add extra speed on scroll
    gsap.to(tween, {
        timeScale: (isScrollingDown ? 3 : -3),
        duration: 0.2
    });
    
    // Return to normal speed
    setTimeout(() => {
        gsap.to(tween, {
            timeScale: isScrollingDown ? 1 : -1,
            duration: 0.5
        });
    }, 200);
    
    currentScroll = window.pageYOffset;
});

// Feature 3: Parallax Media Reveal
gsap.to(".parallax-img", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// Feature 4: Hover Media Reveal
const hoverItems = document.querySelectorAll('.hover-item');
const revealImg = document.querySelector('.hover-reveal-img');

window.addEventListener('mousemove', (e) => {
    if(revealImg.style.opacity == 1) {
        gsap.to(revealImg, {
            x: e.clientX - 150, 
            y: e.clientY - 100, 
            duration: 0.2,
            ease: "power2.out"
        });
    }
});

hoverItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const bg = item.getAttribute('data-img');
        revealImg.style.backgroundImage = `url(${bg})`;
        revealImg.style.opacity = 1;
        gsap.set(revealImg, {
            x: e.clientX - 150,
            y: e.clientY - 100
        });
        gsap.to(revealImg, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    });
    item.addEventListener('mouseleave', () => {
        revealImg.style.opacity = 0;
        gsap.to(revealImg, {
            scale: 0.8,
            duration: 0.4,
            ease: "power2.out"
        });
    });
});
