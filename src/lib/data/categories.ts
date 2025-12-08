import {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  AudioLines,
  Gamepad2,
  Keyboard,
  Speaker,
  BatteryCharging,
  Cable,
  Wifi,
  Lightbulb,
  RectangleGoggles,
} from "lucide-react";
import { Category } from "./types";

export const categories: Category[] = [
  { id: 1, name: "Smartphones", slug: "smartphones", icon: "Smartphone" },
  { id: 2, name: "Laptops", slug: "laptops", icon: "Laptop" },
  { id: 3, name: "Smartwatches", slug: "smartwatches", icon: "Watch" },
  { id: 4, name: "Headphones", slug: "headphones", icon: "Headphones" },
  { id: 5, name: "Earbuds", slug: "earbuds", icon: "AudioLines" },

  { id: 6, name: "Gaming Consoles", slug: "gaming-consoles", icon: "Gamepad2" },
  {
    id: 7,
    name: "Computer Accessories",
    slug: "computer-accessories",
    icon: "Keyboard",
  },
  { id: 8, name: "Speakers", slug: "speakers", icon: "Speaker" },
  { id: 9, name: "Power Banks", slug: "power-banks", icon: "BatteryCharging" },
  { id: 10, name: "Chargers & Cables", slug: "chargers-cables", icon: "Cable" },
  {
    id: 11,
    name: "Networking Devices",
    slug: "networking-devices",
    icon: "Wifi",
  },
  {
    id: 12,
    name: "Smart Home Devices",
    slug: "smart-home-devices",
    icon: "Lightbulb",
  },
  {
    id: 13,
    name: "VR Headsets",
    slug: "vr-headsets",
    icon: "RectangleGoggles",
  },
];
