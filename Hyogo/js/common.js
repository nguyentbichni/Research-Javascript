(function ($) {
  //------Version 1-------
  // var image_gallery = [
  //   '<li><img src="./img/gallery/images/1.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/2.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/3.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/4.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/5.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/6.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/7.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/8.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/9.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/10.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/11.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/12.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/13.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/14.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/15.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/16.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/17.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/18.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/19.jpg"alt="" width="225" height="225"></li>',
  //   '<li><img src="./img/gallery/images/20.jpg"alt="" width="225" height="225"></li>'
  // ];
  // function randomImage() {
  //   var i, j, k;
  //   var gallery_html = "";
  //   for (i = image_gallery.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * i);
  //     k = image_gallery[i];
  //     image_gallery[i] = image_gallery[j];
  //     image_gallery[j] = k;
  //     gallery_html = gallery_html + image_gallery[i]
  //   }
  //   document.querySelector(".img_gallery_list").innerHTML = gallery_html;
  // }
  // randomImage();
  //------Version 2-------
  var arr = [];
  $("li").each(function(index, element){
    arr.push(element.outerHTML);
  })
  function randomImage() {
    var i, j, k;
    var gallery_html = "";
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * i);
      k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
      gallery_html = gallery_html + arr[i]
    }
    document.querySelector(".img_gallery_list").innerHTML = gallery_html;
  }
  randomImage();
})(jQuery);
