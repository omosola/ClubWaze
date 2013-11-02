(function ($) {
  "use strict";
  DataProvider = Backbone.Model.extend({

    defaults: {
      googleAPIKey: "AIzaSyBICFlJOjrCgUc8gHbDfGlWZZzoQL26LL4",
      googleDataType: "json",
      description: "",
      author: "",
      query: "bar"
    },

    initialize: function(){
      debugger;

    },

    getBarsNearGeolocation: function (attrs) {
      // var map;
      // var service;
      // var infowindow;
      // debugger;

      // var city = new google.maps.LatLng(-33.8665433,151.1956316); //pyrmont

      // map = new google.maps.Map(document.getElementById('map'), {
      //     mapTypeId: google.maps.MapTypeId.ROADMAP,
      //     center: city,
      //     zoom: 15 //TODO: change default
      //   });

      // var request = {
      //   location: city,
      //   radius: '500',
      //   query: query
      // };

      // service = new google.maps.places.PlacesService(map);
      // service.textSearch(request, callback);

    },

    // callback: function (results, status) {
    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //       for (var i = 0; i < results.length; i++) {
    //         var place = results[i];
    //         console.log("place: ");
    //         console.log(place);
    //         //createMarker(results[i]);
    //     }
    //   }
    // },

    getBarsInCity: function (attrs) {
      // attrs.cityName
      debugger;
      var cityName = "Palo+Alto";
      var url = 'https://maps.googleapis.com/maps/api/place/textsearch/'+googleData+'?query=bars+in+'+cityName+'&sensor=true&key=' + googleAPIKey;


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
}(jQuery));

