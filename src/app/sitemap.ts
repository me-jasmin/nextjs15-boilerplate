import { Locale } from 'next-intl';
import { MetadataRoute } from 'next';

import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Href = Parameters<typeof getPathname>[0]['href'];

const port = process.env.PORT || 3000;
const host = process.env.PROJECT_PRODUCTION_URL ? `https://${process.env.PROJECT_PRODUCTION_URL}` : `http://localhost:${port}`;

const getEntries = (href: Href) =>
    routing.locales.map(locale => ({
        url: getUrl(href, locale),
        alternates: {
            languages: Object.fromEntries(routing.locales.map(cur => [cur, getUrl(href, cur)])),
        },
    }));

const getUrl = (href: Href, locale: Locale) => `${host} ${getPathname({ locale, href })}`;
const sitemap = (): MetadataRoute.Sitemap => [...getEntries('/'), ...getEntries('/pathnames')];

export default sitemap;
