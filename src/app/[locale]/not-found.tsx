'use client';

import Error from 'next/error';

import type { FC } from 'react';

const GlobalNotFound: FC = () => <Error statusCode={404} />;

export default GlobalNotFound;
