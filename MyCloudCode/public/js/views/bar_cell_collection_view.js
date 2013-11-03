$(function () {
  window.BarCellCollectionView = Backbone.View.extend({

    el:"#bar-info-container" ,



    initialize: function(bars){
    },

    render: function() {
      
            // Clear out this element.
      console.log(this.$el);
      this.$el.empty();
   
      // Render each sub-view and append it to the parent view's element.
      console.log("this");
      console.log(this);
      console.log(this.collection);
      
      var that = this;
      console.log(this.$el);
      console.log(this.collection);

      for(var i=0; i < this.collection.length; i++) {
        var bc = this.collection[i];
        console.log(that);
        var bcv = new window.BarCellView(bc);
        console.log(bcv.render());
        that.$el.append(bcv.render());
      } 


      // _(this.collection).each(function(bc) {
      //   console.log(that);
      //   var bcv = new window.BarCellView(bc);
      //   that.$el.append(bcv.render().el);
      // });
      console.log(this.$el);
      debugger
    },


  });

}); 