import { getPayload } from 'payload'
import configPromise from '../payload.config.ts'

export default async function main() {
  const payload = await getPayload({ config: configPromise as never })
  try {
    const cats = await payload.find({ collection: 'menu-categories', depth: 0, limit: 5 })
    console.log('CATEGORIES:', cats.docs.map((d: any) => d.name))
    const promos = await payload.count({ collection: 'promos' })
    const items = await payload.count({ collection: 'menu-items' })
    const news = await payload.count({ collection: 'news' })
    const jobs = await payload.count({ collection: 'jobs' })
    const locs = await payload.count({ collection: 'locations' })
    const media = await payload.count({ collection: 'media' })
    console.log('counts: promos=%d items=%d news=%d jobs=%d locations=%d media=%d', promos.totalDocs, items.totalDocs, news.totalDocs, jobs.totalDocs, locs.totalDocs, media.totalDocs)
    const ch = await payload.findGlobal({ slug: 'order-channels', depth: 0 })
    console.log('order-channels wa:', (ch as any).whatsappNumber)
  } catch (e: any) {
    console.log('PROBE ERR:', e.message)
  }
}
