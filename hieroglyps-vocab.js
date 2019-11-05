#!/usr/bin/env node
// SERVERSIDE!
fs = require("fs")
require("./extensions.js")()
// path="./gardiner.tsv"
dictionary = "my_egyptian_dictionary.csv"
// console.log(Gardiner_Map['N']);
// console.log(Gardiner_Map['KOPP']);
lines = []
gardiners = []
// gardiners_tsv="/me/Documents/uruk_egypt/gardiner.csv"
gardiners_tsv = "gardiner.csv"
cuneiform_csv = "cuneiform.csv"
gardiner_codes="gardiner_codes.js"
// use_cuneiforms=1

function loadCuneiforms(){
	cuneiforms={}
	variants={}
	addCuneiform=(sign,names)=>{
		names=names.replaceAll("/"," ")
		names=names.replaceAll(/[^a-zA-Z_0-9 \+\-āûšşŠḫḪ]/," ")
		names=names.replaceAll("  "," ")
		for(name of names.split(" ")){
			if(!name)continue 
			if(!cuneiforms[name]){
				cuneiforms[name]=sign
				variants[name]=[sign]
			}
		  else if(!variants[name].contains(sign)){
		  	c=variants[name].length||0
		  	cuneiforms[name+"_"+c]=sign
		  	variants[name].push(sign)
		  }
		  // if(name=='a')console.log(names,sign)
		}
	}
	for (var line of readlines(cuneiform_csv)) {
		arr=line.split(",")
		if(!arr[1])continue 
	  addCuneiform(arr[1],arr[0])
	}
  for (var line of readlines(cuneiform_csv)) {
		arr=line.split(",")
		if(!arr[5])continue 
	  addCuneiform(arr[1],arr[5]+" "+arr[6])
	}
	for (var line of readlines("cuneiform_unicode.csv")) {
		arr=line.split("\t")
		if(!arr[1])continue
		addCuneiform(arr[1],arr[0])// normal
		addCuneiform(arr[0],arr[1])// other
	}

	if(0){//regenerate_map_from_csv NOT COMPATIBLE with nodemon
		// console.log(cuneiforms)
		out_file="script/cuneiform_map.js",
		write("// AUTO GENERATED by hieroglyphs-vocab.js\n",out_file)
		append("Cuneiform_Map=",out_file)
		data=json5(cuneiforms).replaceAll(",",",\n")
		append(data,out_file)
	  // file rewrite NOT COMPATIBLE with nodemon
	}
}

loadVocab = function () {
	lines = readlines(dictionary)
	lines.concat(readlines("./changes.txt"))
	gardiners = readlines(gardiners_tsv)
	// codes = readlines(gardiner_codes)
	gardiners2=gardiners.map(x=>x.split("\t"))
	// loadCuneiforms()
}
loadVocab()
// console.log(cuneiforms['kar'])

// target="_none"
//  POST wtf
// submit()" onsubmit ??
comment_form = (l) => `
<form action='add' method="GET" >
	<input name='h' value='${l.replace("'","’")}' type="hidden"/>
	<input name='x' placeholder="comment / memo" id='x' autocomplete="off"/>
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
		if (line.has(qi) || glyphs_only && line.has(glyph))
			res.push(line)
	}
	// res.push(comment_form(query))
	// res.push("")
	for (line of lines) {
		line = line.replace("  ", " ")
		line = line.replace("+","")
		line = line.replace("-","")
		if (line.len < 1) {
			continue
		}
		glyphs = line.replace(/[\w\s]*/g, '')
		if (glyphs_only && glyphs.has(glyph) || line.has(qi)) {
			res.push(line)
		}
		if (res.length > 200) break
	}
	res=format_table(res)
	if (res.len = 0)
		return "NONE"
	else
		return res
}
function format_table(res){
	table=[]
	table+=["<table class='sorted'>"]
	for(line of res){
		line=line.replace(/(.*?)\/.*?$/,"$1") // drop other comments
		// line=line.replace(/(.*)\|.*?$/,"$1") # drop comment
		line=line.replaceAll("\t\t","")
		line=line.replaceAll("\t","|")
		line=line.replace("|","</td><td>")
		line=line.replace("|","</td><td>")
		line=line.replace("|","</td><td>")
				line=line.replace(/\/\s*$/,'')
				line=line.replaceAll("|"," / ") // remaining ones
		table+="<tr><td>"+line+"</td></tr>"
	}
	table+=["</table>"]
	return table
}

function gardiner_code(word){
	res=""
	for(c of word){
		res+=codes[c] || c
	}
	return res
}
