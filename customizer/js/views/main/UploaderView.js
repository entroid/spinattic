define([
    'jquery',
    'underscore',
    'backbone',
    'x2js',
    'helpers/HelpFunctions',
    'helpers/ManageTour',
    'models/main/ModalModel',
    'views/modal/AlertView',
    'text!templates/main/upload.html',
    'filedrop',
    'text!templates/main/uploadProgress.html',
    'views/main/TourView',
    'views/sidebar/MainMenuView',
    'models/main/TourModel',
    'views/footer/SceneMenuView',
    'collections/footer/SceneCollection',
    'views/header/TourTitle',
    'views/header/PublishControllerView',
    'mCustomScrollbar'


    ], function($, _, Backbone,x2js,HelpFunctions, ManageTour, ModalModel, AlertView,upload,filedrop,uploadProgress,TourView,MainMenuView,TourModel,SceneMenuView,SceneCollection,TourTitle,PublishControllerView, mCustomScrollbar){

    var UploaderView = Backbone.View.extend({
        el: $("body"),
        gNew_tour:null,
        gTour_id:"",
        setIntervalID:[],
        state:[],
        pano_id : [],
        scene_id : [],
        tour_id:[],
        filename:[],
        scene_name:[],
        html_ref_id:[],
        thumb_path:[],
        addingPane:null,
        initialize: function () {
            _.bindAll(this);
        },
        events:{
            "input .tile-size input":"maxTile",
            "click .dragger-wrapper .cancel":"removeView"
        },

        render: function(cancel){
            este = this;
              window.proc_id = new Array();
      
            este.gNew_tour = this.model.get("gNewTour");

            este.addingPane =  this.model.get("addingPane");
           
            if(location.hash.split("/")[1]){
                este.gTour_id= location.hash.split("/")[1];
            }

            var compiledTemplate = _.template(upload);
            $(this.el).append( compiledTemplate ); 

            if (cancel) {
                $('.dragger-wrapper .cancel').removeClass('none');
            }
            var helpFunctions = new HelpFunctions();
            helpFunctions.dropDown(".dropdown");
            var last_zindex  = null;
            var rollingOver = false;

            var dropbox = $('#drop-zone'),
            message = $('.drop-message', dropbox);

            este.verticalCent();

            dropbox.filedrop({
                // The name of the $_FILES entry:
                paramname:'pic',
                refresh: 100,
                maxfiles: 1000,
                //queuefiles: 2,
                maxfilesize: 200,
                url: 'php/general_process.php',

               /* data:{
                   tour_id:este.gTour_id
                },
                */
                error: function(err, file) {
                    switch(err) {
                        case 'BrowserNotSupported':
                        este.showMsg('Your browser does not support HTML5 file uploads!');
                        break;
                        case 'TooManyFiles':
                        este.showMsg('Too many files! Please select 3 at most!');
                        break;
                        case 'FileTooLarge':
                        este.showMsg(file.name+' is too large! Please upload files up to 200 mb.');
                        break;
                        default:
                        break;
                    }
                },

                beforeEach: function(file){    

                    if(!file.type.match(/^image\//)){
                        este.showMsg('Only images are allowed!');
                        return false;
                    }

                    if(!file.type.match(/jpeg|tiff/)){
                        este.showMsg('Format not supported!');
                        return false;
                    }
                },

                drop:function(){
                    //este.autocreateTour();
                },

                uploadStarted: function(i, file, len){

                    if (rollingOver) { 
                        $('.main-section').css('z-index', "last_zindex");
                        $("header.main-header").removeClass("bluring")
                        $("footer.main-footer").removeClass("bluring")
                        $(".dragger-wrapper").removeClass("scaling")
                        rollingOver = false;
                    }    

                    este.createImage(file,i);
                    $(".dragable").addClass("uploading-drop-zone"); 
                    este.verticalCent();   
                    $(".scroll-wrapper").mCustomScrollbar("scrollTo",$(".pano-item:last-child").offset().top);
                    
                    console.log(i)
                    console.log(file)
                    este.setIntervalID[i] = setInterval(function(){
                        $.ajax({
                            type: "POST",
                            url: "php/general_process_state.php",
                            data: "proc_id=" + window.proc_id[i],
                            cache: false,
                            success: function(response){
                                var respuesta = JSON.parse(response);
                                    //console.log("STATE "+i+":"+respuesta.state);
                                    
                                    if(este.state[i] != respuesta.state && respuesta.state != 'w'){
                                        
                                        este.state[i] = respuesta.state;
                                        
                                        switch(este.state[i]) {
                                        case "-1": //Error
                                            console.log("ENTRO: " + state[i]);
                                                                        
                                            
                                            break;
                                            
                                        case "1":
                                            console.log("ENTRO " + i + "(" + este.filename[i] +"): "+ este.state[i]);
                                            
                                           este.pano_id[i]         = respuesta.pano_id;
                                            este.scene_id[i]        = respuesta.scene_id;
                                            este.tour_id[i]         = respuesta.tour_id;    
                                            este.filename[i]        = respuesta.filename;  
                                            este.thumb_path[i]        = respuesta.thumb_path;  
                                            este.scene_name[i]         = este.filename[i].replace(/\.jpg|\.jpeg|\.tiff/g, '');
                                            este.html_ref_id[i]     = 'pano-'+respuesta.scene_id;
                                                        
                                            $("#pano-"+i+" .icon-msg img").attr("src","images/process.gif");

                                            $("#pano-"+i+" .icon-msg img").load(function(){
                                                $(this).parent().css("background","#d5ae06");
                                            })

                                            $("#pano-"+i+" .percentage").text("Processing image (1/2)");
                                            $("#pano-"+i).attr("id", este.html_ref_id[i]);  
                                     
                                            break;
                                        
                                        case "2":
                                            console.log("ENTRO " + i + "(" + este.filename[i] +"): "+ este.state[i]);
                                           
                                            $("#"+este.html_ref_id[i]+" .percentage").text("Processing image (2/2)");

                                           
                                           break;
                                            
                                        case "3":
                                            console.log("ENTRO " + i + "(" + este.filename[i] +"): "+ este.state[i]);
                                            
                                            $("#"+este.html_ref_id[i]+" .thumb").attr("src",este.thumb_path[i]);

                                            $("#"+este.html_ref_id[i]+" .progress").css("background","#497f3c");
                                            $("#"+este.html_ref_id[i]+" .percentage").text("Upload Complete!");
                                            $("#"+este.html_ref_id[i]+" .icon-msg").html('<span class="fa fa-check"></span>');
                                            $("#"+este.html_ref_id[i]+" .icon-msg").css("background","#497f3c");
                                            $("#"+este.html_ref_id[i]).data("pano_id",este.pano_id[i]);    

                                            var completed = 0; 

                                            $(".pano-item").each(function(index){
                                                if($(this).find(".percentage").text() == "Upload Complete!"){
                                                   completed++
                                                }
                                            })

                                            if(completed == $(".pano-item").size()){
                                                este.AllUploaded();
                                            }
                                            
                                            clearInterval(este.setIntervalID[i]);
                                            break;
                                        } 
                                        
                                    }
                                    
                                }
                        })}, 500);
                },

                docOver:function(e){    
                    if (!rollingOver) {    
                        $("header.main-header").addClass("bluring")
                        $(".dragger-wrapper").addClass("scaling")
                        $("footer.main-footer").addClass("bluring")

                        var posleft = $(".dragger-wrapper").offset().left;

                        rollingOver = true;
                    }    
                },

                docLeave:function(e){     
                    if (rollingOver) { 
                        last_zindex = $('#drop-zone').css('z-index', last_zindex);
                        $("header.main-header").removeClass("bluring")
                        $(".dragger-wrapper").removeClass("scaling")
                        $("footer.main-footer").removeClass("bluring")

                        rollingOver = false;
                    }   
                },

                progressUpdated: function(i, file, progress) {
                    $(".uploader-footer p").text("uploading or processing panoramas, please don't close this page").siblings('#cancelUploaded').addClass('none');
                    $("#pano-"+i+" .progress").width(progress+'%');
                    $("#pano-"+i+" .percentage").text('Uploading '+progress+'%');
                },

                uploadFinished:function(i, file, response){  
                    
                    console.log('STOP:' + window.proc_id[i] + ' - ' + i + ' - ' + file["name"]);
    
                   
                },

                afterAll : function(){}  

            }); // end of dropfile

            $("#click-to-select-file").click(function(e){
                $("#upload_button").trigger("click")
            })
        },

        showMsg: function(msg){
            var modalModel = new ModalModel({msg:msg})
            var alertView = new AlertView({model:modalModel});
            alertView.render("alert",alertView.renderExtend);
        },

        createImage:function(file,i) {
            data = {
                filesrc:file.name,
                ind:i    
            }

            var compiledTemplate = _.template(uploadProgress,data);

            if($(".pano-item-wrapper").length == 0){
                $('.dragger-wrapper .inner-dragger').append('<div class="scroll-wrapper"><div class="pano-item-wrapper"></div></div><div class="uploader-footer"><span class="uploader-btn fa fa-clock-o blink right"></span><span id="cancelUploaded" class="uploader-btn right none">Cancel</span><p></p></div>');

                //scrollbar
                $(".scroll-wrapper").mCustomScrollbar({
                    theme:"minimal-dark",
                    scrollInertia:300,
                });
            }

            $('.dragger-wrapper .pano-item-wrapper').append(compiledTemplate);

            
            $(".cancel-process").click(function(){
                if($(".cancel-process").data('id') != ''){

                    $.ajax({
                        url : 'php-stubs/scenes.php?action=remove',
                        type: 'POST',
                        async: true,
                        data: 'pano-id='+$(".cancel-process").data('id'),
                        cache : false,
                        success : function(response){}
                    });
                }

                $('#proc_cancelled').val('1');
                $(this).closest('.pano-item').hide();
            });               
        },

        sendReport:function(type, extras){
            $.ajax({
                url : 'php/send_report.php',
                type: 'POST',
                async: true,
                data: 'type='+type+'&extras='+extras,
                cache : false,
                success : function(response){}
            });        
        },


        AllUploaded:function(){
            $(".uploader-footer").find('#cancelUploaded').removeClass('none').siblings('p').html('All Done <span class="fa fa-smile-o"></span>');            

            if(este.addingPane){
                $(".fa-clock-o").removeClass('blink').addClass("save").text("ADD PANOS");
            }else{
                $(".fa-clock-o").removeClass('blink').addClass("save").text("CREATE TOUR");
            }

            $(".save").click( function(){

                if(este.addingPane){
                   
                    $(".dragger-wrapper").fadeOut(function(){
                       $(this).remove();
                    })
                    var manageTour = new ManageTour();
                    var cargarEscenas = function(){
                        console.log("hay scenas")
                        var scenes = tourData.krpano.scene;
                        var sceneCollection = new SceneCollection(scenes);
                        var sceneMenuView = new SceneMenuView({ collection: sceneCollection});
                        sceneMenuView.render();
                    }

                    manageTour.reloadTour(cargarEscenas);

                }else{

                    var myscenes = [];
                    $(".pano-item-wrapper .pano-item").each(function(ind,elem){
                        var scene = {}

                        var sceneid = $(elem).attr("id"); 
                        sceneid = sceneid.replace("pano-","");
                        scene.name = sceneid;
                        scene.title = $(elem).find("h3 span").text();
                        scene.filename = $(elem).find("h3 span").text();
                        scene.thumburl = $(elem).find(".thumb").attr("src");
                        scene.url = sceneid;
                        myscenes.push(scene);
                    })


                    $(".dragger-wrapper").fadeOut(function(){
                       $(this).remove();
                    })

                    if(!este.gTour_id){
                        este.gTour_id = window.gTour_id;
                    }

                    var xmlpath ="data/xml.php?id="+este.gTour_id+"&d=1&c=1";
                    //var xmlpath ="data/xml.php?idtour=9&c=1";
                    
                    $.ajax({
                        url: xmlpath,
                        type: "GET",
                        dataType: "html",

                        success: function(data) {
                            var x2js = new X2JS({attributePrefix:"_"});
                            tourData =  x2js.xml_str2json( data );

                            if(tourData.krpano.scene.length == undefined){
                                var escenas = [];
                                escenas[0] = tourData.krpano.scene;
                                tourData.krpano.scene = escenas
                            }

                            _.each(tourData.krpano.scene,function(scene,ind){
                                if(scene.hotspot){
                                            if(scene.hotspot.length == undefined){
                                                var myhp = []
                                                myhp[0] = scene.hotspot;
                                                tourData.krpano.scene[ind].hotspot = myhp;
                                            }
                                    }
                            })

                            if(tourData.krpano.skill.length == undefined){
                                var capacidad = [];
                                capacidad[0] = tourData.krpano.skill;
                                tourData.krpano.skill = capacidad
                            }

                            $.ajax({
                                url:  "data/json.php?id="+este.gTour_id+"&d=1&t=t",
                                dataType:"json",

                                success:function(datatour){

                                    tourData.krpano.datatour = datatour;

                                    var xml2krpano = xmlpath.replace("&c=1","&h=0")
                                    var tourModel = new TourModel({xmlpath:xml2krpano});

                                    var tourView = new TourView({ model: tourModel});
                                    tourView.render();

                                    $(".main-footer").show();
                                    $(".header-bottom").show();

                                    var scenes = tourData.krpano.scene;

                                    var sceneCollection = new SceneCollection(scenes);
                                    var sceneMenuView = new SceneMenuView({ collection: sceneCollection});
                                    sceneMenuView.render();
                                    var mainMenuView = new MainMenuView();
                                    mainMenuView.render();
                  
                                    var tourTitle = new TourTitle();
                                    tourTitle.render();

                                    var publishControllerView = new PublishControllerView();
                                    publishControllerView.render();


                                    Backbone.history.navigate("tour/"+este.gTour_id);
                                }
                            })

                        }
                    });
                }
            })
        },

        removeView:function(){
            this.undelegateEvents();            

            $(".dragger-wrapper").animate({
                'top' : '0'
            }, function(){
                $('.dragger-wrapper' ).remove();
            })
        },

        verticalCent : function() {
            $(".dragger-wrapper").animate({
                'top' : '50%',
                'margin-top' : -$('.dragger-wrapper').outerHeight()/2
            })
        },

        maxTile : function(e) {
            var elem = $(e.target),
                val = elem.val();

            elem.siblings('input').val(val);
        }
    });

    return UploaderView;

});
