// DARK MODE com localStorage
const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// ANIMAÇÃO AO SCROLL (IntersectionObserver)
const elements = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// FORMULÁRIO
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "Enviando...";
  status.style.color = "orange";

  setTimeout(() => {
    status.textContent = "Mensagem enviada com sucesso!";
    status.style.color = "green";
    form.reset();
  }, 1000);
});

// API CLIMA
fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true")
  .then(res => res.json())
  .then(data => {
    document.getElementById("weatherInfo").textContent =
      `Temperatura atual: ${data.current_weather.temperature}°C`;
  })
  .catch(() => {
    document.getElementById("weatherInfo").textContent =
      "Não foi possível carregar o clima.";
  });
