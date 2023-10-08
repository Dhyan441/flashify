import React from "react";

const Upload = () => {
  return (
    <div>
      <div class="bg-primary-background h-[80vh] w-screen flex items-center justify-center">
        <div class="max-w-lg w-4/5 max-h-lg bg-white p-8 rounded-lg shadow-lg">
          <div className="mr-4 ml-4">
            <div class="mb-10 mt-12">
              <label
                for="postContent"
                class="block text-primary-dark text-sm font-bold mb-2"
              >
                Title:
              </label>
              <textarea
                id="postContent"
                name="postContent"
                rows="1"
                class="w-full border-2 rounded-md pt-4 pb-4 px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                sm:leading-5 resize-none focus:outline-none focus:border-primary-main"
                placeholder=""
              ></textarea>
            </div>

            <div class="mb-10">
              <label
                for="fileAttachment"
                class="block text-primary-dark text-sm font-bold mb-2"
              >
                Photo:
              </label>
              <div class="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-primary-main transition duration-150 ease-in-out">
                <input
                  type="file"
                  id="fileAttachment"
                  name="fileAttachment"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <span class="ml-2 text-sm text-gray-600">
                    Upload Your Notes Here
                  </span>
                </div>
                <span class="text-sm text-gray-500"></span>
              </div>
            </div>
            <div class="flex items-center justify-between mb-12">
              <button
                type="submit"
                class="flex justify-center items-center bg-primary-main hover:bg-primary-dark focus:outline-none focus:shadow-outline-blue text-primary-background py-2 px-4 rounded-md transition duration-300 gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out "
              >
                {" "}
                Create Deck{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  id="send"
                  fill="#fff"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                </svg>
              </button>
              <span class="text-gray-500 text-sm"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
