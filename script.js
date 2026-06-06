document.addEventListener('DOMContentLoaded', () => {
    const whatsappBtns = document.querySelectorAll('.btn-whatsapp');
    const toast = document.getElementById('notification-toast');
    let toastTimeout;

    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const cardBody = btn.closest('.card-body');
            const productCard = btn.closest('.product-card');
            if (!cardBody || !productCard) return;

            const productTitle = cardBody.querySelector('.product-title')?.innerText || 'Product';
            const productPrice = cardBody.querySelector('.product-price')?.innerText || 'Price on request';
            const productCode = productCard.getAttribute('data-product-code') || 'N/A';

            const phoneNumber = "916380671521"; 
            const message = `Hello Zyra Charm House! I'm interested in ordering:\n\n*Product:* ${productTitle}\n*Price:* ${productPrice}\n*Code:* ${productCode}\n\nPlease let me know the process!`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            if (toast) {
                toast.classList.add('show');
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.remove('show');
                }, 3500);
            }
            
            if (whatsappUrl) {
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                }, 1500); 
            }
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const showAllBtn = document.getElementById('show-all-btn');
    const showMoreWrapper = document.getElementById('show-more-wrapper');

    function applyFilter(filterValue, showFullList = false) {
        let matchCount = 0;
        let displayedCount = 0;

        productCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            const isMatch = filterValue === 'all' || cardCategory === filterValue;

            if (isMatch) {
                matchCount++;
                if (showFullList || displayedCount < 6) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                    displayedCount++;
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });

        if (showMoreWrapper) {
            showMoreWrapper.style.display = (!showFullList && matchCount > 6) ? 'block' : 'none';
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.getAttribute('data-filter'), false);
        });
    });

    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            applyFilter(activeFilter, true);
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('open');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a, .brand-name');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            navLinksContainer.classList.remove('active');
            if (hamburger) hamburger.classList.remove('open');
            document.body.style.overflow = '';
            
            if (href === '#catalog') {
                const defaultBtn = document.querySelector('.filter-btn[data-filter="all"]') || 
                                   document.querySelector('.filter-btn[data-filter="hampers"]');
                if (defaultBtn) defaultBtn.click();
            }
        });
    });

    const initialActiveBtn = document.querySelector('.filter-btn.active');
    if (initialActiveBtn) {
        applyFilter(initialActiveBtn.getAttribute('data-filter'), false);
    }

    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');
    const productImages = document.querySelectorAll('.product-img');

    productImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.style.display = 'flex';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            document.body.style.overflow = 'hidden'; 
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; 
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
