document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll para links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement){
                const headerOffset = 80; // Altura do Nav
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. Efeito de Scroll na Navbar (Fica mais escura ao descer)
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.98)';
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
            nav.style.boxShadow = 'none';
        }
    });

    // OBS: A animação de entrada (FadeIn) agora é feita via CSS (@keyframes)
    // para garantir que o conteúdo nunca fique invisível se o JS falhar.
});
