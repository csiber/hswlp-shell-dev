import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

const incrementalCache = kvIncrementalCache;
const tagCache = d1NextTagCache;
const queue = doQueue;

const baseConfig = defineCloudflareConfig({
  incrementalCache,
  tagCache,
  queue,
  enableCacheInterception: true,
});

export default {
  ...baseConfig,
  functions: {
    apiPostsEdge: {
      runtime: "edge",
      placement: "global",
      routes: ["app/api/posts/route"],
      patterns: ["/api/posts", "/api/posts/*"],
      override: {
        wrapper: "cloudflare-edge",
        converter: "edge",
        proxyExternalRequest: "fetch",
        incrementalCache,
        tagCache,
        queue,
      },
    },
  },
};
