import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ACCENT_COLORS = {
  primary: "#000000",
  secondary: "#FFFFFF",
  accent1: "#ffde59", // Brand Gold
  accent2: "#00FFFF", // Electric Blue
  accent3: "#ff6b6b", // Coral Red
  dark: "#121212",
  light: "#F5F5F5",
};

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
};

export type TutorialType = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  date: string;
  image: string;
  link: string;
};

export const PROJECTS: ProjectType[] = [
  {
    id: "1",
    title: "Spatial Audio Experience",
    description: "An immersive WebXR application that demonstrates the power of spatial audio in virtual environments.",
    category: "WebXR",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    link: "#"
  },
  {
    id: "2",
    title: "Interactive Museum Guide",
    description: "AR application providing context-aware information for museum exhibits through mobile devices.",
    category: "AR",
    image: "https://pixabay.com/get/g717b764b0f49070154ede54273b606e56d39516c76a121dd82ef80c6cefcfc344fe034a6c24d384f01342ebba2dbb6f50ef954eebba2003d5872f25a0c07b06d_1280.jpg",
    link: "#"
  },
  {
    id: "3",
    title: "Volumetric Performance",
    description: "Capturing and streaming live volumetric content for immersive remote performances.",
    category: "Volumetric",
    image: "https://pixabay.com/get/g10b07afe3f9630e9ebef936ee9d3e6ea1085c291d78cb26d8bb4d8648964fb1d4212e2428a72942e55722b6d9c1c98746eb82ebbf3231e07dbdfac2541f3860f_1280.jpg",
    link: "#"
  }
];

export const TUTORIALS: TutorialType[] = [
  {
    id: "1",
    title: "Getting Started with A-Frame",
    description: "Learn the fundamentals of A-Frame and how to create your first WebXR experience with minimal coding.",
    category: "WebXR",
    level: "Beginner",
    duration: "30 min",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    link: "#"
  },
  {
    id: "2",
    title: "Creating AR Web Experiences",
    description: "Build web-based augmented reality experiences that work across modern mobile browsers.",
    category: "AR",
    level: "Intermediate",
    duration: "45 min",
    date: "May 22, 2023",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1712&q=80",
    link: "#"
  },
  {
    id: "3",
    title: "Three.js for Immersive Websites",
    description: "Learn advanced techniques for creating high-performance 3D experiences with Three.js.",
    category: "3D",
    level: "Advanced",
    duration: "60 min",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    link: "#"
  }
];
