define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/simpleControlBtnSkillEditor.html',
    'helpers/HelpFunctions',
    /*'views/modal/SingleUploader',
    'mCustomScrollbar',
    'helpers/ManageData',
    'helpers/ManageTour',*/


], function($, _, Backbone,Modal,simpleControlBtnSkillEditor,HelpFunctions/*,SingleUploader, mCustomScrollbar,ManageData,ManageTour*/){

    var SimpleControlBtnSkillEditor = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{

        },
        
        renderExtend:function(){

            var myid = this.myid;
            var tourSkill = this.model.get("tourSkill");

            var template = _.template(simpleControlBtnSkillEditor,{tourSkill:tourSkill})

            $("#"+myid+" .inner-modal").html(template);

            _.each($("#signature-skill-align .fa-circle"),function(elem,ind){
                if($(elem).data("pos") == tourSkill.plugin._align){
                    $(elem).addClass("selected");
                }
            })

            $("#"+myid+" header h2").text("Simple Control Buttons Skill Editor");

            var helpFunctions = new HelpFunctions();
            helpFunctions.skillTabs(myid);
            helpFunctions.dropDown("#"+myid+" .dropdown");
            
            /*$(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });*/
            
            /*var SingleUploaderModel = Backbone.Model.extend({});
            var singleUploaderModel = new SingleUploaderModel({myid:"signature-skill-editor-img",imgsrc:tourSkill.plugin._url,tour_id:tour_id,caso:caso})
            
            var singleUploader = new SingleUploader({model:singleUploaderModel});
            singleUploader.render(function(){
                var krpano = document.getElementById("krpanoSWFObject");
                krpano.set("plugin["+tourSkill.plugin._name+"].url",$("#signature-skill-editor-img").data("imgsrc"));
            });*/

        },

    });

    return SimpleControlBtnSkillEditor;
    
});
