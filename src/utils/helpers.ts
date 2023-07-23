import type { RefObject, CSSProperties } from "react";
import { EMAIL_REGEX } from "./constants";

export function getFormError(
  fields: FormField[],
  state: Record<string, string>
): string | null {
  for (const field of fields) {
    const value = state[field.id];
    if (!value || value.length === 0) {
      return "Please fill out all fields.";
    }
    switch (field.type) {
      case "email":
        if (!value.match(EMAIL_REGEX)) {
          return "Please enter a valid email address.";
        }
        break;
      case "dropdown":
        if (!field.options.includes(value)) {
          return "Please select a valid option from the dropdown menu.";
        }
        break;
    }
  }
  return null;
}

export function encode(state: Record<string, string>): string {
  return Object.keys(state)
    .map((key) => (
      encodeURIComponent(key) + "=" + encodeURIComponent(state[key])
    )).join("&")
}

export function getLinkWidth(
  links: HTMLAnchorElement[] | null,
  i: number
): number {
  if (i === -1 || !links || !links[i]) {
    return 0;
  }
  return links[i].getBoundingClientRect().width;
}

export function getLinkOffset(
  links: HTMLAnchorElement[] | null,
  pos: number
): number {
  let offset = 0;
  for (let i = 0; i < pos; i++) {
    offset += getLinkWidth(links, i) + 40;
  }
  return offset;
}

export function getUnderlineWidth(
  pos: number,
  width: number,
  max: number
): number {
  const min = 15;
  return pos == -1 ? 0 : pos * (width - min * 2) / (max - 1) + min;
}

export function getUnderlineSpanStyle(
  links: RefObject<HTMLAnchorElement[]>,
  isMobile: boolean,
  width: number,
  pos: number, index: 0 | 1
): CSSProperties {
  const backgroundColor = pos === -1
    ? links[0].colors[index]
    : links[pos].colors[index];
  const underlineWidth = getUnderlineWidth(pos, width, links.length);
  const widthStyles = !isMobile && !index
    ? { width: underlineWidth }
    : { width: width - underlineWidth, left: underlineWidth };
  return {
    backgroundColor,
    ...widthStyles
  };
}