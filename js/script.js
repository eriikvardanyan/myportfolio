/* Սկսել սկրիպտը էջի բեռնումից հետո */
document.addEventListener('DOMContentLoaded', () => {
    createFormulas();
    initTabs();
});

/* Tab-երի փոփոխման ֆունկցիա */
function initTabs() {
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const pages = document.querySelectorAll('[data-page]');

    navLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            // Remove active class from all
            navLinks.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            // Add active class to clicked
            link.classList.add('active');

            // Activate corresponding page
            // Logic: Assuming same order. For robust matching, use data-target
            if (pages[index]) {
                pages[index].classList.add('active');
                window.scrollTo(0, 0);
            }
        });
    });
}


/* Ֆոնային բանաձևերի գեներացման ֆունկցիա */
function createFormulas() {
    const bgContainer = document.querySelector('.formulas-background');
    if (!bgContainer) return;

    const formulas = [
        'E = mc²',
        'a = v / t',
        'v = √2gh',
        'F = ma',
        'F = kx',
        'F = G(Mm) / r²',
        'F = mg',
        'p = ρgh',
        'F = ρgV',
        'p = mv',
        'E = mv² / 2',
        'E = mgh',
        'Q = C(t₂ - t₁)',
        'λ = h / mv',
        'λ = q / L',
        'U = Δφ = φ₁ - φ₂',
        'I = q / t',
        'I = U /R',
        'E = hv = hc / λ',
        'F = G(Mm) / r²',
    ];

    const formulaCount = 20;

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

        // Պատահական անիմացիայի տևողություն և հապաղում (Դանդաղեցված)
        const duration = 20 + Math.random() * 20;
        const delay = Math.random() * -20;

        el.style.animation = `float ${duration}s linear ${delay}s infinite`;

        bgContainer.appendChild(el);
    }
}
