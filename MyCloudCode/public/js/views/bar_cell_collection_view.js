$(function () {
  window.BarCellCollectionView = Backbone.View.extend({

    el:"#bar-info-container" ,



    initialize: function(){
    },

    render: function() {
      
            // Clear out this element.
      this.$el.empty();
   
      // Render each sub-view and append it to the parent view's element.

      
      var that = this;


      for(var i=0; i < this.collection.length; i++) {
        var bc = this.collection[i];
        var num = new Number(Math.random() * 5);
        bc.dist=num.toPrecision(2);
        var bcv = new window.BarCellView(bc);
        that.$el.append(bcv.render());
      } 
    },


  });

}); 