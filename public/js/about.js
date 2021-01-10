/*--------------------------------------------------------------
# 1 Profile
--------------------------------------------------------------*/
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

/*--------------------------------------------------------------
# 2 DOM Scroll
--------------------------------------------------------------*/
let isProfile = (isSkills = isLandingAbout = false);

document.addEventListener("scroll", () => {
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

/*--------------------------------------------------------------
# 3 Init
--------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", (event) => {
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
