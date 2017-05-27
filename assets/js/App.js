var gameController = new GameController(new AudioContext());

document.addEventListener("DOMContentLoaded", function () {
    var count = 0;
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Space'){
            e.preventDefault();
            count++;
            gameController.onSpacePress(count);
        }
    });
});