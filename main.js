// On file upload
function loadImg(imageFile) {
  $(".img-canvas").empty();

  var img = new Image();
  img.src = window.URL.createObjectURL(imageFile);
  console.log(img);

  // img.src = "test.jpg";
  img.addEventListener("load", function() {

    var slices = [];
    var stills = 15;
    var sliceSize = img.width < img.height ?
      img.width / stills : img.height / stills;
    var horSlices = Math.floor(img.width / sliceSize);
    var vertSlices = Math.floor(img.height / sliceSize);

    function sliceImage() {

      for (y = 0; y < vertSlices; y++) {
        for (x = 0; x < horSlices; x++) {
          var canvasSlice = document.createElement('canvas');
          var ctxSlice = canvasSlice.getContext("2d");

          canvasSlice.width = sliceSize;
          canvasSlice.height = sliceSize;

          ctxSlice.drawImage(img,
            sliceSize * x, sliceSize * y,
            sliceSize, sliceSize,
            0, 0,
            sliceSize, sliceSize
          );
          slices.push(canvasSlice.toDataURL());
        }
      }
    }

    sliceImage();

    slices.forEach(function(d, i) {
      var imgSlice = $("<img>").addClass("img-slice");
      imgSlice.attr("src", d);
      imgSlice.css({
        "transform":
          "scale("+ (Math.random() * (2 - 1) + 1) + ")",
        "-webkit-filter": "brightness(" + (Math.random() * (1 - 0.95) + 0.95) + ")",
        "filter": "brightness(" + (Math.random() * (1 - 0.95) + 0.95) + ")"
      });

      var imgCanvas = $(".img-canvas");
      var sliceContainer = $("<div></div>").addClass("slice-container");
      sliceContainer.css({
        "width": (1 / horSlices) * 100 + "%",
        "height": (1 / horSlices) * 90 + "vw"
      });
      sliceContainer.append(imgSlice);
      $(".img-canvas").append(sliceContainer);
    });

    // Animate the slices
    // window.setInterval(function () {
    //   $(".img-slice").each(function(d) {
    //     $(this).css({
    //       "transform":
    //         "scale("+ (Math.random() * (2 - 1) + 1) + ")"
    //     });
    //   });
    // }, 250);

    img = null;
  });
}
