const { createServer } = require("http");

async function getTodosHtml() {
  await new Promise((res) => setTimeout(res, 2000));
  return `
    <ol>
      <li>Write a blog post</li>
      <li>Drink water</li>
    </ol>
  `;
}

createServer(async (req, res) => {
  const todosHtmlPromise = getTodosHtml();
  res.write(`
    <html>
      <head><title>Todos</title></head>
      <body>
        <h1>My Todos:</h1>
        <div id="loading-todos">loading...</div>
        <div>
        <button onclick="window.location.reload()" type="button">reload page</button>
      </body>
    </html>
  `);

  const todosHtml = await todosHtmlPromise;

  res.write(`
    <template id="for-loading-todos">${todosHtml}</template>
    <script>
    (() => {
      const template = document.querySelector("#for-loading-todos");
      document.querySelector("#loading-todos").outerHTML = template.innerHTML;
      template.remove();
    })()
    </script>
  `);

  res.end();
}).listen(8080);
