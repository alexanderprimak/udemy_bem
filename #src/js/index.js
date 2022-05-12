$(document).ready(function () {
	$('.carousel__wrapper').slick({
		prevArrow: `<button type="button" class="carousel__arrow-left"><img src="img/icons/arrow_l.png" alt="arrow"></button>`,
		nextArrow: `<button type="button" class="carousel__arrow-right"><img src="img/icons/arrow_r.png" alt="arrow"></button>`,
	})
})
const content = document.querySelectorAll('.catalog__content')
const contentItem = document.querySelectorAll('.content-item')
const tabs = document.querySelectorAll('.catalog__tab')
const wrapperInfo = document.querySelectorAll('.content-item__wrapper-info')
const wrapper = document.querySelectorAll('.content-item__wrapper')
const changeInnerMoreLink = e => {
	e.target.innerHTML === 'ПОДРОБНЕЕ'
		? (e.target.innerHTML = 'НАЗАД')
		: (e.target.innerHTML = 'ПОДРОБНЕЕ')
}

const removeActiveTab = () => {
	tabs.forEach(item => {
		item.classList.remove('catalog__tab_active')
	})
}

const closeTextInfo = () => {
	wrapperInfo.forEach(item => {
		item.classList.add('content-item__wrapper-info_disable')
	})
	wrapper.forEach(item => {
		item.classList.remove('content-item__wrapper_disable')
	})
}

contentItem.forEach(item => {
	const [wrapper, wrapperInfo, link] = item.children
	link.addEventListener('click', e => {
		e.preventDefault()
		changeInnerMoreLink(e)
		wrapper.classList.toggle('content-item__wrapper_disable')
		wrapperInfo.classList.toggle('content-item__wrapper-info_disable')
	})
})

tabs.forEach(tab => {
	tab.addEventListener('click', () => {
		removeActiveTab()
		closeTextInfo()
		tab.classList.add('catalog__tab_active')
		const attribute = tab.attributes.data.value
		content.forEach(item => {
			attribute === item.attributes.data.value
				? item.classList.add('catalog__content_active')
				: item.classList.remove('catalog__content_active')
		})
	})
})

// work with modals

const buttons = document.querySelectorAll('button')
const overlays = document.querySelectorAll('.overlay')

const overlayActive = data => {
	overlays.forEach(overlay => {
		const [dataOver] = overlay.attributes
		data === dataOver.value ? overlay.classList.add('overlay_active') : null
	})
}
buttons.forEach(btn => {
	btn.addEventListener('click', e => {
		const [data] = e.target.attributes
		overlayActive(data.value)
	})
})
