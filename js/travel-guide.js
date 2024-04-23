import { onThisPageLoad, pagesSubTopics, sidebarMenu } from "./config/nova-settings.mjs";

document.addEventListener("DOMContentLoaded", function (e) {

  const intro = document.querySelector("nova-intro");
  const sidebar = document.querySelector("nova-sidebar");
  const pageLink = document.querySelector("nova-pagelink");
  const bodyContent = document.querySelector("nova-content");


  function initComponent() {
    intro.textheader = `COVID-19: Travel, testing and borders`;
    intro.textbody = `For all travellers entering Canada by air, land or marine mode:`;

    sidebar.link = JSON.stringify(sidebarMenu);
    sidebar.header = "Government's response to COVID-19";

     // Automatically generate IDs and their values for the body content sections (divs)
    pagesSubTopics.travelguide.forEach((topic, index) => {
      const header = pagesSubTopics.travelguide[index].header;
      pagesSubTopics.travelguide[index].id = `${String(header).toLowerCase().replaceAll(" ", "-")}`;
    });

    // Automatically generate link values using the IDs in the body content sections
    pagesSubTopics.travelguide.forEach((obj, index) => {
      onThisPageLoad.travelguide[index].link = `#${obj.id}`;
    });

    pageLink.header = "On This Page";
    pageLink.links = JSON.stringify(onThisPageLoad.travelguide);

    bodyContent.subtopics = JSON.stringify(pagesSubTopics.travelguide);

    pageLink.pagebodycontent = bodyContent;
  }

  // Initialize this component
  initComponent();

});