import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Allow: /posts/
Allow: /friends/
Allow: /$
Disallow: flag.txt
Disallow: /  

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
