import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import './profile.css'
export default function Profile() {
  let PF = import.meta.env.VITE_PUBLIC

  return (
    <> <Topbar />
    <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={`${PF}post/10.jpg`}
              alt=""
            />
            <img
              className="profileUserImg"
              src={`${PF}post/1.jpg`}
              alt=""
            />
          </div>
          <div className="profileInfo">
              <h4 className="profileInfoName">Mine</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
          </div>
        </div>
        <div className="profileRightBottom">
          <Feed />
          <Rightbar profile/>
        </div>
      </div>
    </div>
  </>
);
}



