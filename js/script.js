/* Tab-երի փոփոխման ֆունկցիա ------------------------------------------------------------------------------------------------------ */

'use strict';

createFormulas();
initFormulaMouseEffect();

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

if (testimonialsItem.length > 0) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      if (modalImg && modalTitle && modalText) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
      }
    });
  }
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

if (selectItems.length > 0) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

let lastClickedBtn = filterBtn[0];

if (filterBtn.length > 0) {
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}

/* Ֆոնային բանաձևերի գեներացման ֆունկցիա ------------------------------------------------------------------------------------------------------ */
function createFormulas() {
  const bgContainer = document.querySelector('.formulas-background');
  if (!bgContainer) return;

  const formulas = [
    'Ա', 'Բ', 'Գ', 'Դ', 'Ե', 'Զ', 'Է', 'Ը', 'Թ', 'Ժ',
    'Ի', 'Լ', 'Խ', 'Ծ', 'Կ', 'Հ', 'Ձ', 'Ղ', 'Ճ', 'Մ',
    'Յ', 'Ն', 'Շ', 'Ո', 'Չ', 'Պ', 'Ջ', 'Ռ', 'Ս', 'Վ',
    'Տ', 'Ր', 'Ց', 'Ւ', 'Փ', 'Ք', 'Օ', 'Ֆ', 'և',
    'F=ma', "♰", "֍", "֎", "֏", "0", "1", "</>", 
  ];

  const formulaCount = 150;

  for (let i = 0; i < formulaCount; i++) {
    const el = document.createElement('div');
    el.classList.add('formula');
    el.textContent = formulas[Math.floor(Math.random() * formulas.length)];

    el.style.left = `${Math.random() * 100}%`;
    el.style.top = `${Math.random() * 100}%`;

    const scale = 0.8 + Math.random() * 1.5;
    el.style.fontSize = `${scale}rem`;

    el.style.opacity = 0.2 + Math.random() * 0.5;

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

/* --- Avatar Zoom (исправлено: красивое увеличение без фиксированного scale) ------------------------------------------------------------------------------------------------------ --- */
const avatarBoxNode = document.querySelector(".avatar-box");
const avatarOverlayNode = document.querySelector("[data-avatar-overlay]");

if (avatarBoxNode && avatarOverlayNode) {
  const toggleZoom = () => {
    avatarBoxNode.classList.toggle("zoomed");
    avatarOverlayNode.classList.toggle("active");
  };
  avatarBoxNode.addEventListener("click", toggleZoom);
  avatarOverlayNode.addEventListener("click", toggleZoom);
}

/* --- Fireworks on Footer Click (Изменение 3) ------------------------------------------------------------------------------------------------------ --- */
function createExplosion(x, y, colors) {
  for(let i=0; i<30; i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = '6px';
    p.style.height = '6px';
    p.style.borderRadius = '50%';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.pointerEvents = 'none';
    p.style.zIndex = '999999';
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    p.animate([
        { transform: 'translate(0,0) scale(1.5)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
        duration: 800 + Math.random() * 400,
        easing: 'ease-out'
    }).onfinish = () => p.remove();
  }
}

const footerBtnNode = document.querySelector('[data-fireworks-btn]');
if(footerBtnNode) {
  footerBtnNode.addEventListener('click', function(e) {
    const colors = ['#D90012', '#0033A0', '#F2A800'];
    const duration = 5000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
        if(Date.now() > end) {
            clearInterval(interval);
            return;
        }
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.8;
        createExplosion(x, y, colors);
    }, 300);
  });
}

/* --- Eye Toggle (Функция: скрытие/показ main-content и footer) ------------------------------------------------------------------------------------------------------ --- */
const eyeBtn = document.getElementById('eyeToggleBtn');
const mainContent = document.querySelector('.main-content');
const siteFooter = document.querySelector('.site-footer');

if (eyeBtn && mainContent && siteFooter) {
  let isHidden = false;
  const eyeIcon = eyeBtn.querySelector('ion-icon');
  
  const toggleVisibility = () => {
    if (isHidden) {
      // Show elements
      mainContent.style.visibility = 'visible';
      siteFooter.style.visibility = 'visible';
      eyeIcon.setAttribute('name', 'eye-off-outline');
    } else {
      // Hide elements
      mainContent.style.visibility = 'hidden';
      siteFooter.style.visibility = 'hidden';
      eyeIcon.setAttribute('name', 'eye-outline');
    }
    isHidden = !isHidden;
  };
  
  eyeBtn.addEventListener('click', toggleVisibility);
}
