var render = function () {
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    // lines.forEach((item) => {
    //   if (item.position.y <= 500) {
    //     item.position.y += 0.1;
    //   } else {
    //     item.position.y -= 0.1;
    //   }
    // });

    // radius= 1 + analyser2volume.smoothedValue() * maxRadius

    var dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);


    var width = dataArray.length;
    var sum = 0;
    for (var i = 0; i < width; i++) {
        sum += dataArray[i];
    }
    // complute the amplitude
    var amplitude = sum / (width * 256 - 1);
    sphereRadius = 1 + amplitude * 10;
    // sphere.material.color.setHex(  Math.random() * 0xffffff, Math.random() * 0xffffff, Math.random() * 0xffffff);

    // for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    //     var value = freqs[i];
    //     var percent = value / 256;
    //     var height = 30 * percent;
    //     var offset = 30 - height - 1;
    //     var barWidth = 25/this.analyser.frequencyBinCount;
    //     var hue = i/this.analyser.frequencyBinCount * 360;
    //     drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    //     drawContext.fillRect(i * barWidth, offset, barWidth, height);
    //   }

    // Moving objects
    counter += 1;

    scene.traverse(function (e) {

        var box = new THREE.Box3().setFromObject(e)

        if (e.name.substring(0, 4) === "sphe") {
            e.scale.set(sphereRadius, sphereRadius, sphereRadius);
        }
        if (e.name.substring(0, 4) === "ring") {
            e.scale.set(amplitude * 20, amplitude * 15, amplitude * 50)
        }

        if (e.name.substring(0, 4) === "cube") {
            e.rotation.x += 0.1;
            e.rotation.y += 0.1;

            e.position.z += e.position.z / 30;
            e.position.x += e.position.x / 30;
            e.position.y += e.position.y / 30;

            if ((e.position.z > 60 || e.position.z < -60) || (e.position.x > 60 || e.position.x < -60) || (e.position.y > 60 || e.position.y < -60)) {
                scene.remove(e);
                // renderer.deallocateObject( e );
            }
        }
    });

    // if (scene.children.length < 100) {
    //     if (counter % 10 == 0) {
    //         addCube();
    //     }
    // }

    if (counter % 10 == 0 && sphereRadius > 2) {
        addCube();
    }

    stats.update();
    controls.update();
}
