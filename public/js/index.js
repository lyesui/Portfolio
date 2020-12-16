/*--------------------------------------------------------------
# Map
--------------------------------------------------------------*/
/*  
    # 1 Main background
    # 2 Smooth scrolling
    # N Init page
*/

/*--------------------------------------------------------------
# 1 Main background
--------------------------------------------------------------*/
let scene,
  camera,
  renderer,
  cloudParticles = [],
  flash,
  rain,
  rainGeo,
  rainCount = 1000;

function initBackground() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  window.addEventListener("resize", onWindowResize, false);
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;
  ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);
  directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);
  flash = new THREE.PointLight(0x09fbf3, 30, 500, 4);
  flash.position.set(200, 300, 100);
  scene.add(flash);
  renderer = new THREE.WebGLRenderer();
  scene.fog = new THREE.FogExp2(0x020b28, 0.002);
  renderer.setClearColor(scene.fog.color);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  rainGeo = new THREE.Geometry();

  for (let i = 0; i < rainCount; i++) {
    rainDrop = new THREE.Vector3(
      Math.random() * 400 - 200,
      Math.random() * 1000 - 250,
      Math.random() * 400 - 200
    );
    rainDrop.velocity = {};
    rainDrop.velocity = 0;
    rainGeo.vertices.push(rainDrop);
  }

  rainMaterial = new THREE.PointsMaterial({
    color: 0x09fbf3,
    size: 0.1,
    transparent: true,
  });

  rain = new THREE.Points(rainGeo, rainMaterial);
  scene.add(rain);

  let loader = new THREE.TextureLoader();
  loader.load("public/images/smoke.png", function (texture) {
    cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
    });

    for (let p = 0; p < 25; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 450
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 360;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }

    animate();
  });
  document.getElementById("background").appendChild(renderer.domElement);
}

function animate() {
  cloudParticles.forEach((p) => {
    p.rotation.z -= 0.002;
  });
  rainGeo.vertices.forEach((p) => {
    p.velocity -= 0.1 + Math.random() * 0.1;
    p.y += p.velocity;
    if (p.y < -200) {
      p.y = 200;
      p.velocity = 0;
    }
  });
  rainGeo.verticesNeedUpdate = true;
  rain.rotation.y += 0.002;
  if (Math.random() > 0.93 || flash.power > 100) {
    if (flash.power < 100)
      flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
    flash.power = 50 + Math.random() * 500;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/*--------------------------------------------------------------
# 2 Smooth scrolling
--------------------------------------------------------------*/
function initScroll(){
	new SmoothScroll(document,40,12)
}

function SmoothScroll(target, speed, smooth) {
	if (target === document)
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body) // cross browser support for document scrolling
      
	var moving = false
	var pos = target.scrollTop
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target // safari is the new IE
  
	target.addEventListener('mousewheel', scrolled, { passive: false })
	target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e)

		pos += -delta * speed
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

		if (!moving) update()
	}

	function normalizeWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
			else
				return -e.detail/3 // Firefox
		}else
			return e.wheelDelta/120 // IE,Safari,Chrome
	}

	function update() {
		moving = true
    
		var delta = (pos - target.scrollTop) / smooth
    
		target.scrollTop += delta
    
		if (Math.abs(delta) > 0.5)
			requestFrame(update)
		else
			moving = false
	}

	var requestFrame = function() { // requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}()
}

/*--------------------------------------------------------------
# N Init page
--------------------------------------------------------------*/
initBackground();
initScroll();