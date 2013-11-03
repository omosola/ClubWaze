(function () {
  window.BarCellView = Backbone.View.extend({

    defaults: {
      googleAPIKey: "AIzaSyBICFlJOjrCgUc8gHbDfGlWZZzoQL26LL4",
      googleDataType: "json",
      description: "",
      author: "",
      query: "bar",
      latitude: '37.4322',
      longitude: '-122.16298',
      bars: null,
    },

    template: _.template(" <div class='bar-info'> <div> <%=name%> </div> <div> dist </div> </div>"),


    initialize: function(){


    },

    render: function() {
      console.log(this);
      return this.template({name: this.options.name, });
    },


  });

}());

