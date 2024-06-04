export default function Head() {
  return (
    <>
      <title>Canadian Health Crisis</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Learn Dire State of Canadian Health Crisis"
      />
      <link rel="icon" href="/images/favicon.ico" />
      {(process.env.NODE_ENV === "development" ||
        process.env.VERCEL_ENV === "preview") && (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script
          data-project-id="1lxftfbJBRdsvBmnkYAkFmAMqucT5mcpf53Ij9Hh"
          data-is-production-environment="false"
          src="https://snippet.meticulous.ai/v1/meticulous.js"
        />
      )}
    </>
  );
}
