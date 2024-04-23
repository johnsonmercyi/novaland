import { onThisPageLoad, pagesSubTopics, sidebarMenu } from "./config/nova-settings.mjs";
import { initPageLinksAndSubtopicIds } from "./config/utility.mjs";

document.addEventListener("DOMContentLoaded", function (e) {

  const intro = document.querySelector("nova-intro");
  const sidebar = document.querySelector("nova-sidebar");
  const pageLink = document.querySelector("nova-pagelink");
  const bodyContent = document.querySelector("nova-content");
  const warningContent = document.querySelector("nova-introwarning");

  function initComponent() {
    intro.textheader = `Mental health and wellbeing`;
    intro.textbody = `You’re not alone. Support for mental health, addiction and wellbeing is available for children, youth and adults.`;

    sidebar.link = JSON.stringify(sidebarMenu);
    sidebar.header = "Government's response to COVID-19";

    /**
     * Generate body content section IDs and 
     * Initialize page links element with link values.
     */
    const pageInitData = initPageLinksAndSubtopicIds(
      pagesSubTopics.mentalhealth,
      onThisPageLoad.mentalhealth
    );

    pageLink.header = "On This Page";
    pageLink.links = JSON.stringify(pageInitData.pageLinks);

    bodyContent.subtopics = JSON.stringify(pageInitData.subTopics);

    // Assign the page body content to the pagelink element for appropriate scroll to view action
    pageLink.pagebodycontent = bodyContent;

    warningContent.icon = `./img/warning.svg`;
    warningContent.text = `If this is an emergency, or if you or someone you know is in immediate danger, call the Provincial Mental Health and Addictions Crisis Line toll-free at 1-865-432-800 or call 911. Or go to your nearest hospital or emergency department.`;
  }

  // Initialize this component
  initComponent();

});