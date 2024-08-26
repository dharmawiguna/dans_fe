import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo-dharma-dans.png";
import "flowbite";
import { UsersIcon } from "@heroicons/react/16/solid";

export const Navbar = () => {
  const navigate = useNavigate();
  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("user");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log("Logout failed", error);
        });
    }
  };

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <a href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-gray-500">
                    <img src={logo} alt="logo" width={200} />
                  </span>
                </a>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>
              </div>
            </>
          )}
        </Disclosure>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <button
            id="dropdownInformationButton"
            data-dropdown-toggle="dropdownInformation"
            className="text-gray-500 bg-transparent focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            <UsersIcon className="h-4 w-4 text-gray-500 mr-2" /> {getUser.name}{" "}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdownInformation"
            className="z-10 hidden bg-white divide-y divide-gray-200 rounded-lg shadow w-44 focus:bg-gray-700 focus:divide-gray-600"
          >
            <div className="px-4 py-3 text-sm text-gray-900">
              <div className="font-medium truncate"> {getUser.email}</div>
            </div>
            <div className="py-2 cursor-pointer" onClick={handleLogout}>
              <div className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-500">
                Sign out
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
