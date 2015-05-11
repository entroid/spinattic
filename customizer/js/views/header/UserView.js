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

      
    },

    displayMenu: function() {
      $("header .menu-list:not(.users)").hide()
      $("header .menu-list.users").fadeToggle();
    },

    displayNotifications: function() {
      $(".main-header .notifications ul").addClass("wait");
      $.ajax({
          url:'../ajax_get_notif.php',
          type:'POST',
          success:function(res){
            $(".main-header .notifications ul").removeClass("wait");
            $(".main-header .notifications ul").html(res);
            $(".main-header .notifications ul").mCustomScrollbar({
              theme:"minimal-dark",
              scrollInertia:300,
            });
          },
          error:function(xhr, ajaxOptions, thrownError){
            console.log(xhr)
          }
        })

      $("header .menu-list:not(.notifications)").hide()
      $("header .menu-list.notifications").fadeToggle();
    }
    
  });

  return SceneMenuView;
  
});
