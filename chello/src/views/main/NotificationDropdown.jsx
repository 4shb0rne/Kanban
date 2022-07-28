import { GetNotification } from "../../controller/NotificationController";
import { useEffect, useState } from "react";
import {
  AcceptInvitationWorkspace,
  DeclineInvitation,
  AcceptInvitationBoard,
} from "../../controller/InvitationController";
export const NotificationDropdown = ({ UserID }) => {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    fetch_notif();
  }, []);
  const fetch_notif = async () => {
    let notifications = await GetNotification(UserID);
    setNotification(notifications);
  };
  return (
    <div className="flex justify-center">
      <div>
        <div className="dropdown relative">
          <button
            className="
          dropdown-toggle
          text-white
          text-xs
          leading-tight
          rounded
          shadow-md
          flex
          items-center
          whitespace-nowrap
          mt-1
        "
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Notifications
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              className="w-2 ml-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              ></path>
            </svg>
          </button>
          <ul
            className="
          dropdown-menu
          min-w-max
          absolute
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
            aria-labelledby="dropdownMenuButton1"
          >
            {notification.length == 0 && (
              <li>
                <a
                  className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                  href="#"
                >
                  No Notifications
                </a>
              </li>
            )}
            {notification.map((n) => {
              if (n.Type == "Workspace") {
                return (
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                    >
                      User <span className="text-blue-600">{n.Sender}</span>{" "}
                      sent you a invitation to{" "}
                      <span className="text-blue-600">{n.WorkspaceName}</span>
                    </a>
                    <button
                      className="m-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={async () => {
                        await AcceptInvitationBoard(
                          n.id,
                          n.WorkspaceID,
                          n.BoardID,
                          UserID
                        );
                        fetch_notif();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="m-3 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={async () => {
                        await DeclineInvitation(n.id, UserID);
                        fetch_notif();
                      }}
                    >
                      Decline
                    </button>
                  </li>
                );
              } else {
                return (
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                    >
                      User <span className="text-blue-600">{n.Sender}</span>{" "}
                      sent you a invitation to{" "}
                      <span className="text-blue-600">{n.BoardName}</span>
                    </a>
                    <button
                      className="m-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={async () => {
                        await AcceptInvitationWorkspace(
                          n.id,
                          n.WorkspaceID,
                          UserID
                        );
                        fetch_notif();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="m-3 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={async () => {
                        await DeclineInvitation(n.id, UserID);
                        fetch_notif();
                      }}
                    >
                      Decline
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
