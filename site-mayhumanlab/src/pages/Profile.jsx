import { useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectUserInfos } from "../features/user/userSelector";

function Profile(){
    const userInfos = useSelector(selectUserInfos);
    console.log(userInfos);

    return(<>
        <Header/>
    </>)
};

export default Profile;