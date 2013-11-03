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


    template: _.template("<a href='barinfo.html?id=<%=id%>'><div class='bar-info' style='background-color:<%=color%>'> <div class='cellName'> <%=name%> </div> <div class='cellDist'> <%=dist%> <font size='2px'>mi</font> </div> </div></a>"),


    initialize: function(){


    },

    render: function() {
      console.log(this);
      var colors = ['rgba(52, 152, 219, 0.65)', 'rgba(231, 76, 60, 0.65)'];
      var rating = this.options.rating;
      if (typeof(rating) == "undefined") {
        rating = 2; 
      }
      var colorNum = rating*10 %2 ;
      var name = this.options.name;
      if (name.length > 28) {
        name = name.substring(0,28) + '...';
      }
      return this.template({id: this.options.id, name: name, dist: this.options.dist, color:colors[colorNum]});
    },


  });

}());

