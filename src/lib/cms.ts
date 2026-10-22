// Catatan: file ini hanya boleh diimpor dari Server Components / Route Handlers.
import { getPayload } from "payload";
import configPromise from "../../payload.config";

import {
  HERO_BANNERS,
  PROMOS_DATA,
  MENU_CATEGORIES,
  ALL_MENU_ITEMS,
  FAVORITE_MENU,
  RESTAURANT_LOCATIONS,
  type Promo,
  type MenuItem,
  type LocationItem,
} from "@/data/mochikinData";
import {
  NEWS_ITEMS,
  JOB_ITEMS,
  BRAND_VALUES,
  TIMELINE_MILESTONES,
  TEAM_MEMBERS,
  COMMITMENT_PILLARS,
  QUALITY_STEPS,
  IMPACT_STATS,
  RECRUITMENT_STEPS,
  CAREER_FAQ,
  type NewsItem,
  type JobItem,
  type ValueItem,
  type TeamMember,
  type CommitmentPillar,
} from "@/data/pagesData";

/* ────────────────────────────────────────────────────────────────
 * Koneksi Payload (dipakai via Local API dari Server Components)
 * ──────────────────────────────────────────────────────────────── */

let payloadInstance: PayloadClient | null = null;

type PayloadClient = Awaited<ReturnType<typeof getPayload>>;

async function getPayloadClient(): Promise<PayloadClient> {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise as never });
  }
  return payloadInstance;
}

/* ────────────────────────────────────────────────────────────────
 * Helper mapping
 * ──────────────────────────────────────────────────────────────── */

type AnyDoc = Record<string, any>;

function buildMediaPath(media: unknown): string | null {
  if (media && typeof media === "object" && typeof (media as AnyDoc).filename === "string") {
    return `/media/${(media as AnyDoc).filename}`;
  }
  return null;
}

function extractLexicalParagraphs(body: unknown): string[] {
  const paragraphs: string[] = [];
  const root = (body as AnyDoc | null)?.root?.children;
  if (!Array.isArray(root)) return paragraphs;

  const textOf = (node: unknown): string => {
    const n = node as AnyDoc | null;
    if (!n || typeof n !== "object") return "";
    if (typeof n.text === "string") return n.text;
    if (Array.isArray(n.children)) return n.children.map(textOf).join("");
    return "";
  };

  for (const block of root) {
    const text = textOf(block).trim();
    if (text) paragraphs.push(text);
  }
  return paragraphs;
}

const PROMO_CATEGORY_LABEL: Record<string, string> = {
  menu: "Promo Menu",
  kegiatan: "Promo Kegiatan",
  cashless: "Promo Cashless",
};

/* ────────────────────────────────────────────────────────────────
 * Query: Hero Banners
 * ──────────────────────────────────────────────────────────────── */

export interface HomeHeroBanner {
  id: string;
  title: string;
  imageDesktop: string;
  imageMobile: string;
  link: string;
}

function mapBanner(doc: AnyDoc): HomeHeroBanner {
  return {
    id: String(doc.id),
    title: doc.title ?? "",
    imageDesktop: buildMediaPath(doc.imageDesktop) ?? HERO_BANNERS[0]?.imageDesktop ?? "",
    imageMobile: buildMediaPath(doc.imageMobile) ?? HERO_BANNERS[0]?.imageMobile ?? "",
    link: doc.link || "/promo",
  };
}

/**
 * Banner carousel beranda. Bila CMS kosong / tidak terjangkau,
 * fallback ke HERO_BANNERS statis.
 */
export async function getHeroBanners(): Promise<HomeHeroBanner[]> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "hero-banners",
      depth: 1,
      limit: 20,
      sort: "order",
    });
    if (!docs.length) return HERO_BANNERS;
    return docs.map(mapBanner);
  } catch (err) {
    console.error("[cms] getHeroBanners → fallback statis:", err);
    return HERO_BANNERS;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Query: Kategori menu
 * ──────────────────────────────────────────────────────────────── */

export async function getMenuCategories(): Promise<string[]> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "menu-categories",
      depth: 0,
      limit: 100,
      sort: "order",
    });
    if (!docs.length) return MENU_CATEGORIES;
    return docs.map((d: AnyDoc) => String(d.name));
  } catch (err) {
    console.error("[cms] getMenuCategories → fallback statis:", err);
    return MENU_CATEGORIES;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Query: Menu items
 * ──────────────────────────────────────────────────────────────── */

function mapMenuItem(doc: AnyDoc, imageKey: "image" | "imageCard" = "image"): MenuItem {
  const category = doc.menuCategory;
  return {
    id: String(doc.id),
    name: doc.name ?? "",
    category:
      category && typeof category === "object" ? String(category.name) : String(category ?? ""),
    image:
      buildMediaPath(doc[imageKey] ?? doc.image) ?? FAVORITE_MENU[0]?.image ?? "",
    description: doc.description ?? "",
    calories: doc.calories || undefined,
    price: doc.price || undefined,
  };
}

/** Semua item menu (kanonik, foto `image`). */
export async function getAllMenuItems(): Promise<MenuItem[]> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "menu-items",
      depth: 1,
      limit: 500,
      sort: "order",
    });
    if (!docs.length) return Object.values(ALL_MENU_ITEMS).flat();
    return docs.map((d: AnyDoc) => mapMenuItem(d, "image"));
  } catch (err) {
    console.error("[cms] getAllMenuItems → fallback statis:", err);
    return Object.values(ALL_MENU_ITEMS).flat();
  }
}

/**
 * Item menu "Favorit" (beranda). Bila `imageCard` terisi, dipakai
 * untuk kartu favorit; jika tidak, foto kanonik `image`.
 */
export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "menu-items",
      depth: 1,
      limit: 100,
      sort: "order",
      where: { isFeatured: { equals: true } },
    });
    if (!docs.length) return FAVORITE_MENU;
    return docs.map((d: AnyDoc) => mapMenuItem(d, "imageCard"));
  } catch (err) {
    console.error("[cms] getFeaturedMenuItems → fallback statis:", err);
    return FAVORITE_MENU;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Query: Promo
 * ──────────────────────────────────────────────────────────────── */

export async function getPromos(): Promise<Promo[]> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "promos",
      depth: 1,
      limit: 100,
      sort: "expiryDate",
    });
    if (!docs.length) return PROMOS_DATA;
    return docs.map((doc: AnyDoc): Promo => {
      const categoryKey = String(doc.category ?? "menu");
      const staticPromo = PROMOS_DATA.find((p) => p.slug === doc.slug);
      return {
        id: String(doc.id),
        name: doc.name ?? "",
        category: (["menu", "kegiatan", "cashless"].includes(categoryKey)
          ? categoryKey
          : "menu") as Promo["category"],
        categoryLabel: PROMO_CATEGORY_LABEL[categoryKey] ?? staticPromo?.categoryLabel ?? "Promo Menu",
        image: buildMediaPath(doc.image) ?? staticPromo?.image ?? "",
        description: doc.description ?? "",
        expiryDate: doc.expiryDate ?? "",
        slug: doc.slug ?? staticPromo?.slug ?? String(doc.id),
      };
    });
  } catch (err) {
    console.error("[cms] getPromos → fallback statis:", err);
    return PROMOS_DATA;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Query: Lokasi outlet
 * ──────────────────────────────────────────────────────────────── */

export async function getLocations(): Promise<LocationItem[]> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "locations",
      depth: 0,
      limit: 200,
      sort: "order",
    });
    if (!docs.length) return RESTAURANT_LOCATIONS;
    return docs.map(
      (doc: AnyDoc): LocationItem => ({
        id: String(doc.id),
        name: doc.name ?? "",
        city: doc.city ?? "",
        address: doc.address ?? "",
        phone: doc.phone ?? "",
        hours: doc.hours ?? "",
        services: Array.isArray(doc.services)
          ? doc.services.map((s: AnyDoc) => String(s.label)).filter(Boolean)
          : [],
      }),
    );
  } catch (err) {
    console.error("[cms] getLocations → fallback statis:", err);
    return RESTAURANT_LOCATIONS;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Query: Berita (newsroom)
 * ──────────────────────────────────────────────────────────────── */

const NEWS_CATEGORY_FALLBACK = NEWS_ITEMS[0]?.category ?? "Promo";

function mapNews(doc: AnyDoc): NewsItem {
  return {
    slug: doc.slug,
    title: doc.title ?? "",
    category: (doc.category as NewsItem["category"]) ?? NEWS_CATEGORY_FALLBACK,
    date: doc.date ?? "",
    image: buildMediaPath(doc.image) ?? NEWS_ITEMS[0]?.image ?? "",
    excerpt: doc.excerpt ?? "",
    body: extractLexicalParagraphs(doc.body),
  };
}

export async function getNewsList(): Promise<NewsItem[]> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "news",
      depth: 1,
      limit: 100,
      sort: "-date",
      where: { _status: { equals: "published" } },
    });
    if (!docs.length) return NEWS_ITEMS;
    return docs.map(mapNews);
  } catch (err) {
    console.error("[cms] getNewsList → fallback statis:", err);
    return NEWS_ITEMS;
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "news",
      depth: 1,
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
      },
    });
    if (!docs.length) return NEWS_ITEMS.find((n) => n.slug === slug) ?? null;
    return mapNews(docs[0] as AnyDoc);
  } catch (err) {
    console.error(`[cms] getNewsBySlug(${slug}) → fallback statis:`, err);
    return NEWS_ITEMS.find((n) => n.slug === slug) ?? null;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Query: Lowongan kerja
 * ──────────────────────────────────────────────────────────────── */

const JOB_FALLBACK = JOB_ITEMS[0];

function mapJob(doc: AnyDoc): JobItem {
  return {
    slug: doc.slug,
    title: doc.title ?? "",
    location: doc.location ?? "",
    department: doc.department as JobItem["department"],
    type: doc.type as JobItem["type"],
    postedDate: doc.postedDate ?? "",
    description: doc.description ?? "",
    responsibilities: Array.isArray(doc.responsibilities)
      ? doc.responsibilities.map((r: AnyDoc) => String(r.point)).filter(Boolean)
      : [],
    qualifications: Array.isArray(doc.qualifications)
      ? doc.qualifications.map((q: AnyDoc) => String(q.point)).filter(Boolean)
      : [],
  };
}

export async function getJobs(): Promise<JobItem[]> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "jobs",
      depth: 0,
      limit: 100,
      sort: "-postedDate",
      where: { _status: { equals: "published" } },
    });
    if (!docs.length) return JOB_ITEMS;
    return docs.map(mapJob);
  } catch (err) {
    console.error("[cms] getJobs → fallback statis:", err);
    return JOB_ITEMS;
  }
}

export async function getJobBySlug(slug: string): Promise<JobItem | null> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "jobs",
      depth: 0,
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
      },
    });
    if (!docs.length) return JOB_ITEMS.find((j) => j.slug === slug) ?? null;
    return mapJob(docs[0] as AnyDoc);
  } catch (err) {
    console.error(`[cms] getJobBySlug(${slug}) → fallback statis:`, err);
    return JOB_ITEMS.find((j) => j.slug === slug) ?? null;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Global: order-channels
 * ──────────────────────────────────────────────────────────────── */

export interface OrderChannelsData {
  whatsappNumber: string;
  whatsappPesan: string;
  gofoodLink: string;
  grabfoodLink: string;
  shopeefoodLink: string;
  appLink: string;
}

const CHANNELS_FALLBACK: OrderChannelsData = {
  whatsappNumber: "628111002000",
  whatsappPesan: "Halo MOCHIKIN, saya ingin memesan...",
  gofoodLink: "https://gofood.co.id",
  grabfoodLink: "https://food.grab.com",
  shopeefoodLink: "https://shopee.co.id",
  appLink: "#",
};

export async function getOrderChannels(): Promise<OrderChannelsData> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "order-channels", depth: 0 })) as AnyDoc;
    if (!doc || Object.keys(doc).length < 2) return CHANNELS_FALLBACK;
    return {
      whatsappNumber: doc.whatsappNumber || CHANNELS_FALLBACK.whatsappNumber,
      whatsappPesan: doc.whatsappPesan || CHANNELS_FALLBACK.whatsappPesan,
      gofoodLink: doc.gofoodLink || CHANNELS_FALLBACK.gofoodLink,
      grabfoodLink: doc.grabfoodLink || CHANNELS_FALLBACK.grabfoodLink,
      shopeefoodLink: doc.shopeefoodLink || CHANNELS_FALLBACK.shopeefoodLink,
      appLink: doc.appLink || CHANNELS_FALLBACK.appLink,
    };
  } catch (err) {
    console.error("[cms] getOrderChannels → fallback statis:", err);
    return CHANNELS_FALLBACK;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Global: site-settings (footer)
 * ──────────────────────────────────────────────────────────────── */

export interface SiteSocials {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export async function getSiteSocials(): Promise<SiteSocials | null> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "site-settings", depth: 0 })) as AnyDoc;
    if (!doc || Object.keys(doc).length < 2) return null;
    return {
      instagram: doc.instagram || undefined,
      facebook: doc.facebook || undefined,
      twitter: doc.twitter || undefined,
      youtube: doc.youtube || undefined,
      tiktok: doc.tiktok || undefined,
    };
  } catch (err) {
    console.error("[cms] getSiteSocials → fallback statis:", err);
    return null;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Global: tentang
 * ──────────────────────────────────────────────────────────────── */

export interface TentangData {
  story: string[];
  storyImage: string | null;
  vision: string | null;
  mission: string[];
  values: Array<{ title: string; description: string; icon?: string }>;
  timeline: Array<{ year: string; title: string; description: string }>;
  team: TeamMember[];
  logoPhilosophy: string | null;
}

export async function getTentang(): Promise<TentangData | null> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "tentang-global", depth: 1 })) as AnyDoc;
    if (!doc || Object.keys(doc).length < 2) return null;
    return {
      story: Array.isArray(doc.story)
        ? doc.story.map((s: AnyDoc) => String(s.paragraph)).filter(Boolean)
        : [],
      storyImage: buildMediaPath(doc.storyImage),
      vision: doc.vision || null,
      mission: Array.isArray(doc.mission)
        ? doc.mission.map((m: AnyDoc) => String(m.point)).filter(Boolean)
        : [],
      values: Array.isArray(doc.values)
        ? doc.values.map((v: AnyDoc) => ({
            title: String(v.title ?? ""),
            description: String(v.description ?? ""),
            icon: v.icon ? String(v.icon) : undefined,
          }))
        : [],
      timeline: Array.isArray(doc.timeline)
        ? doc.timeline.map((t: AnyDoc) => ({
            year: String(t.year ?? ""),
            title: String(t.title ?? ""),
            description: String(t.description ?? ""),
          }))
        : [],
      team: Array.isArray(doc.team)
        ? doc.team.map((t: AnyDoc) => ({
            name: String(t.name ?? ""),
            role: String(t.role ?? ""),
            photo: buildMediaPath(t.photo) ?? TEAM_MEMBERS[0]?.photo ?? "",
          }))
        : [],
      logoPhilosophy: doc.logoPhilosophy || null,
    };
  } catch (err) {
    console.error("[cms] getTentang → fallback statis:", err);
    return null;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Global: komitmen
 * ──────────────────────────────────────────────────────────────── */

export interface KomitmenData {
  pillars: Array<{ title: string; description: string; icon?: string }>;
  qualitySteps: Array<{ title: string; description: string }>;
  certifications: Array<{ name: string; note?: string }>;
  communityPrograms: Array<{ title: string; description: string }>;
  impactStats: Array<{ label: string; value: string }>;
}

export async function getKomitmen(): Promise<KomitmenData | null> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "komitmen-global", depth: 0 })) as AnyDoc;
    if (!doc || Object.keys(doc).length < 2) return null;
    return {
      pillars: Array.isArray(doc.pillars)
        ? doc.pillars.map((p: AnyDoc) => ({
            title: String(p.title ?? ""),
            description: String(p.description ?? ""),
            icon: p.icon ? String(p.icon) : undefined,
          }))
        : [],
      qualitySteps: Array.isArray(doc.qualitySteps)
        ? doc.qualitySteps.map((s: AnyDoc) => ({
            title: String(s.title ?? ""),
            description: String(s.description ?? ""),
          }))
        : [],
      certifications: Array.isArray(doc.certifications)
        ? doc.certifications.map((c: AnyDoc) => ({
            name: String(c.name ?? ""),
            note: c.note ? String(c.note) : undefined,
          }))
        : [],
      communityPrograms: Array.isArray(doc.communityPrograms)
        ? doc.communityPrograms.map((c: AnyDoc) => ({
            title: String(c.title ?? ""),
            description: String(c.description ?? ""),
          }))
        : [],
      impactStats: Array.isArray(doc.impactStats)
        ? doc.impactStats.map((s: AnyDoc) => ({
            label: String(s.label ?? ""),
            value: String(s.value ?? ""),
          }))
        : [],
    };
  } catch (err) {
    console.error("[cms] getKomitmen → fallback statis:", err);
    return null;
  }
}

/* ────────────────────────────────────────────────────────────────
 * Global: karier
 * ──────────────────────────────────────────────────────────────── */

export interface KarierData {
  benefits: Array<{ title: string; description: string }>;
  recruitmentSteps: string[];
  faqs: Array<{ q: string; a: string }>;
  hrEmail: string | null;
}

export async function getKarier(): Promise<KarierData | null> {
  "use cache";
  try {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "karier-global", depth: 0 })) as AnyDoc;
    if (!doc || Object.keys(doc).length < 2) return null;
    return {
      benefits: Array.isArray(doc.benefits)
        ? doc.benefits.map((b: AnyDoc) => ({
            title: String(b.title ?? ""),
            description: String(b.description ?? ""),
          }))
        : [],
      recruitmentSteps: Array.isArray(doc.recruitmentSteps)
        ? doc.recruitmentSteps.map((s: AnyDoc) => String(s.label)).filter(Boolean)
        : [],
      faqs: Array.isArray(doc.faqs)
        ? doc.faqs.map((f: AnyDoc) => ({ q: String(f.question ?? ""), a: String(f.answer ?? "") }))
        : [],
      hrEmail: doc.hrEmail || null,
    };
  } catch (err) {
    console.error("[cms] getKarier → fallback statis:", err);
    return null;
  }
}
