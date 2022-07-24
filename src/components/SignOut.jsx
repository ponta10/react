import React from 'react'
import { Button } from '@mui/material';
import {auth} from "../firebase.js";
import CallIcon from "@mui/icons-material/Call";

function SignOut() {
  return (
    <div className="bg-cyan-900 w-screen p-5 h-20 relative">
      <Button onClick={() => auth.signOut()}>
          サインアウト
      </Button>
      <h3 className="text-white absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">{auth.currentUser.displayName}</h3>
      <CallIcon className="absolute top-1/2 right-16 -translate-y-2/4 text-white"/>
    </div>
  )
}

export default SignOut
