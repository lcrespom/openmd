const fs = require('fs')
const path = require('path')
const marked = require('marked')

function loadMD() {
	if (process.argv.length < 3) {
		console.log('Missing file name')
		process.exit(1)
	}
	let fname = process.argv[2]
	try {
		return [path.basename(fname), fs.readFileSync(fname, 'utf-8')]
	}
	catch (err) {
		console.log('Could not load file ' + fname)
		process.exit(2)
	}
}

function replaceTag(text, tag, value) {
	let result = []
	for (let line of text.split('\n')) {
		result.push(line.replace(`{{${tag}}}`, value))
	}
	return result.join('\n')
}

function main() {
	let [fname, md] = loadMD()
	let html = fs.readFileSync('index.html', 'utf-8')
	html = replaceTag(html, 'title', fname)
	html = replaceTag(html, 'content', marked(md))
	console.log(html)
}

main()