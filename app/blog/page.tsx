import ArticleItem from "@/components/Article/ArticleItem";
import MainLayout from "@/components/Layouts/MainLayout";
import { GoogleTagManager } from "@next/third-parties/google";
import { getAllPostsMeta, getAllCategory, getAllTags } from "data/utils";
import Link from "next/link";
import { generateColors } from "@/lib/utils";
import Tags from "@/components/blog/Tags";
import Category from "@/components/blog/Categories";
const getPostsData = async () => {
  return await getAllPostsMeta();
};

const getTags = async () => {
  return await getAllTags();
};

const getCates = async () => {
  return await getAllCategory();
};

export default async function BlogHomePage() {
  const list = await getPostsData();
  return (
    <MainLayout>
      <GoogleTagManager gtmId="G-4Z3CSGWXGR" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4 space-y-4">
          {list.map((item) => (
            <ArticleItem articleInfo={item.meta} key={item.meta.id} />
          ))}
        </div>
        <div className="lg:w-1/4 space-y-4">
          <Category />
          <Tags />
        </div>
      </div>
    </MainLayout>
  );
}
