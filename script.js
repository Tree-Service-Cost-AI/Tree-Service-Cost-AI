script.js
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    }

    document.querySelector('a-scene').addEventListener('arjs-video-loaded', () => {
        // AR.js is ready, you can start your photogrammetry process here
        console.log('AR.js ready');
        initializeOpenCV();
    });
});

function initializeOpenCV() {
    cv['onRuntimeInitialized'] = () => {
        console.log('OpenCV.js is ready');
        
        // Example: Capture image from AR.js scene and process it
        let video = document.querySelector('a-scene').components['arjs'].arController.imageList[0];

        // Assuming video is the HTMLVideoElement used by AR.js
        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let cap = new cv.VideoCapture(video);

        cap.read(src);
        cv.imshow('outputCanvas', src); // Display on a canvas for debug

        // Perform photogrammetry operations here
        // Example: Convert to grayscale
        let gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.imshow('outputCanvas', gray); // Display grayscale image for debug
    };
}
