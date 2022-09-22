
const sdk = new window.sfdc.BlockSDK()

function debounce (func, wait, immediate) {
	let timeout
	return function() {
		let context = this, args = arguments
		let later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	};
}

document.getElementById('removeGap').addEventListener('change', () => {
	removeGap = document.getElementById('removeGap').checked
})

function paintSettings() {
	document.getElementById('ratingColor').value = ratingColor
	document.getElementById('hoverSelectedColor').value = hoverSelectedColor
}

function paintDisplay() {
	ratingColor = document.getElementById('ratingColor').value
	hoverSelectedColor = document.getElementById('hoverSelectedColor').value

	sdk.setContent(
		`
		<style>
		${removeGap ? `.ie-rating-group { font-size: 0} `: `` }
		.ie-rating-group label:hover .ie-icon-star{
			color: ${hoverSelectedColor} !important
		}
		.ie-rating-group label .ie-btn-wrap:hover ~* .ie-icon-star{
			color: ${ratingColor} !important
		}
		</style>
		`
  );

	sdk.setData({
		removeGap: removeGap,
		ratingColor: ratingColor,
		hoverSelectedColor: hoverSelectedColor,
	});
}

sdk.getData(function (data) {
	ratingColor = data.ratingColor || '#cccccc'
	hoverSelectedColor = data.hoverSelectedColor || '#309ddd'
	removeGap = data.removeGap || false
	document.getElementById('removeGap').checked = removeGap

	paintSettings()
  paintDisplay()
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintDisplay, 500)()
});

