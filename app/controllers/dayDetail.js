var args = $.args;
var moment = require("alloy/moment");
$.gamenights.fetch({
	id: args.id,
	success: function(e) {
		var file = Ti.Filesystem.getFile(Alloy.Globals.folder, e.get("image"));
		if (e.get("image") != "" && file.exists()) {
			$.img_back.image = file.nativePath
		} else {
			$.img_back.image = "/images/jaciel-melnik-399287-unsplash.jpg";
		}
		$.lbl_date.text = moment(e.get("date")).format("DD.MM.YYYY");
		$.dayDetail.title = e.get("title");

		$.lbl_players.text = e.get("players").replace(/\|/g, "\n");
		$.lbl_games.text = e.get("games").replace(/\|/g, "\n");

		var rating = e.get("rating");
		if (rating == 2) {
			$.lbl_rating.text = "\uf118";
		} else if (rating == 1) {
			$.lbl_rating.text = "\uf11a";
		} else {
			$.lbl_rating.text = "\uf119";
		}
		rating = null;
	}
})

function onClickClose() {
	$.dayDetail.close();
}

function onClickDelete(e) {
	var dlg = Ti.UI.createAlertDialog({
		title: "Delete",
		message: "Really delete item?",
		buttonNames: ["yes", "no"]
	});
	dlg.show();
	dlg.addEventListener("click", function(e) {
		if (e.index == 0) {
			Alloy.Collections.gamenights.where({
				id: args.id
			})[0].destroy();
			$.dayDetail.close();
		}
	})
}

function onClose() {
	$.destroy();
}

$.btn_delete.addEventListener("click", onClickDelete);
$.dayDetail.addEventListener("close", onClose);
