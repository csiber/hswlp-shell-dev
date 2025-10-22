import { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_NAME } from "@/constants";
import { FeedPage } from "@/components/feed/feed-page";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return <FeedPage />;
}
