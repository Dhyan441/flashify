import React, { useState } from "react";
import AWS from "aws-sdk";

function S3() {
  // Create state to store file
  const [file, setFile] = useState(null);

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
    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    try {
      await upload;
      // File successfully uploaded
      alert("File uploaded successfully.");
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
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default S3;
