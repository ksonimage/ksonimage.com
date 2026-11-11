import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const commonFields = {
  title: z.string(),
  info: z.string().optional(),
  meta_title: z.string().optional(),
  date: z.coerce.date().optional(),
  image: z.any().optional(),
  draft: z.boolean().default(false),
};

// 💡 새롭게 확정한 블로그/아카이브 컬렉션 스키마
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    // [필수]
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default(() => ["기타"]),

    // [선택 항목 - 이벤트 및 전시 메타데이터]
    types: z.array(z.string()).optional(),             // 예: ["개인전", "기획전"]
    tags: z.array(z.string()).optional(),              // 예: ["미디어아트"]
    venue: z.string().optional(),                      // 장소명
    artist: z.array(z.string()).optional(),            // 참여 작가 / 감독
    organizer: z.string().optional(),                  // 주최 / 지원 기관
    startDate: z.coerce.date().optional(),              // 시작일
    endDate: z.coerce.date().optional(),                // 종료일

    // [선택 항목 - 링크 및 부가 정보]
    link: z.string().optional(),                       // 관련 기사 / 예매 URL
    mapUrl: z.string().optional(),                     // 지도 URL
    etc: z.array(z.string()).optional(),               // 관람료, 휴관일 등

    // [시각 자료 및 렌더링 제어]
    image: z.string().optional(),                      // 대표 포스터 이미지
    gallery: z.array(z.string()).optional(),            // 갤러리 이미지 배열

    // [시스템]
    meta_title: z.string().optional(),
    description: z.string().optional(),
    author: z.string().default("Admin"),
    draft: z.boolean().default(false),
  }),
});

// Text collection schema
const textCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/text" }),
  schema: z.object({
    ...commonFields,
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    ...commonFields,
    layout: z.string().optional(),
    vimeoId: z.string().optional(),
    gallery: z.union([z.string(), z.array(z.string())]).optional(),
  }),
});

// cv collection schema
const cvCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/cv" }),
  schema: z.object({
    ...commonFields,
  }),
});

// contact collection schema
const contactCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    ...commonFields,
  }),
});

// Homepage collection schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        content: z.string(),
        bulletpoints: z.array(z.string()),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
  }),
});

// Call to Action collection schema
const ctaSectionCollection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    button: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
  }),
});

// Testimonials Section collection schema
const testimonialSectionCollection = defineCollection({
  loader: glob({
    pattern: "testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    testimonials: z.array(
      z.object({
        name: z.string(),
        avatar: z.string(),
        designation: z.string(),
        content: z.string(),
      }),
    ),
  }),
});

// Export collections
export const collections = {
  homepage: homepageCollection,
  blog: blogCollection,
  text: textCollection,
  cv: cvCollection,
  pages: pagesCollection,
  contact: contactCollection,
  ctaSection: ctaSectionCollection,
  testimonialSection: testimonialSectionCollection,
};
