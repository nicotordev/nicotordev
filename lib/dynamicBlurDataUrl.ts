// lib/dynamicBlurDataUrl.ts
import { assets } from "@/app/assets";

const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_DOMAIN || '';

export async function dynamicBlurDataUrl(url: string) {
    try {
        // Convertir URL relativa a absoluta
        const imageUrl = url.startsWith('/') ? `${baseUrl}${url}` : url;

        // Codificar la URL correctamente
        const encodedUrl = encodeURIComponent(imageUrl);

        const response = await fetch(
            `${baseUrl}/_next/image?url=${encodedUrl}&w=16&q=75`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64str = Buffer.from(arrayBuffer).toString('base64');

        const blurSvg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
        <filter id='b' color-interpolation-filters='sRGB'>
          <feGaussianBlur stdDeviation='1' />
        </filter>
        <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%'   
        href='data:image/avif;base64,${base64str}' />
      </svg>
    `;

        const toBase64 = (str: string) =>
            typeof window === 'undefined'
                ? Buffer.from(str).toString('base64')
                : window.btoa(str);

        return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
    } catch (error) {
        console.warn('Failed to generate blur data URL:', error);
        // Fallback a un blur estático
        return generateStaticBlurDataUrl();
    }
}

// Función fallback para blur estático
function generateStaticBlurDataUrl(color = '#f3f4f6') {
    const svg = `
    <svg width="8" height="5" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;

    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
}


export async function getProjects(t: (key: string) => string) {
    const projects = [
        {
            name: "Spiritory.com",
            description: t('projects.spiritory'),
            tech: "Next.js 13 + Prisma ORM",
            impact: t('projects.spiritory_impact'),
            image: assets.spiritory,
            blurDataUrl: await dynamicBlurDataUrl(assets.spiritory),
            link: "https://spiritory.com",
            linkText: t('projects.spiritory_ct')
        },
        {
            name: "Quick10x.com",
            description: t('projects.quick10x'),
            tech: "Binance API + Real-time",
            impact: t('projects.quick10x_impact'),
            image: assets.quick10x,
            blurDataUrl: await dynamicBlurDataUrl(assets.quick10x),
            link: "https://quick10x.com",
            linkText: t('projects.quick10x_ct')
        },
        {
            name: "Seguidoress.cl",
            description: t('projects.seguidoress'),
            tech: "Next.js + Node.js + Stripe",
            impact: t('projects.seguidoress_impact'),
            image: assets.seguidoress,
            blurDataUrl: await dynamicBlurDataUrl(assets.seguidoress),
            link: "https://seguidoress.cl",
            linkText: t('projects.seguidoress_ct')
        },
    ]
    return projects;
}