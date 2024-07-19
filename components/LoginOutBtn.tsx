import { useSession, signOut } from "next-auth/react";
import { SignIn, SignOut } from "./Icon/icon";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Spin, Dropdown, MenuProps } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";
const LoginModal = dynamic(
  () => import("@/components/login/page").then((LoginModal) => LoginModal),
  {
    ssr: false,
  }
);

// 登录和登出
export default function LoginInOut() {
  const { data: session, status } = useSession();
  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex items-center  ">
          <UserOutlined />
          <span>个人资料</span>
        </div>
      ),
      key: "profile",
      onClick: () => {
        signOut();
      },
    },
    {
      label: (
        <div className="flex items-center">
          <SignOut color={"black"} /> <span>登出</span>
        </div>
      ),
      key: "signOut",
      onClick: () => {
        signOut();
      },
    },
  ];

  const [visible, setVisible] = useState(false);

  return (
    <div className="mx-3">
      <LoginModal open={visible} onClose={() => setVisible(false)} />

      {status === "unauthenticated" ? (
        <div onClick={() => setVisible(true)} className="login-icon">
          <SignIn />
        </div>
      ) : status === "authenticated" ? (
        <Dropdown
          trigger={["click"]}
          menu={{ items }}
          dropdownRender={(node) => <span>{node}</span>}
        >
          <Avatar
            size={32}
            shape={"square"}
            src={session?.user?.image}
            alt="avatar"
            className=" cursor-pointer "
          ></Avatar>
        </Dropdown>
      ) : (
        <Spin />
      )}
    </div>
  );
}
