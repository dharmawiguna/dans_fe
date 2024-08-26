import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logoBrand from "../../img/brand-logo.png";
import { Container } from "../Container";

export default function JobList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dev6.dansmultipro.com/api/recruitment/positions.json?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData((prev) => [...prev, ...result]);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 5000);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const queryParams = new URLSearchParams({
        description: data.description,
        location: data.location,
        full_time: data.full_time ?? "false",
      }).toString();

      const response = await axios.get(
        `https://dev6.dansmultipro.com/api/recruitment/positions.json?${queryParams}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-4">Filter Jobs</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap gap-6"
          >
            <div className="flex-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <input
                type="text"
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                {...register("location")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Full Time:
              </label>
              <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="true"
                    {...register("full_time")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="false"
                    {...register("full_time")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Filter
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="ml-2 px-4 py-2 bg-gray-500 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </Container>

      <Container>{error && <span>{error?.message}</span>}</Container>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {data.map((item, index) => (
            <div key={index}>
              <JobCard job={item} />
            </div>
          ))}
        </div>
      </Container>
      <Container>
        <div className="flex items-center justify-center">
          {loading ? <Loading /> : ""}
        </div>
      </Container>
    </>
  );
}

function Loading() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-100 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function JobCard({ job }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedDescription = isExpanded
    ? job?.description
    : job?.description.substring(0, 300) +
      (job?.description.length > 300 ? "..." : "");

  return (
    <div
      className="max-w-lg w-full bg-white rounded-lg overflow-hidden border border-gray-100 shadow-2xl"
      key={job?.id}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logoBrand}
              alt="Company Logo"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {job?.company}
              </h2>
              <p className="text-sm text-gray-500">
                <a
                  href={job?.company_url ? job?.company_url : "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-500"
                >
                  {job?.company_url ?? "-"}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-medium text-gray-800">{job?.title}</h3>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span className="mr-3 flex items-center">
              <ClockIcon className="h-4 w-4 text-gray-500" /> {job?.type}
            </span>

            <span className="mr-3 flex items-center">
              <MapPinIcon className="h-4 w-4 text-gray-500" /> {job?.location}
            </span>
            <span className="flex items-center">
              <CalendarDaysIcon className="h-4 w-4 text-gray-500" />
              <span className="mr-3">
                {moment(job?.created_at).format("ddd, DD MMM YYYY")}
              </span>
            </span>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">
              <div dangerouslySetInnerHTML={{ __html: displayedDescription }} />
            </span>
          </div>
          {job?.description.length > 300 && (
            <button
              onClick={toggleDescription}
              className="mt-2 text-indigo-500 text-sm font-medium"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
          <div className="mt-4 ">
            <span className="text-sm text-indigo-500 font-medium">
              How To Apply :{" "}
            </span>
            <div>
              <span className="text-sm text-gray-500">
                <div
                  className="hover:text-indigo-500"
                  dangerouslySetInnerHTML={{ __html: job?.how_to_apply }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
