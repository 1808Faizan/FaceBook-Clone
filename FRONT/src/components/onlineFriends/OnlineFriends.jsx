import './onlineFriends.css'
export default function onlineFriends({user}) {
  let PF = import.meta.env.VITE_PUBLIC
  return (
    <div>
                  <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
          </li> 
    </div>  
  )
}