var args = $.args;
var moment = require('alloy/moment');

Alloy.Collections.gamenights.fetch({
	reset: true
});

function onClickClose() {
	$.diary.close();
}


function onClickDay(e) {
	var w = Alloy.createController("/dayDetail", {
		id: $.lst_days.sections[0].getItemAt(e.itemIndex).properties.dayId
	}).getView();
	w.open();
}

function onClickNew() {
	var w = Alloy.createController("/dayNew").getView();
	w.open();
}

function dataTransform(model) {
	var d = model.get("date");
	d = moment(d).format("DD.MM.YYYY");

	var r = model.get("rating");
	if (r == 2) {
		r = "\uf118";
	} else if (r == 1) {
		r = "\uf11a";
	} else {
		r = "\uf119";
	}

	var file = Ti.Filesystem.getFile(Alloy.Globals.folder, model.get("image"));
	if (model.get("image") == "" || !file.exists()) {
		file = "/images/jaciel-melnik-399287-unsplash.jpg";
	} else {
		file = file.nativePath
	}
	var games = model.get("games").replace(/\|/g, ", ")

	console.log(file);

	return {
		id: model.get("id"),
		title: model.get("title"),
		count: (model.get("players") != "") ? model.get("players").split("|").length : 0,
		image: file,
		rating: r,
		date: d,
		games: games
	}
}

function onOpen() {
	args.onOpen();
}

function onClose() {
	args.onClose();
	$.destroy();
}

$.lst_days.addEventListener("itemclick", onClickDay);
$.btn_add.addEventListener("click", onClickNew);
$.diary.addEventListener("open", onOpen);
$.diary.addEventListener("close", onClose);
