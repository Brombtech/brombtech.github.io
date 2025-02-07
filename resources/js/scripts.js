// Scroll Suave
document.querySelectorAll('nav a, .btn-hero').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animação ao Rolar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.servico, .sobre, .parceiros, .contato').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});


// Formulário de Contato
document.querySelector('.contato form')?.addEventListener('submit', function(e) {
    e.preventDefault();
      
        const formData = new FormData(this);
        
        const emailData = {
          apikey: atob("QzZBQUVDN0Q5MTc2REVEODQwRDM2OEQyRUE3N0YzRUY2MTVDQTVFNDMwMTZERTMwNzA5ODhCRDYwNkZDOEZGRjZGRUEwQjZDNTJFMzk1RkEwMTA1QkU0QjREMEY4NDJE"),
          from: "comercial@brombtech.com.br",
          to: "comercial@brombtech.com.br",
          subject: "Novo contato do site",
          bodyHtml: `<p><strong>Nome:</strong> ${formData.get('nome')}</p>
                     <p><strong>Email:</strong> ${formData.get('email')}</p>
                     <p><strong>Mensagem:</strong> ${formData.get('mensagem')}</p>`
        };
      
        fetch("https://api.elasticemail.com/v2/email/send", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(emailData)
        })
        .then(response => {
            if (response.status === 200 || response.status === 0) {
                console.log(response)
                return {success: true};
            }

            // Se o status for 204 (No Content) ou se o cabeçalho indicar ausência de conteúdo, trate-o
            if (response.status === 204) {
              return {};
            }
            // Se o header Content-Length for zero, também pode ser tratado
            if (response.headers.get('Content-Length') === '0') {
              return {};
            }          
          })
          .then(result => {
            if (result.success) {
              alert("Agradecemos seu contato. Em breve responderemos sua mensagem!");
              document.getElementById('contact-form').reset();
            } else {
              alert("Erro ao enviar: " + (result.error || "Resposta vazia"));
            }
          })          
      });

function initSlider() {
    const sliderInner = document.querySelector('.slider-inner');
    const sliderItems = document.querySelectorAll('.slider-item');
    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        sliderInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(nextSlide, 2700);
}

// Inicializa quando a página carregar
document.addEventListener('DOMContentLoaded', initSlider);
