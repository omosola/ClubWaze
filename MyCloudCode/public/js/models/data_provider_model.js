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
      longitude: '-122.16298'
    },

    initialize: function(){
      debugger;

    },

    getBarsNearGeolocation: function (attrs) {
      var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+this.get('latitude')+','+this.get('longitude')+'&radius=5000&types=bar&sensor=true&key='+this.get('googleAPIKey');

      $.getJSON(url,function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        console.log(data);
      });
    },



    getBarsInCity: function (attrs) {

      // attrs.cityName
      debugger;
      var cityName = "Palo+Alto";
      var url = 'https://maps.googleapis.com/maps/api/place/textsearch/';
      url += this.get('googleDataType');
      url += '?query=bars+in+'+cityName+'&sensor=true&key='+this.get('googleAPIKey');

      console.log("hello peeps");

      $.getJSON(url,function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        console.log(data);
      });

    },

    saveUserInput: function (attrs) {
      // addUserInput
    },

    getBarObjectForId: function (attrs) {
       


    },

    //private methods
    addUserInput: function(attrs) {

      // updateRatings
    },

    updateRatings:function(attrs) {

    } , 
  });
}());

