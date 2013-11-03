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

    initialize: function(){
      Parse.$ = jQuery;

      // Initialize Parse with your Parse application javascript keys
      Parse.initialize("XkIQ36SN2LMpaSSQX2fMOLjqHP5PT72JFQ5nizHD",
                       "EHgttht5UQd9XvvFHjIfy4XgVPKcVRFPd5zDcV0X");
},

/*
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
*/

    getBarsNearGeolocation: function (attrs, callback) {
      var map;
      var service;

      var pyrmont = new google.maps.LatLng(this.get('latitude'),this.get('longitude'));

      map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: pyrmont,
          zoom: 15
        });

      var request = {
        location: pyrmont,
        radius: '5000',
        types: ['bar']
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);

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


      rating.set("barId", attrs.barId);
      if (attrs.genderRatio != null)
          rating.set("genderRatio", attrs.genderRatio);
      if (attrs.attractiveness != null)
          rating.set("attractiveness", attrs.attractiveness);
      if (attrs.peopleDancing != null)
          rating.set("peopleDancing", attrs.peopleDancing);
      if (attrs.atmosphere != null)
          rating.set("atmosphere", attrs.atmosphere);
      if (attrs.busyness != null)
          rating.set("busyness", attrs.busyness);
      if (attrs.entryLine != null)
          rating.set("entryLine", attrs.entryLine);
      if (attrs.coverCharge != null)
          rating.set("coverCharge", attrs.coverCharge);

      rating.save(null, {
          success: function(rating) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + rating.id);
          },
          error: function(rating, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);
          }
      });

      //var jsonRating = JSON.stringify(attrs);
      //if (jsonRating != null) {
      //  rating.save(jsonRating);
      //}
    },

    getBarObjectForId: function (attrs, callbackWithBarRating) {
      var barWithRating = {};
      barWithRating.bar = null;
      barWithRating.rating = null;

      var barList =  this.get('bars');
      for (var i = 0; i < barList.length; i++) { 
        var bar = barList[i];
        if (bar.id == attrs.barId) {
          barWithRating.bar = bar;
          break;
        }
      }

      var Rating = Parse.Object.extend("Rating");
      var query = new Parse.Query(Rating);
      query.equalTo("barId", attrs.barId);
      query.descending("updatedAt");
/*
      query.first().then(function(object) {
          barWithRating.rating = object;
          debugger;
          return barWithRating;
      });
*/
      query.first({
        success: function(object) {
          barWithRating.rating = object;
          debugger;
          alert(object.id + ' - ' + object.get('barId'));
          callbackWithBarRating(barWithRating);
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    },

    //private methods
    addUserInput: function(attrs) {

    },

    updateRatings:function(attrs) {

    } , 
  });
}());

