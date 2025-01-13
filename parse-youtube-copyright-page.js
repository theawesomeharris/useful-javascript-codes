// The JavaScript code below is used to parse the Copyright page in YouTube Studio to produce a list of song title with
//   respective artist and timestamp in the following format, "song-title"<space>"artist"<space>"timestamp in 0:00:00 format"
// For example: Baby Justin Bieber 0:00:35 - 0:03:53

// Helper function to pad numbers to always have two digits, except for hours
function padToTwoDigits(num) {
    return num.toString().padStart(2, '0');
}

// Helper function to convert timestamps to the format 0:00:00
function convertToHMS(time) {
    const parts = time.split(':').map((part) => parseInt(part, 10));
    let hours = 0, minutes = 0, seconds = 0;

    // Assign values based on the number of parts
    if (parts.length === 2) { // MM:SS
        [minutes, seconds] = parts;
    } else if (parts.length === 3) { // HH:MM:SS
        [hours, minutes, seconds] = parts;
    }

    // Return the time in 0:00:00 format (no padding for hours)
    return `${hours}:${padToTwoDigits(minutes)}:${padToTwoDigits(seconds)}`;
}

// Helper function to convert full timestamp ranges
function formatTimestamp(timestamp) {
    const [start, end] = timestamp.split('-').map((t) => t.trim());
    return `${convertToHMS(start)} - ${convertToHMS(end)}`;
}

// Get all the elements for song titles, artists, and timestamps
const songTitles = document.querySelectorAll('.ytcr-video-content-list-claim-row.style-scope.title-text');
const artists = document.querySelectorAll('#artists');
const timestamps = document.querySelectorAll('.ytcr-video-content-list-claim-row.style-scope.remove-default-style.time-interval-button');

// Initialize an array to store the results
const extractedData = [];

// Loop through the elements and extract text
songTitles.forEach((titleElement, index) => {
    const title = titleElement.innerText.trim();
    const artist = artists[index]?.innerText.trim() || "Unknown Artist";
    const rawTimestamp = timestamps[index]?.innerText.trim() || "Unknown Timestamp";

    // Reformat the timestamp
    const formattedTimestamp = rawTimestamp.includes('-') ? formatTimestamp(rawTimestamp) : rawTimestamp;

    // Combine into the required format
    extractedData.push(`${title} ${artist} ${formattedTimestamp}`);
});

// Output the results
console.log(extractedData.join('\n'));
