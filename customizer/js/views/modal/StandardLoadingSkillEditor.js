define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/standardLoadingProgress.html',
    'helpers/HelpFunctions',
    'views/modal/SingleUploader',
    'mCustomScrollbar',
    'jqueryui',
    'colorpicker'  

], function($, _, Backbone,Modal,standardLoadingProgress,HelpFunctions,SingleUploader, mCustomScrollbar,jqueryui,colorpicker){

    var StandardLoadingProgress = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{
            "click .skillModal #Context-menu-finish":"doneEdition",
            "click #chooseBarDD li":"toggleDropdown"
        },
        
        renderExtend:function(){

            var myid = this.myid;
            var tourSkill = this.model.get("tourSkill");
            console.log(tourSkill)
            if(tourSkill.progress._showreloads=="false"){
                tourSkill.selected = "Looping";
                tourSkill.hiddenBarClass= "none";
                tourSkill.hiddenloopingClass= "";
                s=tourSkill.progress._showwait;
                s= s.split(/[()]/)[1];
                tourSkill.loopingprop = s.split(",");
                tourSkill.barprop = ["center","100","10","0","50","solid","0x000000","0xd3322a","0xd3322a","0x000000","1","0xFFFFFF","5"]
            }else{
                tourSkill.selected = "Bar";
                tourSkill.hiddenBarClass= "";
                tourSkill.hiddenloopingClass= "none";
                s=tourSkill.progress._showload;
                s= s.split(/[()]/)[1];
                tourSkill.loopingprop = ["0xFFFFFF","15","15","0","0","0xFFFFFF","5","0.5","0.5","center"]
                tourSkill.barprop = s.split(",");
            }
           var template = _.template(standardLoadingProgress,{tourSkill:tourSkill})

            $("#"+myid+" .inner-modal").html(template);
            $("#"+myid+" header h2").text("Standard Loading Progress Editor")

            if( tourSkill.selected == "Bar"){
                _.each($("#standardLoading-bar-skill-align .fa-circle"),function(elem,ind){
                    if($(elem).data("pos") == tourSkill.barprop[0]){
                        $(elem).addClass("selected");
                    }
                })
            }else{
                _.each($("#standardLoading-looping-skill-align .fa-circle"),function(elem,ind){
                    if($(elem).data("pos") == tourSkill.barprop[0]){
                        $(elem).addClass("selected");
                    }
                })
            }

            $("#"+myid).find(".save-and-close").unbind("click");
            
            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });

            var helpFunctions = new HelpFunctions();
            helpFunctions.dropDown("#"+myid+" .dropdown");
            helpFunctions.nineGrillSelector("#"+myid+" .position"); 

            $('#backcolor').colorpicker();
            $('#loadcolor').colorpicker();
            $('#decodecolor').colorpicker();
            $('#bordercolor').colorpicker();
            $('#glowcolor').colorpicker();
            $('#looping-color').colorpicker();
            $('#looping-glowcolor').colorpicker();
            
        },

    
        doneEdition:function(e){
            var myid = this.myid;
            var tourSkill = this.model.get("tourSkill");
            var mytourSkill;
            /*
            mytourSkill._url = $("#signature-skill-editor-img").data("imgsrc");
            mytourSkill._x = $("#signature-skill-x").val();
            mytourSkill._y = $("#signature-skill-y").val();
            mytourSkill._zorder = $("#signature-skill-zorder").val();
            mytourSkill._alpha = $("#signature-skill-alpha").val();
            mytourSkill._onclick = "openurl("+$("#signature-skill-linkto").val()+",_blank);";


            if(tourData.krpano.plugin.length == undefined){
                tourData.krpano.plugin = mytourSkill;
            }else{
                _.each(tourData.krpano.plugin,function(elem,ind){
                    if(elem._kind == mytourSkill._kind){
                        tourData.krpano.plugin[ind] = mytourSkill;
                    }
                })
            }*/
            this.removeModal(e);
            this.undelegateEvents();
        
        },

        toggleDropdown : function(e) {
            var val = $(e.target).attr('data-value'),
                tab = $('.layer-top.' + val);
                console.log('.layer-top.' + val)
           // $('.layer-top.' + val).toggleClass('none');

           if ( $(tab).hasClass('none') ) {
            console.log('none!')
                //$(tab).toggleClass('none')
                $('.layer-top').toggleClass('none')
           } else {
            console.log('notnone!')
                //$('.layer-top').toggleClass('none')
           }
        }
    });

    return StandardLoadingProgress;
    
});
