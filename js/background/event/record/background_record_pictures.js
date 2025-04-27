Property["Picture"] = {
    load: function (deviceId, inputId, pictureId, pictureFormat) {
        try {
            return Client.Management().Picture(pictureId);
        }
        catch (e) {
            return null;
        }
    }
}


Html.Control.AlertWindow.Picture = {
    load: function (id) {
        var result = Property.Record.load(id);
        this.PictureId.set(result);
    },
    PictureId: {
        value: new Array(),
        get: function () {
            return this.value;
        },
        set: function (value) {
            if (!value.PictureId || value.PictureId.length == 0)
                return
            var id = new Id(value.ComponentId);
            var deviceId = id.getDeviceId();
            var imgDiv = document.getElementById("carousel-inner");
            var thumbnail = document.getElementById("thumbnail");
            for (var i = 0; i < value.PictureId.length; i++) {
                (function () {
                    var src = Property.Picture.load(deviceId, value.ComponentId, value.PictureId[i], PictureFormat.Jpeg);
                    var div = document.createElement("div");
                    div.className = "item";

                    var img = document.createElement("img");
                    img.src = src;
                    img.style.width = "1000px";
                    img.style.height = "562.5px";
                    img.onerror = function () {
                        this.src = "../../img/default.png";
                    }
                    div.appendChild(img);
                    imgDiv.appendChild(div);
                    var thumbnail_img = document.createElement("img");
                    thumbnail_img.src = src;
                    thumbnail_img.onerror = function () {
                        this.src = "../../img/default.png";
                    }
                    thumbnail_img.style.width = "120px";
                    thumbnail_img.style.height = "67.5px";
                    thumbnail_img.style.marginTop = "10px";
                    thumbnail_img["data-target"] = "#carousel-example-generic";
                    thumbnail_img["data-slide-to"] = i.toString();
                    thumbnail_img.setAttribute('data-target', '#carousel-example-generic');
                    thumbnail_img.setAttribute('data-slide-to', i.toString());
                    thumbnail_img.className = "mouse_pointer";
                    if (i == 0) {
                        div.className += " active";
                        thumbnail_img.className += " active";
                    }
                    thumbnail.appendChild(thumbnail_img);
                })();
            }
            $(".carousel-indicators img").click(function () {
                $(".carousel-indicators img").removeClass("active");
                $(this).addClass("active");
                $("#carousel-example-generic").carousel($(this).data('slide-to'));
            })
            $(".left.carousel-control").click(function () {
                $("#carousel-example-generic").carousel('prev');
            });
            $(".right.carousel-control").click(function () {
                $("#carousel-example-generic").carousel('next');
            });

            document.getElementById("carousel-inner").children[0].children[0].onload = function () {
                setTimeout(function () {
                    $(".carousel-control").css("height", $("#carousel-inner").height());
                }, 500);
            }
            this.value = value;
        }
    }
}