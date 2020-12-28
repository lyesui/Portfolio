/*--------------------------------------------------------------
# Map
--------------------------------------------------------------*/
/*  
    # 1 Main background
    # 2 Smooth scrolling
    # 3 Cursor
    # 4 Animations
    # 5 Viewport checker
    # N Init page
*/

/*--------------------------------------------------------------
# 1 Main background
--------------------------------------------------------------*/
var scene,
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
  const ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);
  const directionalLight = new THREE.DirectionalLight(0xffeedd);
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
    var rainDrop = new THREE.Vector3(
      Math.random() * 400 - 200,
      Math.random() * 1000 - 250,
      Math.random() * 400 - 200
    );
    rainDrop.velocity = {};
    rainDrop.velocity = 0;
    rainGeo.vertices.push(rainDrop);
  }

  const rainMaterial = new THREE.PointsMaterial({
    color: 0x09fbf3,
    size: 0.1,
    transparent: true,
  });

  rain = new THREE.Points(rainGeo, rainMaterial);
  scene.add(rain);

  let loader = new THREE.TextureLoader();
  loader.load("public/images/smoke.png", function (texture) {
    const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    const cloudMaterial = new THREE.MeshLambertMaterial({
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
function initScroll() {
  new SmoothScroll(document, 40, 12);
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body; // cross browser support for document scrolling

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target; // safari is the new IE

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;

    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}

/*--------------------------------------------------------------
# 3 Cursor
--------------------------------------------------------------*/
const cursor = document.querySelector("#cursor");
let mouse = { x: 300, y: 300 };
let pos = { x: 0, y: 0 };
const speed = 0.2; // between 0 and 1

const updatePosition = () => {
  pos.x += (mouse.x - pos.x) * speed;
  pos.y += (mouse.y - pos.y) * speed;
  cursor.style.transform = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";
};

const updateCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener("mousemove", updateCoordinates);

function loop() {
  updatePosition();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

/*--------------------------------------------------------------
# 4 Animations
--------------------------------------------------------------*/
const animeAboutmeThumb = anime.timeline({
  easing: 'easeInOutCubic',
  autoplay: false
})

const animeAboutmeTxt = anime({
  targets: '.slice--inside',
  translateY: ['100%', '0'],
  easing: 'easeInOutCubic',
  duration: 1200,
  autoplay: false,
})

const hexagon = document.querySelector('.profile__thubmnail__hexagon path')
const thumb = document.querySelector('.profile__thumbnail__img')

animeAboutmeThumb.add({
  targets: '.profile__thubmnail__hexagon path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutCubic',
  
  complete: function(anim) {
    animeAboutmeTxt.play()
  }
}).add({
  targets: '.profile__thumbnail__img',
  opacity: 1,
  easing: 'easeInQuad',
  complete: function(anime) {
    hexagon.setAttribute("fill", "#09fbf3")
  },
  duration: 400,
  
}).add({
  targets: '.profile__thubmnail__hexagon',
  opacity: 1,
  translateX: 10,
  translateY: 10,
  duration: 400
})
/*--------------------------------------------------------------
# 5 Viewport checker
--------------------------------------------------------------*/

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

let isProfile = false
document.addEventListener('scroll', () => {
  const profile = document.querySelector('.profile')
  if (isInViewport(profile) && isProfile == false) {
    animeAboutmeThumb.play()
    isProfile = true
  }
})

/*--------------------------------------------------------------
# N Init page
--------------------------------------------------------------*/
initBackground();
initScroll();
