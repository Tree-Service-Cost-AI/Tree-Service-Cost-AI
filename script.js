window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    }

    let capturedImages = [];

    // Add event listener for capture button
    document.getElementById('capture-button').addEventListener('click', () => {
        let video = document.querySelector('video'); // AR.js uses a video element
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        captureImage(video, context, canvas, capturedImages);
    });

    // Add event listener for process button
    document.getElementById('process-button').addEventListener('click', () => {
        processImages(capturedImages);
    });

    document.querySelector('a-scene').addEventListener('loaded', () => {
        console.log('AR.js ready');
        initializeOpenCV();
    });
});

function initializeOpenCV() {
    cv['onRuntimeInitialized'] = () => {
        console.log('OpenCV.js is ready');
    };
}

function captureImage(video, context, canvas, capturedImages) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    capturedImages.push(imageData);
    console.log('Image captured');
}

function processImages(images) {
    if (images.length < 2) {
        console.error('Need more images for photogrammetry');
        return;
    }

    images.forEach(imageData => {
        let src = cv.matFromImageData(imageData);
        let gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

        // Detect keypoints
        let orb = new cv.ORB();
        let keypoints = new cv.KeyPointVector();
        orb.detect(gray, keypoints);

        // Display keypoints on canvas
        let out = new cv.Mat();
        cv.drawKeypoints(gray, keypoints, out);
        cv.imshow('outputCanvas', out);

        // Cleanup
        src.delete();
        gray.delete();
        out.delete();
        keypoints.delete();
        orb.delete();
    });

    calculateMeasurements(images);
}

function calculateMeasurements(images) {
    console.log('Calculating measurements...');
    // Implement photogrammetry algorithms to calculate tree height, radius, and canopy height
}
