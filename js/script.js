function fetch_palettes() {
    return fetch('https://colorlovers.now.sh/api/palettes').then(function __parse_colorlovers_json(response) {
        return response.json();
    }).catch(handle_api_error);
}

function handle_api_error(err) {
    console.error('API Error', err);
    alert('The colorlovers API seems to have some problems. Please try again later');
}

function format_date(raw_date) {
    const parsed_date = new Date(raw_date);
    const date_options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return parsed_date.toLocaleDateString('en-gb', date_options);
}

function create_palettes_markup(palettes) {
    return palettes.map(create_palette_markup);
}

function insert_palettes(palettes_markup) {
    const palettes_fragment = document.createDocumentFragment();
    palettes_markup.forEach(function __append_markup_to_docfrag(markup) {
        let container_element = document.createElement('span');
        container_element.insertAdjacentHTML('afterbegin', markup);
        palettes_fragment.appendChild(container_element.firstElementChild);
    })
    document.body.appendChild(palettes_fragment);
}

function create_colourbox_markup(colour) {
    return `<div class='mini--box' style='background: #${colour};'></div>`
}

function create_palette_markup(palette) {
    const colorbox_markup = palette.colors.map(create_colourbox_markup).join('');
    const palette_date_created = format_date(palette.dateCreated);
    const markup = `
        <div class='card card-1'>
           <div class='container'>
                ${palette.title}
                <span class='end'>${palette_date_created}</span>
                <p>
                    <span class='big-number'> ${palette.numViews} </span> views &nbsp;
                    <span class='big-number'> ${palette.numVotes} </span> votes &nbsp;
                    <span class='big-number'> ${palette.numComments} </span> comments &nbsp;
                    <span class='big-number'> ${palette.numHearts} </span> hearts &nbsp;
                </p>
            </div>
            <div class='box'>${colorbox_markup}</div>
        </div>`;
    return markup;
}

(function __init() {
    // fetch the data from the API & execute `__create_palettes_markup_and_insert` once the data is returned & no error happened
    fetch_palettes().then(function __create_palettes_markup_and_insert(palettes) {
        // create the markup for our palettes
        const palettes_markup = create_palettes_markup(palettes)
        // insert the created markup into our DOM as children of the <body> element
        insert_palettes(palettes_markup)
    })
})()
