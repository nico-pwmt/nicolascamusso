"use strict"

// -- Window load -- //

const body = document.querySelector("body")

// Stack items
const sliderItemList = document.querySelector("[data-item-list]")
const loader = document.querySelector("[data-loader]")

// Hero title animation

const heroTitle = document.querySelector("[data-hero-title]")
const heroTitleDefault = document.querySelector("[data-hero-title-default]")
const heroTextContent = "Nicolas Camusso"

/* ON LOAD EVENT */

window.addEventListener("load", () => {

  // Loader removal
  // setTimeout(() => {
  //   loader.classList.add("removing-loader")
  //   loader.addEventListener("transitionend", () => {
  //     loader.remove();
  //   })
  // }, 1000);

  // Sets language to english if data-selected-language isnt set to english or spanish
  if (body.dataset.selectedLanguage != "english" || body.dataset.selectedLanguage != "spanish") {
    body.dataset.selectedLanguage = "english";
  }
  
  // Adds default hero title
  heroTitleDefault.innerHTML = heroTextContent
  // Add letters each on a span to the h1 in the hero section
  for (let i = 0; i < heroTextContent.length; i++) {
    heroTitle.innerHTML += `<span>${heroTextContent[i]}</span>`
  }
  let letters = heroTitle.querySelectorAll("span");
  letters.forEach((letter) => {

    letter.addEventListener("mouseover", () => {
      letter.classList.add("heroAnimation")
    })
    letter.addEventListener("animationend", () => {
      letter.classList.remove("heroAnimation")
    })
    
  })
  
  // Loki letters effect

  const fontFamilies = [
    "Alata",
    "Galada",
    "Hammersmith one",
    "Lilita One",
    "Roboto mono",
    "Alexandria",
    "Pacifico",
    "Helvetica",
    "Comic Sans MS",
    "Courier New",
    "Franklin Gothic Medium",
    "Gill Sans",
    "Lucida Sans",
    "Segoe UI",
    "Trebuchet MS",
  ]

  for (let i = 0; i <= 10; i++) {
    setTimeout(() => {
      letters.forEach((letter) => {
        
        let randomFont = Math.floor(Math.random() * fontFamilies.length)
    
        letter.style.fontFamily = fontFamilies[randomFont];
        
      })
    }, 250 * i);
  }

  // Add stacks to list
  for (let i = 0; i <= stacks.length - 1; i++) {
    const spawnItem = document.createElement("li")
    spawnItem.innerHTML = `
    <div class="item">
    <img src="img/stack/${stacks[i].id}.png" alt="${stacks[i].text}">
    <span>${stacks[i].text}</span>
    </div>
    `
    sliderItemList.appendChild(spawnItem)
  }
  
  // Select stack to become active excluding first and last 2
  const sliderRandomItem = Math.min(Math.max(Math.floor(Math.random() * stacks.length), 3), stacks.length - 4)
  const sliderCurrentItem = sliderItemList.children[sliderRandomItem]

  sliderCurrentItem.classList.add("active")
  sliderCurrentItem.nextElementSibling.classList.add("second", "right")
  sliderCurrentItem.nextElementSibling.nextElementSibling.classList.add("third", "right")
  sliderCurrentItem.previousElementSibling.classList.add("second", "left")
  sliderCurrentItem.previousElementSibling.previousElementSibling.classList.add("third", "left")

  // Sets attributes to success link and autoresponse to default english
  successPageInput.setAttribute("value", successPageEnglish)
  automatedResponseInput.setAttribute("value", automatedResponseEnglish)
  
})

/* ON SCROLL EVETN */

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("#menu ol.links li");
const header = document.querySelector("[data-menu-holder]")

const sectionHome = document.querySelector("[data-section-home]")
const heroHeight = window.innerHeight;
const heroText = document.querySelector("[data-hero-text]")
const heroImg = document.querySelector("[data-hero-img]")

const sectionAbout = document.querySelector("[data-section-about]")


window.onscroll = () => {

  // Adjunst hader height numbers 

  let isMobile = window.matchMedia("(max-width: 800px)").matches
  let headerHeight = document.querySelector(".menu-holder").offsetHeight;
  if (isMobile) {
    headerHeight = 0;
  }
  if (!isMobile) {
    burger.classList.remove("active")
  }
  
  // Activate menu links when scrolling

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset + 1 >= sectionTop - headerHeight) {
      current = section.getAttribute("id"); 
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });

  // Header fade 

  // adds scrolled to home section at a third window height of scrolling
  if (pageYOffset >= heroHeight / 3)  {
    sectionHome.classList.add("scrolled")
  } else { 
    sectionHome.classList.remove("scrolled")
  }
  
  // adds scrolled to header and hero-text when hero-text touches the top - 75px
  if (pageYOffset >= heroHeight - heroText.offsetHeight - 75) {
    header.classList.add("scrolled")
    heroText.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
    heroText.classList.remove("scrolled")
  }

  // parallax on hero image
  heroImg.style.backgroundPositionY = `${pageYOffset / -5}px`

  // parallax on about image
  sectionAbout.style.backgroundPositionY = `${pageYOffset / -5 + 300}px`

  // svg animations
  fillSvgPaths()


};


// -- MENU

const burger = document.querySelector("[data-burger]");
const links = document.querySelectorAll("#menu ol.links li a")
const menuOverlay = document.querySelector("[data-overlay]")

burger.addEventListener("click", () => {
  burger.classList.toggle("active")
})
menuOverlay.addEventListener("click", () => {
  burger.classList.remove("active")
})

// close menu when link clicked
links.forEach((e) => {
  e.addEventListener("click", () => {
    burger.classList.remove("active")
  })
})

// close menu cursor

const cursor = document.querySelector("#cursor");
const mouseTracker_menuOverlay = document.querySelector("[data-overlay]")

mouseTracker_menuOverlay.addEventListener("mousemove", (e) => {

  const cursorX = e.pageX - e.currentTarget.offsetLeft - cursor.offsetWidth / 2;
  const cursorY = e.pageY - e.currentTarget.offsetTop - cursor.offsetHeight / 2;
  
  cursor.style.opacity = 1;
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

})
mouseTracker_menuOverlay.addEventListener("mouseleave", (e) => {

  cursor.style.opacity = 0;

})


// Logo SVG animations 

const logo = document.querySelector("[data-logo-svg]")
const logoPaths = document.querySelectorAll("[data-logo-svg] path.line")
const logoLetter = document.querySelector("[data-logo-svg] path.letter")

function fillSvgPaths() {

  // get percentage of scrolled
  let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  // set length of <path> | full when 100% of screen scrolled
  for (let i = 0; i < logoPaths.length; i++) {
    let path = logoPaths[i];
    
    let pathLength = path.getTotalLength();
    
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    
    let drawLength = pathLength * scrollPercentage;
    
    path.style.strokeDashoffset = pathLength - drawLength;
        
  }
  
  if (logoPaths[0].style.strokeDashoffset == 0) { // when paths fully form letter, filled letter appears
    logoPaths[0].addEventListener("transitionend", fillLetter)
  } else { // removes filled letter and transitions when is not fully formed
    logoLetter.style.opacity = 0;
    logoPaths[0].removeEventListener("transitionend", fillLetter)
  }

}

// function that shows filled logo letter
function fillLetter() {
  logoLetter.style.opacity = 1;
}

    










// -- Section Curtain 

const left = document.querySelector("[data-left-side]");
const SECTION_CURTAIN = document.querySelector("[data-curtain]")

const handleOnMove = (e) => {
  const p = e.clientX / SECTION_CURTAIN.offsetWidth * 100;
  left.style.width = `${p}%`
}

SECTION_CURTAIN.onmousemove = e => handleOnMove(e);
SECTION_CURTAIN.ontouchmove = e => handleOnMove(e.touches[0]);



// Card

const card_holder = document.querySelector("[data-card-holder]");
const card = document.querySelector("[data-card]")
const shadow = document.querySelector("[data-shadow]")

card_holder.addEventListener("click", () => {
  if (!card.classList.contains("card-flip-forwards")) {
    card.classList.remove("card-flip-reverse")
    card.classList.add("card-flip-forwards")
  } else {
    card.classList.remove("card-flip-forwards")
    card.classList.add("card-flip-reverse")
    card.addEventListener("animationend", () => {
      card.classList.remove("card-flip-reverse")
    })
  }
})


// -- Section Contact 

const lamp = document.querySelector("[data-lamp]");
const mouseTracker_contact = document.querySelector("#section_contact")
const inputs = document.querySelectorAll("#section_contact input, textarea")

mouseTracker_contact.addEventListener("mousemove", (e) => {
  
  // Lamp
  
  // const lampX = e.pageX - e.currentTarget.offsetLeft - lamp.offsetWidth / 2;
  // const lampY = e.pageY - e.currentTarget.offsetTop - lamp.offsetHeight / 2;
  
  // lamp.style.transform = `translate(${lampX}px, ${lampY}px)`;
  
  // Shadow || Border

  inputs.forEach((input) => {

    const {x, y, height, width} = input.getBoundingClientRect() // means -- const x = input.getBoundingClientRect().x, etc...
  
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const shadow = {x : x - mouseX + width / 2,
                    y : y - mouseY + height / 2};
  
    // function clampX(number, min, max) {
    //   return Math.min(Math.max(shadow.x, -10), 10)
    // }
    // function clampY(number, min, max) {
    //   return Math.min(Math.max(shadow.y, -10), 10)
    // }
  
    // input.style.boxShadow = `${clampX(shadow.x)}px ${clampY(shadow.y)}px 0 0 var(--box-shadow)`;

    let borderLeftColor;
    let borderRightColor;
    let borderTopColor;
    let borderBottomColor;

    
    if (shadow.x > 0) {
      borderLeftColor = "transparent";
      borderRightColor = "var(--input-border-color)";
    } else {
      borderLeftColor = "var(--input-border-color)";
      borderRightColor = "transparent";
    }
    if (shadow.y > 0) {
      borderTopColor = "transparent";
      borderBottomColor = "var(--input-border-color)";
    } else {
      borderTopColor = "var(--input-border-color)";
      borderBottomColor = "transparent";
    }
    
    input.style.borderLeftColor = borderLeftColor;
    input.style.borderRightColor = borderRightColor;
    input.style.borderTopColor = borderTopColor;
    input.style.borderBottomColor = borderBottomColor;
  })
  
})


// Scroll fades

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("scroll-show")
    } else {
      entry.target.classList.remove("scroll-show")
    }
  }))
})

const hiddenElements = document.querySelectorAll(".scroll-hidden")

hiddenElements.forEach((e) => {
  observer.observe(e)
})


// -- Section Stack

const btnPrev = document.querySelector("[data-slider-prev]")
const btnNext = document.querySelector("[data-slider-next]")

let stacks = [
  {
    id: "html",
    text: "HTML5"
  },
  {
    id: "css",
    text: "CSS3"
  },
  {
    id: "js",
    text: "JavaScript"
  },
  {
    id: "vue",
    text: "VueJS"
  },
  {
    id: "ts",
    text: "TypeScript"
  },
  {
    id: "jquery",
    text: "jQuery"
  },
  {
    id: "bootstrap",
    text: "Bootstrap"
  },
  {
    id: "sass",
    text: "Sass"
  },
  {
    id: "tailwind",
    text: "Tailwind CSS"
  },
  {
    id: "uxui",
    text: "UX · UI Design"
  },
  {
    id: "design",
    text: "An eye for design"
  },
  {
    id: "rwd",
    text: "Responsive Web Design"
  },
  {
    id: "git",
    text: "Git"
  },
  {
    id: "code",
    text: "Structured and readable code"
  },
  {
    id: "photoshop",
    text: "Photoshop"
  },
  {
    id: "illustrator",
    text: "Illustrator"
  },
  {
    id: "aftereffects",
    text: "After Effects"
  },
  {
    id: "pixelperfect",
    text: "Pixel Perfect"
  },
  {
    id: "postcss",
    text: "PostCSS"
  },
]

btnPrev.addEventListener("click", prevItem)
btnNext.addEventListener("click", nextItem)

// timer for item swap
const interval = setInterval(nextItem, 5000)


function prevItem() {

  const currentItem = document.querySelector(".slider li.active");
  
  const nextSecondItem = currentItem.nextElementSibling;
  const nextThirdItem = currentItem.nextElementSibling.nextElementSibling;
  
  const prevSecondItem = currentItem.previousElementSibling;
  const prevThirdItem = currentItem.previousElementSibling.previousElementSibling;
  const prevFourthItem = currentItem.previousElementSibling.previousElementSibling.previousElementSibling;
  
  const lastItem = sliderItemList.children[sliderItemList.children.length - 1];

  // Add respective classes
  nextSecondItem.classList.add("third")
  nextSecondItem.classList.remove("second")
  
  nextThirdItem.classList.remove("third", "right")
  
  prevSecondItem.classList.add("active")
  prevSecondItem.classList.remove("second", "left")
  
  prevThirdItem.classList.add("second")
  prevThirdItem.classList.remove("third")

  prevFourthItem.classList.add("third", "left")
  
  currentItem.classList.add("second", "right")
  currentItem.classList.remove("active")
  
  // Switch first and last items to create infinite loop
  lastItem.remove()
  sliderItemList.prepend(lastItem)

}

function nextItem() {

  const currentItem = document.querySelector(".slider li.active");

  const nextSecondItem = currentItem.nextElementSibling;
  const nextThirdItem = currentItem.nextElementSibling.nextElementSibling;
  const nextFourthItem = currentItem.nextElementSibling.nextElementSibling.nextElementSibling;

  const prevSecondItem = currentItem.previousElementSibling;
  const prevThirdItem = currentItem.previousElementSibling.previousElementSibling;
  
  const firstItem = sliderItemList.children[0];

  // Add respective classes
  nextSecondItem.classList.add("active")
  nextSecondItem.classList.remove("second", "right")
  
  nextThirdItem.classList.add("second")
  nextThirdItem.classList.remove("third")
  
  nextFourthItem.classList.add("third", "right")
  
  prevSecondItem.classList.add("third")
  prevSecondItem.classList.remove("second")
  
  prevThirdItem.classList.remove("third", "left")
  
  currentItem.classList.add("second", "left")
  currentItem.classList.remove("active")

  // Switch first and last items to create infinite loop
  firstItem.remove()
  sliderItemList.append(firstItem)
  
}


// -- -- Language selector -- -- 

const languages = document.querySelectorAll("[data-language]")
const form = document.querySelector("[data-contact-form]")
const successPageInput = document.querySelector("[data-success-page-input]")
const successPageEnglish = "https://nico-pwmt.github.io/nicolascamusso/pages/success.html"
const successPageSpanish = "https://nico-pwmt.github.io/nicolascamusso/pages/exito.html"
const automatedResponseInput = document.querySelector("[data-autoresponse-input]")
const automatedResponseEnglish = "Thanks for your message! This is an automated response. I'll contact you back as soon as possible."
const automatedResponseSpanish = "Gracias por tu mensaje! Éste es un mensaje automático. Me pondré en contacto contigo lo antes posible."

languages.forEach((lang) => {
  lang.addEventListener("click", (e) => {
    body.dataset.selectedLanguage = lang.dataset.language
    lang.classList.add("not_selected")
    if (lang.nextElementSibling) {
      lang.nextElementSibling.classList.remove("not_selected")
    } else {
      lang.previousElementSibling.classList.remove("not_selected")
    }

    // adds correct attributes to inputs acording to language
    if (lang.dataset.language == "english") {
      successPageInput.setAttribute("value", successPageEnglish)
      automatedResponseInput.setAttribute("value", automatedResponseEnglish)
    } else if (lang.dataset.language == "spanish") {
      successPageInput.setAttribute("value", successPageSpanish)
      automatedResponseInput.setAttribute("value", automatedResponseSpanish)
    }
  })
})


// Footer 

const getYear = new Date().getFullYear();
const copyright = document.querySelector("[data-date]")

copyright.innerHTML = `&copy; ${getYear}`










