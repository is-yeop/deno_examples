// hello World
console.log("Welcome to Deno 🦕");

// Making an HTTP request
// const url = Deno.args[0];
const url = "https://example.com";
const res = await fetch(url);

const body = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(body);

// Reading a file
const filenames = Deno.args.slice(1);
for (const filename of filenames) {
    // file 열고 닿는 것도 async로 작동 되는 듯 하다
    const file = await Deno.open(filename);
    await Deno.copy(file, Deno.stdout);
    file.close();
}

// TCP server
const hostname = "0.0.0.0";
const port = 8080;
const listener = Deno.listen({hostname, port});
console.log(`Listening on ${hostname}:${port}`);
for await (const con of listener) {
    Deno.copy(con, con);
}
