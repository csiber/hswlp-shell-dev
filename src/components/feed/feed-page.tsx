import { FeedLayout } from "./feed-layout";
import { PostComposer } from "./post-composer";
import { getAllPosts } from "@/db/post";

export async function FeedPage() {
  const posts = await getAllPosts();

  return <FeedLayout posts={posts} composer={<PostComposer />} />;
}
