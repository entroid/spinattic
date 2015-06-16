define([
    'jquery',
    'underscore',
    'backbone',
    'views/sidebar/SidebarSubMenu',
    'text!templates/sidebar/virtualTourSettingsMenu.html',
    'mCustomScrollbar',
    'helpers/HelpFunctions',
    'views/sidebar/MapView',
    'helpers/ManageData',
    'views/modal/MapModalView',
    'lib/tagsinput/tagsinput',

    
], function($, _, Backbone,SidebarSubMenu,virtualTourSettingsMenu,mCustomScrollbar,HelpFunctions,MapView,ManageData,MapModalView,tagsinput){

    var VirtualTourSettingsMenuView = SidebarSubMenu.extend({

        initialize: function () {

            this.events = this.events || {};

            var eventKey = 'click #' + this.model.get("elem") + ' h3';
            this.events[eventKey] = 'openSubItems';

            var checkboxesEvent = 'click #'+ this.model.get("elem") +' .checkboxes li';
            this.events[checkboxesEvent] = 'selectCheckboxes';

            var inputs = "keyup #virtualTourSettings-menu .tour-data";
            var txtarea = "keyup #virtualTourSettings-menu #tour-description";
            var inputsChange = "mouseup #virtualTourSettings-menu .tour-data";
            var friendURl = "keyup #virtualTourSettings-menu #friendlyURLTour";
            this.events[inputs] = 'insertData';
            this.events[txtarea] = 'saveData';
            this.events[inputsChange] = 'insertData';
            this.events[friendURl] = 'saveFriendURL';

            var onoff = 'change .autorotate-settings .switchInput input[type="checkbox"]'
            this.events[onoff] = 'onOffSwitch'

            var zoomMap = 'click #virtualTourSettings-menu .fa-search';
            this.events[zoomMap] = 'zoomMap';

            var checkEvent = "click .check-group li";
            this.events[checkEvent] = "CheckUncheck";

            var liddEventC = "click  #virtualTourSettings-menu #Category.dropdown li";
            this.events[liddEventC] = "saveDDCategory";

            var liddEventP = "click  #virtualTourSettings-menu #privacyConf.dropdown li";
            this.events[liddEventP] = "saveDDPrivacy";

            var liddEventM = "click  #virtualTourSettings-menu .mouse-control-settings .dropdown li";
            this.events[liddEventM] = "saveDDMouse";

            var mouseSettings = 'change input[type="checkbox"].mouse-autorotate'
            this.events[mouseSettings] = 'mouseSettingsChecks'

            this.delegateEvents();
          
        },

        render: function(){
            var mousetypes = [
                    {
                        label:"Move to",
                        value:"moveto"
                    },
                    {
                        label:"Drag 2D",
                        value:"drag2d"
                    },
                    {
                        label:"Smooth Drag 2D",
                        value:"drag2dsmooth"
                    },
                    {
                        label:"Drag 3D",
                        value:"drag3d"
                    },
                ]

            var data = {

                settings:tourData.krpano.settings,
                autorotate:tourData.krpano.autorotate,
                control:tourData.krpano.control,
                datatour:tourData.krpano.datatour,
                mousetypes:mousetypes
            }

            
            var compiledTemplate = _.template(virtualTourSettingsMenu,{data:data});
            $(this.el).append( compiledTemplate ); 
            var elem = this.model.get("elem");
            this.$elem = $("#"+elem);
            
            this.model.set("elemWidth",this.$elem.width());
            
            var helpFunctions = new HelpFunctions();

            helpFunctions.setInnerHeight(elem);
            $(window).resize(function(){
                    helpFunctions.setInnerHeight(elem);

            });
            $("#"+elem+" .inner").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300,
                });

            this.show();
            var MapModel = Backbone.Model.extend({});
            var mapModel = new MapModel({lat:data.settings._lat,lng:data.settings._long})
            
            this.mapView = new MapView({model:mapModel});
            this.mapView.render(elem,"settings");
            
            helpFunctions.checkbox(".check-group","fa-check-square","fa-square");
            helpFunctions.selectChoice(".checkboxes li","fa-circle-o","fa-circle");
            helpFunctions.toolTip(".submenu .help","aside help");
            helpFunctions.dropDown("#Mouse");

            //limit some input values
            /*$('#mousefriction, #FOVfriction').change(function() {
                helpFunctions.limitInputs("#mousefriction",0.1, 1);
            });*/

            var open = false;
            $('#tagsTour').tagsInput({
                'width': '265px',
                'height':'70px',
                'defaultText':'Separate tags by comma',
                onChange: function(elem, elem_tags) {
                    var manageData = new ManageData();
                    manageData.saveTourData("tags",$("#tagsTour").val())
                },
                autocomplete_url:'../php-stubs/tags.php', // jquery ui autocomplete requires a json endpoint
                //autocomplete_url:'data/tags.json',
                autocomplete:{
                    appendTo:"#toAppendTags",

                    open:function(){
                        $("#toAppendTags .ui-widget-content").mCustomScrollbar({
                                theme:"minimal-dark",
                                scrollInertia:300
                            });
                    },
                    response:function(){
                        $("#toAppendTags .ui-widget-content").mCustomScrollbar("destroy")
                    },
                    close:function(){
                        $("#toAppendTags .ui-widget-content").mCustomScrollbar("destroy")
                    }
                },
                onRemoveTag: function() {
                    var inputTag = $('#tagsTour_tag')

                    if (!$('#tagsTour_tagsinput .tag').length) {
                        $('#tagsTour_tag').val($('#tagsTour_tag').attr('data-default'))
                    }
                }
            });
    
            $.ajax({
                    url : 'data/json.php?t=c',
                    type: 'JSON',
                    cache : false,
                    success : function(data){
                        var data = JSON.parse(data);
                        _.each(data,function(elem,ind){
                            $("#virtualTourSettings-menu ul.category").append("<li><span>"+elem.category+"</span></li>")
                        })
                        helpFunctions.dropDown("#Category");
            
                    }
                });

            $.ajax({
                    url : 'data/json.php?t=p',
                    type: 'JSON',
                    cache : false,
                    success : function(data){

                        var data = JSON.parse(data);
                        _.each(data,function(elem,ind){
                            if(tourData.krpano.datatour.privacy == elem.value){
                                $("#privacyConf .title").text(elem.privacy);
                            }
                            $("#virtualTourSettings-menu ul.privacy").append('<li id="'+elem.value+'"><span>'+elem.privacy+'</span></li>')
                        })
                        helpFunctions.dropDown("#privacyConf");
            
                    }
                });
        },

        openSubItems:function(e){

            var clickParent = $(e.target).parents("li"),
            caret = clickParent.find('.caret'),
            $mineSub = clickParent.find(".sub-items");

            $("#" + this.model.get("elem") + " .sub-items").not( $mineSub ).slideUp();
            clickParent.siblings().find('.caret').removeClass( 'fa-caret-up').addClass( 'fa-caret-down');

            caret.toggleClass('fa-caret-down fa-caret-up');
            $mineSub.slideToggle();

            //google.maps.event.trigger(map, "resize");
            this.mapView.refreshSizeMap()
        },

        selectCheckboxes: function(e) {

            var target = $(e.target);

            if(target.is("span")){
                elem = $(e.target).parent("li")
            } else {
                elem = $(e.target)
            }

            if($(elem).data("evt") == "singleLoc"){
                $("#virtualTourSettings-menu .map-wrapper").show();
                $('#virtualTourSettings-menu .bigger-map').show();
            } else {
                $("#virtualTourSettings-menu .map-wrapper").hide();
                $('#virtualTourSettings-menu .bigger-map').hide();
            }

        },

        insertData:function(e){

            var selectedInput = e.target;
            var krpano = document.getElementById("krpanoSWFObject");
            var myprop = $(selectedInput).data("bind");
            myprop = myprop.replace("_","")
            var dataobj = $(selectedInput).data("obj"); 
            krpano.set(dataobj+"."+myprop,$(selectedInput).val());
            
            var manageData = new ManageData();
            manageData.saveSettings(e);
            
        },

        onOffSwitch: function(e) {
            var selectedInput = e.target;

            if (!$(selectedInput).prop( 'checked' )) {
                $(selectedInput).parent().siblings('input[type="number"]').prop('disabled', true).addClass('disabled')
            } else {
                $(selectedInput).parent().siblings('input[type="number"]').prop('disabled', false).removeClass('disabled');
            }
        },

        zoomMap:function(){

            var me = this;
            var MapModel = Backbone.Model.extend({});
            var mapModel = new MapModel({lat:$("#virtualTourSettings-menu .latFld").val(),lng:$("#virtualTourSettings-menu .lngFld").val(),elemToAttach:"virtualTourSettings-menu"})
            var mapModalView = new MapModalView({model:mapModel});
            mapModalView.render("mapModal",mapModalView.renderExtend);
            this.mapView.removeMap();
        },

        CheckUncheck:function(e){
            var manageData = new ManageData();
            var name = $(e.target).prop("tagName")
            if(name == "LI"){
            $chkbox = $(e.target).find(".fa-lg")
            }else{
            $chkbox = $(e.target)
            }
            if($chkbox.hasClass("fa-check-square")){
                manageData.saveTourData($chkbox.attr("id"),"on")
            }else{
                manageData.saveTourData($chkbox.attr("id"),"off")
            }
        },

        saveDDCategory:function(e){
            var manageData = new ManageData();
            manageData.saveTourData($(e.target).parent().attr("class"),$(e.target).text())
        },

        saveData:function(e){
            var manageData = new ManageData();
            manageData.saveSettings(e);
        },

        saveDDMouse:function(e){
            var krpano = document.getElementById("krpanoSWFObject");
             krpano.set("control.mousetype",$(e.target).data("value"))
            var manageData = new ManageData();
            manageData.saveSettings(e);
        },

        saveDDPrivacy:function(e){
            var manageData = new ManageData();
            manageData.saveTourData($(e.target).parent().attr("class"),$(e.target).attr("id"))
        },

        saveFriendURL:function(e){
            var manageData = new ManageData();
            manageData.saveTourData("friendlyURL",$("#friendlyURLTour").val())
        },

        mouseSettingsChecks:function(e){
            var selectedInput = e.target;
            var krpano = document.getElementById("krpanoSWFObject");
            var myprop = $(selectedInput).data("bind");
            myprop = myprop.replace("_","")
            var dataobj = $(selectedInput).data("obj"); 
            if ($(selectedInput).prop( 'checked' )) {
                krpano.set(dataobj+"."+myprop, "true");
            }else{
                krpano.set(dataobj+"."+myprop, "false");
            }

            var manageData = new ManageData();
            manageData.saveSettings(e);
        }
        
    });

    return VirtualTourSettingsMenuView;
    
});
