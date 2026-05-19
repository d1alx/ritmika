// ========== SERIES DATA ==========
const seriesData = {
    core: {
        badge: "CORE SERIES",
        name: "CORE",
        tagline: "Твой первый серьёзный инструмент. Выглядит на миллион, играет легко — потому что создан для тех, кто начинает с лучшего.",
        features: [
            "Эргономичный гриф с сатиновым покрытием",
            "Звукосниматели РИТМИКА V1 — чистый и открытый звук",
            "Классические формы корпуса с современной эргономикой",
            "Стальные лады для долговечности",
            "Премиальная отделка и фурнитура"
        ],
        priceFrom: "18 990",
        priceTo: "64 990"
    },
    shred: {
        badge: "SHRED SERIES",
        name: "SHRED",
        tagline: "Для тех, кому тонкий гриф, мощный хамбакер и молниеносный отклик — не прихоть, а необходимость. Создан для металкора и скоростной игры.",
        features: [
            "Ультратонкий гриф 'Slim D' с компаунд-радиусом",
            "Звукосниматели РИТМИКА HG — плотный хай-гейн",
            "Агрессивный дизайн корпуса",
            "Облегчённый корпус с чемберингом",
            "Locking-колки и стальной тремоло-блок"
        ],
        priceFrom: "24 990",
        priceTo: "124 990"
    },
    apex: {
        badge: "APEX SERIES",
        name: "APEX",
        tagline: "Расширенный диапазон, мультимензура, минимальный вес. Для виртуозов, которые мыслят за пределами шести струн.",
        features: [
            "7- и 8-струнные модели",
            "Мультимензура для идеальной интонации",
            "Звукосниматели РИТМИКА CL — кристальная точность",
            "Веерные лады из нержавеющей стали",
            "Карбоновые вставки для снижения веса"
        ],
        priceFrom: "89 990",
        priceTo: "159 990"
    }
};

// ========== PRODUCT DATA ==========
const products = [
    {
        id: 1, series: "core", name: "CORE C-6 Metallic Green",
        type: "Электрогитара · 6 струн", price: 18990, oldPrice: null,
        badge: "new", badgeText: "Новинка", image: "images/guitar-3.png"
    },
    {
        id: 2, series: "core", name: "CORE C-6 Classic Wine Red",
        type: "Полуакустическая · 6 струн", price: 29990, oldPrice: 74990,
        badge: "sale", badgeText: "Скидка", image: "images/guitar-5.png"
    },
    {
        id: 3, series: "shred", name: "SHRED EX-7 Arctic White",
        type: "Электрогитара · 7 струн", price: 124990, oldPrice: null,
        badge: "hit", badgeText: "Хит", image: "images/guitar-1.png"
    },
    {
        id: 4, series: "shred", name: "SHRED S-6 Stealth Black",
        type: "Суперстрат · 6 струн", price: 59990, oldPrice: 74990,
        badge: "sale", badgeText: "Скидка", image: "images/guitar-2.png"
    },
    {
        id: 5, series: "apex", name: "APEX A-8 MS Satin Black",
        type: "Суперстрат · 8 струн · Мультимензура", price: 89990, oldPrice: null,
        badge: null, badgeText: null, image: "images/guitar-4.png"
    }
];

// ========== STATE ==========
let cart = [];
let activeSeries = "core";

// ========== HELPERS ==========
function formatPrice(p) {
    return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

// ========== RENDER SERIES ==========
function renderSeries(key) {
    activeSeries = key;
    const s = seriesData[key];
    const prods = products.filter(p => p.series === key);
    const container = document.getElementById("series-content");

    container.innerHTML = `
        <div class="series__info anim visible">
            <span class="series__badge">${s.badge}</span>
            <h3 class="series__name">РИТМИКА ${s.name}</h3>
            <p class="series__tagline">${s.tagline}</p>
            <ul class="series__features">
                ${s.features.map(f => `<li>${f}</li>`).join("")}
            </ul>
            <p class="series__price-range">от <strong>${s.priceFrom} ₽</strong> до ${s.priceTo} ₽</p>
            <a href="#contact" class="btn btn--primary btn--sm">Заказать консультацию</a>
        </div>
        <div class="series__products">
            ${prods.map(p => renderProductCard(p)).join("")}
        </div>
    `;

    // observe new anim elements
    container.querySelectorAll(".anim").forEach(el => observer.observe(el));
}

function renderProductCard(p) {
    return `
        <div class="product-card anim visible">
            ${p.badge ? `<span class="product-card__badge product-card__badge--${p.badge}">${p.badgeText}</span>` : ""}
            <div class="product-card__image">
                <img src="${p.image}" alt="РИТМИКА ${p.name}"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="product-card__image-placeholder" style="display:none;font-size:3.5rem;align-items:center;justify-content:center;width:100%;height:100%;position:absolute;inset:0">🎸</div>
            </div>
            <div class="product-card__info">
                <div class="product-card__series">${seriesData[p.series].badge}</div>
                <div class="product-card__name">${p.name}</div>
                <div class="product-card__type">${p.type}</div>
                <div class="product-card__footer">
                    <div>
                        <span class="product-card__price">${formatPrice(p.price)}</span>
                        ${p.oldPrice ? `<span class="product-card__old-price">${formatPrice(p.oldPrice)}</span>` : ""}
                    </div>
                    <button class="product-card__cart-btn ${cart.includes(p.id) ? 'added' : ''}"
                            onclick="toggleCart(${p.id}, this)" aria-label="В корзину">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ========== CART ==========
function toggleCart(id, btn) {
    const idx = cart.indexOf(id);
    if (idx > -1) { cart.splice(idx, 1); btn.classList.remove("added"); showToast("Товар убран из корзины"); }
    else { cart.push(id); btn.classList.add("added"); showToast("Товар добавлен в корзину ✓"); }
    updateCartCount();
}
function updateCartCount() {
    const el = document.getElementById("cart-count");
    el.textContent = cart.length;
    el.classList.toggle("visible", cart.length > 0);
}

// ========== TOAST ==========
function showToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("visible");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("visible"), 2500);
}

// ========== HEADER SCROLL ==========
function handleHeaderScroll() {
    document.getElementById("header").classList.toggle("scrolled", window.scrollY > 60);
}

// ========== THEME TOGGLE ==========
function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const saved = localStorage.getItem("ritmika-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);

    toggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        if (next === "light") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
        localStorage.setItem("ritmika-theme", next);
    });
}

// ========== MOBILE MENU ==========
function initBurger() {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        nav.classList.toggle("open");
        document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
    });
    nav.querySelectorAll(".nav__link").forEach(link => {
        link.addEventListener("click", () => {
            burger.classList.remove("active");
            nav.classList.remove("open");
            document.body.style.overflow = "";
        });
    });
}

// ========== SERIES TABS ==========
function initSeriesTabs() {
    document.querySelectorAll(".series-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".series-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            renderSeries(tab.dataset.series);
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

function initAnimations() {
    document.querySelectorAll(".anim").forEach(el => observer.observe(el));
}

// ========== HERO BG PARTICLES ==========
function initHeroBg() {
    const wrap = document.getElementById("hero-bg");
    if (!wrap) return;
    const cvs = document.createElement("canvas");
    cvs.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none";
    wrap.appendChild(cvs);
    const ctx = cvs.getContext("2d");
    let w, h, pts = [];

    function resize() { w = cvs.width = wrap.offsetWidth; h = cvs.height = wrap.offsetHeight; }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 45; i++) {
        pts.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*2+.4, dx: (Math.random()-.5)*.25, dy: (Math.random()-.5)*.25, o: Math.random()*.35+.05 });
    }
    function getColor() {
        const s = getComputedStyle(document.documentElement);
        return { r: s.getPropertyValue('--particle-r')||220, g: s.getPropertyValue('--particle-g')||38, b: s.getPropertyValue('--particle-b')||38 };
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        const c = getColor();
        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
            ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${p.o})`;
            ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > w) p.dx *= -1;
            if (p.y < 0 || p.y > h) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// ========== FORM ==========
function initForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", e => {
        e.preventDefault();
        showToast("Заявка отправлена! Мы скоро свяжемся с вами ✓");
        form.reset();
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute("href"));
            if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

// ========== RIFF PLAYER (MP3) ==========
let riffPlaying = false;

function playRiff() {
    const audio = document.getElementById("riff-audio");
    const btn = document.getElementById("riff-btn");
    if (!audio || !btn) return;

    if (riffPlaying) {
        // Stop
        audio.pause();
        audio.currentTime = 0;
        riffPlaying = false;
        btn.classList.remove("playing");
        btn.querySelector(".riff-btn__play").style.display = "block";
        btn.querySelector(".riff-btn__stop").style.display = "none";
    } else {
        // Play
        audio.currentTime = 0;
        audio.play().then(() => {
            riffPlaying = true;
            btn.classList.add("playing");
            btn.querySelector(".riff-btn__play").style.display = "none";
            btn.querySelector(".riff-btn__stop").style.display = "block";
        }).catch(() => {
            // Autoplay blocked or file not found
            console.warn("Не удалось воспроизвести audio/riff.mp3");
        });
    }
}

function initRiffBtn() {
    const btn = document.getElementById("riff-btn");
    const audio = document.getElementById("riff-audio");
    if (!btn || !audio) return;

    btn.addEventListener("click", playRiff);

    audio.addEventListener("ended", () => {
        riffPlaying = false;
        btn.classList.remove("playing");
        btn.querySelector(".riff-btn__play").style.display = "block";
        btn.querySelector(".riff-btn__stop").style.display = "none";
    });
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initRiffBtn();
    renderSeries("core");
    initSeriesTabs();
    initBurger();
    initAnimations();
    initHeroBg();
    initForm();
    initSmoothScroll();
    handleHeaderScroll();
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
});
