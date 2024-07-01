import React, { useState } from "react";
import type { FormProps, UploadFile, UploadProps } from "antd";
import { Button, Upload, Form, Input, Select, Image } from "antd";

import { PlusOutlined } from "@ant-design/icons";
export type FieldType = {
  categories: string[];
  tags: string[];
  coverImg?: string;
  abstract: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const tagList = [
  "JS",
  "CSS",
  "React",
  "Vue",
  "TypeScript",
  "区块链",
  "MySql",
  "Docker",
  "NextJs",
  "NestJs",
];
const categories = ["前端", "后端", "Android", "IOS", "问题记录", "杂谈"];

interface Props {
  cancelFn: () => void;
  onFinish: (data: FieldType) => void;
  content?: String;
  // saveAsDraft: (data: FieldType) => void;
}

export default function ArticleForm(props: Props) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 选择上传
  const uploadChange: UploadProps["onChange"] = (info) => {
    setFileList(info.fileList);
    if (info.file.status === "done") {
      form.setFieldValue("coverImg", info.file.response.data[0]);
    } else {
      form.setFieldValue("coverImg", "");
    }
  };
  // 预览
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Form
        form={form}
        className="w-full"
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        onFinish={(values) => props.onFinish(values)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="分类"
          name="categories"
          rules={[{ required: true, message: "请选择分类" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="请选择分类"
            options={categories.map((item) => ({ label: item, value: item }))}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="标签"
          name="tags"
          rules={[{ required: true, message: "请选择标签" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="请选择标签"
            options={tagList.map((item) => ({ label: item, value: item }))}
          />
        </Form.Item>

        <Form.Item<FieldType> label="封面图片" name="coverImg">
          <div className="relative">
            <Upload
              accept="image/*"
              action="/api/cos/upload"
              data={{
                bucket: "blog-offical-1302483222",
                region: "ap-guangzhou",
              }}
              maxCount={1}
              fileList={fileList}
              listType="picture-card"
              onChange={uploadChange}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}> 添加图片</div>
              </button>
            </Upload>
          </div>
        </Form.Item>

        <Form.Item<FieldType>
          label="摘要"
          name="abstract"
          rules={[{ required: true, message: "请选择标签" }]}
        >
          <Input.TextArea placeholder="请输入摘要" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            ghost
            danger
            onClick={() => props.cancelFn()}
            className="mr-2"
          >
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确认发布
          </Button>
        </Form.Item>
      </Form>
      <Image
        width={200}
        alt="imge"
        style={{ display: "none" }}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
        preview={{
          visible,
          src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      ></Image>
    </div>
  );
}
