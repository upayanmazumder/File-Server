/*
 * WHAT IS THIS FILE?
 *
 * Development entry point using only client-side modules:
 * - Do not use this mode in production!
 * - No SSR
 * - No portion of the application is pre-rendered on the server.
 * - All of the application is running eagerly in the browser.
 * - More code is transferred to the browser than in SSR mode.
 * - Optimizer/Serialization/Deserialization code is not exercised!
 */
import { render, type RenderOptions } from "@builder.io/qwik";
import Root from "./root";

const trustedHosts = ["localhost", "127.0.0.1"];

export default function (opts: RenderOptions) {
  const currentHost = window.location.hostname;
  if (trustedHosts.includes(currentHost)) {
    return render(document, <Root />, opts);
  } else {
    console.error("Untrusted host:", currentHost);
    return null;
  }
}
