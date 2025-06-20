import type { IconType } from "react-icons";
import { GiCrossedSwords } from "react-icons/gi";

export function titler(progress: number) {
  let title: string;

  if (progress <= 3) {
    title = "Commoner";
  } else if (progress <= 6) {
    title = "Count";
  } else if (progress <= 8) {
    title = "Marquess";
  } else if (progress <= 10) {
    title = "Viscount";
  } else if (progress <= 11) {
    title = "Count";
  } else if (progress <= 12) {
    title = "Prince";
  } else {
    return "";
  }

  return title;
}

export function statusIcons(progress: number) {
  let iconsArr: Array<{ Component: IconType; class: string }> = []; //will contain array of {component,class}
  //max items are 12
  for (let i = 1; i < 13; i++) {
    //if i/number less than or equal to progress, add icon object with status-light class
    //i.e. if you have unlocked it
    if (progress && i <= progress) {
      iconsArr.push({ Component: GiCrossedSwords, class: "status-light" });
    } else if (progress && i > progress) {
      // if i is greater than progress, i.e. u haven't unlocked it,
      iconsArr.push({ Component: GiCrossedSwords, class: "status-dark" });
    }
  }
  return iconsArr;
}

export function reverseDate(date: string): string {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return "";
  }

  const dateObj = new Date(date);
  const formatted = dateObj.toLocaleString("en-gb", {
    month: "long",
    year: "numeric",
  });
  return formatted;
}
