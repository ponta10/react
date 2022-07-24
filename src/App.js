import './App.css';
import SignIn from './components/SignIn';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase.js";
import Line from './components/Line';

function App() {
  const [user] = useAuthState(auth);//auth・・認証情報
  return (
    <div className="overflow-y-hidden">
      {user ? <Line /> : <SignIn />}
    </div>
  );
}

export default App;
