define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/simpleControlBtnSkillEditor.html',
    'helpers/HelpFunctions',
    'mCustomScrollbar',
    'colorpicker'
    /*'views/modal/SingleUploader',    
    'helpers/ManageData',
    'helpers/ManageTour',*/

], function($, _, Backbone,Modal,simpleControlBtnSkillEditor,HelpFunctions, mCustomScrollbar/*SingleUploader, ManageData,ManageTour*/){

    var SimpleControlBtnSkillEditor = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{
            "click .simple-control-btns-skill-editor .dd-upload li":"selectDD",
            "click .simple-control-btns-skill-editor .bk-image li":"selectDDImage",
            "change input.scb_change":"changeValue",
            "change input.scb_border_change":"setBorderProp",
        },
        
        renderExtend:function(){

            var myid = this.myid;
            var tourSkill = this.model.get("tourSkill");
            switch(tourSkill.skill_controls_settings._position){
                case "topright":
                positionlabel = "Top-Right"
                break;
                case "topleft":
                positionlabel = "Top-Left"
                break;
                case "top":
                positionlabel = "Top"
                break;
                case "right":
                positionlabel = "Right"
                break;
                case "left":
                positionlabel = "Left"
                break;
                case "bottom":
                positionlabel = "Bottom"
                break;
                case "bottomright":
                positionlabel = "Bottom-Right"
                break;
                case "bottomleft":
                positionlabel = "Bottom-Left"
                break;
            }

            var orientationLabel = tourSkill.skill_controls_settings._orientation;
            orientationLabel = orientationLabel.substring(0,1).toUpperCase()+orientationLabel.substring(1);

            var layoutLabel = tourSkill.skill_controls_settings._layout;
            layoutLabel = layoutLabel.substring(0,1).toUpperCase()+layoutLabel.substring(1);

            var backimage = tourSkill.skill_controls_settings._icons_styles;
            backimage = backimage.replace("%SWFPATH%","../player");

            var borderproperties = tourSkill.skill_controls_settings._bgborder.split(" ");

            borderprop = {
                width: borderproperties[0],
                color: borderproperties[1],
                transp: borderproperties[2],
            }
            
            var arrowPos = tourSkill.skill_controls_settings._arrows_position;
            arrowPos = arrowPos.substring(0,1).toUpperCase()+arrowPos.substring(1);

            console.log(tourSkill)
            var template = _.template(simpleControlBtnSkillEditor,{tourSkill:tourSkill,positionlabel:positionlabel,orientationLabel:orientationLabel,layoutLabel:layoutLabel,backimage:backimage,borderprop:borderprop,arrowPos:arrowPos})

            $("#"+myid+" .inner-modal").html(template);

            _.each($("#signature-skill-align .fa-circle"),function(elem,ind){
                if($(elem).data("pos") == tourSkill.plugin._align){
                    $(elem).addClass("selected");
                }
            })

            $("#"+myid+" header h2").text("Simple Control Buttons Skill Editor");
            var este = this;
             $('#scb-bgcolor').colorpicker({select:function(ev, colorPicker){
                este.setColor(colorPicker,ev)
            }});

            $('#scb-border-bgcolor').colorpicker({select:function(ev, colorPicker){
                este.setBorderProp()
            }}); 

            var helpFunctions = new HelpFunctions();
            helpFunctions.skillTabs(myid);
            helpFunctions.dropDown("#"+myid+" .dropdown");
            
            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });
            
            /*var SingleUploaderModel = Backbone.Model.extend({});
            var singleUploaderModel = new SingleUploaderModel({myid:"signature-skill-editor-img",imgsrc:tourSkill.plugin._url,tour_id:tour_id,caso:caso})
            
            var singleUploader = new SingleUploader({model:singleUploaderModel});
            singleUploader.render(function(){
                var krpano = document.getElementById("krpanoSWFObject");
                krpano.set("plugin["+tourSkill.plugin._name+"].url",$("#signature-skill-editor-img").data("imgsrc"));
            });*/

        },


        selectDD:function(e){

            var myval = $(e.target).data("value");
            $(e.target).parents(".dropdown").data("selected",myval);
            var param = $(e.target).parent().data("param");
            var krpano = document.getElementById("krpanoSWFObject");
            krpano.call("set(skill_controls_settings."+param+","+myval+"); skill_controls_build();");

        },

        selectDDImage:function(e){
            if($(e.target).prop("tagName") == "LI"){
                var myval = $(e.target).data("value");
                var src = $(e.target).find("img").attr("src");
            }else{
               var myval = $(e.target).parent().data("value");
               var src = $(e.target).attr("src");
            }

            var param = "icons_styles";
            var krpano = document.getElementById("krpanoSWFObject");
            krpano.call("set(skill_controls_settings."+param+","+myval+"); skill_controls_build();");
            $("#iconStyles h2 img").attr("src",src);

            $("#generalSettingsContent .icon-wrap").css("background-image","url("+src+")");
        },  

        changeValue:function(e){
            var myval = $(e.target).val();
            var param = $(e.target).data("param");            
            var krpano = document.getElementById("krpanoSWFObject");
            krpano.call("set(skill_controls_settings."+param+","+myval+"); skill_controls_build();");
        },

        setColor:function(colorPicker,e){
            var myval = "0x"+colorPicker.formatted;
            var param = $(e.target).data("param");  
            var krpano = document.getElementById("krpanoSWFObject");
            krpano.call("set(skill_controls_settings."+param+","+myval+"); skill_controls_build();");

        },

        setBorderProp:function(){
            var myval = $("#border-width").val()+" 0x"+$("#scb-border-bgcolor").val()+" "+$("#border-transparency").val();
            var krpano = document.getElementById("krpanoSWFObject");
            krpano.call("set(skill_controls_settings.bgborder,"+myval+"); skill_controls_build();");

        }

    });

    return SimpleControlBtnSkillEditor;
    
});
