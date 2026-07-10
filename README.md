# CredDrive Landing Page

Landing page estática, responsiva e mobile-first para a CredDrive, focada em empréstimo com garantia de veículo.

## Arquivos principais

- `index.html`
- `style.css`
- `script.js`
- `politica-de-privacidade.html`
- `package.json`
- `package-lock.json`
- `README.md`

## Como visualizar localmente

Instale o Node.js LTS em https://nodejs.org.

Depois, dentro da pasta do projeto, execute:

```bash
npm install
npm run dev
```

Abra no navegador:

```text
http://localhost:4173
```

## Como publicar no GitHub Pages

1. Acesse o repositório no GitHub.
2. Vá em **Configurações > Páginas**.
3. Em **Fonte**, escolha **Implantar a partir de uma branch**.
4. Selecione a branch `principal` e a pasta `/` ou `/root`.
5. Clique em **Salvar**.

## Configurar WhatsApp

No arquivo `script.js`, altere:

```js
const WHATSAPP_NUMBER = "5500000000000";
```

Use o formato internacional, sem espaços, traços ou parênteses:

```text
55 + DDD + número
```

Exemplo:

```js
const WHATSAPP_NUMBER = "5531999999999";
```

## Configurar webhook/CRM

No arquivo `script.js`, altere:

```js
const WEBHOOK_URL = "";
```

Informe a URL do webhook do CRM, Make, Zapier, RD Station ou sistema próprio.

Enquanto o `WEBHOOK_URL` estiver vazio, o formulário exibirá mensagem de sucesso local e orientará o usuário a falar pelo WhatsApp.

## Inserir Google Tag Manager e Meta Pixel

No arquivo `index.html`, substitua os comentários de placeholder pelos scripts oficiais:

- Google Tag Manager;
- Meta Pixel;
- eventos adicionais de conversão.

O arquivo `script.js` já envia eventos preparados para:

- clique no CTA principal;
- clique no WhatsApp;
- envio do formulário.

## Observação jurídica

A página `politica-de-privacidade.html` contém texto simples para captação de leads. Antes de campanhas em tráfego pago, recomenda-se revisar juridicamente e incluir CNPJ, razão social, canal de privacidade e dados oficiais da CredDrive.

## Observação comercial

Operações sujeitas à análise de crédito e às condições da instituição parceira.
