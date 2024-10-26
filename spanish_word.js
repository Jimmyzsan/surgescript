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
    let response = await fetch(url);
    if (!response.ok) throw new Error("无法加载页面");

    let html = await response.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');

    // 获取每日单词、翻译和例句
    let word = doc.querySelector('h1').innerText.trim(); // 今日的单词
    let translation = doc.querySelector('h2').innerText.trim(); // 翻译
    let exampleElement = doc.querySelector('.example-text'); // 例句部分

    // 检查并提取例句（若存在）
    let example = exampleElement ? exampleElement.innerText.trim() : "未找到例句";

    // 将结果显示在 Surge 面板上
    if (word && translation) {
      $done({
        title: "西语每日一词",
        content: `${word} - ${translation}\n\n例句:\n${example}`,
      });
    } else {
      throw new Error("未找到每日单词");
    }
  } catch (error) {
    console.log(`Error fetching word of the day: ${error.message}`);
    $done({
      title: "西语每日一词",
      content: "未找到内容",
    });
  }
})();

