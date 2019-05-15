const fs = require('fs')

function loadMD() {
	if (process.argv.length < 3) {
		console.log('Missing file name')
		process.exit(1)
	}
	let fname = process.argv[2]
	try {
		return [fname, fs.readFileSync(fname, 'utf-8')]
	}
	catch (err) {
		console.log('Could not load file ' + fname)
		process.exit(2)
	}
}

function main() {
	let [fname, md] = loadMD()
	let html = fs.readFileSync('index.html', 'utf-8')
	html.replace('{{title}}', fname)
	console.log(html)
}

main()