import { BusinessCode, responseHandler } from "@/lib/fetch_utils";
import connectMongo from "@/lib/mongoose";
import Article from "models/article";
export async function GET(request: Request) {
  await connectMongo();
  const { searchParams } = new URL(request.url);
  const { page, pageSize } = searchParams as unknown as {
    page: number;
    pageSize: number;
  };
  try {
    const totalCount = await Article.countDocuments();
    const list = await Article.find({})
      .skip((page - 1) * 5)
      .limit(pageSize)
      .sort({ _id: -1 })
      .exec();

    return responseHandler({
      list,
      totalCount,
      page,
      pageSize,
    });
  } catch (err: any) {
    return responseHandler(null, 200, BusinessCode.abnormal, err.message);
  }
}

export async function POST(request: Request) {}
