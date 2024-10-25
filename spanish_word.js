const url = "https://www.spanishdict.com/wordoftheday";

$httpClient.get(url, (error, response, data) => {
    if (error) {
        console.log("Error fetching word of the day:", error);
        $done({ title: "西语每日一词", content: "获取失败", style: "error" });
    } else {
        const wordMatch = data.match(/<h1[^>]*>([^<]*)<\/h1>/);
        const contentMatch = data.match(/<div class="word-header">([^<]*)<\/div>/);

        if (wordMatch && contentMatch) {
            const word = wordMatch[1];
            const content = contentMatch[1];
            $done({ title: `西语每日一词: ${word}`, content: content, style: "info" });
        } else {
            $done({ title: "西语每日一词", content: "未找到内容", style: "error" });
        }
    }
});