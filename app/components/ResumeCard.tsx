import React, { useEffect } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";
import resume from "~/routes/resume";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = React.useState<string>("");
  useEffect(() => {
    const loadResumes = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) {
        console.error("Failed to read resume image file");
        return;
      }
      let imageUrl = URL.createObjectURL(blob);
      setResumeUrl(imageUrl);
    };
    loadResumes();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className="text-black font-bold break-words">{companyName}</h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="!text-black font-bold">Resume</h2>
          )}
        </div>
        <div className="flex shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {(imagePath || resumeUrl) && (
        <div className="gradiant-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            {resumeUrl ? (
              <img
                src={resumeUrl}
                alt="my resume"
                className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
              />
            ) : (
              <img
                src={imagePath}
                alt="fixed resume"
                className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
              />
            )}
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
