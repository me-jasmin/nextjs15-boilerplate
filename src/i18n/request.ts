import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale || 'en';
  
  try {
    return {
      locale: safeLocale,
      messages: (await import(`../../messages/${safeLocale}.json`)).default,
      timeZone: 'Europe/London'
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${safeLocale}`, error);
    return {
      locale: 'en',
      messages: (await import('../../messages/en.json')).default,
      timeZone: 'Europe/London'
    };
  }
});
