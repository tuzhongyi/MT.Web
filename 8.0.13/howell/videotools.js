var VideoTools = {
    Snapshot: function (video, element) {


        var canvas = document.createElement("canvas");

        var context = canvas.getContext('2d');

        var w, h, ratio;

        // Add a listener to wait for the 'loadedmetadata' state so the video's dimensions can be read

        // Calculate the ratio of the video's width to height
        ratio = video.videoWidth / video.videoHeight;
        // Define the required width as 100 pixels smaller than the actual video's width
        w = video.videoWidth - 100;
        // Calculate the height based on the video's width and the ratio
        h = parseInt(w / ratio, 10);
        // Set the canvas width and height to the values just calculated
        canvas.width = w;
        canvas.height = h;

        context.fillRect(0, 0, w, h);
        context.drawImage(video, 0, 0, w, h);
        element.innerHTML = "";
        element.appendChild(canvas);
        return canvas;
    },
    Download: function (video, filename) {
        // Get a handle on the 2d context of the canvas element

        if (!filename)
            filename = (new Date()).toISOString() + ".png";

        var canvas = document.createElement("canvas");

        var context = canvas.getContext('2d');
        // Define some vars required later
        var w, h, ratio;

        // Add a listener to wait for the 'loadedmetadata' state so the video's dimensions can be read

        // Calculate the ratio of the video's width to height
        ratio = video.videoWidth / video.videoHeight;
        // Define the required width as 100 pixels smaller than the actual video's width
        w = video.videoWidth - 100;
        // Calculate the height based on the video's width and the ratio
        h = parseInt(w / ratio, 10);
        // Set the canvas width and height to the values just calculated
        canvas.width = w;
        canvas.height = h;

        // Takes a snapshot of the video

        // Define the size of the rectangle that will be filled (basically the entire element)
        context.fillRect(0, 0, w, h);
        // Grab the image from the video
        context.drawImage(video, 0, 0, w, h);




        var url = canvas.toDataURL('image/png', 1);
        var blob = VideoTools.getBlob(url);
        var objurl = URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.download = filename;
        a.href = objurl;
        a.click();

    },
    getBlob: function (url) {
        var binStr = atob(url.split(',')[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
        }

        return new Blob([arr]);
    }
}


