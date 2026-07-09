// Configuração futura: substitua pelo WhatsApp comercial da CredDrive no formato DDI + DDD + número.
const WHATSAPP_NUMBER = "5500000000000";
const WHATSAPP_MESSAGE = "Olá, vim pelo site da CredDrive e quero simular um empréstimo com garantia de veículo.";

// Configuração futura: substitua por URL de webhook/CRM, como Make, Zapier, RD Station ou CRM próprio.
const LEAD_WEBHOOK_URL = "";

function buildWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

document.querySelectorAll("#whatsappHero").forEach((link) => {
  link.setAttribute("href", buildWhatsAppUrl());
  link.setAttribute("target", "_blank");
});

const form = document.getElementById("leadForm");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    data.origem = "Landing Page CredDrive";
    data.enviadoEm = new Date().toISOString();

    // Futuro Meta Pixel: disparar evento Lead aqui após configuração oficial.
    // Futuro GTM/dataLayer: window.dataLayer?.push({ event: "lead_form_submit", ...data });

    if (LEAD_WEBHOOK_URL) {
      try {
        await fetch(LEAD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error("Erro ao enviar lead para webhook/CRM:", error);
      }
    }

    const button = form.querySelector("button[type='submit']");
    const originalText = button.textContent;
    button.textContent = "Simulação recebida!";
    form.reset();

    setTimeout(() => {
      button.textContent = originalText;
    }, 3000);
  });
}
