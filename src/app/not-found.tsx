'use client';

import Error from 'next/error';

const GlobalNotFound = () => {
    return (
        <html lang="en">
            <body>
                <Error statusCode={404} />
            </body>
        </html>
    );
};

export default GlobalNotFound;
