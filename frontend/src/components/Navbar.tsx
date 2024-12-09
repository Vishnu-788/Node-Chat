import { useState } from "react";
import { useAppSelector } from "../store/features/hooks";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Logout } from "../store/features/userStore";
import { useAppDispatch } from "../store/features/hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.users);

  const handleLogout = () => {
    dispatch(Logout());
  };

  const handleClick = (): void => {
    navigate("/login");
  };

  const toggleDropdown = (): void => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav className="bg-blue-500 p-5">
      <div className="w-full h-10 flex justify-between items-center">
        <div className="title">
          <h4 className="text-3xl font-bold tracking-wide">Node Chat</h4>
        </div>
        <div className="user-info">
          {!user.user ? (
            <button
              onClick={handleClick}
              className="bg-white text-blue-500 px-4 py-2 rounded-md font-medium shadow hover:bg-blue-100 transition duration-300"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                {/* Hardcoded small profile icon */}
                <img
                  src={user.pfp_url || "default"} // Replace with actual user profile image URL
                  alt="Icon"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="ml-2">{user.user}</span>
              </button>
              {isOpen && (
                <div className="absolute right-6 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
                  <ul className="flex flex-col divide-y divide-gray-700">
                    <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                      Profile
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
