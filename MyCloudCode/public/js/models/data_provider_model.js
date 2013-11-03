(function () {
  "use strict";
  window.DataProvider = Backbone.Model.extend({

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

    initialize: function(){},

    getBarsNearGeolocation: function (attrs) {
      //TODO: we are seeding latitude and longitude
      var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+this.get('latitude')+','+this.get('longitude')+'&radius=5000&types=bar&sensor=true&key='+this.get('googleAPIKey');

      var result = "";

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(r) { 
          result = r;
        },
        data: {},
        async: false
       });
      this.set('bars', result['results'])
      return this.get('bars');
    },



    getBarsInCity: function (attrs) {

      // attrs.cityName
      var cityName = "Palo+Alto";
      var url = 'https://maps.googleapis.com/maps/api/place/textsearch/';
      url += this.get('googleDataType');
      url += '?query=bars+in+'+cityName+'&sensor=true&key='+this.get('googleAPIKey');

      $.getJSON(url,function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
      });

    },

    saveRating: function (attrs) {
      var Rating = Parse.Object.extend("Rating");
      var rating = new Rating();

      var jsonRating = JSON.stringify(attrs);
      //rating.set("barId", attrs.barId);
      //if (attrs.genderRatio != null)
      //    rating.set("genderRatio", attrs.genderRatio);
      //if (attrs.coverCharge != null)
      //    rating.set("coverCharge", attrs.coverCharge);
      //if (attrs.attractiveness != null)
      //    rating.set("attractiveness", attrs.attractiveness);
      //if (attrs.peopleDancing != null)
      //    rating.set("peopleDancing", attrs.peopleDancing);
      //if (attrs.atmosphere != null)
      //    rating.set("atmosphere", attrs.atmosphere);
      //if (attrs.busyness != null)
      //    rating.set("busyness", attrs.busyness);
      //if (attrs.entryLine != null)
      //    rating.set("entryLine", attrs.entryLine);

      if (jsonRating != null) {
        rating.save(jsonRating);
      }
    },

    getBarObjectForId: function (attrs) {
      var barWithRating = {};
      barWithRating.bar = null;
      barWithRating.rating = null;

    },

    //private methods
    addUserInput: function(attrs) {

    },

    updateRatings:function(attrs) {

    } , 
  });
}());

