define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header/userview.html'

], function($, _, Backbone, userview){

  var SceneMenuView = Backbone.View.extend({
    el: $(".header-side"),
    initialize: function () {

      
    },
    events:{
     "click .avatar":"displayMenu"
         },
    render: function(){
      var data = this.collection.toJSON();
      var compiledTemplate = _.template(userview,{jsonObj:data});
      $(this.el).append( compiledTemplate ); 
    },
    displayMenu:function(){
      $(".menu-list").fadeToggle();
    }
    
  });

  return SceneMenuView;
  
});
