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


    template: _.template("<a href='barinfo.html?id=<%=id%>'><div class='bar-info' style='background-color:<%=color%>'> <div class='cellName'> <%=name%> </div> <div class='cellDist'> <%=dist%> </div> </div></a>"),


    initialize: function(){


    },

    render: function() {
      console.log(this);
      var colors = ['rgba(65,100,255,0.5)', 'rgba(255,69,0,0.5)'];
      var rating = this.options.rating;
      if (typeof(rating) == "undefined") {
        rating = 2; 
      }
      var colorNum = rating*10 %2 ;
      console.log(colorNum);
      return this.template({id: this.options.id, name: this.options.name, dist: this.options.dist, color:colors[colorNum]});
    },


  });

}());

