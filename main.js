var img = new Image();
img.src = "test.jpg";
img.addEventListener("load", function() {

  var slices = [];
  var stills = 9;
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
  var imgCanvas = $(".img-canvas");
  imgCanvas.css({
    "width": "75%",
    "height": "auto"
  });

  slices.forEach(function(d, i) {
    var imgSlice = $("<img>").addClass("img-slice");
    imgSlice.attr("src", d);
    imgSlice.css({
      "transform":
        "scale("+ (Math.random() * (2 - 1) + 1) + ")",
      "-webkit-filter": "brightness(" + (Math.random() * (1 - 0.95) + 0.95) + ")",
      "filter": "brightness(" + (Math.random() * (1 - 0.95) + 0.95) + ")"
    });

    var sliceContainer = $("<div></div>").addClass("slice-container");
    sliceContainer.css({
      "width": (1 / horSlices) * 100 + "%",
      "height": (1 / horSlices) * 75 + "vw"
    });
    sliceContainer.append(imgSlice);
    $(".img-canvas").append(sliceContainer);
  });
});
