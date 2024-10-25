const url = "https://www.spanishdict.com/wordoftheday";

$httpClient.get(url, (error, response, data) => {
    if (error) {
        console.log("Error fetching word of the day:", error);
    } else {
        const wordMatch = data.match(/<h1[^>]*>([^<]*)<\/h1>/);
        if (wordMatch) {
            const word = wordMatch[1];
            $notification.post("Spanish Word of the Day", word, "Swipe to view more!");
        } else {
            console.log("Word not found.");
        }
    }
    $done();
});