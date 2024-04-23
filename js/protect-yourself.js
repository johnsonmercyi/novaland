import { onThisPageLoad, pagesSubTopics, sidebarMenu } from "./config/nova-settings.mjs";
import { initPageLinksAndSubtopicIds } from "./config/utility.mjs";

document.addEventListener("DOMContentLoaded", function (e) {

  const intro = document.querySelector("nova-intro");
  const sidebar = document.querySelector("nova-sidebar");
  const pageLink = document.querySelector("nova-pagelink");
  const bodyContent = document.querySelector("nova-content");


  function initComponent() {
    intro.textheader = "Coronavirus (COVID-19): protect yourself and others";
    intro.textbody = `How to protect yourself and others from COVID-19. Steps you can take to stay safe, help prevent the spread of COVID-19 and protect your community.`;

    sidebar.link = JSON.stringify(sidebarMenu);
    sidebar.header = "Government's response to COVID-19";

    
    /**
    * Generate body content section IDs and 
    * Initialize page links element with link values.
    */
    const pageInitData = initPageLinksAndSubtopicIds(
      pagesSubTopics.protectyourself,
      onThisPageLoad.protectyourself
    );

    pageLink.header = "On This Page";
    pageLink.links = JSON.stringify(pageInitData.pageLinks);
    
    bodyContent.subtopics = JSON.stringify(pageInitData.subTopics);
    pageLink.pagebodycontent = bodyContent;
  }

  // Initialize this component
  initComponent();

});