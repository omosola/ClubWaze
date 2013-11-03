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
      var num = 0;

      for(var i=0; i < this.collection.length; i++) {
        var bc = this.collection[i];
        num += new Number(Math.random());
        bc.dist=num.toPrecision(2);
        if (bc.dist < 1) bc.dist = num.toPrecision(1);
        var bcv = new window.BarCellView(bc);
        that.$el.append(bcv.render());
      } 
    },


  });

}); 