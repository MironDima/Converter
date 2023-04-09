const coursValute = {}
const elemUsd = document.querySelector('[data-value="USD"]')
const elemEur = document.querySelector('[data-value="EUR"]')
const setInput = document.querySelector('#set')
const getInput = document.querySelector('#get')
const selectSet = document.querySelector('#setSel')
const selectGet = document.querySelector('#getSel')

const render = (data) => {
	elemUsd.textContent = coursValute.USD.Value.toFixed(2)
	elemEur.textContent = coursValute.EUR.Value.toFixed(2)
	if (coursValute.USD.Value > coursValute.USD.Previous) {
		elemUsd.classList.add('top')
	} else {
		elemUsd.classList.add('bottom')
	}
	if (coursValute.EUR.Value > coursValute.EUR.Previous) {
		elemEur.classList.add('top')
	} else {
		elemEur.classList.add('bottom')
	}
}
setInput.addEventListener('input', () => {
	if (selectSet.value === 'RUB') {
		console.log(selectSet.value === 'RUB');
		getInput.value = (parseFloat(setInput.value) / coursValute[selectGet.value].Value).toFixed(2)
	} else if (selectSet.value === selectGet.value) {
		getInput.value = (parseFloat(setInput.value))
	}
	else {
		console.log(selectSet.value !== 'RUB');
		getInput.value = (parseFloat(setInput.value) * coursValute.USD.Value).toFixed(2)
	}
})

selectSet.addEventListener('input', () => {
	if (selectSet.value === 'RUB') {
		console.log(selectSet.value === 'RUB');
		getInput.value = (parseFloat(setInput.value) / coursValute[selectGet.value].Value).toFixed(2)
	} else if (selectSet.value === selectGet.value) {
		getInput.value = (parseFloat(setInput.value))
	}
	else {
		console.log(selectSet.value !== 'RUB');
		getInput.value = (parseFloat(setInput.value) * coursValute.USD.Value).toFixed(2)
	}
})

getInput.addEventListener('input', () => {
	if (selectGet.value === 'RUB') {
		console.log(selectGet.value === 'RUB');
		setInput.value = (parseFloat(getInput.value) / coursValute[selectSet.value].Value).toFixed(2)
	} else if (selectSet.value === selectGet.value) {
		setInput.value = (parseFloat(getInput.value))
	}
	else {
		console.log(selectGet.value === 'RUB');
		setInput.value = (parseFloat(getInput.value) * coursValute.USD.Value).toFixed(2)
	}
})

selectGet.addEventListener('input', () => {
	if (selectGet.value === 'RUB') {
		console.log(selectGet.value === 'RUB');
		setInput.value = (parseFloat(getInput.value) / coursValute[selectSet.value].Value).toFixed(2)
	} else if (selectSet.value === selectGet.value) {
		setInput.value = (parseFloat(getInput.value))
	}
	else {
		console.log(selectGet.value === 'RUB');
		setInput.value = (parseFloat(getInput.value) * coursValute.USD.Value).toFixed(2)
	}
})

const getData = async (url) => {
	const resValutes = await fetch(url)
	const valutes = await resValutes.json()
	coursValute.USD = valutes.Valute.USD
	coursValute.EUR = valutes.Valute.EUR

	console.log(coursValute);
	return coursValute
}
getData('https://www.cbr-xml-daily.ru/daily_json.js')
	.then(data => render(data))
	.catch(error => console.log(error))

