$(window).on("load", function() {
  $("product-breadcrumbs").each(function() {
    this.innerHTML = '<a href="/">Home</a> &gt; <a href="/">Products</a>'
  })
})
