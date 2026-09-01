import { ContactMessage, ProjectItem } from "../types";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

export const isContactCategory = (
  value: string,
): value is ContactMessage["category"] =>
  value === "Web Development" ||
  value === "Konsultasi" ||
  value === "Proyek Next.js" ||
  value === "Kerja Sama" ||
  value === "Lainnya";

export const isProjectItem = (value: unknown): value is ProjectItem => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.shortDescription === "string" &&
    typeof value.category === "string" &&
    isStringArray(value.tags) &&
    typeof value.image === "string" &&
    typeof value.publishedDate === "string" &&
    typeof value.markdownContent === "string"
  );
};

export const isContactMessage = (value: unknown): value is ContactMessage => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.subject === "string" &&
    typeof value.category === "string" &&
    typeof value.message === "string" &&
    typeof value.createdAt === "string"
  );
};
