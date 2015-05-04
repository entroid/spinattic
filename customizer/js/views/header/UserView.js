define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header/userview.html',
  'helpers/HelpFunctions',
  'mCustomScrollbar'

], function($, _, Backbone, userview, HelpFunctions, mCustomScrollbar){

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

      $(".notifications").mCustomScrollbar({
        theme:"minimal-dark",
        scrollInertia:300,
      });
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
