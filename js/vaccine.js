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
    intro.textheader = `Coronavirus (COVID-19): Vaccine`;
    intro.textbody = `Updated COVID-19 vaccines have been approved by Health NovaLand and are available for use. COVID-19 vaccination reduces the risk of severe illness, death and post COVID-19 condition (long COVID).`;

    sidebar.link = JSON.stringify(sidebarMenu);
    sidebar.header = "Government's response to COVID-19";

    /**
     * Generate body content section IDs and 
     * Initialize page links element with link values.
     */
    const pageInitData = initPageLinksAndSubtopicIds(
      pagesSubTopics.vaccine,
      onThisPageLoad.vaccine
    );

    pageLink.header = "On This Page";
    pageLink.links = JSON.stringify(pageInitData.pageLinks);

    bodyContent.subtopics = JSON.stringify(pageInitData.subTopics);
    pageLink.pagebodycontent = bodyContent;
  }

  // Initialize this component
  initComponent();

  bookAppointmentBtn && bookAppointmentBtn.addEventListener("click", () => {
    window.location.href = "vaccine-appointment.html";
  });

});