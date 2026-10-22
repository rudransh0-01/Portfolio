// Tell the CSS that JavaScript is running (enables reveal animations)
document.documentElement.classList.add("js");

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", e => {
  if (e.target.tagName === "A") { navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
});

// ---------- Theme toggle (remembered in this browser) ----------
const root = document.documentElement;
try { const saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
document.getElementById("themeBtn").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// ---------- Scroll reveal + active nav link ----------
const reveals = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

const links = document.querySelectorAll("#navLinks a");
const sections = document.querySelectorAll("main section[id]");
const navObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => navObs.observe(s));

// ---------- Typing effect on the role line ----------
const typed = document.getElementById("typed");
const roles = ["Aspiring Web Developer", "CS-IT Student", "Always Learning"];
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let r = 0, n = roles[0].length, deleting = true;
  const tick = () => {
    const word = roles[r];
    n += deleting ? -1 : 1;
    typed.textContent = word.slice(0, n);
    let delay = deleting ? 40 : 80;
    if (!deleting && n === word.length) { deleting = true; delay = 1800; }
    else if (deleting && n === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2000);
}

// ---------- Back to top + footer year ----------
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 500), { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Scroll progress bar ----------
const scrollBar = document.getElementById("scrollBar");
function updateBar() {
  const max = document.documentElement.scrollHeight - innerHeight;
  scrollBar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}
window.addEventListener("scroll", updateBar, { passive: true });
updateBar();

// ---------- Card spotlight follows the mouse ----------
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });
});

// ---------- Nav shrinks a little after scrolling ----------
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });

// ---------- 3D tilt on the ID badge ----------
const badge = document.getElementById("badge");
if (badge && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  badge.addEventListener("pointermove", e => {
    const r = badge.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    badge.style.setProperty("--ry", (x - 0.5) * 14 + "deg");
    badge.style.setProperty("--rx", (0.5 - y) * 14 + "deg");
    badge.style.setProperty("--sx", x * 100 + "%");
    badge.style.setProperty("--sy", y * 100 + "%");
  });
  badge.addEventListener("pointerleave", () => {
    badge.style.setProperty("--rx", "0deg");
    badge.style.setProperty("--ry", "0deg");
  });
}

// ---------- Copy email button with toast message ----------
const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2000);
}
document.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(btn.dataset.copy); showToast("Email copied"); }
  catch (e) { showToast("Copy not available. Select the email and copy it."); }
}));
