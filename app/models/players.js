exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY",
		    "name": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "players",
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
			}
		});

		return Collection;
	}
};
