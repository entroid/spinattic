define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/contextMenuSkillEditor.html',
    'mCustomScrollbar'

], function($, _, Backbone,Modal,contextMenuSkillEditor,mCustomScrollbar){

    var ContextMenuSkillEditor = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{
            "click #Context-menu-add-item": "addItem",
            "click #Context-menu-finish": "doneEdition",
            "click .close": "removeItem"
        },
        
        renderExtend:function(){
            
            var myid = this.myid;
            var tourSkill = this.model.get("tourSkill");
            var template = _.template(contextMenuSkillEditor,{tourSkill:tourSkill})

            
            $("#"+myid+" .inner-modal").html(template);
            $("#"+myid+" header h2").text("Context Menu Skill Editor")
            this.verticalCent();
            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });

            
        },

        addItem:function(){
            $item = $("#"+this.myid+" .fieldwrapper fieldset:eq(0)").clone();

            var length = $("#"+this.myid+" .fieldwrapper").children().length;
            length++
            $item.attr("id","contextMenu-"+length);
            $item.find("h2").text("item-"+length)
            $item.find("input").val("")
            $("#"+this.myid+" .fieldwrapper").append($item);
        },

        doneEdition:function(){
            var myid = this.myid;
            var data = this.model.get("data");
            var skillid = data.id;
            var items = []          
            _.each($("#"+myid+" .fieldwrapper fieldset"),function(elem,ind){
                var obj = {};
                obj._caption = $(elem).find("input.caption").val();
                obj._kind = "Context Menu"
                obj._name = $(elem).find("h2").text();
                obj._onclick = "openurl("+$(elem).find("input.action").val()+",_blank);";
                obj._prev_tag_ident = "1";
                obj._segment = "SKILLS" ;
                obj._tag_ident = "2"
                items.push(obj)
            })

            tourData.krpano.contextmenu.item = items;
            $("#skinCustomizer-menu .skill-list #skill-"+skillid).data
            $("#"+myid+" header .fa-close").trigger("click");
        },

        removeItem: function (e) {
            $(e.target).parent().remove();
        }
    });

    return ContextMenuSkillEditor;
    
});
