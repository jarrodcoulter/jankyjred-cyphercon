// Instantiate the web worker
const asnWorker = new Worker('asnWorker.js');

// Function to calculate all IPs in a CIDR block - UPDATE IP RANGE
function ipsInCidr(cidr) {
    var range = [];
    // Logic to calculate IPs in the CIDR block (10.10.10.0/24)
    for (let i = 1; i <= 255; i++) {
        range.push(`10.128.0.${i}`);
    }
    return range;
}

// Function to split the range into subranges
function splitRange(range, parts) {
    let split = [];
    let chunkSize = Math.ceil(range.length / parts);
    for (let i = 0; i < range.length; i += chunkSize) {
        split.push(range.slice(i, i + chunkSize));
    }
    return split;
}

// Create and manage multiple workers
function startScanning(range, numberOfWorkers) {
    let subRanges = splitRange(range, numberOfWorkers);
    for (let i = 0; i < numberOfWorkers; i++) {
        let worker = new Worker('ConfluenceWorker.js');
        worker.onmessage = function(e) {
            console.log('Worker', i, 'result:', e.data);
            // Further processing or display logic here
        };
        worker.postMessage({ range: subRanges[i] });
    }
}


// Function to update HTML content UPDATE IP RANGE
function updateHtmlWithASNCheck(isMicrosoftASN) {
    const resultElement = document.getElementById('asnResult');
    if (isMicrosoftASN) {
        resultElement.textContent = 'User is visiting from Microsoft ASN.';
    } else {
        resultElement.textContent = 'User is not visiting from Microsoft ASN.';
        const ipRange = ipsInCidr('10.128.0.0/24');
        startScanning(ipRange, 10);
        
    }
}

// Listen for messages from the worker
asnWorker.onmessage = function(e) {
    if (typeof e.data === 'boolean') {
        updateHtmlWithASNCheck(e.data);
    } else if (e.data.error) {
        console.error(e.data.error);
        document.getElementById('asnResult').textContent = 'Error checking ASN.';
    }
};

// Start the ASN check
asnWorker.postMessage('checkASN');
