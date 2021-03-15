// Get cupcakes from api

const BASE_URL = 'http://127.0.0.1:5000/api';

async function getCupcakes() {
	const resp = await axios.get(`${BASE_URL}/cupcakes`);
	for (const cupcake of resp.data.cupcakes) {
		let newCupcake = createCupcakeHTML(cupcake);
		$('.cupcake-list').append(newCupcake);
	}
	// console.log(resp);
}

function createCupcakeHTML(cupcake) {
	// cupcake = JSON.parse(cupcake);
	// console.log(cupcake);
	// console.log(cupcake.flavor);
	return `
        <div data-cupcake-id=${cupcake.id}>
          <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
          </li>
          <img class="Cupcake-img"
                src="${cupcake.image}"
                alt="(no image provided)">
        </div>
      `;
}

$('#new-cupcake-form').on('submit', async function(event) {
	event.preventDefault();

	let flavor = $('#form-flavor').val();
	let size = $('#form-size').val();
	let rating = $('#form-rating').val();
	let image = $('#form-image').val();
	console.log(flavor, size, rating, image);
	const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
		flavor,
		size,
		rating,
		image
	});

	let newCupcake = $(createCupcakeHTML(newCupcakeResponse.data.cupcake));
	$('.cupcake-list').append(newCupcake);
	$('.add-cupcake').trigger('reset');
});

getCupcakes();
