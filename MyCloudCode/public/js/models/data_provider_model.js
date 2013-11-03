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

    saveUserInput: function (attrs) {
      // addUserInput
      //updateRatings
    },

    getBarObjectForId: function (attrs) {
       


    },

    //private methods
    addUserInput: function(attrs) {

    },

    updateRatings:function(attrs) {

    } , 
  });
}());
