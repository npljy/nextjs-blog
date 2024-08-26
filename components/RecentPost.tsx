import { get } from "@/lib/fetch";
import { ArticleType } from "@/types/article";
import Link from "next/link";
import SectionContainer from "./SectionContainer";
import ArticleItem from "./Article/ArticleItem";
import { getAllPostsMeta } from "data/utils";

export const getData = async () => {
  return await getAllPostsMeta();
};
export default async function RecentPosts() {
  const list = await getData();
  return (
    <SectionContainer>
      <h2 className="my-6 text-2xl text-bold ">最近发布</h2>
      <section className="grid gap-y-6">
        {list.slice(0, 3).map((item) => (
          <ArticleItem articleInfo={item.meta} />
        ))}
      </section>

      <p className="text-right py-6">
        <Link
          href={"/blog"}
          className="horizontal-underline horizontal-underline-active p-1 text-xs rounded horizontal-underline-hover "
        >
          查看更多 →
        </Link>
      </p>
    </SectionContainer>
  );
}
