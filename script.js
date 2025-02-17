const imageUrls = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
    });
}

async function downloadImages() {
    const loadingDiv = document.getElementById('loading');
    const outputDiv = document.getElementById('output');
    const errorDiv = document.getElementById('error');

    // Show loading spinner
    loadingDiv.style.display = 'block';
    errorDiv.textContent = ''; // Clear previous error messages
    outputDiv.innerHTML = ''; // Clear previous images

    try {
        const images = await Promise.all(imageUrls.map(downloadImage));
        
        // Hide loading spinner
        loadingDiv.style.display = 'none';

        // Display images
        images.forEach(img => {
            outputDiv.appendChild(img);
        });
    } catch (error) {
        // Hide loading spinner
        loadingDiv.style.display = 'none';

        // Display error message
        errorDiv.textContent = error.message;
    }
}

// Start downloading images
downloadImages();
