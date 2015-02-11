define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header/publishcontrollerview.html'

], function($, _, Backbone, publishcontrollerview){

  var PublishControllerView = Backbone.View.extend({
    el: $(".header-side"),
    initialize: function () {

      
    },
    events:{
    
         },
    render: function(){
    
      var compiledTemplate = _.template(publishcontrollerview);
      $(this.el).append( compiledTemplate ); 
   
    }    
    
  });

  return PublishControllerView;
  
});
