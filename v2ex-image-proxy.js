// ==UserScript==
// @name         V2EX Sina Image Proxy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replace sinaimg.cn images with Baidu image proxy on V2EX
// @author       Claude Sonnet 3.7 (published by enriquephl)
// @match        https://www.v2ex.com/*
// @match        https://jp.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Function to replace image URLs
    function replaceSinaImages() {
        // Get all images on the page
        const images = document.querySelectorAll('img');
        
        // Regular expression to match sinaimg.cn URLs with jpg, png, or gif extensions (both http and https)
        const sinaImgRegex = /(https?):\/\/([^.]+\.)?sinaimg\.cn\/([^.]+)\.(jpg|png|gif)/i;
        
        // Loop through all images
        images.forEach(img => {
            const src = img.src;
            
            // Check if the image source matches the sinaimg.cn pattern
            if (sinaImgRegex.test(src)) {
                // Replace the URL with the Baidu image proxy URL
                img.src = 'https://image.baidu.com/search/down?url=' + encodeURIComponent(src);
                // Log successful replacement to console
                console.log('Image URL replaced:', src, '→', img.src);
            }
        });
    }
    
    // Run the replacement function when the page loads
    replaceSinaImages();
    
    // Also run the replacement function after AJAX content might have loaded
    // This helps with dynamic content that loads after the initial page load
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                replaceSinaImages();
            }
        });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
})();
