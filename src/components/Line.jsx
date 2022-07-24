import React, { useEffect, useRef, useState } from "react";
import SignOut from "./SignOut";
import { auth, db } from "../firebase.js";
import SendMessage from "./SendMessage";
import trashIcon from "../iconmonstr-trash-can-9-240.png";

function Line() {
     const handleClick = text => {
          posts.forEach(value => {
               if (value.text === text) {
                   const id = value.id;
                   db.collection("messages").doc(id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
               }
           });
        };
          //空の配列postsを準備します
          let posts = []
          //firebaseお決まりのメソッドでコレクションからデータを取ってきます
          //ここでのポイントは「doc()がいらないこと」です
          db.collection('messages').get()
          //getしたデータに対し、
          .then(snapshot => {
              //docsプロパティ(※)を指定しforEachで各データを取り出します。
              snapshot.docs.forEach(doc => {
                  const data = doc.data()
                  //準備しておいた配列に取り出したデータをpushします
                  posts.push({
                      text: data.text,
                      photoURL: data.photoURL,
                      createdAt: data.createdAt,
                      uid: data.uid,
                      id: doc.id
                  })
              })
          })
          // console.log(posts)
  const scroll = useRef();
  const [messages, setMessages] = useState(['']);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  messages[-1] = { uid: 12112121211 };
  return (
    <div>
      <SignOut />
      <div className="messages bg-yellow-100 w-screen h-[calc(100vh-224px)] p-5 overflow-y-scroll">
          {messages.map(({ text, photoURL, uid }, index) => (
          <div>
            <div key={uid}>
              <img src={photoURL} alt="" className={`rounded-full w-10 h-10 ${uid === messages[index - 1].uid ? "hidden" : ""} ${uid === auth.currentUser.uid ? "ml-auto" : ""}`}/>
              <p className={`bg-white shadow-md rounded-md table p-3 ${uid === auth.currentUser.uid ? "ml-auto" : ""}`}>
                {text}
              </p>
              <img src={trashIcon} className={`w-5 h-5 cursor-pointer ${uid === auth.currentUser.uid ? "ml-auto" : "hidden"}`} alt="" onClick={() => handleClick(text)}/>
            </div>
          </div>
        ))}
      </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
}

export default Line;
