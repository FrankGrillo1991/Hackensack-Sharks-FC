// Image orientation correction system
document.addEventListener('DOMContentLoaded', function() {
    // Array of rotation classes in order
    const rotationClasses = ['', 'flip-90-cw', 'flip-180', 'flip-90-ccw'];
    
    // Add double-click event to all images for rotation correction
    const images = document.querySelectorAll('.photo img');
    
    images.forEach(img => {
        // Track current rotation state
        img.rotationState = 0;
        
        // Add double-click event for rotation
        img.addEventListener('dblclick', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove current rotation class
            this.classList.remove(...rotationClasses);
            
            // Move to next rotation state
            this.rotationState = (this.rotationState + 1) % rotationClasses.length;
            
            // Add new rotation class if not default
            if (rotationClasses[this.rotationState]) {
                this.classList.add(rotationClasses[this.rotationState]);
            }
            
            // Visual feedback
            this.style.outline = '3px solid #004080';
            setTimeout(() => {
                this.style.outline = 'none';
            }, 500);
        });
        
        // Add right-click context menu for manual selection
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showRotationMenu(this, e.clientX, e.clientY);
        });
    });
    
    // Function to show rotation menu
    function showRotationMenu(img, x, y) {
        // Remove existing menu
        const existingMenu = document.querySelector('.rotation-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Create menu
        const menu = document.createElement('div');
        menu.className = 'rotation-menu';
        menu.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            padding: 5px 0;
        `;
        
        const options = [
            { text: 'Normal', class: '' },
            { text: 'Rotate 90° →', class: 'flip-90-cw' },
            { text: 'Rotate 180°', class: 'flip-180' },
            { text: 'Rotate 90° ←', class: 'flip-90-ccw' }
        ];
        
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.style.cssText = `
                display: block;
                width: 100%;
                padding: 8px 16px;
                border: none;
                background: white;
                cursor: pointer;
                text-align: left;
            `;
            
            button.addEventListener('mouseenter', () => {
                button.style.background = '#f0f0f0';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = 'white';
            });
            
            button.addEventListener('click', () => {
                // Remove all rotation classes
                img.classList.remove(...rotationClasses);
                
                // Add selected class
                if (option.class) {
                    img.classList.add(option.class);
                }
                
                // Update rotation state
                img.rotationState = index;
                
                // Remove menu
                menu.remove();
                
                // Visual feedback
                img.style.outline = '3px solid #004080';
                setTimeout(() => {
                    img.style.outline = 'none';
                }, 500);
            });
            
            menu.appendChild(button);
        });
        
        document.body.appendChild(menu);
        
        // Remove menu when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', function removeMenu() {
                menu.remove();
                document.removeEventListener('click', removeMenu);
            });
        }, 100);
    }
    
    // Add instructions to the page
    addInstructions();
    
    function addInstructions() {
        const instructions = document.createElement('div');
        instructions.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 64, 128, 0.9);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 1000;
            max-width: 200px;
        `;
        instructions.innerHTML = `
            <strong>Fix Sideways Images:</strong><br>
            • Double-click image to rotate<br>
            • Right-click for rotation menu<br>
            • Changes are temporary (for testing)
        `;
        
        document.body.appendChild(instructions);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            instructions.style.opacity = '0.3';
        }, 10000);
    }
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