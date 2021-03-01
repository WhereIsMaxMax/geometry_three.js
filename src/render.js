var render = function () {
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    // light rotation
    var r = 20;
    spotLight.position.y = r * Math.cos(angle);
    spotLight.position.z = r * Math.sin(angle);
    angle += 0.01;

    var width = dataArray.length;
    var sum = 0;
    for (var i = 0; i < width; i++) {
        sum += dataArray[i];
    }

    // complete the amplitude
    var amplitude = sum / (width * 256 - 1);
    sphereRadius = 1 + amplitude * 10;

    // Moving objects
    counter += 1;
    shapes_array.forEach((element) => {
        if (element.name.substring(0, 4) === "sphe") {
            element.scale.set(sphereRadius, sphereRadius, sphereRadius);
        }
        if (element.name.substring(0, 4) === "ring") {
            element.scale.set(amplitude * 20, amplitude * 15, amplitude * 50)
        }

        if (element.name.substring(0, 4) === "cube") {
            element.rotation.x += 0.1;
            element.rotation.y += 0.1;

            element.position.z += element.position.z / 30;
            element.position.x += element.position.x / 30;
            element.position.y += element.position.y / 30;

            if ((element.position.z > 60 || element.position.z < -60) ||
                (element.position.x > 60 || element.position.x < -60) ||
                (element.position.y > 60 || element.position.y < -60)) {
                scene.remove(element);
                remove_item(shapes_array, element);
            }
        }
    });

    // scene.traverse(function (e) {
    //     if (e.name.substring(0, 4) === "sphe") {
    //         e.scale.set(sphereRadius, sphereRadius, sphereRadius);
    //     }
    //     if (e.name.substring(0, 4) === "ring") {
    //         e.scale.set(amplitude * 20, amplitude * 15, amplitude * 50)
    //     }
    //
    //     if (e.name.substring(0, 4) === "cube") {
    //         e.rotation.x += 0.1;
    //         e.rotation.y += 0.1;
    //
    //         e.position.z += e.position.z / 30;
    //         e.position.x += e.position.x / 30;
    //         e.position.y += e.position.y / 30;
    //
    //         if ((e.position.z > 60 || e.position.z < -60) || (e.position.x > 60 || e.position.x < -60) || (e.position.y > 60 || e.position.y < -60)) {
    //             scene.remove(e);
    //             // renderer.deallocateObject( e );
    //         }
    //     }
    // });

    if (counter % 10 == 0 && sphereRadius > 2) {
        addCube();
    }

    stats.update();
    controls.update();
}

function remove_item(arr, item) {
    for (var i = arr.length; i--;) {
        if (arr[i] == item) {
            arr.splice(i, 1);
        }
    }
}
