export const hexToHSL = (hex) => {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }

  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : (delta / (1 - Math.abs(2 * l - 1)));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Function to calculate the darker color
export const getDarkerColor = (hslColor) => {
  const [h, s, l] = hslColor.match(/\d+/g).map(Number);
  return `hsl(${h}, ${s}%, ${Math.max(l - 5, 0)}%)`;
};

export const generatePageSubtopicsIDs = (pageSubtopics) => {
  // Automatically generate IDs and their values for the body content sections (divs)
  pageSubtopics.forEach((topic, index) => {
    const header = pageSubtopics[index].header;
    pageSubtopics[index].id = `${String(header).toLowerCase().replaceAll(" ", "-")}`;
  });
  
  return pageSubtopics;
}

export const generatePageLinkValues = (pageSubtopics, pageLinks) => {
  // Automatically generate link values using the IDs in the body content sections
  pageSubtopics.forEach((obj, index) => {
    pageLinks[index].link = `#${obj.id}`;
  });

  return pageLinks;
}

export function initPageLinksAndSubtopicIds (pageSubtopics, pageLinks) {
  const topics = generatePageSubtopicsIDs(pageSubtopics);
  const links = generatePageLinkValues(topics, pageLinks);
  return {
    subTopics: topics,
    pageLinks: links
  }
}