import { v5 as uuidV5, NIL } from 'uuid';
import { getCanvasID } from './canvas';
import { getWebglID, getWebglInfo } from './webgl';
export const getBrowserFingerprint = ({ enableWebgl = true, enableCanvas = true, enableScreen = true, debug = false, } = {}) => {
    const navigatorKeys = [
        'cookieEnabled',
        'deviceMemory',
        // 'doNotTrack', // It will be deferent in incognito
        'hardwareConcurrency',
        'language',
        // 'languages', // It can be deferent in incognito
        'maxTouchPoints',
        'platform',
        'userAgent',
        'vendor',
    ];
    const { colorDepth, pixelDepth, availHeight, availWidth } = enableScreen && 'screen' in window
        ? window.screen
        : {
            availHeight: null,
            availWidth: null,
            colorDepth: null,
            pixelDepth: null,
        };
    const timezoneOffset = new Date().getTimezoneOffset();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const touchSupport = 'ontouchstart' in window;
    const devicePixelRatio = window.devicePixelRatio;
    const canvas = enableCanvas ? getCanvasID(debug) : null;
    const webgl = enableWebgl ? getWebglID(debug) : null;
    const webglInfo = enableWebgl ? getWebglInfo() : null;
    const fingerprintData = navigatorKeys.reduce((a, c) => {
        if (window && 'navigator' in window && c in window.navigator) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            a[c] = window.navigator[c];
        }
        return a;
    }, {
        canvas,
        webgl,
        webglInfo,
        timezoneOffset,
        timezone,
        touchSupport,
        availHeight,
        availWidth,
        colorDepth,
        pixelDepth,
        devicePixelRatio,
    });
    const dataString = JSON.stringify(fingerprintData);
    if (debug)
        console.log(dataString);
    return { fingerprintID: uuidV5(dataString, NIL), fingerprintData };
};
