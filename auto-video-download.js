/* Function to download a file
Copy and paste this code in Developer tool's console on your Google Chrome browser.
*/
async function downloadFile(fileUrl, fileName) {
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
        }

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`Downloaded: ${fileName}`);
    } catch (error) {
        console.error(`Error downloading ${fileName}:`, error);
    }
}

// Function to find video URLs
function findVideoUrl() {
    let videoUrl = null;

    // Search for video URLs in <video> and <source> tags
    const videoTags = document.querySelectorAll('video, source');
    videoTags.forEach(tag => {
        const src = tag.src || tag.getAttribute('src');
        if (src && src.includes('.mp4')) {
            videoUrl = src;
        }
    });

    // Fallback: Search the entire HTML for `.mp4` links
    if (!videoUrl) {
        const allHtml = document.documentElement.innerHTML;
        const mp4Match = allHtml.match(/https?:\/\/[^\s"']+\.mp4[^\s"']*/);
        if (mp4Match) {
            videoUrl = mp4Match[0];
        }
    }

    return videoUrl;
}

// Main function to handle the process
(async function () {
    const videoUrl = findVideoUrl();

    if (videoUrl) {
        console.log(`Found video URL: ${videoUrl}`);
        await downloadFile(videoUrl, "video.mp4");
    } else {
        console.warn("No video URL found on the page.");
    }
})();
