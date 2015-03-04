define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header/tourtitle.html',
  'views/header/PublishControllerView'

], function($, _, Backbone, tourtitle, PublishControllerView){

    var TourTitle = Backbone.View.extend({

        el: $(".header-bottom"),

        initialize: function () {
          
        },

        events:{

        },

        render: function(){

            var compiledTemplate = _.template(tourtitle);
            $(this.el).append( compiledTemplate );

            var publishControllerView = new PublishControllerView();
            publishControllerView.render();

        }
    });

    return TourTitle;
  
});
