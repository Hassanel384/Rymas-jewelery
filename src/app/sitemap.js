import { products, categories } from "@/data/products";

export default function sitemap() {
  const baseUrl = "https://decowin.ma";

  // Pages statiques
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/panier`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Pages catégories dynamiques
  const categoryUrls = categories
    .filter((cat) => cat.id !== "all")
    .map((cat) => ({
      url: `${baseUrl}/categories/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }));

  // Pages produits dynamiques
  const productUrls = products.map((prod) => ({
    url: `${baseUrl}/produit/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.95,
  }));

  return [...staticPages, ...categoryUrls, ...productUrls];
}
