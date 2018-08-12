// TODO: refactor to widget - use it in games.js too
//
var args = $.args;
Alloy.Collections.players.fetch({
	reset: true
});

function onClickClose() {
	$.players.close();
}

function onClickAdd() {
	if ($.tf_name.value != "") {
		var mod = Alloy.createModel("players", {
			name: $.tf_name.value
		});
		mod.save();

		$.lst_player.sections[0].appendItems([{
			name: {
				text: $.tf_name.value
			},
			playerId: mod.get("id"),
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
		alert("Add player first or clear textfield");
	} else {
		// get active players
		var items = $.lst_player.sections[0].getItems();

		_.each(items, function(item) {
			if (item.active) {
				args.addPlayer({
					id: item.properties.playerId,
					name: item.name.text
				});
			}
		})
		$.players.close();
	}
}

function onClickItem(e) {
	var item = $.lst_player.sections[0].getItemAt(e.itemIndex);

	if (e.source.bindId == "trash") {
		// delete

		Alloy.Collections.players.where({
			id: item.properties.playerId
		})[0].destroy();
		Alloy.Collections.players.fetch({
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

$.tf_name.addEventListener("return", onReturn);
$.lst_player.addEventListener("itemclick", onClickItem);
$.btn_add.addEventListener("click", onClickAdd);
$.btn_ok.addEventListener("click", onClickOk);
