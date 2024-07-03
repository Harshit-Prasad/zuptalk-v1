import React, { createContext, useContext, useState } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';

export const ZegoExpressEngineContext = createContext({});

export const useZegoExpressEngine = function () {
    const zg = useContext(ZegoExpressEngineContext)
    return zg;
}

export default function ZegoExpressEngineProvider({ children }) {

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const server = import.meta.env.VITE_ZEGO_SERVER_URL;
    const zg = new ZegoExpressEngine(appID, server);

    const value = { zg }

    return <ZegoExpressEngineContext.Provider value={value} >
        {children}
    </ZegoExpressEngineContext.Provider>;
}