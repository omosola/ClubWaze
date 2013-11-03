(function () {
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
    // getDummyBar: function() {
    //   //return 
    // }

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

      var barList =  this.getBarCache();//this.get('bars');
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
*/    debugger
      query.first({
        success: function(object) {
          barWithRating.rating = object;

          alert(object.id + ' - ' + object.get('barId'));
          callbackWithBarRating(barWithRating);
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    },

    getBarCache: function () {
      var cacheString = '[{"geometry":{"location":{"lb":37.444957,"mb":-122.16142400000001}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"51af9a830e154d190da12b89cec07c5ff7119c80","name":"Nola","opening_hours":{"open_now":false},"photos":[{"height":1344,"html_attributions":["From a Google User"],"width":760}],"price_level":2,"rating":3.8,"reference":"CnRlAAAAsDvwmE2Cl2Zlxi5u-31RnaYWtWHzDrwtf0FekwIAugydLQVN4RtxA5Pro5tx-TF9IQjA1TZsKF3Y0gAErO15ayCbWQoj7t1AeUPrVA9JGjfSv7GhN-ir_QPARGzkx4frIVMLUwKS3wvAPFFUNinaVhIQbVnQYyevyTcJQJc3wwYv5RoUOy5LiIh8Co4hh_NRFTX5TmvC4cM","types":["bar","restaurant","food","establishment"],"vicinity":"535 Ramona Street, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.44483,"mb":-122.16130699999997}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"6b58af88bd3e3c91991372fcb2009003b9438424","name":"The Old Pro","opening_hours":{"open_now":true},"photos":[{"height":720,"html_attributions":[],"width":960}],"price_level":2,"rating":3.5,"reference":"CnRsAAAA-M7EBJZosOGHW-nv1FbNqw3R5FFRuzFay1tckFuGoi6aXZIQpv1wE3LHO65stop8HhgrO5-buu3F8_l7sJJBAcp4LKoxANBgb63KEMpdXADQX1hYbGK3dpY8GaBJFY93Jf0hJb0J-ChkUaTa8Ed1LBIQ6Znz9yV1nte0zjcvjL8_9BoUqEa4NS71snQITVy_hCaRkHdDs9A","types":["bar","restaurant","food","establishment"],"vicinity":"541 Ramona Street, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.428439,"mb":-122.14969200000002}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"b0d2ac41d615515a436545c8c8c29da205520539","name":"Sundance The Steakhouse","opening_hours":{"open_now":false},"photos":[{"height":200,"html_attributions":[],"width":300}],"price_level":3,"rating":4.2,"reference":"CoQBeQAAAL3KMDFZ-k8oMU_heXNIYiUikiGKYNBprw7IXbucJpD9yrGX5WDTAnFc0Tl0FnQ-p35izu3ojUcnRE5FTiAgD1_kghDur8U9jUqsqnY98pmbIcuduOvP7DFMH-PQiq1QBXt6eFGVZSTSxvQ2xy-aQ297tWtHr0JJsIikcnmqFAaKEhCnMPdD8Pr50kcrBIcUeqilGhQSik1SZDpywzlgjWgSgDGWVp5L9w","types":["night_club","bar","restaurant","food","establishment"],"vicinity":"1921 El Camino Real, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.442984,"mb":-122.16543200000001}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"700a9346ffe19db459247a002cec1550e9532513","name":"MacArthur Park","opening_hours":{"open_now":false},"photos":[{"height":342,"html_attributions":[],"width":517}],"price_level":2,"rating":3.6,"reference":"CnRvAAAAgk5Rwy7LVQNHuiF-mKRJNPhyZ58DXBdMCIX7oi2tT_8-hlECCPaDRY0mS7Y9xFN9cG66mx70xg9pS5qcBC8JO6jTprBS3EV-6N8_EOvfuwMgqppbUd0yB50zAiGDMb9jso0-Q5yRNU44mtrHrH52txIQvQJtd__vaBycrxZ8Lvvz5hoUfIERk4nkLfSAt5aMnlLGWnwzLfA","types":["bar","restaurant","food","establishment"],"vicinity":"27 University Avenue, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.446482,"mb":-122.16134199999999}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"03b5929b26c42985a4bfd32e7a458ef86900551b","name":"Joya Restaurant","opening_hours":{"open_now":false},"photos":[{"height":768,"html_attributions":["From a Google User"],"width":1024}],"price_level":2,"rating":3.9,"reference":"CoQBcQAAADJ8wXf8BlyTWZE1eHgxTLCu6S51hixWoc8o7j_p1lnsrd_HLg3j1cXOaaEUUqYkXzKglagkoNhUZLk2UtcnpyohGzQz0E1yRr_8MBZUOhSeTPczk4zFhijeD4H3w_K07-wFajd1hMMCs-yRuhQoFNIe0n57OTzrgVYjLHpTR8oFEhAea79-xCrQrZy3DV-irtSvGhSKk9mO7wOpBEViBzLjUmH8RUN_ZQ","types":["night_club","bar","restaurant","food","establishment"],"vicinity":"339 University Avenue, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.444253,"mb":-122.16198600000001}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"c29e3cc5b6379e93614f4b609f0b184587ef3ed3","name":"The Rose and Crown English Pub & Restaurant","opening_hours":{"open_now":false},"photos":[{"height":484,"html_attributions":["From a Google User"],"width":648}],"price_level":2,"rating":4,"reference":"CpQBjQAAAGGrWFC2obp1b5emrt02GglgY-aYY0LpumB9OTPU_SmY3J64qhNzAPPX0xYKmbSiEsMLKfJmE6i2s1R_elnb7IG3h7Yttvu3zt0G0JcFuriLMrArZcgJb6Th-NmeRy5Qda0Q6amR1H1OOwEf-Xy2QJS4-3PbVKzvxSWTkRyaX0Ny3xYRh1CbZUMqF7F49M6rsBIQb7RR3qL8Jdd91H_BMDoIChoUp-TuuExMuy2uipeSeJ-jlZMr42A","types":["bar","establishment"],"vicinity":"547 Emerson Street, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.44861,"mb":-122.17463600000002}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"66d7944d3a31c86d5b9f403b2530018df0dbe846","name":"The Oasis Beer Garden","opening_hours":{"open_now":false},"photos":[{"height":947,"html_attributions":["From a Google User"],"width":1268}],"price_level":1,"rating":3.9,"reference":"CoQBdgAAADUmcN4VAQ-_G7Bs_eMONdOHZguzmNTWWUlHqDi7B4ZOj-NuUrS3-vTj3sCnHrj0i1fBZDgKSgvKSBk66rXEEvC9bqupgHr7Cy8i5DATF4ODC3yfA42_hGfRbTGE-esO3ha70iL4q4PpoC3g9ljyWdNbeyb_h9upv9fQ7P6HOMFjEhAm9a-UduX0Ge_kNY3OPDhgGhTeRZx3xrQY8f_3lUSs72xpcy0KNA","types":["bar","restaurant","food","establishment"],"vicinity":"241 El Camino Real, Menlo Park","html_attributions":[]},{"geometry":{"location":{"lb":37.443406,"mb":-122.16091599999999}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"308e4b7bed12001317c57638b523dbafc062fc51","name":"Gordon Biersch Brewery Restaurant","opening_hours":{"open_now":false},"photos":[{"height":776,"html_attributions":["From a Google User"],"width":1296}],"price_level":2,"rating":3.6,"reference":"CpQBgwAAAMTNOf_Uoogm7wiNOzbLjkHR5BSvEX8rpooqzjL-JAklD4mf0uxZcLzWJRQYK-vdVEVR3ht46m6Fnie8f8lq8fqhXezozcxiKSTkjlSiRNiUyFu3yqO56-tG8TKRh1n2YU0AqU5IfrDGTRfAc8KacHoChm45ZbOB453oldnnmQ5UgwiXxRPTBx1QHkn7UmFFpxIQdsX-5Jxk8UmI5PwnZadIihoUyKn3CmHqfwGBpzL7pR7lCTIJ-qw","types":["bar","restaurant","food","establishment"],"vicinity":"640 Emerson Street, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.427146,"mb":-122.14396599999998}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"3f202cb6f2850f74a0686c1348cc4540b4bd9947","name":"Antonio\'s Nut House","opening_hours":{"open_now":true},"photos":[{"height":853,"html_attributions":[],"width":1280}],"rating":3.7,"reference":"CoQBdQAAAB4cqwCYNlHZkcH3pGNEQHBY9OQCUl55mNAnFD0JjaT_lHtB1g3OTUuPpy6MQTr40tbQJZfzBEWTm1JbUWbEuzqd5TMNEuM-i3jvouQ7HhdUDfcutPRrSYO7T3WbfBgIPcOR53J_PuEp4N2jiI31bDzdrG3yAxcOw6uCsZUIdWIpEhD436xVryuWEsrtlyVIiyByGhQ157jEnusAuaDA2p3NroqZJfYiaA","types":["bar","establishment"],"vicinity":"321 South California Avenue, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.445118,"mb":-122.16331600000001}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"05a2124a82b129482506986a9d37e128a0a57e90","name":"Patxi\'s Chicago Pizza","opening_hours":{"open_now":false},"photos":[{"height":683,"html_attributions":[],"width":1024}],"price_level":2,"rating":3.9,"reference":"CoQBdgAAAJqID1esyP-geQy-8qBSnljXo5Rh48Rj9TxdlUOeEOzSGkYPCaWqgeXWpSwg7UYe9XZpJxH3ER1NMnm966wswYEc3DFla0fWjxQKCcdCdNkuEJFm_yPdSpCjEq34CozMgqs7XNTgTmUQHDc-xZUrpkiVU1L5pKPGJmFb5F8pITEsEhCmSE1UO9DGoZ0ytfeitdkqGhRXi1ZqlsFeUEmdbnIbBXEtTOQkHQ","types":["bar","restaurant","food","establishment"],"vicinity":"441 Emerson Street, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.419518,"mb":-122.212268}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"48be5726f5a99a7c459d3883daefba69a5f5d9eb","name":"Madera","opening_hours":{"open_now":false},"photos":[{"height":500,"html_attributions":[],"width":371}],"price_level":3,"rating":4.4,"reference":"CnRnAAAAqez-GyBFQdWSHv8Hz3y0bcS5Awdcw2wRfNCY6UE_N7B8541eYtsLf3E62DoEJrhzZIwHxb8izInhtxm0zCgxhFB4EqlvRwQpmAJuBAeWTlHKcXPSRxk83wt8TJTMey7uoMGun_2822CDIG4EmYXWhxIQigVwPmJ5P_QysphH3F4K-xoU0E18LdVOfj1SHDzL7YhdP7lKrKQ","types":["night_club","bar","restaurant","food","establishment"],"vicinity":"2825 Sand Hill Road, Menlo Park","html_attributions":[]},{"geometry":{"location":{"lb":37.431927,"mb":-122.20162900000003}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"133e673468c6e0da0807f7d981d03296dfc784d7","name":"Dutch Goose","opening_hours":{"open_now":false},"photos":[{"height":1530,"html_attributions":["From a Google User"],"width":2048}],"price_level":2,"rating":4,"reference":"CnRsAAAAsQNpTP8ZCAQPbwhdWgSL5m7dOBJS9VJZXpBtbVtkNOb6S1i29_WY9dinJw0JVsJDwmHD9_unIpkf77JfC7aTX9TXMp2e58mvWabDlMjmypItm84vgkOyAC48gwcNOrk8hlke0QBWv32VJ-hcA-JpaRIQ9bPSYY69DArGFSfT8RnAihoUOVa_J8YTmvohvgXjumfduOKkqqo","types":["bar","restaurant","food","establishment"],"vicinity":"3567 Alameda De Las Pulgas, Menlo Park","html_attributions":[]},{"geometry":{"location":{"lb":37.443714,"mb":-122.169806}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"32a50e0a52925328f3ff87c209b03739226d9e5f","name":"Fleming\'s Prime Steakhouse & Wine Bar","opening_hours":{"open_now":false},"photos":[{"height":960,"html_attributions":[],"width":720}],"price_level":3,"rating":3.8,"reference":"CpQBhwAAAFK0ALnJZxzKYdX3_RoQ6jgxiu69djf3QNBi6UQNA_avZqjS1DCYEMxuHifU_c95tuKJS9mjrabRL4jgWeswbx8FQHE0u3Ko4JXfMWmizkoKYudcNYRcZ6y_mZUDIyr3dIcb42YUoVi6pNTopqH0TTqy9CjC0LHfdzQyCd4ZR8wCygqz_zkCvdHE4gf642jCpRIQd6UKb8Ay0uOsgdtHV4TtgxoUxjAjxUs91-mCL79Cex60c0Dv4DQ","types":["bar","restaurant","food","establishment"],"vicinity":"180 El Camino Real #2, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.445063,"mb":-122.163948}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"0e66dd206b0cd2d352609b6f89845a7cb9c32d90","name":"The Patio","opening_hours":{"open_now":true},"photos":[{"height":1365,"html_attributions":[],"width":2048}],"reference":"CnRqAAAAEV3a_3zMmhRoMoSx-sM-VVjUBp0ohoWVLxlkhMPlsj2Pp6bFdPBv25WK7bWlvnqn_Ez9UaL9oP0uNhC1CAzsaj0LFZpjCRjuPKA8cTDIfSbLTpXEouAwP8msfYTwFbAUO3JZGH6wvt3K-pQNRswLGxIQdcgQE7J_SWwy688DCYzMaRoU0jD0UM9vjB8D81ofCk0zC-tnxL4","types":["night_club","bar","restaurant","food","establishment"],"vicinity":"412 Emerson Street, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.446238,"mb":-122.16111599999999}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png","id":"adc6f1755b2dc7886cebd009627756e821f52a2e","name":"Sliderbar Cafe","opening_hours":{"open_now":false},"photos":[{"height":473,"html_attributions":[],"width":634}],"price_level":2,"rating":3.6,"reference":"CnRuAAAAVmDSmb3YQt4W3vqpLY48a6sos5Xv7n7J_lYW3fGq2WFRvg1McyD-tfPq6CTPJlY8GFFvO04InaMsblHtk6XjAuG2pJBDqWZh9aY0coT75Nyx0S5pPC-d0PacnN5J7Ix8fIROGM4tw6Sh5vKKDZwtVRIQX1KdYLKT76BU79XjVLZ4choUjfAPGvGrObAgbVxtX4tGAl5rORI","types":["store","cafe","bar","restaurant","food","establishment"],"vicinity":"324 University Avenue, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.437215,"mb":-122.17327399999999}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png","id":"4edff0a5bc02059b09a2fe7d50b7a5b25ce3f85d","name":"California Cafe","opening_hours":{"open_now":false},"photos":[{"height":2048,"html_attributions":["From a Google User"],"width":1536}],"price_level":2,"rating":3.5,"reference":"CnRwAAAAjsr6z5m3e9mm4xebPxJSXxazr4EO34k3t1m2tXhSeahK4mLlMnjPv4eZq5Zz8NAYymIgPQ3Oj1O0h04F6irc1d-HYZ462t5MMhYMsUeNWcvJB3-zkLdVweclU-25uxxBc6FmT-8VANDTAVLfROLGHBIQhxhNhZrq7zNr8KIQlIQBQBoUezF1cvxsbjCBKuQqE7ttKl9U9HY","types":["cafe","bar","restaurant","food","establishment"],"vicinity":"700 Welch Road, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.444079,"mb":-122.16198400000002}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"d7da565a78b49854c83e8cb579affef4a8a9436a","name":"Gravity Bistro","opening_hours":{"open_now":true},"photos":[{"height":1224,"html_attributions":["From a Google User"],"width":1632}],"price_level":2,"rating":4.1,"reference":"CnRvAAAA-U_t5bSHIyQl5LxlYiiNnbiqfJKd6HZn-vyn2O7NFiPcNISLnYpJEIgdN0X_GdJ80yDgeCf99jsj3t_wTbX_njetwnsmAPV2gI2v4lhZDm7M0wwkdvct0Xfe-pOMQriSbe2cOYsTMRnKHPpUc3Q39hIQZY_P5OjLeK5f29an7g1JHBoUXP92V6ll15a8nGZbkw6AIoEh4rE","types":["bar","restaurant","food","establishment"],"vicinity":"544 Emerson Street, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.400724,"mb":-122.11112000000003}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"15ad868ea655a18613450ea4d86dd9b5d3d069ed","name":"Chili\'s Grill & Bar","opening_hours":{"open_now":false},"photos":[{"height":640,"html_attributions":[],"width":960}],"price_level":1,"rating":3.4,"reference":"CoQBdAAAALW_fh-eX75rWuceMEYAiq778-sTU6g9_R0FcYSQiYTgOCRbuk083W4dr4f_vFrhthvktcxKMUbMA1bFUp--KX3NIlVceJftzemvwfJz1ILSCkjxVroE1H2Z3knoHmNmpJVxNgqZCpaQEj5xijassSmYlCfUqKznI19mIWZ-hg5KEhCkoQuCMT8BpL00PKpsZd30GhQ4DAHQOh-t0ttZ6iEJ0G3T_Ca1Qg","types":["bar","restaurant","food","establishment"],"vicinity":"2560 West El Camino Real, Mountain View","html_attributions":[]},{"geometry":{"location":{"lb":37.444939,"mb":-122.16179999999997}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"62407af89c91c992699a3ea9e65e92a385ec5c20","name":"The Wine Room","opening_hours":{"open_now":false},"photos":[{"height":1280,"html_attributions":[],"width":961}],"rating":4.1,"reference":"CnRvAAAAnFEbKsBh9mKhyoRac3vsjwJU6AHZE9nLhI30qOo1yoLJziQVrNLff-UEN99ydwW9SmMSpAONWzT-UnKJ98Ow16wUNHTmN6tDrcT25_jcGfqwrDuMSf7IRzkDHThhvTSt3A0dgs-QFGt1ZTcvkAIhoxIQs26QrsMkHWPBfCLo9dNKyRoUza8JZZlXdZADDbIIo_P_7h4Qgy0","types":["food","bar","establishment"],"vicinity":"520 Ramona Street, Palo Alto","html_attributions":[]},{"geometry":{"location":{"lb":37.44391,"mb":-122.16382699999997}},"icon":"http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png","id":"2be9d14a53a1031526df25c32002a0a37510a65e","name":"Rudy\'s Pub","photos":[{"height":540,"html_attributions":[],"width":720}],"price_level":2,"rating":3.3,"reference":"CnRrAAAAafdSeuH0kBadCuLASrLqZ2wYZLHi5BEaswCuIPzWxDsdkhXcldGloM6dDIgQyVaWbA_Xc0--d2WpbJlyJa2fP1LLToVmh1bOqRBoEzPmPbN9FeE2gW41l4OsXHHd_71QhdZseOXnnUZGr4a6ougsnRIQlBx4MVO-ET3iQJmfbgG9vxoUnbVbYxTls6DT7oMoP9B5AUAiXKk","types":["bar","restaurant","food","establishment"],"vicinity":"117 University Avenue, Palo Alto","html_attributions":[]}]';
      var object = JSON.parse(cacheString);
      return object;
    },
  });
}());

