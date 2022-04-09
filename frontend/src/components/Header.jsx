import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogOut = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('')
  }

  return (
    <nav className="container flex justify-around py-8 mx-auto bg-white">
      <div className="flex items-center">
        <h3 className="text-2xl font-medium text-gray-500">Stackblock</h3>
      </div>

      <div className="items-center hidden space-x-8 lg:flex">
        <a href="/">Home</a>
        <a href="/">About Us</a>
        <a href="/">Blogs</a>
        <a href="/">Our Team</a>
        <a href="/">Contact Us</a>
      </div>

      <div className="flex items-center space-x-2">

        {user ? (
          <div className="py-2 px-2 bg-black text-white">
            <button onClick={onLogOut}>Log out</button>
          </div>          
        ) : (
          <>
            <div className="py-2 px-2 bg-black text-white">
              <Link to="/login">
                Login
              </Link>
            </div>
            <div className="py-2 px-2 bg-black text-white">
              <Link to="/register">
                Register
              </Link>
            </div>
          </>
        )}

        
      </div>
    </nav>
  )
}

export default Header;