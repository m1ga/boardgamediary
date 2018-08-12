var args = $.args;
var rating = 2;
var moment = require("alloy/moment");
var gameDate = new Date().getTime();
var isWorking = false;

$.lbl_date.text = moment().format("DD.MM.YYYY");

function addPlayer(obj) {
	var w = Alloy.createWidget("player", {
		name: obj.name,
		id: obj.id
	});
	w.addEventListener("click",onClickDeletePlayer);
	$.view_player.add(w.getView());
}

function addGame(obj) {
	var w = Alloy.createWidget("player", {
		name: obj.name,
		id: obj.id,
		backgroundColor: "#ff5400"
	});
	w.addEventListener("click",onClickDeleteGame);
	$.view_games.add(w.getView());
}
function onClickDeletePlayer(e) {
	$.view_player.remove(e.source);
}
function onClickDeleteGame(e) {
	$.view_games.remove(e.source);
}

function onClickAddPlayer() {
	var w = Alloy.createController("/players", {
		addPlayer: addPlayer
	}).getView();
	w.open();
}

function onClickAddGame() {
	var w = Alloy.createController("/games", {
		addGame: addGame
	}).getView();
	w.open();
}

function onClickClose() {
	$.dayNew.close();
}

function onClickOk(e) {
	if (!isWorking) {
		isWorking = true;
		var players = [];
		var games = [];
		var fname = "";
		_.each($.view_player.children, function(item) {
			players.push(item.getName());
		});
		_.each($.view_games.children, function(item) {
			games.push(item.getName());
		});

		var file = Ti.Filesystem.getFile(Alloy.Globals.folder, "tmp.jpg");
		if (file.exists()) {
			fname = (new Date().getTime()) + ".jpg";
			var newFile = Ti.Filesystem.getFile(Alloy.Globals.folder, fname);
			file.move(newFile.nativePath);
		}

		var mod = Alloy.createModel("gamenights", {
			title: $.tf_title.value,
			date: gameDate,
			rating: rating,
			players: (players.length > 0) ? players.join("|") : "",
			image: fname,
			games: (games.length > 0) ? games.join("|") : "",
			text: $.tf_text.value
		});
		mod.save();

		Alloy.Collections.gamenights.fetch();

		file = null;
		fname = null;
		newFile = null;
		mod = null;
		$.destroy();
		$.dayNew.close();
	}
}

function onClickCancel(e) {
	var file = Ti.Filesystem.getFile(Alloy.Globals.folder, "tmp.jpg");
	file.deleteFile();
	$.dayNew.close();
}

function onClickRating() {
	$.view_rating.show();
}

function onClickRatingOk() {
	$.view_rating.hide();

	if (rating == 2) {
		$.lbl_rating.text = "\uf118";
	} else if (rating == 1) {
		$.lbl_rating.text = "\uf11a";
	} else {
		$.lbl_rating.text = "\uf119";
	}
}

function onClickRateButton(e) {
	var btnOn = $.btn_rate_happy;
	var btnOff1 = $.btn_rate_ok;
	var btnOff2 = $.btn_rate_sad;

	var lblOn = $.lbl_happy;
	var lblOff1 = $.lbl_ok;
	var lblOff2 = $.lbl_sad;

	rating = 2;

	if (e.source.id == "btn_rate_ok") {
		btnOn = $.btn_rate_ok;
		btnOff1 = $.btn_rate_happy;
		btnOff2 = $.btn_rate_sad;

		lblOn = $.lbl_ok;
		lblOff1 = $.lbl_happy;
		lblOff2 = $.lbl_sad;

		rating = 1;
	} else if (e.source.id == "btn_rate_sad") {
		btnOn = $.btn_rate_sad;
		btnOff1 = $.btn_rate_happy;
		btnOff2 = $.btn_rate_ok;

		lblOn = $.lbl_sad;
		lblOff1 = $.lbl_happy;
		lblOff2 = $.lbl_ok;

		rating = 0;
	}

	btnOn.backgroundColor = Alloy.CFG.color.accent;
	btnOff1.backgroundColor = btnOff2.backgroundColor = "transparent";

	lblOn.color = "#fff";
	lblOff1.color = lblOff2.color = "#000";

}


function onClickDate(e) {
	var picker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE,
		minDate: new Date(2009, 0, 1)
	});

	picker.showDatePickerDialog({
		value: new Date(),
		callback: function(e) {
			if (e.cancel) {
				//
			} else {
				gameDate = moment(e.value).unix() * 1000;
				$.lbl_date.text = moment(e.value).format("DD.MM.YYYY");
			}
		}
	});
}

function onCamera(e) {
	var blob = e.media;
	var w = e.media.width;
	var h = e.media.height;
	var r = h / w;
	w = 800;
	h = r * w;
	blob = blob.imageAsResized(w, h);
	$.img_image.image = blob;
	var file = Ti.Filesystem.getFile(Alloy.Globals.folder, "tmp.jpg");
	file.write(blob);
}

function onClickPhoto() {
	var permissions = ['android.permission.CAMERA', 'android.permission.READ_EXTERNAL_STORAGE'];
	var hasPermission = Ti.Android.hasPermission(permissions);
	if (hasPermission) {
		Ti.Media.showCamera({
			success: onCamera
		});
	} else {
		Ti.Android.requestPermissions(permissions, function(e) {
			if (e.success) {
				Ti.Media.showCamera({
					success: onCamera
				});
			}
		});
	}

}

$.btn_rate_happy.addEventListener("click", onClickRateButton);
$.btn_rate_ok.addEventListener("click", onClickRateButton);
$.btn_rate_sad.addEventListener("click", onClickRateButton);

$.btn_rating_ok.addEventListener("click", onClickRatingOk);
$.btn_rating.addEventListener("click", onClickRating);
$.btn_ok.addEventListener("click", onClickOk);
$.btn_cancel.addEventListener("click", onClickCancel);
$.btn_date.addEventListener("click", onClickDate);
$.btn_player_add.addEventListener("click", onClickAddPlayer);
$.btn_game_add.addEventListener("click", onClickAddGame);
$.btn_image.addEventListener("click", onClickPhoto);
