const active = "active";
const expand = "expand";
const collapse = "collapse";

getBirthday();

function getBirthday() {
  const birthday = Date.now() - Date.UTC(2003, 7, 3);
  const ageNumber = birthday / (365 * 24 * 60 * 60 * 1000);
  const age = document.getElementById("age");
  age.innerHTML = Math.floor(ageNumber) + " years old";
}

function goTo(id) {
  let profileButton = document.getElementById("m-link");
  let aboutButton = document.getElementById("a-link");
  let stackButton = document.getElementById("s-link");
  let certificationButton = document.getElementById("c-link");
  let projectsButton = document.getElementById("p-link");

  let buttonArr = [
    profileButton,
    aboutButton,
    stackButton,
    certificationButton,
    projectsButton,
  ];

  for (i = 0; i < 5; i++) {
    let buttonItem = buttonArr[i].id;
    let buttonElement = document.getElementById(buttonItem);

    buttonElement.classList.remove(active);

    if (id == buttonItem) {
      buttonElement.classList.add(active);
    }
  }
}

function changeAbout(id) {
  // update active class on tab button
  let tabButtonExperience = document.getElementById("button-experience");
  let tabButtonEducation = document.getElementById("button-education");
  let tabButtonAffiliate = document.getElementById("button-affiliate");
  let aboutExperience = document.getElementById("experience");
  let aboutEducation = document.getElementById("education");
  let aboutAffiliate = document.getElementById("affiliate");

  if (id == "education") {
    tabButtonExperience.classList.remove(active);
    tabButtonAffiliate.classList.remove(active);
    tabButtonEducation.classList.add(active);

    aboutAffiliate.classList.remove(active);
    aboutExperience.classList.remove(active);
    aboutEducation.classList.add(active);
  } else if (id == "experience") {
    tabButtonAffiliate.classList.remove(active);
    tabButtonEducation.classList.remove(active);
    tabButtonExperience.classList.add(active);

    aboutAffiliate.classList.remove(active);
    aboutEducation.classList.remove(active);
    aboutExperience.classList.add(active);
  } else {
    tabButtonExperience.classList.remove(active);
    tabButtonEducation.classList.remove(active);
    tabButtonAffiliate.classList.add(active);

    aboutExperience.classList.remove(active);
    aboutEducation.classList.remove(active);
    aboutAffiliate.classList.add(active);
  }
}

function changeStack(id) {
  const stacks = ["web", "mobile", "ai", "ui", "db", "sd"];

  stacks.forEach((stack) => {
    const button = document.getElementById(stack);
    const content = document.getElementById(`${stack}-content`);
    const isActive = stack === id;

    button.classList.toggle("active", isActive);
    content.classList.toggle("active", isActive);
  });

  removePointer();

  requestAnimationFrame(() => {
    resetPhysics();
    setupBoundaries();
    resetBallStyles();
    applyPhysicsToActiveStack();
  });
}

function nextCert() {
  const certs = ["htmlcss", "database", "sap", "networking", "os"];
  const currentIndex = certs.findIndex((cert) =>
    document.getElementById(cert).classList.contains("active")
  );
  const nextIndex = (currentIndex + 1) % certs.length;

  changeCert(certs[nextIndex]);
}

function backCert() {
  const certs = ["htmlcss", "database", "sap", "networking", "os"];
  const currentIndex = certs.findIndex((cert) =>
    document.getElementById(cert).classList.contains("active")
  );
  const prevIndex = (currentIndex - 1 + certs.length) % certs.length;

  changeCert(certs[prevIndex]);
}

function changeCert(id) {
  const certs = ["htmlcss", "database", "sap", "networking", "os"];

  certs.forEach((cert) => {
    const button = document.getElementById(cert);
    const content = document.getElementById(`${cert}-content`);
    const isActive = cert === id;

    button.classList.toggle("active", isActive);
    content.classList.toggle("active", isActive);
  });

  const mainImage = document.getElementById("main-cert-image");
  if (mainImage) {
    mainImage.src = `assets/certificate/${id}.webp`;
  }
}

function expandProject(id) {
  let solaceContent = document.getElementById("solace");
  let spacebotContent = document.getElementById("spacebot");
  let airisContent = document.getElementById("airis");
  let mapaturoContent = document.getElementById("mapaturo");

  let contentArr = [
    solaceContent,
    spacebotContent,
    airisContent,
    mapaturoContent,
  ];

  for (i = 0; i < contentArr.length; i++) {
    let contentItem = contentArr[i].id;
    let contentElement = document.getElementById(contentItem);

    contentElement.classList.remove(expand);
    contentElement.classList.add(collapse);

    if (id == contentItem) {
      contentElement.classList.remove(collapse);
      contentElement.classList.add(expand);
    }
  }
}
