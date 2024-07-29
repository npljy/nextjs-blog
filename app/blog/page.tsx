"use client";

import MainLayout from "@/components/Layouts/MainLayout";
import { get } from "@/lib/fetch";
import { ArticleType } from "@/types/article";
import { useCallback, useEffect, useRef, useState } from "react";
import ArticleItem from "@/components/Article/ArticleItem";
import { produce } from "immer";
import useScroll from "@/lib/useScrollHooks";
import { Spin } from "antd";
import Link from "next/link";
import { GoogleTagManager } from "@next/third-parties/google";

export default function LoginPage() {
  const [list, setList] = useState<ArticleType.ArticleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const getBlogList = useCallback(() => {
    setLoading(true);
    get<ArticleType.GetBlogList>("articles/list", {
      page: pageInfo.page,
      pageSize: 10,
    })
      .then((res) => {
        const arr = [...list, ...res.list];
        setList(arr);
        setPageInfo(
          produce((draft) => {
            draft.total = res.totalCount;
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageInfo.page]);
  const { isBottom } = useScroll();
  let timerId = -1;
  useEffect(() => {
    if (isBottom) {
      clearTimeout(timerId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timerId = window.setTimeout(() => {
        setPageInfo(
          produce((draft) => {
            draft.page++;
          })
        );
        getBlogList();
      }, 300);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isBottom]);

  useEffect(() => {
    getBlogList();
  }, [getBlogList]);

  return (
    <MainLayout>
      <GoogleTagManager gtmId="G-4Z3CSGWXGR" />
      <Spin spinning={loading}>
        <div className="min-h-48">
          {list.map((item) => (
            <Link
              key={item._id}
              href={`/blog/${item._id}`}
              className=" cursor-pointer"
              prefetch={false}
            >
              <ArticleItem articleInfo={item} />
            </Link>
          ))}
        </div>
      </Spin>
    </MainLayout>
  );
}
