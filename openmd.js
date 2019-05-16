const fs = require('fs')
const os = require('os')
const path = require('path')

const marked = require('marked')
const open = require('open')


function loadInputFile() {
	if (process.argv.length < 3) {
		showUsage()
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

function showUsage() {
	console.log(`Usage:
  node openmd [filename.md] [theme]
    filename.md - mandatory - the markdown file to display.
    theme - optional - the look & feel
      Can use 'splendor', 'retro', 'air' and 'modest'. Defaults to 'modest'.`)
}

function getTheme() {
	return process.argv[3] || 'modest'
}

function replaceTag(text, tag, value) {
	return text.replace(new RegExp(`{{${tag}}}`, 'g'), value)
}

function openHtml(html, fname) {
	let oname = path.join(os.tmpdir(), fname + '.html')
	fs.writeFileSync(oname, html)
	open('file://' + oname)
}

function main() {
	let [fname, md] = loadInputFile()
	let html = fs.readFileSync('index.html', 'utf-8')
	html = replaceTag(html, 'title', fname)
	html = replaceTag(html, 'content', marked(md))
	html = replaceTag(html, 'theme', getTheme())
	openHtml(html, fname)
}


main()