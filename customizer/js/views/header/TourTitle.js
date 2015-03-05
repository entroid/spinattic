define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header/tourtitle.html'  

], function($, _, Backbone, tourtitle){

    var TourTitle = Backbone.View.extend({

        el: $(".header-bottom"),

        initialize: function () {
          
        },

        events:{

        },

        render: function(){

            var compiledTemplate = _.template(tourtitle);
            $(this.el).append( compiledTemplate );           

        }
    });

    return TourTitle;
  
});
