// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click events to images for lightbox
    const images = document.querySelectorAll('.photo img');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this);
        });
    });
});

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgElement.src;
    lightbox.style.display = 'block';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}