// Replace with your actual API key and endpoint
const API_KEY = 'YOURAPIKEY';
const API_ENDPOINT = 'https://api.ipdata.co';

async function checkMicrosoftASN() {
    try {
        // Fetch the user's IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();

        // Fetch ASN information for the IP address
        const asnResponse = await fetch(`${API_ENDPOINT}/${ipData.ip}/asn?api-key=${API_KEY}`);
        const asnData = await asnResponse.json();

        // Microsoft's ASN - verify for accuracy
        const microsoftASN = '8075';

        // Check if the ASN matches Microsoft's ASN
        const isMicrosoftASN = asnData.asn === microsoftASN;

        // Post the result back to the main script
        postMessage(isMicrosoftASN);
    } catch (error) {
        // Post error back to main script
        postMessage({ error: 'Error fetching ASN information' });
    }
}

// Listen for message from the main script
onmessage = function(e) {
    if (e.data === 'checkASN') {
        checkMicrosoftASN();
    }
};

