const handleApiError = error => {
  console.error('API Error', error);
  alert(
    'The colormind API seems to have some problems. Please try again later'
  );
};

const fetchPalettes = () => {
  return fetch('http://colormind.io/api/', {
    body: '{"model":"default"}',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  })
    .then(response => response.json())
    .catch(handleApiError);
};

const createPaletteMarkup = data => {
  JSON.stringify(data);
  const colours = data.result.map(colour => colour);
  const rgbValues = colours.map(colour => `rgb(${colour})`);
  const headingColour = `rgb(${colours[Math.floor(Math.random() * 4) + 0]})`;
  console.log(headingColour);
  const boxes = rgbValues
    .map(value => {
      return `<div class='card' style="background-color:${value}"></div>`;
    })
    .join('');

  const paletteMarkup = `<h1 style="color:${headingColour}">Welcome to Colour Lovahs</h1><div class='container'>${boxes}</div>`;

  return paletteMarkup;
};

const insertPalettes = palettesMarkup => {
  document.body.insertAdjacentHTML('afterbegin', palettesMarkup);
};

(() => {
  fetchPalettes().then(data => {
    const palettesMarkup = createPaletteMarkup(data);
    // insert the created markup into our DOM as children of the <body> element
    insertPalettes(palettesMarkup);
  });
})();
