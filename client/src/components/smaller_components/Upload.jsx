import React, { useState } from "react";
import AWS from "aws-sdk";
import axios from "../../requests/axios";

const Upload = () => {
  // Create state to store file and file name
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Function to upload file to S3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "flashify";

    // S3 Region
    const REGION = "us-east-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: "AKIASXENGQHXR3FUUYHK",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Check if a file is selected
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    // File Parameters
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    // Uploading file to S3
    let upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();
    
    const handleNameUpload = async () =>{
      try{
        console.log(fileName);
        const apiUrl = "/file";
        const requestData= {
          filename: fileName
        };
        const response = await axios.post(apiUrl, requestData);
        console.log(response);
      }
      catch (error) {
        console.error("Error:", error);
      }

    }

    try {
      await upload;
      // File successfully uploaded
      alert("File uploaded successfully.");
      handleNameUpload();
    } catch (error) {
      console.error(error);
      alert("Error uploading the file. Please check your S3 configuration.");
    }
  };

  // Function to handle file and store it in the file state
  const handleFileChange = (e) => {
    // Uploaded file
    const selectedFile = e.target.files[0];
    // Changing the file state
    setFile(selectedFile);

    // Set the file name in the state
    setFileName(selectedFile.name);
  };

  return (
    <div>
      <div className="bg-primary-background h-[80vh] w-screen flex items-center justify-center">
        <div className="max-w-lg w-4/5 max-h-lg bg-secondary-light p-8 rounded-lg shadow-lg">
          <div className="mr-4 ml-4">
            <div className="mb-10 mt-12">
              <label
                htmlFor="postContent"
                className="block text-primary-dark bg-secondary-light text-sm font-bold mb-2"
              >
                Title:
              </label>
              <textarea
                id="postContent"
                name="postContent"
                rows="1"
                className="w-full border-2 border-secondary-main rounded-md pt-4 pb-4 px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                sm:leading-5 resize-none focus:outline-none focus:border-primary-main bg-secondary-light"
                placeholder=""
              ></textarea>
            </div>

            <div className="mb-10">
              <label
                htmlFor="fileAttachment"
                className="block text-primary-dark text-sm font-bold mb-2"
              >
                Photo:
              </label>
              <div className="relative border-2 border-secondary-main rounded-md px-4 py-3 bg-secondary-light flex items-center justify-between hover:border-primary-main transition duration-150 ease-in-out">
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="fileAttachment"
                  name="fileAttachment"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <span className="ml-2 text-sm text-gray-600">
                    Upload Your Notes Here
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {fileName && <span>Selected file: {fileName}</span>}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-12">
              <button
                onClick={uploadFile}
                type="submit"
                className="flex justify-center items-center bg-primary-light hover:bg-primary-dark focus:outline-none focus:shadow-outline-blue text-primary-background py-2 px-4 rounded-md transition duration-300 gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out "
              >
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
                  <path
                    d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
                  ></path>
                </svg>
              </button>
              <span className="text-gray-500 text-sm"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
