document.addEventListener('DOMContentLoaded', function () {
  let links = document.querySelectorAll('nav a');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      let targetId = this.getAttribute('href');
      let targetElement = document.querySelector(targetId);

      if (targetElement) {
        let offsetTop = targetElement.offsetTop;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  let mapa = L.map('mapa').setView([-19.84095382924983, -43.949727823405006], 20);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapa);

  let marcador = L.marker([-19.84095382924983, -43.949727823405006]).addTo(mapa);
  marcador.bindPopup('Local desejado').openPopup();

  marcador.on('click', function() {
    let googleMapsLink = `https://www.google.com/maps?q=${-19.84095382924983},${-43.949727823405006}`;


    window.location.href = googleMapsLink;
  })
});

// Substitua os valores abaixo com suas informações reais
const pixelId = '6986401754777856';
const accessToken = 'EAAC6QoGp1ZAEBOZCmOpkK2e2bggZBQARe4JcLZCBl29euZCh6bVzjqEGDBPu8vTh5xBmpTVmtl2vuurKUln00W066Pa9ajqN0pe4U4QvyYZB2ZCan8ID5U8lW9yeUnqXcGBOJlfyarTeSuY9zfWdwSB5kZChAnOW6MJfmfyzr64EZCReILeUAtA7434s04ajm2YES5wZDZD';
const apiUrl = `https://graph.facebook.com/v18.0/${pixelId}/events`;

// Dados do evento
const eventData = [
  {
    "event_name": "Purchase",
    "event_time": 1703512289,
    "user_data": {
      "em": ["309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"],
      "ph": [
        "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
        "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
      ],
      "client_ip_address": "123.123.123.123",
      "client_user_agent": "$CLIENT_USER_AGENT",
      "fbc": "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
      "fbp": "fb.1.1558571054389.1098115397"
    },
    "custom_data": {
      "currency": "usd",
      "value": 123.45,
      "contents": [
        {
          "id": "product123",
          "quantity": 1,
          "delivery_category": "home_delivery"
        }
      ]
    },
    "event_source_url": "http://jaspers-market.com/product/123",
    "action_source": "website"
  }
];

// Configuração da requisição
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: eventData,
    access_token: accessToken,
  }),
};

// Realiza a requisição usando fetch
fetch(apiUrl, requestOptions)
  .then(response => response.json())
  .then(data => console.log('Resposta da API:', data))
  .catch(error => console.error('Erro na requisição:', error));
