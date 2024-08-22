// Define the maximum acceptable latency in milliseconds
const MAX_LATENCY = 300;

// The URL to test the network latency
const TEST_URL = "https://www.google.com";

// Function to measure the latency
function checkLatency() {
  const startTime = Date.now();
  
  $httpClient.get(TEST_URL, function (error, response, data) {
    const latency = Date.now() - startTime;
    
    if (latency > MAX_LATENCY) {
      $notification.post("网络延迟警告", `当前延迟: ${latency}ms`, "请检查网络连接");
    } else {
      console.log(`网络正常，当前延迟: ${latency}ms`);
    }
  });
}

// Run the latency check periodically
checkLatency();
