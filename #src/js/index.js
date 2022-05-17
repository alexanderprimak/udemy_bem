/// work with slider

$(document).ready(function () {
	$('.carousel__wrapper').slick({
		prevArrow: `<button type="button" class="carousel__arrow-left"><img src="img/icons/arrow_l.png" alt="arrow"></button>`,
		nextArrow: `<button type="button" class="carousel__arrow-right"><img src="img/icons/arrow_r.png" alt="arrow"></button>`,
	})
})

//// work with catalog

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
const close = document.querySelectorAll('.modal__close')

const changeDescModal = (overlay, value) => {
	const [modal] = overlay.children
	const [close, title, desc] = modal.children
	desc.innerHTML = value
}

const overlayShow = (attributeBtn, value) => {
	overlays.forEach(overlay => {
		const [attributeModal] = overlay.attributes
		attributeModal.value === 'thank' ? changeDescModal(overlay, value) : null
		attributeBtn === attributeModal.value
			? overlay.classList.add('overlay_active')
			: null
	})
}

const overlayClose = () => {
	overlays.forEach(overlay => {
		overlay.classList.remove('overlay_active')
	})
}

const getElements = e => {
	const [content_item] = e.target.parentElement.parentElement.children
	const [img, sub_title] = content_item.children
	const [attributeBtn] = e.target.attributes
	const title = sub_title.innerHTML
	const value = attributeBtn.value

	return { title, value }
}

buttons.forEach(btn => {
	btn.addEventListener('click', event => {
		const elementObject = getElements(event)
		const { title, value } = elementObject
		overlayShow(value, title)
	})
})

close.forEach(item => {
	item.addEventListener('click', () => {
		overlayClose()
	})
})
