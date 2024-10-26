const url = 'https://www.spanishdict.com/wordoftheday';

$httpClient.get(url, (error, response, data) => {
  if (error) {
    console.error('请求失败:', JSON.stringify(error));
    $done({ error: '无法抓取每日一词' });
    return;
  }

  if (response.status !== 200) {
    console.error('状态码异常:', response.status);
    $done({ error: '状态码: ' + response.status });
    return;
  }

  try {
    const word = data.match(/<h1[^>]*data-qa="word"[^>]*>(.*?)<\/h1>/)?.[1]?.trim();
    const meaning = data.match(/<p[^>]*data-qa="definition"[^>]*>(.*?)<\/p>/)?.[1]?.trim();
    const example = data.match(/<p[^>]*data-qa="example"[^>]*>(.*?)<\/p>/)?.[1]?.trim();

    if (word && meaning && example) {
      const result = {
        word: word,
        meaning: meaning,
        example: example
      };

      console.log('每日一词抓取成功:', result);
      $done({ body: JSON.stringify(result) });
    } else {
      console.error('未找到每日一词内容，页面结构可能已变更');
      $done({ error: '页面结构变更，无法解析' });
    }
  } catch (err) {
    console.error('解析错误:', err);
    $done({ error: '解析页面时出现异常' });
  }
});