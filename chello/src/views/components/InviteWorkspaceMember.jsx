import { useState } from "react";
import { createNotificationWorkspace } from "../../controller/NotificationController";
export const InviteWorkspaceMember = (
  UserID,
  WorkspaceID,
  WorkspaceName,
  AdminName
) => {
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) =>
        createNotificationWorkspace(
          e,
          UserID,
          WorkspaceID,
          WorkspaceName,
          AdminName,
          email
        )
      }
      autoComplete="off"
    >
      <div>
        <label
          htmlFor="email-address-icon"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your Email
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
          </div>
          <input
            type="text"
            id="email-address-icon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
          value="Invite"
        />
      </div>
    </form>
  );
};
