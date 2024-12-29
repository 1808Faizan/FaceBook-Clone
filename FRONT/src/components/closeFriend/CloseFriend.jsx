import './closeFriend.css'
export default function CloseFriend({user}) {
  let PF = import.meta.env.VITE_PUBLIC
  return (
    <li className="sidebarFriend">
    <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg"/>
    <span className="sidebarFriendName">{user.username}</span>
  </li>
  )
}