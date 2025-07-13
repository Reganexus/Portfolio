const mainImage = document.getElementById("main-cert-image");

const imageSources = {
  htmlcss: "assets/certificate/htmlcss.png",
  database: "assets/certificate/database.png",
  sap: "assets/certificate/sap.png",
  networking: "assets/certificate/networking.png",
  os: "assets/certificate/os.png",
};

mainImage.src = imageSources[id];
