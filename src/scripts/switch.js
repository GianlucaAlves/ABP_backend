  document.addEventListener("DOMContentLoaded", () => {
    const switches = document.querySelectorAll('.sw-switch input');
    
    switches.forEach((checkbox) => {
      const circle = checkbox.parentElement.querySelector('.sw-circle');
  
      if (!circle) return;
  
      checkbox.addEventListener('change', () => {
        const onTransitionEnd = (e) => {
          if (e.propertyName === 'transform') {
            circle.removeEventListener('transitionend', onTransitionEnd);
  
            if (checkbox.checked) {
              window.location.href = '../en-pages/base.html'; // Altere para o caminho real
            } else {
              window.location.href = '../pages/home.html'; // Altere para o caminho real
            }
          }
        };
  
        circle.addEventListener('transitionend', onTransitionEnd);
      });
    });
  });