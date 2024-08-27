import ArticleItem from "@/components/Article/ArticleItem";
import MainLayout from "@/components/Layouts/MainLayout";
import { GoogleTagManager } from "@next/third-parties/google";
import { getAllPostsMeta } from "data/utils";

const getPostsData = async () => {
  return await getAllPostsMeta();
};

export default async function Page(data: { params: { category: string } }) {
  const list = await getPostsData();
  return (
    <MainLayout>
      <GoogleTagManager gtmId="G-4Z3CSGWXGR" />
      <div>
        {list
          .filter(
            (item) =>
              item.meta.categories?.indexOf(
                decodeURIComponent(data.params.category)
              ) > -1
          )
          .map((item) => (
            <div className="mb-4" key={item.meta.id}>
              <ArticleItem articleInfo={item.meta} />
            </div>
          ))}
      </div>
    </MainLayout>
  );
}
