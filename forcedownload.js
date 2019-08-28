  const forceDownload = function(blob, filename) {
	const a = document.createElement('a')
	a.download = filename
	a.href = blob
	a.click()
  }
  const downloadResource = function(url, filename) {
	if (!filename) filename = url.split('\\').pop().split('/').pop()
	fetch(url, {
	  headers: new Headers({
		'Origin': location.origin
	  }),
	  mode: 'cors'
	})
	  .then(response => response.blob())
	  .then(blob => {
		const blobUrl = window.URL.createObjectURL(blob)
		forceDownload(blobUrl, filename)
	  })
	  .catch(e => console.error(e))
  }