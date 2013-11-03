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


    template: _.template("<a href='barinfo.html?id=<%=id%>'><div class='bar-info'> <div> <%=name%> </div> <div> <%=dist%> </div> </div></a>"),


    initialize: function(){


    },

    render: function() {
      console.log(this);
      return this.template({id: this.options.id, name: this.options.name, dist: this.options.dist});
    },


  });

}());

