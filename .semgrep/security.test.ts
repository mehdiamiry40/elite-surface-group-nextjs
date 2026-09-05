// Benign static fixtures only: this file is never executed.
/* eslint-disable @typescript-eslint/no-unused-vars -- Static scanner fixtures. */
export {};
import { exec, execFile } from "node:child_process";
declare const input: string;
declare const payload: unknown;
declare const element: HTMLElement;
declare function createHash(name: string): unknown;

// ruleid: no-dynamic-code-execution
eval(input);
// ok: no-dynamic-code-execution
JSON.parse(input);
// ruleid: no-disabled-tls-validation
const unsafeTls = { rejectUnauthorized: false };
// ok: no-disabled-tls-validation
const safeTls = { rejectUnauthorized: true };
// ruleid: no-shell-command-execution
exec(input);
// ok: no-shell-command-execution
execFile("redis-server", ["--version"]);
// ok: no-shell-command-execution
/test/.exec(input);
// ruleid: no-weak-cryptography
createHash("md5");
// ok: no-weak-cryptography
createHash("sha256");
// ruleid: no-unescaped-dom-html
element.innerHTML = input;
// ok: no-unescaped-dom-html
element.textContent = input;
// ruleid: no-public-server-secret
const publicSecret = process.env.NEXT_PUBLIC_RESEND_API_KEY;
// ok: no-public-server-secret
const serverSecret = process.env.RESEND_API_KEY;
// ruleid: no-sensitive-console-logging
console.log(payload);
// ok: no-sensitive-console-logging
console.log({ status: "queued" });
