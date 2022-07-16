import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase-config";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useUpdateEmail } from "react-firebase-hooks/auth";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import { ValidateRegister } from "../../controller/UserController";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const [user] = useAuthState(auth);
  const [errorData, setErrorData] = useState("");
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");

  const [updateEmail, updatingEmail, errorUpdateEmail] = useUpdateEmail(auth);
  const [updatePassword, updatingPassword, errorUpdatePassword] =
    useUpdatePassword(auth);
  const [updateProfile, updatingProfile, errorProfile] = useUpdateProfile(auth);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs flex mt-20">
        <div className="bg-white shadow-md rounded p-10 mb-4">
          <div className="text-2xl mb-10 font-bold">Edit Profile</div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
              type="text"
              placeholder="Username"
              defaultValue={user.displayName}
              onChange={(e) => setProfile(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="text"
              placeholder="Email"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-red-600">{errorData && errorData}</div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={async () => {
                let messages = ValidateRegister(profile, email, password);
                if (Object.keys(messages).length == 0) {
                  try {
                    await updateEmail(email);
                    await updateProfile({ profile });
                    await updatePassword(password);
                  } catch (e) {
                    console.log(e.message);
                    setErrorData(e.message);
                  }
                }
              }}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
