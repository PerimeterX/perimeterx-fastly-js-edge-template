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
    console.log('handling HUMAN-validated request')
    return fetch(event.request, { backend: 'origin' })
};

// define what to do for block responses (optional)
const onResponse = (response) => {
    console.log('handling response from HUMAN enforcer');
    return response;
};

// create request handler
const handleRequest = createEnforcedRequestHandler(params, onPass, onResponse);

// invoke handleRequest on incoming fetch event
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));
