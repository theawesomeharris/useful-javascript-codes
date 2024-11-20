/* Function to download a file
Copy and paste this code in Developer tool's console on your Google Chrome browser.
This script auto-detects and downloads the first .vtt subtitle found on the webpage and then the script is stopped automatically.
Copy and paste the script again before going to the next page to turn on the auto-detection again.
*/

(function () {
    // Helper function to download file
    function downloadFile(url, fileName) {
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Monitor XHR requests for .vtt file detection
    let detectedVttUrls = [];
    const xhrOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        if (url.includes('fileExtension=vtt')) {
            detectedVttUrls.push(url);
            console.log(`Detected VTT URL: ${url}`);

            if (detectedVttUrls.length === 1) {
                // Download the first detected VTT file
                const fileName = `subtitle_${Date.now()}.vtt`;
                downloadFile(url, fileName);
            } else if (detectedVttUrls.length > 1) {
                // Stop monitoring after detecting the second VTT file
                console.error('Second .vtt file detected. Stopping monitoring.');
                XMLHttpRequest.prototype.open = xhrOpen; // Restore original XHR behavior
                return;
            }
        }

        // Proceed with the original XHR request
        return xhrOpen.apply(this, arguments);
    };

    console.log('Script is now monitoring for .vtt file URLs on this page load.');

    // Automatically reset detection on page load
    window.addEventListener('load', () => {
        detectedVttUrls = [];
        console.log('Page loaded. Resetting VTT detection.');
    });
})();
