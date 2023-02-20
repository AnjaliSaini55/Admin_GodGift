import "./profile.css";
import { useAuthValue } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Dashboard from "./Admin/Pages/Dashboard";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Profile() {
  const { currentUser } = useAuthValue();
  const navigate = useNavigate();

  const noLogout = () => {
    navigate("/");
  };
  return (
    <>
      <div className="">
        <div className="prfile">
          <p>Do you want to LOGOUT from God Gift Admin</p>
          {/* <p><strong>Email: </strong>{currentUser?.email}</p> */}
          {/* <p>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p> */}
          <Button variant="secondary" onClick={() => signOut(auth)}>YES</Button>&nbsp;
          <Button variant="secondary" onClick={noLogout}>NO</Button>
        </div>
      </div>
    </>
  );
}

export default Profile;
