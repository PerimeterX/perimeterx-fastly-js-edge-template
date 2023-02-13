# Human/PerimeterX Starter Kit for JavaScript

## Introduction

This is a starter kit for your Fastly Compute@Edge service that includes PerimeterX/Human Security capabilities built in.
You can fork this repository or create a new Compute@Edge project based on this template. It provides an example of a
functioning Fastly Compute@Edge service and demonstrates how to integrate the PerimeterX enforcer into your Fastly 
Compute@Edge JavaScript worker.

## Basic Usage

#### 1. Install the [Fastly CLI](https://developer.fastly.com/learning/tools/cli).

#### 2. [Initialize a new local Fastly C@E JavaScript project](https://developer.fastly.com/reference/cli/compute/init/) from this template by running:

```shell
fastly compute init --from https://github.com/PerimeterX/perimeterx-fastly-js-edge-template
```

#### 3. Modify the `src/config.js` file and the `fastly.toml` files to include your specific enforcer configuration values.

#### 4. Install dependencies, build, and test your project locally by running:

```shell
npm install     # installs dependencies
npm run serve   # builds the package and runs local server
```

#### 5. Deploy the service to Fastly by running:

```shell
npm run deploy  # builds the package and deploys it to Fastly
```

## Detailed Information

### Source Code Files

There are two JavaScript files in the `src` directory: `index.js` and `config.js`.

The `index.js` file contains the JavaScript worker. This is the code that will be called on every incoming request,
and shows basic usage of the PerimeterX Fastly JS Compute@Edge library. For more details, see the 
[documentation](https://www.npmjs.com/package/perimeterx-fastly-js-edge).

The `config.js` contains a single JavaScript object that defines the PerimeterX enforcer configuration. At a minimum, this
object should contain your application ID, authentication token, and cookie secret. These values can be obtained from
the [PerimeterX Human Security Portal here](https://console.perimeterx.com/).

### Fastly TOML

The `fastly.toml` file in the root directory describes additional configurations in the Fastly service. You will notice that
the "setup" section of this file contains five backends: one called `origin`, and four others beginning with `human_`.

The `origin` backend is, as you might expect, the URL to reach your origin servers. The Human/PerimeterX SDK doesn't use
this backend at all; however, it is used in the `src/index.js` file to pass the request to the origin server.

You will need to create four additional backends (called "hosts" on the Fastly website) so that the library can function
properly. Some of these backend URLs depend on the application ID (e.g., `PX12345678`), so make sure to adjust these values
appropriately in the TOML file. The backends are:

| Backend Name      | Sample Backend URL                         | Description                  |
|:---               |:---                                        |:---                          |
| human_sapi        | https://sapi-px12345678.perimeterx.net     | The Human Score API backend  |
| human_collector   | https://collector-px12345678.perimeterx.net| The Human Collector backend  |
| human_client      | https://client.perimeterx.net              | The Human backend that serves the client sensor |
| human_captcha     | https://captcha.px-cdn.net                 | The Human backend that serves the captcha script |

> Note: The names and URLs of these backends are crucial for the enforcer to work properly. If the names of these backends
> differ from the default values, they must be explicitly specified in the enforcer configuration.

## Helpful PerimeterX/Human Security Links

* [PerimeterX Documentation](https://docs.perimeterx.com/pxconsole/docs)
* [PerimeterX Fastly JS Compute@Edge Package](https://www.npmjs.com/package/perimeterx-fastly-js-edge)
* [PerimeterX JS Core Package](https://www.npmjs.com/package/perimeterx-js-core)

## Helpful Fastly Links

* [Deploying to Fastly](https://deploy.edgecompute.app/deploy)
* [Using Compute@Edge JavaScript](https://developer.fastly.com/learning/compute/javascript/)
* [Migrating from VCL](https://developer.fastly.com/learning/compute/migrate/)
* [Fastly Developer Hub](https://developer.fastly.com/solutions/starters)
* [The `@fastly/js-compute` Package](https://www.npmjs.com/package/@fastly/js-compute)

