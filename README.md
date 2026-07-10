# CredDrive Landing Page

Landing page principal da CredDrive para captação de leads de Empréstimo com Garantia de Veículo.

## Arquivos

- `index.html`: página principal completa com Hero, Quem Somos, Benefícios, Como Funciona, Formulário, Blog interno, FAQ, Rodapé e WhatsApp.
- `style.css`: identidade visual verde, responsiva e mobile-first.
- `script.js`: WhatsApp, formulário, eventos de rastreamento e constantes de configuração.
- `politica-de-privacidade.html`: página de privacidade e LGPD.
- `package.json` e `package-lock.json`: scripts npm.

O Blog está dentro do `index.html`, na seção `id="blog"`. O arquivo `blog.html` não faz parte do pacote final.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:4173`.

## Configurações

No `script.js`:

- `WHATSAPP_NUMBER`: número do WhatsApp em formato internacional. Atual: `5531983318101`.
- `WEBHOOK_URL`: inserir URL futura do webhook/CRM.

No `index.html`:

- Inserir scripts oficiais de Google Tag Manager e Meta Pixel nos placeholders indicados.

## Futuras integrações tecnológicas

Integrações com APIs de bancos, higienização de base, digitação automatizada, esteiras de crédito, CRM e parceiros devem ser feitas por backend seguro. Nunca exponha tokens, senhas ou chaves de API no JavaScript público da landing page.
