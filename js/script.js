/* Սկսել սկրիպտը էջի բեռնումից հետո */
document.addEventListener('DOMContentLoaded', () => {
    createFormulas();
    initTabs();
    initFormulaMouseEffect();
    initSidebarToggle();
});

/* Tab-երի փոփոխման ֆունկցիա ------------------------------------------------------------------------------------------------------ */
function initTabs() {
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const pages = document.querySelectorAll('[data-page]');

    navLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            link.classList.add('active');

            if (pages[index]) {
                pages[index].classList.add('active');
                window.scrollTo(0, 0);
            }
        });
    });
}

/* Ֆոնային բանաձևերի գեներացման ֆունկցիա ------------------------------------------------------------------------------------------------------ */
function createFormulas() {
    const bgContainer = document.querySelector('.formulas-background');
    if (!bgContainer) return;

    // const formulas = [
    //     'E = mc²', 'a = v / t', 'v = √2gh', 'F = ma', 'F = kx',
    //     'F = G(Mm) / r²', 'F = mg', 'p = ρgh', 'F = ρgV', 'p = mv',
    //     'E = mv² / 2', 'E = mgh', 'Q = C(t₂ - t₁)', 'λ = h / mv',
    //     'λ = q / L', 'U = Δφ = φ₁ - φ₂', 'I = q / t', 'I = U /R',
    //     'E = hv = hc / λ', 'F = G(Mm) / r²', 
    //     'սեխմիր "F=ma"', "𐎠𐎼𐎷𐎡𐎴", "♰֎Է",
    // ];

    const formulas = [
        'Ա', 'Բ', 'Գ', 'Դ', 'Ե', 'Զ', 'Է', 'Ը', 'Թ', 'Ժ',
        'Ի', 'Լ', 'Խ', 'Ծ', 'Կ', 'Հ', 'Ձ', 'Ղ', 'Ճ', 'Մ',
        'Յ', 'Ն', 'Շ', 'Ո', 'Չ', 'Պ', 'Ջ', 'Ռ', 'Ս', 'Վ',
        'Տ', 'Ր', 'Ց', 'Ւ', 'Փ', 'Ք', 'Օ', 'Ֆ', 'և',
        'F=ma', "♰", "֍", "֎", "֏",
    ];

    const formulaCount = 500;

    for (let i = 0; i < formulaCount; i++) {
        const el = document.createElement('div');
        el.classList.add('formula');
        el.textContent = formulas[Math.floor(Math.random() * formulas.length)];

        // Պատահական դիրքավորում
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;

        // Պատահական չափս
        const scale = 0.8 + Math.random() * 1.5;
        el.style.fontSize = `${scale}rem`;

        // Պատահական թափանցիկություն
        el.style.opacity = 0.2 + Math.random() * 0.5;

        // Պատահական անիմացիայի տևողություն և հապաղում
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * -20;

        el.style.animation = `float ${duration}s linear ${delay}s infinite`;

        bgContainer.appendChild(el);
    }
}

/* --- տառերի ռեակցիան  ------------------------------------------------------------------------------------------------------ --- */
function initFormulaMouseEffect() {
    document.addEventListener('mousemove', (e) => {
        const formulas = document.querySelectorAll('.formula');
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        formulas.forEach(formula => {
            const rect = formula.getBoundingClientRect();
            const formulaX = rect.left + rect.width / 2;
            const formulaY = rect.top + rect.height / 2;

            const diffX = mouseX - formulaX;
            const diffY = mouseY - formulaY;
            const distance = Math.sqrt(diffX * diffX + diffY * diffY);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                const moveX = (diffX / distance) * force * -40;
                const moveY = (diffY / distance) * force * -40;

                formula.style.marginLeft = `${moveX}px`;
                formula.style.marginTop = `${moveY}px`;
                formula.style.transition = "margin 0.2s ease-out";
            } else {
                formula.style.marginLeft = "0px";
                formula.style.marginTop = "0px";
                formula.style.transition = "margin 0.6s ease-out";
            }
        });
    });
}

/* --- Գաղռնի ֆունկցիա ------------------------------------------------------------------------------------------------------ --- */
let easterEggCode = "";
const secretWord = "f=ma";

document.addEventListener('keydown', (e) => {
    easterEggCode += e.key.toLowerCase();

    if (easterEggCode.length > secretWord.length) {
        easterEggCode = easterEggCode.substring(easterEggCode.length - secretWord.length);
    }

    if (easterEggCode === secretWord) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const body = document.body;
    const formulas = document.querySelectorAll('.formula');
    const overlay = document.getElementById('easter-egg-overlay');
    const music = document.getElementById('easter-egg-music');

    const armColors = ['#D90012', '#0033A0', '#F2A800'];

    overlay.style.display = 'flex';
    music.play().catch(e => console.log("Музыка не смогла запуститься автоматически"));

    body.style.background = "linear-gradient(180deg, rgba(255, 0, 21, 1), rgba(0, 81, 255, 1), rgba(255, 145, 0, 1))";

    formulas.forEach((f, index) => {
        f.style.color = armColors[index % 3];
        f.style.transform = "scale(3) rotate(20deg)";
        f.style.opacity = "1";
    });

    setTimeout(() => {
        overlay.style.display = 'none';
        music.pause();
        music.currentTime = 0;

        body.style.background = "";
        formulas.forEach(f => {
            f.style.transform = "";
            f.style.color = body.classList.contains('dark-mode') ? "#ffffff" : "#000000";
            f.style.opacity = "0.7";
        });
        easterEggCode = "";
    }, 15000);
}

/* --- SIDEBAR TOGGLE FOR MOBILE ------------------------------------------------------------------------------------------------------ --- */
function initSidebarToggle() {
    const sidebarBtn = document.querySelector('[data-sidebar-btn]');
    const sidebar = document.querySelector('[data-sidebar]');

    if (sidebarBtn && sidebar) {
        sidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

/* --- մութ վերսիա (Dark/Light Mode) ---------------------------------------------------------------------------------- --- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true; 
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

/* --- gmail ---------------------------------------------------------------------------------- --- */
