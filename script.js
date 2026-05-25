document.addEventListener('DOMContentLoaded', () => {
    const whatsappBtns = document.querySelectorAll('.btn-whatsapp');
    const toast = document.getElementById('notification-toast');
    let toastTimeout;

    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const cardBody = btn.closest('.card-body');
            if (!cardBody) return;

            // Use optional chaining and default values to prevent crashes
            const productTitle = cardBody.querySelector('.product-title')?.innerText || 'Product';
            const productPrice = cardBody.querySelector('.product-price')?.innerText || 'Price on request';

            const phoneNumber = "9100000000"; 
            const message = `Hello Zyra Charm House! I'm interested in ordering:\n\n*Product:* ${productTitle}\n*Price:* ${productPrice}\n\nPlease let me know the process!`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            toast.classList.add('show');
            
            clearTimeout(toastTimeout);
            
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
            
            if (whatsappUrl) {
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                }, 1500); 
            }
        });
    });

    const showAllBtn = document.getElementById('show-all-btn');
    const hiddenProducts = document.querySelectorAll('.product-card.hidden');

    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            hiddenProducts.forEach(product => {
                product.classList.remove('hidden');
                product.style.animation = 'fadeIn 0.5s ease forwards';
            });
            showAllBtn.parentElement.style.display = 'none';
        });
    }

    const catalogLink = document.querySelector('a[href="#catalog"]');
    if (catalogLink && showAllBtn) {
        catalogLink.addEventListener('click', () => {
            showAllBtn.click();
        });
    }
});
