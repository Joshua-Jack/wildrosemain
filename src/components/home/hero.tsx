"use client";

import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";

const SECTIONS = [
  {
    id: "collective",
    background:
      "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1920",
    leftLabel: "01 / The Collective",
    title: "The Collective",
    rightLabel: "Athletes",
  },
  {
    id: "crafted",
    background:
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920",
    leftLabel: "02 / Crafted Gear",
    title: "Crafted Gear",
    rightLabel: "Drops",
  },
  {
    id: "onward",
    background:
      "https://images.pexels.com/photos/1192672/pexels-photo-1192672.jpeg?auto=compress&cs=tinysrgb&w=1920",
    leftLabel: "03 / Onward",
    title: "Onward",
    rightLabel: "Tournaments",
  },
  {
    id: "wildrose",
    background:
      "https://images.pexels.com/photos/1308746/pexels-photo-1308746.jpeg?auto=compress&cs=tinysrgb&w=1920",
    leftLabel: "04 / Wild Rose",
    title: "Wild Rose",
    rightLabel: "Since 2020",
  },
];

export function Hero() {
  return (
    <FullScreenScrollFX
      sections={SECTIONS}
      header={
        <>
          <span>Wild Rose</span>
          <span>Collective</span>
        </>
      }
      footer="Built by athletes."
      showProgress
      durations={{ change: 0.7, snap: 800 }}
    />
  );
}
