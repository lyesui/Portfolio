/*--------------------------------------------------------------
# 4 DOM Scroll
--------------------------------------------------------------*/
let isTestimonials = (isProjects = isProject1 = isProject2 = false);

document.addEventListener("scroll", () => {
  /* Projects intro ----------*/
  const projects = document.querySelector(".projects");
  if (isInViewport(projects) && !isProjects) {
    anime({
      targets: ".projects > .title .slice--inside",
      translateY: ["100%", "0"],
      easing: "easeInOutCubic",
      duration: 1200,
    });

    isProjects = true;
  }

  const animeProject1 = anime.timeline({
    easing: "easeInOutCubic",
  });

  const project1 = document.querySelector(".project--1");
  if (isInViewport(project1) && !isProject1) {
    animeProject1
      .add({
        targets: ".project--1 .projects__project__thumbnail__intro",
        width: "100%",
        easing: "easeInOutCubic",
        duration: 800,

        complete(anim) {
          anime({
            targets: ".project--1 .projects__project__thumbnail__intro",
            translateX: "100%",
            easing: "easeInOutCubic",
            duration: 1200,

            begin(anim) {
              anime({
                targets: ".project--1 .projects__project__thumbnail img",
                opacity: 1,
                easing: "easeInOutCubic",
                duration: 200,
              });
            },

            complete(anim) {
              document.querySelector(
                ".project--1 .projects__project__thumbnail__intro"
              ).style.display = "none";
            },
          });
        },
      })
      .add({
        targets: ".project--1 .slice--inside",
        translateY: ["100%", "0"],
        easing: "easeInOutCubic",
        duration: 1200,

        begin(anim) {
          anime({
            targets: ".project--1 ul",
            opacity: 1,
            easing: "easeInOutCubic",
            duration: 1200,
          });
        },
      });

    isProject1 = true;
  }

  const animeProject2 = anime.timeline({
    easing: "easeInOutCubic",
  });

  const project2 = document.querySelector(".project--2");
  if (isInViewport(project2) && !isProject2) {
    animeProject2
      .add({
        targets: ".project--2 .projects__project__thumbnail__intro",
        width: "100%",
        easing: "easeInOutCubic",
        duration: 800,

        complete(anim) {
          anime({
            targets: ".project--2 .projects__project__thumbnail__intro",
            translateX: "100%",
            easing: "easeInOutCubic",
            duration: 1200,

            begin(anim) {
              anime({
                targets: ".project--2 .projects__project__thumbnail img",
                opacity: 1,
                easing: "easeInOutCubic",
                duration: 200,
              });
            },

            complete(anim) {
              document.querySelector(
                ".project--2 .projects__project__thumbnail__intro"
              ).style.display = "none";
            },
          });
        },
      })
      .add({
        targets: ".project--2 .slice--inside",
        translateY: ["100%", "0"],
        easing: "easeInOutCubic",
        duration: 1200,

        begin(anim) {
          anime({
            targets: ".project--2 ul",
            opacity: 1,
            easing: "easeInOutCubic",
            duration: 1200,
          });
        },
      });

    isProject2 = true;
  }

  /* Testimonialse intro ----------*/
  const testimonials = document.querySelector(".testimonials");

  if (isInViewport(testimonials) && !isTestimonials) {
    const animeTestimonials = anime.timeline({
      easing: "easeInOutCubic",
    });

    animeTestimonials
      .add({
        targets: ".testimonials .slice--inside",
        translateY: ["100%", "0"],
        easing: "easeInOutCubic",
        duration: 1200,

        begin(anim) {
          anime({
            targets: ".testimonials svg path",
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: "easeInOutCubic",
            stroke: "#09fbf3",
            strokeWidth: "4px",

            complete(anim) {
              anime({
                targets: ".testimonials svg",
                fill: "#09fbf3",
              });
            },
          });
        },
      })

      .add({
        targets: ".testimonials__article__thumb img, .testimonials .txt",
        opacity: 1,
      });

    isTestimonials = true;
  }
});

/*--------------------------------------------------------------
# N Init page
--------------------------------------------------------------*/
let isLanding = false;

document.addEventListener("DOMContentLoaded", (event) => {
  /* Landing intro ----------*/
  const landing = document.querySelector(".landing--home");

  if (isInViewport(landing) && !isLanding) {
    const animeLanding = anime({
      targets: ".landing--home .slice--inside",
      translateY: ["100%", "0"],
      easing: "easeInOutCubic",
      duration: 1200,
    });

    isLanding = true;
  }
});
