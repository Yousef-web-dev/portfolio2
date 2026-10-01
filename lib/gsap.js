"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export { gsap, ScrollTrigger, useGSAP };
// Set to true to turn off entrance/scroll animations for people who enabled
// "reduce motion" on their device. false = animations always run.
export const RESPECT_REDUCED_MOTION = false;
export const MOTION_OK = RESPECT_REDUCED_MOTION ? "(prefers-reduced-motion: no-preference)" : "(min-width: 0px)";