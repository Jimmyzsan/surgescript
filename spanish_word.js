// ==Script==
// @name 西语每日一词
// @type panel
// @cronexp 0 8 * * *
// @panelTitle 西语每日一词
// @panelContent 获取中...
// ==/Script==

const url = "https://www.spanishdict.com/wordoftheday";

$httpClient.get(url, (error, response, data) => {
  if (error) {
    console.log("Error fetching word of the day:", error);
    $done({ title: "西语每日一词", content: "网络错误，请稍后再试。" });
    return;
  }

  try {
    const wordMatch = data.match(/<h1[^>]*>(.*?)<\/h1>/);
    const exampleMatch = data.match(/<div class="quote">(.*?)<\/div>/);

    const word = wordMatch ? wordMatch[1].trim() : "未找到单词";
    const example = exampleMatch ? exampleMatch[1].trim() : "未找到例句";

    $done({
      title: "西语每日一词",
      content: `单词：${word}\n例句：${example}`,
    });
  } catch (err) {
    console.log("Parsing error:", err);
    $done({ title: "西语每日一词", content: "解析失败，请检查页面结构。" });
  }
});
