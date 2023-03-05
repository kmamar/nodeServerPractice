import http from "http";
import fetch from "node-fetch";
const server = http
  .createServer((req, res) => {
    const url = req.url;
    let tableData =
      "<table border='1'><tr><th>name</th><th>height</th><th>birth year</th><th>gender</th><th>url</th></tr>";
    const imageUrl = "https://tinyurl.com/2zvyjpf7";

    if (url === "/") {
      res.setHeader("Content-Type", "text/html");
      res.write("<h1>Home page</h1><br><img src=" + imageUrl + ">");
    } else if (url === "/message") {
      res.write("welcome to message page");
      res.end();
    } else if (url === "/list") {
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => {
        createData(data.results);
          res.write(tableData);
          res.end();
        });
    } else {
      res.write("<h1>404! Page not found</h1>");
      res.end();
    }
    function createData(data) {
      data.forEach((element) => {
        tableData += `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td><a href="${element.url}">${element.url}</a></td></tr>`;
      });
      tableData += `</table>`;
    }
  })
  .listen(3030, () => console.log("server is listening"));
