define([
    'jquery',
    'underscore',
    'backbone',
    'views/sidebar/SidebarSubMenu',
    'text!templates/sidebar/skinCustomizerMenu.html',
    'helpers/HelpFunctions',
    'views/modal/SkillsModalList',
    'mCustomScrollbar',
    'views/sidebar/SkinCustomizerItem',

], function($, _, Backbone, SidebarSubMenu, skinCustomizerMenu, HelpFunctions, SkillsModalList, mCustomScrollbar,SkinCustomizerItem){

    var SkinCustomizerMenuView = SidebarSubMenu.extend({
        initialize: function () {
          this.events = this.events || {};
          var addStyles = 'click #' + this.model.get("elem") + ' .add-link';
          this.events[addStyles] = 'addStyle';
          this.delegateEvents(); 
        },

        render: function(){

            var skill = tourData.krpano.skill;
            var compiledTemplate = _.template(skinCustomizerMenu);


            $(this.el).append( compiledTemplate );

            _.each(skill,function(skl,ind){

                console.log(skl)
                var SkillItemModel = Backbone.Model.extend({});
                skillItemModel = new SkillItemModel({tourSkill:skl});
                var skinCustomizerItem = new SkinCustomizerItem({model:skillItemModel});
                skinCustomizerItem.render();

            })


            elem =  this.model.get("elem");

            this.$elem = $("#"+elem);
            this.model.set("elemWidth",this.$elem.width());
            var helpFunctions = new HelpFunctions();
            helpFunctions.setInnerHeight(elem);

            $("#skinCustomizer-menu .inner").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });

            this.show();
        },

        openSubItems:function(e){
            $mineSub = $(e.target).parent("li").find(".sub-items")
            $("#"+this.model.get("elem")+" .sub-items").not($mineSub).slideUp();
            $mineSub.slideToggle();
        },
        addStyle:function(e){
            var skillsModalList = new SkillsModalList();
            skillsModalList.render("skillsModalList",skillsModalList.renderExtend);
            $("#skillsModalList").addClass("skillModal").parent(".overlay").addClass("skillWindow");
            skillsModalList.verticalCent();
        }

        
    });

    return SkinCustomizerMenuView;
    
});
