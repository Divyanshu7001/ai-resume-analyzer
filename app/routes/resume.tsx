import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/feedback/ATS";
import Details from "~/components/feedback/Details";
import Summary from "~/components/feedback/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "Resumind | Review" },
    {
      name: "description",
      content: "Detailed review of your resume",
    },
  ];
};

const resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();

  const [imageurl, setImageUrl] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) {
        console.error("Resume not found");
        return;
      }
      const data = JSON.parse(resume);
      console.log("Resume Data:", data);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) {
        console.error("Failed to read resume file");
        return;
      }

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) {
        console.error("Failed to read image file");
        return;
      }
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      const loadedFeedbackData = await kv.get(`feedback:${id}`);
      const feedbackData = loadedFeedbackData
        ? JSON.parse(loadedFeedbackData)
        : null;

      setFeedback(feedbackData.feedback);
      console.log(resumeUrl, imageurl, "feedback:", feedbackData);
    };
    loadResume();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to={"/"} className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageurl && resumeUrl && (
            <div className="animate-in fade-in gradiant-border duration-1000 max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageurl}
                  alt=""
                  className="h-full w-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl text-black font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" alt="" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
};

export default resume;
