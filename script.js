// Configuração WhatsApp: substitua pelo WhatsApp comercial da CredDrive no formato DDI + DDD + número.
// Exemplo: const WHATSAPP_NUMBER = "5531999999999";
const WHATSAPP_NUMBER = "5500000000000";
const WHATSAPP_MESSAGE = "Olá, vim pelo site da CredDrive e quero simular um empréstimo com garantia de veículo.";

// Configuração Webhook/CRM: substitua por URL de webhook/CRM, como Make, Zapier, RD Station ou CRM próprio.
// Enquanto vazio, o formulário exibirá uma mensagem de sucesso local e orientará o usuário a falar pelo WhatsApp.
const WEBHOOK_URL = "";

function buildWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

function trackEvent(eventName, payload = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, payload);
  }
}

function showFormStatus(message) {
  const existing = document.querySelector(".form-status");
  if (existing) existing.remove();

  const status = document.createElement("p");
  status.className = "form-status";
  status.textContent = message;
  document.getElementById("leadForm")?.appendChild(status);
}

document.querySelectorAll("#whatsappHero, [data-whatsapp]").forEach((link) => {
  link.setAttribute("href", buildWhatsAppUrl());
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
  link.addEventListener("click", () => trackEvent("whatsapp_click", { origem: "Landing Page CredDrive" }));
});

document.querySelectorAll('a[href="#formulario"]').forEach((link) => {
  link.addEventListener("click", () => trackEvent("cta_principal_click", { origem: "Landing Page CredDrive" }));
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
    data.pagina = window.location.href;
    data.enviadoEm = new Date().toISOString();

    trackEvent("lead_form_submit", data);

    const button = form.querySelector("button[type='submit']");
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Enviando...";

    if (WEBHOOK_URL) {
      try {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Webhook retornou status ${response.status}`);
        }

        showFormStatus("Simulação recebida! Um consultor da CredDrive entrará em contato em breve.");
      } catch (error) {
        console.error("Erro ao enviar lead para webhook/CRM:", error);
        showFormStatus("Recebemos sua solicitação localmente, mas o CRM ainda não está configurado. Para atendimento imediato, fale com um consultor pelo WhatsApp.");
      }
    } else {
      showFormStatus("Simulação recebida! Para atendimento imediato, fale com um consultor pelo WhatsApp.");
    }

    button.textContent = "Simulação recebida!";
    form.reset();

    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 3000);
  });
}
