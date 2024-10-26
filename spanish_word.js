const url = "https://www.spanishdict.com/wordoftheday";

$httpClient.get(url, (error, response, data) => {
  if (error) {
    console.log("请求失败:", error);
    $done({
      title: "Error",
      content: "无法获取每日单词",
      icon: "exclamationmark.triangle",
      "icon-color": "#FF0000"
    });
    return;
  }

  const wordMatch = data.match(/<h1[^>]*class=".*?dictionary-neodict-word-header.*?"[^>]*>(.*?)<\/h1>/);
  const definitionMatch = data.match(/<p[^>]*class=".*?dictionary-neodict-brief-def.*?"[^>]*>(.*?)<\/p>/);
  const exampleMatch = data.match(/<div[^>]*class="example"[^>]*>(.*?)<\/div>/s);

  if (wordMatch && definitionMatch) {
    const wordOfTheDay = wordMatch[1].trim();
    const definition = definitionMatch[1].trim();
    const example = exampleMatch ? exampleMatch[1].replace(/<[^>]+>/g, '').trim() : "无可用例句";

    console.log(`每日单词: ${wordOfTheDay}`);
    console.log(`定义: ${definition}`);
    console.log(`例句: ${example}`);

    $done({
      title: `📚 每日单词: ${wordOfTheDay}`,
      content: `📝 定义: ${definition}\n\n💬 例句: ${example}`,
      icon: "text.book.closed",
      "icon-color": "#5AC8FA"
    });
  } else {
    console.log("未找到每日单词或定义");
    $done({
      title: "Error",
      content: "未找到每日单词或定义",
      icon: "exclamationmark.triangle",
      "icon-color": "#FF0000"
    });
  }
});