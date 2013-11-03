$(function () {
  window.BarCellCollectionView = Backbone.View.extend({

    el:"#bar-info-container" ,



    initialize: function(bars){
    },

    render: function() {
      
            // Clear out this element.
      this.$el.empty();
   
      // Render each sub-view and append it to the parent view's element.

      
      var that = this;


      for(var i=0; i < this.collection.length; i++) {
        var bc = this.collection[i];
        var bcv = new window.BarCellView(bc);
        that.$el.append(bcv.render());
      } 
      debugger
    },


  });

}); 