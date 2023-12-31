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

let user_data = { ip: '' };
let current_timestamp = Math.floor(new Date() / 1000);
let client = navigator.userAgent;


fetch('https://ipinfo.io/json')
  .then(response => response.json())
  .then(data => {
    user_data = data;
  })
  .catch(error => {
    console.log(error)
  });

const pixelId = '6986401754777856';
const accessToken = 'EAAC6QoGp1ZAEBOZCmOpkK2e2bggZBQARe4JcLZCBl29euZCh6bVzjqEGDBPu8vTh5xBmpTVmtl2vuurKUln00W066Pa9ajqN0pe4U4QvyYZB2ZCan8ID5U8lW9yeUnqXcGBOJlfyarTeSuY9zfWdwSB5kZChAnOW6MJfmfyzr64EZCReILeUAtA7434s04ajm2YES5wZDZD';
const apiUrl = `https://graph.facebook.com/v18.0/${pixelId}/events`;

// Dados do evento
const eventData = [
  {
    "event_name": "PageView",
    "event_time": current_timestamp,
    "user_data": {
      "em": [""],
      "ph": [
        ""
      ],
      "client_ip_address": user_data?.ip,
      "client_user_agent": client,
      "fbc": "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
      "fbp": "fb.1.1558571054389.1098115397"
    },
    "event_source_url": "",
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
  .then(data => console.log('Resposta da API:', 'ok'))
  .catch(error => console.error('Erro na requisição:', ''));
