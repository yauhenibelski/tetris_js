import createElement from "./createElement.js";

const parseLocalStorage = JSON.parse(localStorage.getItem('tetris'));

export let results = {
  results: parseLocalStorage ? parseLocalStorage.results : [],
  addResult: function (result) { this.results.push(result)},
};

export const saveResultInLocalStorage = () => {
  localStorage.setItem('tetris',JSON.stringify(results));
};

export const showResult = (container) => {
  container.innerHTML = '';

  const parseLocalStorage = JSON.parse(localStorage.getItem('tetris'));
  const noResult = createElement({ tagName: 'h2', text: 'No results' });

  if (parseLocalStorage) {
    results.results = parseLocalStorage.results;
    let { results: arr } = results;

    arr = arr.sort((a, b) => Number(b[0]) - Number(a[0]));

    arr.forEach((val, i) => {
      const [lines, data] = val;
      if (i < 10) {
        const res = createElement({ tagName: 'p', text: `${i + 1}) Lines: ${lines} ${data}` });
        container.append(res);
      }
    });

  } else {
    container.append(noResult);
  }
}