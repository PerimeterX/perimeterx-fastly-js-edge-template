/// <reference types="@fastly/js-compute" />
import { createEnforcedRequestHandler } from "perimeterx-fastly-js-edge";

// define HUMAN configuration
const params = {
    px_app_id: '',
    px_cookie_secret: '',
    px_auth_token: '',
};

// define what to do when requests pass HUMAN enforcement
const onPass = (event) => {
    // Add your event handling logic here, for example:
    // return fetch(event.request, { backend: 'origin' });
};

// create request handler with configuration and onPass callback
const handleRequest = createEnforcedRequestHandler(params, onPass);

// invoke handleRequest on incoming fetch event
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));
