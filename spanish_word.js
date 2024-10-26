// ==Script==
// @name 西语每日一词
// @type panel
// @cron 0 8 * * *
// @panelTitle 西语每日一词
// @panelContent 获取中...
// ==/Script==

const url = "https://www.spanishdict.com/wordoftheday";

// 发送 GET 请求以获取每日一词
$httpClient.get(url, function (error, response, data) {
  if (error) {
    console.log("Error fetching word of the day:", error);
    $done({ title: "西语每日一词", content: "获取失败，请检查网络连接。" });
    return;
  }

  try {
    // 提取每日单词和示例句
    const wordMatch = data.match(/<h1[^>]*>(.*?)<\/h1>/);
    const exampleMatch = data.match(/<div class="quote">(.*?)<\/div>/);

    const word = wordMatch ? wordMatch[1] : "未找到单词";
    const example = exampleMatch ? exampleMatch[1] : "未找到例句";

    // 打印到 Surge panel 中
    $done({
      title: "西语每日一词",
      content: `单词：${word}\n例句：${example}`,
    });
  } catch (err) {
    console.log("Error parsing response:", err);
    $done({ title: "西语每日一词", content: "解析失败，请检查页面结构。" });
  }
});
