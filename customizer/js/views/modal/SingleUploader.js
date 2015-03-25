define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/modal/singleUploaderDragArea.html',
    'text!templates/modal/singleUploaderShowing.html',
    'text!templates/modal/singleUploaderUploadingAnimation.html',
    'filedrop',

], function($, _, Backbone,singleUploaderDragArea,singleUploaderShowing,singleUploaderUploadingAnimation,filedrop){

    var SingleUploader = Backbone.View.extend({

        events:{
        },
        initialize: function () {
        _.bindAll(this);        
        },
        render:function(){
            var myid = this.model.get("myid");

            if(this.model.get("imgsrc")){
                var img = this.model.get("imgsrc");
                $("#"+myid).data("imgsrc",img)
                var template = _.template(singleUploaderShowing,{imgsrc:img});
                $("#"+myid).html(template);
                $("#"+myid +" .edit-img").click(this.startEditLoader)
            }else{
                var template = _.template(singleUploaderDragArea);
                $("#"+myid).html(template);
                this.dragFile();
            }
        },

        startEditLoader:function(){
            console.log(this)
            var myid = this.model.get("myid");
            var template = _.template(singleUploaderDragArea);
            $("#"+myid).html(template);
            this.dragFile();
        },

        dragFile:function(){
            var este = this;
            var myid = this.model.get("myid");
            var dropbox = $('#single-drop-zone');
            dropbox.filedrop({
                paramname:'pic',
                refresh: 100,
                maxfiles: 1,
                maxfilesize: 200,
                url: 'php/upload-single-file.php',
                error: function(err, file) {
                        console.log(err)
                },
                beforeEach: function(file){    

                    if(!file.type.match(/^image\//)){
                       alert('Only images are allowed!');
                        return false;
                    }

                    if(!file.type.match(/jpeg|tiff/)){
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
                    $("#"+myid+ ".progress").width(progress+'%');
                    $("#"+myid+" .percentage").text('Uploading '+progress+'%');
                },

                uploadFinished:function(i, file, response){  

                    if (response.result == 'SUCCESS') {
                        
                        $("#"+myid+" .percentage").text("upload complete");
                        console.log(response)
                        var myfile = "graphics/"+response.params.file_name;
                        $("#"+myid +" .ok-img").show();
                        $("#"+myid +" .ok-img").click(function(){

                            $("#"+myid).data("imgsrc",myfile)
                            este.model.set("imgsrc",myfile);
                            este.render();

                        })

                    }else{
                            
                        if (response.result == 'ERROR'){
                            console.log(response);
                        }else{
                            console.log(response)
                           //alert("An error occurred while uploading file " + file.name + "<br>Please try again or contact us");
                        }

                       }
                },

                afterAll : function(){

                }  

            })
        }

        
    });

    return SingleUploader;
    
});