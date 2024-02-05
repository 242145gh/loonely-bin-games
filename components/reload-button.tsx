"use client"
import React from "react";
import {Button} from "./ui/button"
import { useRouter } from "next/router";

const RefreshButton = () => {
const router = useRouter()
  const handleRefresh = () => {
    router.reload();
  };

  return (
    <>
    <Button className='mb-4 mt-4 ml-4 mr-4' variant="ghost"
          onClick={handleRefresh}>
          Play again
    </Button>
      </>
  );
  }
export default RefreshButton;