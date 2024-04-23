import { chartData, onThisPageLoad, pagesSubTopics, sidebarMenu } from "./config/nova-settings.mjs";
import { initPageLinksAndSubtopicIds } from "./config/utility.mjs";

document.addEventListener("DOMContentLoaded", function (e) {

  const intro = document.querySelector("nova-intro");
  const sidebar = document.querySelector("nova-sidebar");
  const pageLink = document.querySelector("nova-pagelink");
  const bodyContent = document.querySelector("nova-content");
  const barChart = document.querySelector("nova-bar-chart");

  function initComponent() {
    intro.textheader = `Coronavirus (COVID-19): Alert and News`;
    intro.textbody = `Updates on COVID-19 cases, deaths and Percentages positive.`;

    sidebar.link = JSON.stringify(sidebarMenu);
    sidebar.header = "Government's response to COVID-19";

    /**
     * Generate body content section IDs and 
     * Initialize page links element with link values.
     */
    const pageInitData = initPageLinksAndSubtopicIds(
      pagesSubTopics.alertandnews,
      onThisPageLoad.alertandnews
    );

    pageLink.header = "On This Page";
    pageLink.links = JSON.stringify(pageInitData.pageLinks);

    bodyContent.subtopics = JSON.stringify(pageInitData.subTopics);
    pageLink.pagebodycontent = bodyContent;

    barChart.data = JSON.stringify(chartData);
  }

  // Initialize this component
  initComponent();

});