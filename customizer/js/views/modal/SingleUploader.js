define([
    'jquery',
    'underscore',
    'backbone',
    'jqueryui',
    'text!templates/modal/singleUploaderDragArea.html',
    'text!templates/modal/singleUploaderShowing.html',
    'text!templates/modal/singleUploaderUploadingAnimation.html',
    'filedropsingle',

], function($, _, Backbone,jqueryui, singleUploaderDragArea,singleUploaderShowing,singleUploaderUploadingAnimation,filedropsingle){

    var SingleUploader = Backbone.View.extend({
        CallBack:null,
        events:{
        },
        initialize: function () {
        _.bindAll(this);        
        },
        render:function(cbackFun){
            if(cbackFun){
                this.CallBack = cbackFun;
            }
            
            var myid = this.model.get("myid");

            if(this.model.get("imgsrc")){
                var img = this.model.get("imgsrc");
                $("#"+myid).data("imgsrc",img)
                var template = _.template(singleUploaderShowing,{imgsrc:img});
                $("#"+myid).html(template);
                //$("#"+myid +" .edit-img").click(this.startEditLoader);
                $("#"+myid +" .over-edit").click(this.startEditLoader);
            }else{
                var template = _.template(singleUploaderDragArea);
                $("#"+myid).html(template);
                this.dragFile();
            }
            
           /* $( "#"+myid+" .image-uploader-wrapper").droppable({
                over: function( event, ui ) {$(this).addClass('droppingOver');},
                out: function( event, ui ) {$(this).removeClass('droppingOver');}
            });
            $( "#"+myid+" .image-uploader-wrapper" ).on( "dropover", function( event, ui ) {
                
            } );*/
        },

        startEditLoader:function(){
            var myid = this.model.get("myid");
            var template = _.template(singleUploaderDragArea);
            $("#"+myid).html(template);
             $("#"+myid +" .cancel-img").click(this.render)
            this.dragFile();
        },

        dragFile:function(){
            var este = this;
            var myid = this.model.get("myid");
            var dropbox = $('#single-drop-zone');
            var tour_id = este.model.get("tour_id");
            var caso = este.model.get("caso");

            dropbox.filedropSingle({
                paramname:'pic',
                refresh: 100,
                maxfiles: 1,
                maxfilesize: 200,
                url: 'php/upload-single-file.php',
                data:{
                    tour_id:tour_id,
                    caso: caso
                    },
                error: function(err, file) {

                },
                beforeEach: function(file){    

                    if(!file.type.match(/^image\//)){
                       alert('Only images are allowed!');
                        return false;
                    }

                    if(!file.type.match(/jpeg|png/)){
                        alert('Format not supported!');
                        return false;
                    }
                },
                uploadStarted: function(i, file, len){

                var template = _.template(singleUploaderUploadingAnimation);
                $("#"+myid).html(template);

                },
                 progressUpdated: function(i, file, progress) {
                   
                   $("#"+myid +" .ok-img").hide();
                    $("#"+myid+" .progress").width(progress+'%');
                    $("#"+myid+" .percentage").text('Uploading '+progress+'%');
                },

                uploadFinished:function(i, file, response){  

                    console.log(response)
                    if (response.result == 'SUCCESS') {
                        
                        $("#"+myid+" .percentage").text("upload complete");

                        var myfile = response.params.path;
                        $("#"+myid +" .ok-img").show();
                        
                            $("#"+myid).data("imgsrc",myfile)
                            este.model.set("imgsrc",myfile);
                            este.render(este.CallBack);
                            console.log(este.CallBack)

                            if(este.CallBack){
                                este.CallBack()
                            }
                        
                    }else{
                            
                        if (response.result == 'ERROR'){
                        }else{
                           //alert("An error occurred while uploading file " + file.name + "<br>Please try again or contact us");
                        }

                       }
                },

                afterAll : function(){

                },

                docOver: function() {
                    $("#"+myid+" .image-uploader-wrapper").addClass('backgroundBlack');
                },
                docLeave: function() {
                    $("#"+myid+" .image-uploader-wrapper").removeClass('backgroundBlack');
                }

            })
        },

        removeThis:function(){
            var myid = this.model.get("myid");
            $("#"+myid+" .image-uploader-wrapper").remove();
            this.undelegateEvents();
        }

        
    });

    return SingleUploader;
    
});
