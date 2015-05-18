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
      

      $("header .menu-list:not(.notifications)").hide()
      $("header .menu-list.notifications").fadeToggle();
      this.callNotif();

    },

    callNotif:function(next){
      $(".main-header .notifications .loader").show();
      var este = this;
      query_string = '';
      if(next == 'next'){
        query_string = "?action=getLastPosts&lastID="+$(".notif_item:last").attr("id");
      }else{
        query_string = "";
      }
        $.ajax({
              url:'../ajax_get_notif.php'+query_string,
              type:'POST',
              success:function(res){
                $(".main-header .notifications .loader").hide();
                if(query_string == ""){
                    $(".main-header .notifications ul").html(res);
                }else{
                    $(".main-header .notifications ul").html($(".main-header .notifications ul").html()+res);
                }

                $(".main-header .notifications .inner-notifications").mCustomScrollbar({
                  theme:"minimal-dark",
                  scrollInertia:300,
                  callbacks:{
                    onTotalScroll:function(){
                      if($('.nomore_notif').length == 0){
                            $(".main-header .notifications .inner-notifications").mCustomScrollbar("scrollTo","bottom",{scrollInertia:1,  timeout:1});
                            este.callNotif('next');
                      }
                    }
                  }
                });
              },
              error:function(xhr, ajaxOptions, thrownError){
              }
          })

    }

    
  });

  return SceneMenuView;
  
});
