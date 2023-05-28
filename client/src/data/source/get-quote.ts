import Quote from "@mi/data/models/quote";

const getQuote = async (): Promise<Quote> => {
  const res = await fetch(`${BASE_URL}/api/quote`, { next: { revalidate: 0 } })
  const quote = await res.json() as GetQuoteResponse

  return {
    arab: quote.data.attributes.arab,
    bahasa: quote.data.attributes.bahasa,
    source: quote.data.attributes.source
  }
}

export default getQuote

const BASE_URL = process.env.SERVER_BASE_URL

export type GetQuoteResponse = {
  data: {
    id: number
    attributes: {
      arab: string
      bahasa: string
      source: any
      createdAt: string
      updatedAt: string
      publishedAt: string
    }
  }
  meta: {}
}
