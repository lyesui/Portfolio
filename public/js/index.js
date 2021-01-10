/*--------------------------------------------------------------
# 4 DOM Scroll
--------------------------------------------------------------*/
let isTestimonials = false;

document.addEventListener("scroll", () => {
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

  /*animeSkills
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
    });*/
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
