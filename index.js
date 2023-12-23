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