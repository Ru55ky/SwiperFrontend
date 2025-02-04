'use client'
import ChatComponent from "@/chat/chatComponent";
import Sidebar from "@/sidebar/sidebar";
import {useEffect} from "react";
import {getUser} from "@/api/user";
import {useDispatch} from "react-redux";
import {updateUser} from "@/store/features/userSlice";

export default function Home() {
  // const dispatch = useDispatch()
  //
  // useEffect(() => {
  //   getUserDetails()
  // }, []);
  //
  // async function getUserDetails() {
  //   const response = await getUser()
  //   dispatch(updateUser(response.data))
  // }

  return (
    <div style={{display: 'flex'}}>
      <Sidebar />
      <ChatComponent />
    </div>
  );
}
