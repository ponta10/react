import React, { useState } from 'react'
import { db,auth} from "../firebase.js";
import firebase from "firebase/compat/app";
import Send from "../icons8-send-64.png";
import Camera from "../camera-orange-rev.png"; 
// import { Input } from '@mui/icons-material';
// import SendIcon from "@mui/icons-material/Send";

function SendMessage() {
     const [message,setMessage] = useState();
     const sendMessage = (e) => {
          e.preventDefault();
          const {uid,photoURL} = auth.currentUser;
          db.collection("messages").add({
               text: message,
               photoURL,
               uid,
               createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setMessage("");
     }
     // const submit = () => {
     //      document.messageform.submit();
     // }
  return (
    <div>
      <form action="" onSubmit={sendMessage} name="messageform">
          <div className="sendMassage w-screen h-36 relative">
               <input type="text" placeholder='メッセージを入力してください' onChange={(e) => setMessage(e.target.value)} value={message} className="resize-none outline-none border-2 px-3 w-full h-full"/>
               {/* <SendIcon className="absolute right-5 bottom-5 w-8 text-blue-500" onClick={submit}/> */}
               {message ? <input type="image" src={Send} alt="" className="absolute right-5 bottom-5 cursor-pointer w-10 h-10"/> : ""}
               <label className="absolute left-5 bottom-3">
                    <span title="ファイルを選択" className="bg-orange-400 text-white border-2 border-orange-400 rounded-sm inline-block">
                         <img src={Camera} width="32" height="26" alt="＋画像" className="align-bottom cursor-pointer"/>
                    </span>
                    <input type="file" name="datafile" id="filesend" className="hidden"/>
               </label>
          </div>
      </form>
    </div>
  )
}

export default SendMessage
