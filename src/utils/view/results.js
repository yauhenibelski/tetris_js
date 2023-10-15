export const results = {
  results: [],
  addResult: function (result) { this.results.push(result)},
};

export const saveResultInLocalStorage = () => {
  localStorage.setItem(
    'tetris',
    JSON.stringify(results),
  );
};