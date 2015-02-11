



var Menu = {
	Models: {},
    Collections: {},
    Views: {},
    Templates:{}
}

Menu.Models.Menu = Backbone.Model.extend({})

Menu.Collections.Menu = Backbone.Collection.extend({
    model: Menu.Models.Menu,
    url: "data/menu.json",
    initialize: function(){
    	this.fetch()
        console.log(this.length)
    }
});

Menu.Templates.Menu = _.template($("#tmplt-Movies").html())
Menu.Views.Menu = Backbone.View.extend({

	el: $("#mainContainer"),
    template: Menu.Templates.Menu,
	initialize: function () {

	      	 this.collection.bind("reset", this.render, this);
	    },

	render:function(){
			console.log("a");
			objTorender = this;
			 console.log(objTorender)
			jsonObj = this.collection.toJSON();
			tree = jsonObj[0].tree
			$(tree).each(function(i,obj){
				$(objTorender.el).append(objTorender.template(obj));
			})
	}

})

	Menu.Menu = new Menu.Collections.Menu();
	new Menu.Views.Menu({ collection: Menu.Menu })
