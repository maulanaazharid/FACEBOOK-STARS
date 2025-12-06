// WhatsApp Number (GANTI DENGAN NOMORMU)
const whatsappNumber = "6281234567890";

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const orderModal = document.getElementById('orderModal');
const closeModal = document.querySelector('.modal-close');
const orderButtons = document.querySelectorAll('.btn-order');
const orderForm = document.getElementById('orderForm');
const faqItems = document.querySelectorAll('.faq-item');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    const navContact = document.querySelector('.nav-contact');
    
    navMenu.classList.toggle('active');
    navContact.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Order Button Click
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const paket = button.getAttribute('data-paket');
        const harga = button.getAttribute('data-harga');
        
        // Update modal info
        document.getElementById('modalPaket').textContent = paket;
        document.getElementById('modalHarga').textContent = `Rp ${parseInt(harga).toLocaleString()}`;
        
        // Show modal
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Form Submit
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const streamer = document.getElementById('streamer').value;
    const pesan = document.getElementById('pesan').value;
    const paket = document.getElementById('modalPaket').textContent;
    const harga = document.getElementById('modalHarga').textContent;
    
    // Format WhatsApp message
    let message = `Halo StarShop.id, saya mau order Facebook Stars!\n\n`;
    message += `📋 *DATA ORDER*\n`;
    message += `• Nama: ${nama}\n`;
    message += `• WhatsApp: ${wa}\n`;
    message += `• Paket: ${paket}\n`;
    message += `• Harga: ${harga}\n`;
    message += `• Streamer: ${streamer}\n`;
    
    if (pesan.trim()) {
        message += `• Pesan: ${pesan}\n`;
    }
    
    message += `\nSilakan konfirmasi ketersediaan dan instruksi pembayaran.`;
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    orderForm.reset();
    
    // Show success message
    showNotification('✅ Order berhasil! Anda akan diarahkan ke WhatsApp.');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Scroll to element
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Notification function
function showNotification(message) {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid var(--success);
        border-radius: 10px;
        padding: 15px 20px;
        color: white;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.4s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    notification.querySelector('i').style.cssText = `
        color: var(--success);
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Animate stars on load
document.addEventListener('DOMContentLoaded', () => {
    // Animate stars in hero
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.style.animationDelay = `${index * 1}s`;
    });
    
    // Add current year to footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});