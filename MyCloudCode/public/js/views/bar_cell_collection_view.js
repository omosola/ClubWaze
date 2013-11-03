(function () {
  "use strict";
  window.BarCellCollectionView = Backbone.View.extend({
    el:"#bar-info-container" ,

    initialize: function(){
      this._barCellViews = [];
      this.collection.each(function(bar) {
        that._barCellViews.push(bar);
      });
    },

    render: function() {
      var that = this;
      // Clear out this element.
      $(this.el).empty();
   
      // Render each sub-view and append it to the parent view's element.
      _(this._barCellViews).each(function(bcv) {
        $(that.el).append(bcv.render().el);
      });
    },


  });

}());