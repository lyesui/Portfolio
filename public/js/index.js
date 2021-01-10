/*--------------------------------------------------------------
# Map
--------------------------------------------------------------*/
/*  
    # 1 Main background
    # 2 Smooth scrolling
    # 3 Animations
    # 4 Viewport checker
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
# 3 Animations
--------------------------------------------------------------*/
/* About me [Profile] ----------*/
const animeAboutmeThumb = anime.timeline({
  easing: "easeInOutCubic",
  autoplay: false,
});

const hexagon = document.querySelector(".profile__thubmnail__hexagon path");
const thumb = document.querySelector(".profile__thumbnail__img");

animeAboutmeThumb
  .add({
    targets: ".profile__thubmnail__hexagon path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutCubic",

    begin: function (anim) {
      anime({
        targets: ".profile .slice--inside",
        translateY: ["100%", "0"],
        easing: "easeInOutCubic",
        duration: 1200,
      });
    },
  })
  .add({
    targets: ".profile__thumbnail__img",
    opacity: 1,
    easing: "easeInQuad",
    complete: function (anime) {
      hexagon.setAttribute("fill", "#09fbf3");
    },
    duration: 400,
  })
  .add({
    targets: ".profile__thubmnail__hexagon",
    opacity: 1,
    translateX: 10,
    translateY: 10,
    duration: 400,
  });

/* 
/*--------------------------------------------------------------
# 4 Viewport checker
--------------------------------------------------------------*/

function isInViewport(element) {
  const bounding = element.getBoundingClientRect();

  if (bounding.top + 100 < window.innerHeight) {
    return true;
  }
}

let isProfile = (isSkills = isFooter = isLandingAbout = false);

document.addEventListener("scroll", () => {
  /* Footer ----------*/
  const footer = document.querySelector(".footer");

  if (isInViewport(footer) && !isFooter) {
    const animeFooter = anime.timeline({
      easing: "easeInOutCubic",
    });

    animeFooter.add({
      targets: ".footer .slice--inside",
      translateY: ["100%", "0"],
      easing: "easeInOutCubic",
      duration: 1200,

      begin: function (anim) {
        anime({
          targets:
            ".footer__details__contact__social, .footer__details__credits a",
          opacity: 1,
          easing: "easeInOutCubic",
          duration: 1400,
        });
      },
    });

    isFooter = true;
  }

  /* Profile ----------*/
  const profile = document.querySelector(".profile");

  if (isInViewport(profile) && !isProfile) {
    animeAboutmeThumb.play();
    isProfile = true;
  }

  /* Skills ----------*/
  const skills = document.querySelector(".skills");

  if (isInViewport(skills) && !isSkills) {
    const animeSkills = anime.timeline({
      easing: "easeInOutCubic",
    });

    animeSkills
      .add({
        targets: ".skills .slice--inside",
        translateY: ["100%", "0"],
        easing: "easeInOutCubic",
        duration: 1200,
      })

      .add({
        targets: ".skills__list",
        opacity: 1,
        easing: "easeInOutCubic",
        duration: 800,
      });

    isSkills = true;
  }
});

/* Loading ----------*/
const animeLoadingIntro = anime({
  targets: "#loading svg path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutCubic",
  autoplay: true,

  begin(anim) {
    anime({
      targets: "#loading .slice--inside",
      translateY: ["100%", "0"],
      easing: "easeInOutCubic",
      duration: 1200,
      delay: 250,

      complete(anim) {
        anime({
          targets: "#loading .slice--inside",
          opacity: ["1", "0.7"],
          easing: "easeInOutCubic",
          duration: 800,
          loop: true,
        });
      },
    });
  },

  complete: function (anim) {
    anime({
      targets: "#loading svg",
      rotate: "360",
      easing: "linear",
      loop: true,
      duration: 1000,
    });
  },
});

/*--------------------------------------------------------------
# N Init page
--------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", (event) => {
  initBackground();
  initScroll();

  /* Stop loading ----------*/
  const loadingScreen = document.getElementById("loading");
  const body = document.getElementsByTagName("body")[0];

  const animeLoadingOut = anime({
    targets: loadingScreen,
    opacity: [1, 0],
    easing: "easeInOutCubic",

    complete(anim) {
      loadingScreen.style.display = "none";
      body.classList.remove("is-loading");
    },
  });

  /* About landing intro ----------*/
  const landingAbout = document.querySelector(".landing--aboutme");

  if (isInViewport(landingAbout) && !isLandingAbout) {
    const animeLandingAbout = anime.timeline({
      easing: "easeInOutCubic",
    });

    animeLandingAbout.add({
      targets: ".landing__thumb",
      opacity: 1,
      easing: "easeInOutCubic",
      duration: 800,
      complete: function (anim) {
        anime({
          targets: ".landing--aboutme .slice--inside",
          translateY: ["100%", "0"],
          easing: "easeInOutCubic",
          duration: 1200,
        });
      },
    });

    isLandingAbout = true;
  }
});
