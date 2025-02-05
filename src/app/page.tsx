'use client'
import ChatComponent from "@/chat/chatComponent";
import Sidebar from "@/sidebar/sidebar";
import {useEffect} from "react";
import {getUser} from "@/api/user";
import {useDispatch} from "react-redux";
import {updateUser} from "@/store/features/userSlice";
import {checkToken} from "@/api/checkToken";
import {useRouter } from 'next/navigation';
import {useAppSelector} from "@/store/hooks";

export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { user, isError, isLoading } = useAppSelector((state) => state.userSlice);
  // useEffect(() => {
  //   dispatch(checkToken())
  // }, [dispatch, isError, router, user]);

  useEffect(() => {
    if(user) {
      getUserDetails()
    }
  }, []);

  async function getUserDetails() {
    const response = await getUser(user?.id)
    dispatch(updateUser(response.data))
  }

  return (
    <div style={{display: 'flex'}}>
      <Sidebar />
      <ChatComponent />
    </div>
  );
}
