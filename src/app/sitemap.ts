import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";
import { lessonProgrammes } from "@/lib/data/lessons";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/timetable",
    "/admission-prices",
    "/swimming-lessons",
    "/swimming-lessons/register",
    "/other-activities",
    "/cafe-and-playground",
    "/about",
    "/accessibility",
    "/contact",
    "/terms-conditions",
    "/privacy-policy",
    "/cookie-policy",
  ];

  const lessonRoutes = lessonProgrammes.map((lesson) => `/swimming-lessons/${lesson.slug}`);

  return [...staticRoutes, ...lessonRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/timetable" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
