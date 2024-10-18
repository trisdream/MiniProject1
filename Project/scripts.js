//fetching data
fetch("https://ghibli.rest/films")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response faild" + response.statusText);
    }
    return response.json();
  })

  .then((json) => console.log(json));
