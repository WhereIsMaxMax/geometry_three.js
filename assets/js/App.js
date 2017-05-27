var gameController = new GameController(new AudioContext());

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space'){
      e.preventDefault();
      onSpacePress(gameController);
    }
  });
});
