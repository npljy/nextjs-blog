import { BusinessCode, responseHandler } from "@/lib/fetch_utils";
import connectMongo from "@/lib/mongoose";
import Article from "models/article";
export async function GET(request: Request) {}

export async function POST(request: Request) {
  await connectMongo();
  const data = await request.json();
  try {
    const res = await Article.create<typeof Article>(data);
    return responseHandler(res);
  } catch (err: any) {
    return responseHandler(null, 200, BusinessCode.abnormal, err.message);
  }
}
