/// <reference types="@fastly/js-compute" />

import { Enforcer } from "perimeterx-fastly-js-edge";
import { configs } from './config';

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
    // create enforcer with configuration
    const enforcer = Enforcer.createFromParams(configs);

    // await enforcement
    const retVal = await enforcer.enforce(event);

    // return enforcer response (first party or block)
    if (retVal instanceof Response) {
        return retVal;
    }

    // send request to origin
    let res = await fetch(retVal, { backend: 'origin' });

    // perform any necessary post-processing overriding response
    res = await enforcer.postEnforce(retVal, res, event);

    // return response
    return res;
}
