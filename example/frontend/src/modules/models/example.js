(function(Backbone){
    var ExampleModel = Backbone.Model.extend({
        toString: function(){
            return this.get('name');
        }
    });

    if (typeof window.Model === 'undefined') window.Model = {};
    window.Model.Example = ExampleModel;
})(Backbone);
