define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){

  var ManageData =  function(){

      this.saveSceneOnTour = function(scenename,nodename,newVal,parent){

        _.each(tourData.krpano.scene,function(elem){
        
        if(elem._name == scenename){
          if(!parent){
          elem[nodename] = newVal;
          }else{
          elem[parent][nodename] = newVal;
          }
          console.log(elem)
          $("#tour").data("scene",elem);
          $("#sceneMenu").find("#"+scenename).data("scene",elem);
        }
      })

      }

}

  return ManageData;
  
});
