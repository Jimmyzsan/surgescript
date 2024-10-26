const url = 'https://www.spanishdict.com/wordoftheday';

// 使用 axios 进行请求
$httpClient.get(url, (error, response, data) => {
  if (error) {
    console.log('请求失败:', error);
    $done({ error: '无法抓取每日一词' });
    return;
  }

  if (response.status !== 200) {
    console.log('非200状态码:', response.status);
    $done({ error: '请求失败，状态码：' + response.status });
    return;
  }

  try {
    const wordMatch = data.match(/<h1.*?data-qa="word">(.*?)<\/h1>/);
    const meaningMatch = data.match(/<p.*?data-qa="definition">(.*?)<\/p>/);
    const exampleMatch = data.match(/<p.*?data-qa="example">(.*?)<\/p>/);

    if (wordMatch && meaningMatch && exampleMatch) {
      const result = {
        word: wordMatch[1].trim(),
        meaning: meaningMatch[1].trim(),
        example: exampleMatch[1].trim()
      };

      console.log('每日一词:', result);
      $done({ body: JSON.stringify(result) });
    } else {
      console.log('解析失败：无法找到匹配内容');
      $done({ error: '页面结构变化，未找到单词信息' });
    }
  } catch (e) {
    console.error('解析异常:', e);
    $done({ error: '解析页面时出错' });
  }
});