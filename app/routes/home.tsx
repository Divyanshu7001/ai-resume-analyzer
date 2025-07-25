import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { fixedResumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Footer from "~/components/Footer";
import type { T } from "node_modules/react-router/dist/development/index-react-server-client-CUidsuu_.mjs";
import Testimonials from "~/components/Testimonials";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ANALIZER" },
    {
      name: "description",
      content: "Smart analyzer and feebacks for your resume",
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setIsLoadingResumes(true);
      const allResumes = (await kv.list("resume:*", true)) as KVItem[];
      if (!allResumes) {
        console.error("Failed to load resumes");
        setIsLoadingResumes(false);
        return;
      }
      const parsedResumes = allResumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );
      setResumes(parsedResumes || []);
      setIsLoadingResumes(false);
    };
    loadResumes();
  }, [kv]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-8">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Get insights and improve your resume like never before</h2>
        </div>
        {isLoadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" alt="" className="w-[200px]" />
          </div>
        )}
        {fixedResumes.length > 0 && (
          <section className="resumes-section">
            {fixedResumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </section>
        )}
        <h1 className="mt-6">Your Recent Searches</h1>
        {!isLoadingResumes && resumes.length === 0 ? (
          <>
            <h2>No Resumes Found. Upload your first resume to get feedback</h2>
            <div className="flex flex-col items-center justify-center mt-5 gap-4">
              <Link
                to="/upload"
                className="primary-button w-fit text-lg font-semibold"
              >
                Upload Your first Resume
              </Link>
            </div>
          </>
        ) : (
          <h2 className="text-center">
            Review your submissions and get AI-powered Feedback
          </h2>
        )}
        {!isLoadingResumes && resumes.length > 0 && (
          <section className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </section>
        )}
      </section>
      <Testimonials />
      <Footer />
    </main>
  );
}
