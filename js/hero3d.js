(function () {
    var canvas = document.getElementById('hero-three-bg');
    if (!canvas) return;
    if (window.innerWidth < 768) return;
    var wrapper = canvas.parentElement;
    var hero = wrapper.parentElement;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020a18);

    var camera = new THREE.PerspectiveCamera(38, wrapper.clientWidth / wrapper.clientHeight, 0.1, 200);
    camera.position.set(-1.8, 0.4, 7);

    function resize() {
        var w = wrapper.clientWidth, h = wrapper.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    var loader = new THREE.TextureLoader();
    var R = 3;

    var earthTex = loader.load('https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg');
    var bumpTex = loader.load('https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png');
    var cloudsTex = loader.load('https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png');

    var earthMat = new THREE.MeshStandardMaterial({
        map: earthTex,
        bumpMap: bumpTex,
        bumpScale: 0.06,
        metalness: 0.02,
        roughness: 0.55,
        emissive: new THREE.Color(0x112244),
        emissiveIntensity: 0.15
    });
    var earth = new THREE.Mesh(new THREE.SphereGeometry(R, 128, 128), earthMat);
    var indiaRotY = -3.2;
    earth.rotation.y = indiaRotY;
    scene.add(earth);

    var clouds = new THREE.Mesh(
        new THREE.SphereGeometry(R + 0.035, 96, 96),
        new THREE.MeshPhongMaterial({
            map: cloudsTex,
            transparent: true,
            opacity: 0.28,
            depthWrite: false
        })
    );
    clouds.rotation.y = indiaRotY;
    scene.add(clouds);

    var atmosMat = new THREE.MeshBasicMaterial({
        color: 0x2266aa, transparent: true, opacity: 0.04, side: THREE.BackSide
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(R + 0.12, 64, 64), atmosMat));

    function latLngToVec3(lat, lng, radius) {
        var phi = (90 - lat) * Math.PI / 180;
        var theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    var cities = [
        // Major hubs with names
        { lat: 17.385, lng: 78.487, hq: true, name: "HYDERABAD (HQ)", align: "right", dx: 45, dy: 25 },
        { lat: 30.733, lng: 76.779, name: "CHANDIGARH", align: "right", dx: 55, dy: -30 },
        { lat: 28.459, lng: 77.027, name: "DELHI NCR", align: "left", dx: 50, dy: -25 },
        { lat: 22.573, lng: 88.364, name: "KOLKATA", align: "right", dx: 45, dy: -20 },
        { lat: 22.720, lng: 75.858, name: "INDORE", align: "left", dx: 55, dy: 15 },
        { lat: 23.023, lng: 72.571, name: "AHMEDABAD", align: "left", dx: 60, dy: -20 },
        { lat: 18.520, lng: 73.857, name: "PUNE", align: "left", dx: 45, dy: 25 },
        { lat: 19.076, lng: 72.878, name: "MUMBAI", align: "left", dx: 50, dy: -15 },
        { lat: 12.972, lng: 77.595, name: "BENGALURU", align: "left", dx: 45, dy: -15 },
        { lat: 13.083, lng: 80.271, name: "CHENNAI", align: "right", dx: 50, dy: 20 },
        { lat: 9.931, lng: 76.267, name: "KOCHI", align: "left", dx: 45, dy: 25 },
        { lat: 20.296, lng: 85.825, name: "BHUBANESWAR", align: "right", dx: 55, dy: 20 },
        { lat: 25.609, lng: 85.138, name: "PATNA", align: "right", dx: 35, dy: -25 },
        { lat: 21.251, lng: 81.630, name: "RAIPUR", align: "right", dx: 40, dy: -20 }
    ];

    var nodeGroup = new THREE.Group();
    nodeGroup.rotation.y = indiaRotY;
    scene.add(nodeGroup);

    var svgOverlay = document.getElementById('globe-svg');
    var labelsOverlay = document.getElementById('globe-labels');
    var cityNodes = [];

    if (svgOverlay && labelsOverlay) {
        cities.forEach(function (city) {
            var dotG = null;
            var pathEl = null;
            var labelDiv = null;

            if (city.isCountry) {
                // Country label
                labelDiv = document.createElement("div");
                labelDiv.className = "globe-country-label";
                labelDiv.setAttribute("style", 
                    "position: absolute; color: rgba(255, 255, 255, 0.75); " +
                    "font-family: 'Outfit', 'Inter', sans-serif; " +
                    "font-size: 15px; font-weight: 800; letter-spacing: 3px; " +
                    "text-transform: uppercase; white-space: nowrap; " +
                    "pointer-events: none; opacity: 0; transition: opacity 0.3s; " +
                    "text-shadow: 0 0 6px rgba(0,0,0,0.85);"
                );
                labelDiv.innerHTML = city.name;
                labelsOverlay.appendChild(labelDiv);
            } else {
                // City node group
                dotG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                dotG.setAttribute("style", "transition: opacity 0.3s; opacity: 0;");
                
                // Outer ring
                var outerRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                outerRing.setAttribute("r", city.hq ? "5.5" : "4");
                outerRing.setAttribute("fill", "none");
                outerRing.setAttribute("stroke", city.hq ? "#ff5128" : "#ffffff");
                outerRing.setAttribute("stroke-width", "1.1");
                dotG.appendChild(outerRing);

                // Inner dot
                var innerDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                innerDot.setAttribute("r", city.hq ? "2.8" : "1.6");
                innerDot.setAttribute("fill", city.hq ? "#ff5128" : "#ffffff");
                dotG.appendChild(innerDot);

                svgOverlay.appendChild(dotG);

                if (city.name) {
                    // Line
                    pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    pathEl.setAttribute("fill", "none");
                    pathEl.setAttribute("stroke", "rgba(255, 255, 255, 0.65)");
                    pathEl.setAttribute("stroke-width", "0.85");
                    pathEl.setAttribute("stroke-dasharray", "2,2");
                    pathEl.setAttribute("style", "transition: opacity 0.3s; opacity: 0;");
                    svgOverlay.appendChild(pathEl);

                    // Text label
                    labelDiv = document.createElement("div");
                    labelDiv.className = "globe-label";
                    labelDiv.setAttribute("style", 
                        "position: absolute; color: " + (city.hq ? "#ef803a" : "#9ad0ff") + "; " +
                        "font-family: 'Outfit', 'Inter', sans-serif; " +
                        "font-size: " + (city.hq ? "11.5px" : "10px") + "; " +
                        "font-weight: 700; letter-spacing: 0.8px; " +
                        "text-transform: uppercase; white-space: nowrap; " +
                        "pointer-events: none; opacity: 0; transition: opacity 0.3s; " +
                        "text-shadow: 0 0 5px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.95);"
                    );
                    labelDiv.innerHTML = city.name;
                    labelsOverlay.appendChild(labelDiv);
                }
            }

            var pos = latLngToVec3(city.lat, city.lng, R);
            var obj = new THREE.Object3D();
            obj.position.copy(pos);
            nodeGroup.add(obj);

            cityNodes.push({
                city: city,
                obj: obj,
                dotG: dotG,
                pathEl: pathEl,
                labelDiv: labelDiv
            });
        });
    }

    var orbitMat = new THREE.MeshBasicMaterial({
        color: 0x3388cc, transparent: true, opacity: 0.08, side: THREE.DoubleSide
    });
    var orbit = new THREE.Mesh(new THREE.RingGeometry(R + 1.0, R + 1.03, 64), orbitMat);
    orbit.rotation.x = 1.3; orbit.rotation.z = 0.2;
    scene.add(orbit);

    var sC = 300, sA = new Float32Array(sC * 3);
    for (var st = 0; st < sC; st++) {
        sA[st*3] = (Math.random()-0.5)*120;
        sA[st*3+1] = (Math.random()-0.5)*80;
        sA[st*3+2] = -15 - Math.random()*50;
    }
    var sG = new THREE.BufferGeometry();
    sG.setAttribute('position', new THREE.BufferAttribute(sA, 3));
    scene.add(new THREE.Points(sG, new THREE.PointsMaterial({ color: 0x99aacc, size: 0.12, transparent: true, opacity: 0.6 })));

    scene.add(new THREE.AmbientLight(0x334466, 0.8));
    var sun = new THREE.DirectionalLight(0xfff5e0, 1.8);
    sun.position.set(8, 4, 6);
    scene.add(sun);
    var fill = new THREE.DirectionalLight(0xaabbdd, 0.5);
    fill.position.set(-4, 2, 4);
    scene.add(fill);
    var rim = new THREE.PointLight(0x3388dd, 0.5, 20);
    rim.position.set(-6, 2, -5);
    scene.add(rim);
    var under = new THREE.PointLight(0x2266bb, 0.4, 15);
    under.position.set(0, -5, 2);
    scene.add(under);

    var mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', function (e) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    var clock = new THREE.Clock();
    var pinOpacity = 1;
    function setGroupOpacity(group, opacity) {
        group.traverse(function (child) {
            if (child.material && child.material.opacity !== undefined) {
                child.material.opacity = opacity;
            }
        });
    }
    function animate() {
        requestAnimationFrame(animate);
        var t = clock.getElapsedTime();
        var cycleTime = 18, stayTime = 12, transTime = 6;
        var phase = t % cycleTime;
        var rot, camZ, camZclose = 7, camZfar = 12;

        if (phase < stayTime) {
            rot = Math.sin(phase * 0.15) * 0.01;
            camZ = camZclose;
        } else {
            var tp = (phase - stayTime) / transTime;
            if (tp < 0.5) {
                var eo = tp * 2; eo = eo * eo;
                camZ = camZclose + (camZfar - camZclose) * eo;
            } else {
                var ei = (tp - 0.5) * 2; ei = 1 - (1 - ei) * (1 - ei);
                camZ = camZfar - (camZfar - camZclose) * ei;
            }
            var re = tp < 0.5 ? 2*tp*tp : 1 - Math.pow(-2*tp+2,2)/2;
            rot = re * Math.PI * 2;
        }
        earth.rotation.y = indiaRotY + rot;
        clouds.rotation.y = indiaRotY + rot * 1.06;
        nodeGroup.rotation.y = indiaRotY + rot;

        var fadeSpeed = 0.04;
        if (phase >= stayTime) {
            pinOpacity = Math.max(0, pinOpacity - fadeSpeed);
        } else if (phase < 1.5) {
            pinOpacity = Math.min(1, pinOpacity + fadeSpeed);
        } else {
            pinOpacity = Math.min(1, pinOpacity + fadeSpeed);
        }

        // Project and position the 2D overlays dynamically
        if (svgOverlay && labelsOverlay && cityNodes.length > 0) {
            var width = renderer.domElement.clientWidth;
            var height = renderer.domElement.clientHeight;

            var leftLabels = [];
            var rightLabels = [];

            cityNodes.forEach(function (node) {
                var wp = new THREE.Vector3();
                node.obj.getWorldPosition(wp);

                // Cull backface nodes
                var cameraToPin = new THREE.Vector3().copy(camera.position).sub(wp);
                var isFacing = wp.dot(cameraToPin) > 0.05; // buffer to cull nodes near horizon
                var showNode = isFacing && (pinOpacity > 0.01);

                if (showNode) {
                    wp.project(camera);
                    var x = (wp.x * 0.5 + 0.5) * width;
                    var y = (-(wp.y * 0.5) + 0.5) * height;

                    if (node.city.isCountry) {
                        node.labelDiv.style.left = x + "px";
                        node.labelDiv.style.top = y + "px";
                        node.labelDiv.style.transform = "translate(-50%, -50%)";
                        node.labelDiv.style.opacity = pinOpacity * 0.75;
                    } else {
                        // Position line and label (collect for collision resolution)
                        if (node.pathEl && node.labelDiv) {
                            var align = node.city.align || "right";
                            var dx = node.city.dx !== undefined ? node.city.dx : 22;
                            var dy = node.city.dy !== undefined ? node.city.dy : -15;
                            var hx = node.city.hx !== undefined ? node.city.hx : 15;

                            var endX = (align === "right") ? (x + dx) : (x - dx);
                            var endY = y + dy;
                            var extX = (align === "right") ? (endX + hx) : (endX - hx);

                            var labelInfo = {
                                node: node,
                                align: align,
                                x: x,
                                y: y,
                                endX: endX,
                                endY: endY,
                                extX: extX
                            };

                            if (align === "left") {
                                leftLabels.push(labelInfo);
                            } else {
                                rightLabels.push(labelInfo);
                            }
                        } else if (node.dotG) {
                            // Point without label
                            node.dotG.setAttribute("transform", "translate(" + x + "," + y + ")");
                            node.dotG.style.opacity = pinOpacity;
                        }
                    }
                } else {
                    // Hide elements
                    if (node.dotG) node.dotG.style.opacity = 0;
                    if (node.pathEl) node.pathEl.style.opacity = 0;
                    if (node.labelDiv) node.labelDiv.style.opacity = 0;
                }
            });

            // Resolve overlapping labels vertically
            function resolveOverlap(labels) {
                var minGap = 16;
                // Sort by desired Y coordinate
                labels.sort(function(a, b) { return a.endY - b.endY; });
                
                // Forward pass: push down
                for (var i = 1; i < labels.length; i++) {
                    if (labels[i].endY - labels[i - 1].endY < minGap) {
                        labels[i].endY = labels[i - 1].endY + minGap;
                    }
                }
                // Backward pass: push up
                for (var i = labels.length - 2; i >= 0; i--) {
                    if (labels[i + 1].endY - labels[i].endY < minGap) {
                        labels[i].endY = labels[i + 1].endY - minGap;
                    }
                }
            }

            resolveOverlap(leftLabels);
            resolveOverlap(rightLabels);

            // Render all resolved labels
            var allActiveLabels = leftLabels.concat(rightLabels);
            allActiveLabels.forEach(function (lbl) {
                var node = lbl.node;
                var x = lbl.x;
                var y = lbl.y;
                var endX = lbl.endX;
                var endY = lbl.endY;
                var extX = lbl.extX;
                var align = lbl.align;

                // Show dot
                if (node.dotG) {
                    node.dotG.setAttribute("transform", "translate(" + x + "," + y + ")");
                    node.dotG.style.opacity = pinOpacity;
                }

                // Draw SVG Callout line: M x y L endX endY H extX
                node.pathEl.setAttribute("d", "M " + x + " " + y + " L " + endX + " " + endY + " H " + extX);
                node.pathEl.style.opacity = pinOpacity * 0.65;

                // Position text
                node.labelDiv.style.left = extX + "px";
                node.labelDiv.style.top = endY + "px";
                if (align === "right") {
                    node.labelDiv.style.transform = "translate(6px, -50%)";
                    node.labelDiv.style.textAlign = "left";
                } else {
                    node.labelDiv.style.transform = "translate(calc(-100% - 6px), -50%)";
                    node.labelDiv.style.textAlign = "right";
                }
                node.labelDiv.style.opacity = pinOpacity;
            });
        }

        camera.position.x = -1.8 + mouse.x * 0.4;
        camera.position.y = 0.4 - mouse.y * 0.25;
        camera.position.z = camZ;
        camera.lookAt(-1.8, 0.2, 0);
        renderer.render(scene, camera);
    }
    animate();
})();
