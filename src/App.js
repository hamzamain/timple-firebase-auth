import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase/firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState();
  const googleProvider = new GoogleAuthProvider();
  const handlerGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  const handlerSignOut = () => {
    signOut(auth)
      .then(() => setUser({}))
      .catch();
  };
  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handlerSignOut}>Sign Out</button>
      ) : (
        <button onClick={handlerGoogleSignIn}>Google Sign In</button>
      )}
      {user.uid && (
        <div>
          <h2>Name: {user.displayName}</h2>
          <p>
            <i>Email: {user.email}</i>
          </p>
          <img src={user.photoURL} alt="" />
          <p>Id: {user.uid}</p>
        </div>
      )}
    </div>
  );
}

export default App;
