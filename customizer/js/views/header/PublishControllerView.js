define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header/publishcontrollerview.html'

], function($, _, Backbone, publishcontrollerview){

    var PublishControllerView = Backbone.View.extend({

        el: $("#tourTitleBar"),

        initialize: function () {
          
        },

        events:{  

        },

        render: function(){
            console.log($("#tourTitleBar").length);

          var compiledTemplate = _.template(publishcontrollerview);
          $("#tourTitleBar").append( compiledTemplate );

        }    
    });

    return PublishControllerView;  
});
