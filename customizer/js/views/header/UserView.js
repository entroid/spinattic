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
     "click .avatar":"displayMenu",
     "click .notification":"displayNotifications"
         },
    render: function(){
      var data = this.collection.toJSON();
      var compiledTemplate = _.template(userview,{jsonObj:data});
      $(this.el).append( compiledTemplate ); 

      var helpFunctions = new HelpFunctions();
      helpFunctions.toolTip("header .new-tour","new-tour-tt up");
    },

    displayMenu: function() {
      $("header .menu-list:not(.users)").hide()
      $("header .menu-list.users").fadeToggle();
    },

    displayNotifications: function() {
      $("header .menu-list:not(.notifications)").hide()
      $("header .menu-list.notifications").fadeToggle();
    }
    
  });

  return SceneMenuView;
  
});
