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
            var template = _.template(standardLoadingProgress,{tourSkill:tourSkill})

            $("#"+myid+" .inner-modal").html(template);
            $("#"+myid+" header h2").text("Standard Loading Progress Editor")
            $("#"+myid).find(".save-and-close").unbind("click");
            
            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });

            var helpFunctions = new HelpFunctions();
            helpFunctions.dropDown(".dropdown");
            $('#loading-bar-back-bgcolor').colorpicker();
            $('#loading-bar-bar-bgcolor').colorpicker();
            
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
