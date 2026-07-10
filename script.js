const WHATSAPP_NUMBER = "5531983318101";
const WHATSAPP_MESSAGE = "Olá, vim pelo site da CredDrive e quero simular um empréstimo com garantia de veículo.";
const WEBHOOK_URL = ""; // Inserir URL real do webhook/CRM quando disponível.

function whatsappUrl() {
  const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

function trackEvent(name, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", name, params);
  }
}

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.setAttribute("href", whatsappUrl());
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
  link.addEventListener("click", () => trackEvent("whatsapp_click", { source: "landing_page" }));
});

document.querySelectorAll(".track-cta").forEach((link) => {
  link.addEventListener("click", () => trackEvent("main_cta_click", { source: "landing_page" }));
});

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => navMenu.classList.toggle("is-open"));
  navMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => navMenu.classList.remove("is-open")));
}

const form = document.querySelector("#leadForm");
const feedback = document.querySelector("#formFeedback");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.dataHoraEnvio = new Date().toISOString();
    payload.origem = window.location.href;

    trackEvent("lead_form_submit", { source: "landing_page" });

    if (!WEBHOOK_URL) {
      feedback.textContent = "Recebemos sua solicitação. Para agilizar, fale também com um consultor pelo WhatsApp.";
      form.reset();
      return;
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Erro no envio");
      feedback.textContent = "Solicitação enviada com sucesso. Em breve um consultor entrará em contato.";
      form.reset();
    } catch (error) {
      feedback.textContent = "Não foi possível enviar agora. Clique no WhatsApp para falar com um consultor.";
    }
  });
}
