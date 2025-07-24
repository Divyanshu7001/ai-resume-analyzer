import { useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../constants/index";

const upload = () => {
  const { auth, isLoading, fs, kv, ai } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState(
    "Upload your resume to get started"
  );
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File | null;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading your resume...");

    const uploadedFile = await fs.upload([file as File]);
    if (!uploadedFile) {
      setIsProcessing(false);
      setStatusText("Failed to upload the resume file.");
      return;
    }
    setStatusText("Converting into image...");

    const imageFile = await convertPdfToImage(file as File);

    if (!imageFile.file) {
      return setStatusText("Failed to convert PDF to image.");
    }

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      setIsProcessing(false);
      setStatusText("Failed to upload the image.");
      return;
    }

    setStatusText("Preparing your analysis...");

    const uuid = generateUUID();

    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing your resume...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({
        jobTitle,
        jobDescription,
      })
    );
    if (!feedback) {
      setIsProcessing(false);
      setStatusText("Error: Failed to analyze the resume.");
      return;
    }

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);

    await kv.set(`feedback:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete! Redirecting...");
    console.log(data);

    navigate(`/resume/${uuid}`, { replace: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    if (!file) {
      setStatusText("Please upload a resume file.");
      return;
    }
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    // console.log({
    //   companyName,
    //   jobTitle,
    //   jobDescription,
    //   file,
    // });

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className='bg-[url("/images/bg-main.svg")] bg-cover'>
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Upload Your Resume</h1>
          <h2>Smart feedback system for your resume</h2>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="./images/resume-scan.gif" alt="" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score & improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              onSubmit={handleSubmit}
              id="upload-form"
              className="flex flex-col gap-4 mt-8"
              action=""
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  id="company-name"
                  name="company-name"
                  placeholder="Company Name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  id="job-title"
                  name="job-title"
                  placeholder="Job Title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  id="job-description"
                  name="job-description"
                  placeholder="Job Description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Your Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button type="submit" className="primary-button">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
