exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY",
			"title": "TEXT",
			"text":"TEXT",
			"date": "INTEGER",
			"players": "TEXT",
			"rating": "INTEGER",
			"games": "TEXT",
			"image":"TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "gamenights",
			idAttribute: "id",
			remoteBackup: false,
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			clear: function() {
				// remove/destroy all models
				_.invoke(this.toArray(), 'destroy');
			},
			comperator: function(model){
				return model.get("date");
			}
		});

		return Collection;
	}
};
