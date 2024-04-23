document.addEventListener("DOMContentLoaded", function(e) {
  const main = document.querySelector("main");

  const menus = [
    {
      menuImage: "./img/vaccine.svg",
      menuText: "Vaccine",
      menuLink: "./vaccine.html"
    }, {
      menuImage: "./img/protect yourself.svg",
      menuText: "Protect Yourself",
      menuLink: "./protect-yourself.html"
    }, {
      menuImage: "./img/symptomsAndTest.svg",
      menuText: "Symptom & Test",
      menuLink: "./symptom-and-test.html"
    }, {
      menuImage: "./img/alertAndNews.svg",
      menuText: "Alert & News",
      menuLink: "./alert-and-news.html"
    }, {
      menuImage: "./img/mentalHealthAndWellbeing.svg",
      menuText: "Mental Health & Wellbeing",
      menuLink: "./mental-wellbeing.html"
    }, {
      menuImage: "./img/travelGuideLines.svg",
      menuText: "Travelling Guide",
      menuLink: "./travel-guide.html"
    }
  ];

  // Initialize home page
  initialize();

  function initialize() {

    const gridItem = document.createElement("div");
    menus.forEach(menu => {
      const menuNode = document.createElement("nova-menu");
      menuNode.menuImage = menu.menuImage;
      menuNode.menuText = menu.menuText;
      menuNode.menuLink = menu.menuLink;

      gridItem.classList.add("grid-item");

      gridItem.appendChild(menuNode);
      
    });

    main.appendChild(gridItem);
  }


});