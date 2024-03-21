import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app';
import React, {useEffect, useState} from 'react';

import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MapProvider} from 'react-map-gl';
import {SWUpdater} from '../src/components/pwa/SWUpdater';
import dynamic from 'next/dynamic';

const MyApp = ({ Component, pageProps }: AppProps): unknown => {
    const [root, setRoot] = useState(null);

    const RecoilizeDebugger = dynamic(
        () => {
            return import('recoilize');
        },
        { ssr: false }
    );

    useEffect(() => {
        if (typeof window.document !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setRoot(document.getElementById('__next'));
        }
    }, [root]);

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                cacheTime: Infinity, // 24 hours
                staleTime: 10000,
                retry: 3,
            },
            mutations: {
                retry: 1,
            },
        },
    });


    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <MapProvider>
                    <RecoilizeDebugger root={root} />
                    <Component {...pageProps} />
                    <SWUpdater />
                </MapProvider>
            </RecoilRoot>
        </QueryClientProvider>
    );
};

export default MyApp;
