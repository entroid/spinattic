define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header/userview.html',
  'helpers/HelpFunctions'

], function($, _, Backbone, userview, HelpFunctions){

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

      var helpFunctions = new HelpFunctions();
      helpFunctions.toolTip("header .new-tour","new-tour-tt up");
    },
    displayMenu:function(){
      $(".menu-list").fadeToggle();
    }
    
  });

  return SceneMenuView;
  
});
