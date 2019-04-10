#!/usr/bin/env node
fs = require("fs")
database="database-1.cluster-cqrldnljwpmo.us-east-2.rds.amazonaws.com"
password="HFBoLCkjwd6YkxTiV7Tl"
username="admin"

// require("./extensions.js")()
// path="./gardiner.tsv"
dictionary = "my_egyptian_dictionary.csv"
require("../gardiner_map.js")

lines = []
gardiners = []
// gardiners_tsv="/me/Documents/uruk_egypt/gardiner.csv"
gardiners_tsv = "../gardiner.csv"

loadVocab = function () {
	if(gardiners.length>0)return console.log("already loaded")
	lines = fs.readFileSync(dictionary).toString().split('\n')
	lines.concat(fs.readFileSync("../changes.txt").toString().split('\n'))
	gardiners = fs.readFileSync(gardiners_tsv).toString().split('\n')
	// gardiners2=gardiners.map(x=>x.split("\t"))
	// for (var arr of gardiners2) {
	// 	hiero=arr[1]
	// 	name=arr[2]
	// 	speak=arr[3]
	// 	if(name && !gardiner_map[name])
	// 		gardiner_map[name]=hiero
	// 	if(speak && !gardiner_map[speak])
	// 		gardiner_map[speak]=hiero
	// }
}
// target="_none"
//  POST wtf
// submit()" onsubmit ??
comment_form = (l) => l
comment_form_x = (l) => `
<form action='add' method="GET" >
	<input name='h' value='${l.replace("'","’")}' type="hidden"/>
	<input name='x' id='x' autocomplete="off"/>
	<input type="submit" onClick="setTimeout(()=>x.value='',100)" value="+"/>
</form>`
/* */
next = false
find_word = function (query) {
	query = query.replace(/\-/g, " ")
	qi = new RegExp(query, "i")
	glyph = query.replace(/[\w\s]*/g, '')
	glyphs_only = glyph.len > 0
	res = []
	// if (glyphs_only)
	// 	res.push("glyphs_only")
	for (line of gardiners) {
		if (line.match(qi) || glyphs_only && line.match(glyph))
			res.push(line)
	}
	res.push(comment_form(query))
	res.push("")
	for (line of lines) {
		line = line.replace("  ", " ")
		if (line.len < 1) {
			next = false;
			last = false
			continue
		}
		glyphs = line.replace(/[\w\s]*/g, '')
		if (res.length > 200) break
		if (next) {
			res.push(line)
			res.push(comment_form(line))
			next=false
			last = false
			continue
		}
		if (glyphs_only && glyphs.match(glyph)) {
				last = false
				res.push(line)
				next = true
		}
		else if (!glyphs_only && line.match(qi)) {
			if(last)res.push(last)
			res.push(line);
			res.push(comment_form(line));
			// next = true
			next = false
		}
		if (glyphs.match(glyph))
			last = line
	}
	if (res.len = 0)
		return "NONE"
	else
		return res
}

function lookup(){
}
function handler(event, context, callback) {
	loadVocab()
	result= find_word("hope")
	callback(undefined, result)
}
exports.handler = handler
