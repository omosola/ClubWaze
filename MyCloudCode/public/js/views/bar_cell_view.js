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
      // 
      var colors = ['rgba(52, 152, 219, 0.65)', 'rgba(154, 204, 237, 0.65)',  'rgba(243, 158, 166, 0.65)','rgba(182, 22, 34, 0.65)'];
      var rating = this.options.rating;
      if (typeof(rating) == "undefined") {
        rating = 2; 
      }
      var colorNum = Math.round((Math.random()*(colors.length - 1)));
      console.log(colorNum);
      var name = this.options.name;
      if (name.length > 19) {
        name = name.substring(0,18) + '...';
      }
      return this.template({id: this.options.id, name: name, dist: this.options.dist, color:colors[colorNum]});
    },


  });

}());

