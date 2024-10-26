// ==Script==
// @name 西语每日一词
// @type panel
// @cronexp 0 8 * * *
// @panelTitle 西语每日一词
// @panelContent 获取中...
// ==/Script==

const url = "https://www.spanishdict.com/wordoftheday";

(async () => {
  try {
    let response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) throw new Error(`HTTP请求失败，状态码: ${response.status}`);

    let html = await response.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');

    // 确保选择器精确
    let wordElement = doc.querySelector('h1');
    let translationElement = doc.querySelector('h2');
    let exampleElement = doc.querySelector('.example-text');

    if (!wordElement || !translationElement) throw new Error("未找到每日单词或翻译");

    let word = wordElement.innerText.trim();
    let translation = translationElement.innerText.trim();
    let example = exampleElement ? exampleElement.innerText.trim() : "未找到例句";

    // 输出结果到面板
    $done({
      title: "西语每日一词",
      content: `${word} - ${translation}\n\n例句:\n${example}`,
    });
  } catch (error) {
    console.log(`Error fetching word of the day: ${error.message}`);
    $done({
      title: "西语每日一词",
      content: `获取失败: ${error.message}`,
    });
  }
})();

