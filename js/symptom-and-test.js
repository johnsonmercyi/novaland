import { onThisPageLoad, pagesSubTopics, sidebarMenu } from "./config/nova-settings.mjs";
import { initPageLinksAndSubtopicIds } from "./config/utility.mjs";

document.addEventListener("DOMContentLoaded", function (e) {

  const intro = document.querySelector("nova-intro");
  const sidebar = document.querySelector("nova-sidebar");
  const pageLink = document.querySelector("nova-pagelink");
  const bodyContent = document.querySelector("nova-content");
  const bodyButton = document.querySelector("nova-button");
  const bookAppointmentBtn = bodyButton.shadowRoot.querySelector('button');

  function initComponent() {
    intro.textheader = `Coronavirus (COVID-19): symptoms, testing and self-isolating`;
    intro.textbody = `Symptoms, who can be tested and how to self-isolate.`;

    sidebar.link = JSON.stringify(sidebarMenu);
    sidebar.header = "Government's response to COVID-19";

    /**
     * Generate body content section IDs and 
     * Initialize page links element with link values.
     */
    const pageInitData = initPageLinksAndSubtopicIds (
      pagesSubTopics.symptomandtest,
      onThisPageLoad.symptomandtest
    );

    pageLink.header = "On This Page";
    pageLink.links = JSON.stringify(pageInitData.pageLinks);

    bodyContent.subtopics = JSON.stringify(pageInitData.subTopics);
    pageLink.pagebodycontent = bodyContent;
  }

  // Initialize this component
  initComponent();

  bookAppointmentBtn && bookAppointmentBtn.addEventListener("click", () => {
    window.location.href = "test-appointment.html";
  });

});