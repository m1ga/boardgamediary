// TODO: refactor to widget - use it in players.js too
//
var args = $.args;
Alloy.Collections.games.fetch({
	reset: true
});

function onClickClose() {
	$.games.close();
}

function onClickAdd() {
	if ($.tf_name.value != "") {
		var mod = Alloy.createModel("games", {
			name: $.tf_name.value
		});
		mod.save();

		$.lst_player.sections[0].appendItems([{
			name: {
				text: $.tf_name.value
			},
			gameId: mod.get("id"),
			active: true,
			checkbox: {
				text: "\uf00d"
			},
			properties: {
				height: 50
			}
		}]);

		$.tf_name.value = "";
	}
}

function onClickOk() {
	if ($.tf_name.value != "") {
		alert("Add game first or clear textfield");
	} else {
		// get active games
		var items = $.lst_player.sections[0].getItems();

		_.each(items, function(item) {
			if (item.active) {
				args.addGame({
					id: item.properties.gameId,
					name: item.name.text
				});
			}
		})
		$.games.close();
	}
}

function onClickItem(e) {
	var item = $.lst_player.sections[0].getItemAt(e.itemIndex);

	if (e.source.bindId == "trash") {
		// delete

		Alloy.Collections.games.where({
			id: item.properties.gameId
		})[0].destroy();
		Alloy.Collections.games.fetch({
			reset: true
		})
	} else {
		// check
		if (item.active) {
			item.checkbox.text = "";
			item.active = false;
		} else {
			item.checkbox.text = "\uf00d";
			item.active = true;
		}
		$.lst_player.sections[0].updateItemAt(e.itemIndex, item);
	}
}

function onReturn() {
	onClickAdd();
}

$.lst_player.addEventListener("itemclick", onClickItem);
$.btn_add.addEventListener("click", onClickAdd);
$.btn_ok.addEventListener("click", onClickOk);
$.tf_name.addEventListener("return", onReturn);
