import { getTranslations } from 'next-intl/server';



import { Button } from '@mantine/core';



import { CompanyInfo, getCompanyInfo } from '@/lib/spacex';



import { Link } from '@/i18n/navigation';





const Company = async () => {
    const t = await getTranslations();
    const companyInfo: CompanyInfo = await getCompanyInfo();

    return (
        <div>
            <h1>{t('HomePage.title')}</h1>
            <p>name: {companyInfo.name}</p>
            <p>summary: {companyInfo.summary}</p>
            <p>ceo: {companyInfo.ceo}</p>
            <p>coo: {companyInfo.coo}</p>
            <p>cto: {companyInfo.cto}</p>
            <p>cto_propulsion: {companyInfo.cto_propulsion}</p>
            <p>employees: {companyInfo.employees}</p>
            <p>founded: {companyInfo.founded}</p>
            <p>founder: {companyInfo.founder}</p>
            <p>
                headquarters:
                <br />
                {companyInfo.headquarters.address} {companyInfo.headquarters.city} {companyInfo.headquarters.state}
            </p>
            <p>launch_sites: {companyInfo.launch_sites}</p>
            <p>
                links:
                <br />
                <Button component="a" href={companyInfo.links.website} variant="filled" color="myColor" target="_blank" rel="noopener noreferrer">
                    Website
                </Button>
                <br />
                {companyInfo.links.twitter}
                <br />
                {companyInfo.links.flickr}
                <br />
                {companyInfo.links.elon_twitter}
            </p>
            <p>test_sites: {companyInfo.test_sites}</p>
            <p>valuation: ${companyInfo.valuation / 1000000000}B</p>
            <p>vehicles: {companyInfo.vehicles}</p>
            <Link href="/launches">{t('HomePage.about')}</Link>
        </div>
    );
};

export default Company;