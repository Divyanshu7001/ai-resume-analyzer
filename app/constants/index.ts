export const fixedResumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "./images/resume-1.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "./images/resume-2.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "./images/resume-3.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  // {
  //   id: "4",
  //   companyName: "Google",
  //   jobTitle: "Frontend Developer",
  //   imagePath: "./images/resume-1.png",
  //   resumePath: "/resumes/resume-1.pdf",
  //   feedback: {
  //     overallScore: 85,
  //     ATS: {
  //       score: 90,
  //       tips: [],
  //     },
  //     toneAndStyle: {
  //       score: 90,
  //       tips: [],
  //     },
  //     content: {
  //       score: 90,
  //       tips: [],
  //     },
  //     structure: {
  //       score: 90,
  //       tips: [],
  //     },
  //     skills: {
  //       score: 90,
  //       tips: [],
  //     },
  //   },
  // },
  // {
  //   id: "5",
  //   companyName: "Microsoft",
  //   jobTitle: "Cloud Engineer",
  //   imagePath: "./images/resume-2.png",
  //   resumePath: "/resumes/resume-2.pdf",
  //   feedback: {
  //     overallScore: 55,
  //     ATS: {
  //       score: 90,
  //       tips: [],
  //     },
  //     toneAndStyle: {
  //       score: 90,
  //       tips: [],
  //     },
  //     content: {
  //       score: 90,
  //       tips: [],
  //     },
  //     structure: {
  //       score: 90,
  //       tips: [],
  //     },
  //     skills: {
  //       score: 90,
  //       tips: [],
  //     },
  //   },
  // },
  // {
  //   id: "6",
  //   companyName: "Apple",
  //   jobTitle: "iOS Developer",
  //   imagePath: "./images/resume-3.png",
  //   resumePath: "/resumes/resume-3.pdf",
  //   feedback: {
  //     overallScore: 75,
  //     ATS: {
  //       score: 90,
  //       tips: [],
  //     },
  //     toneAndStyle: {
  //       score: 90,
  //       tips: [],
  //     },
  //     content: {
  //       score: 90,
  //       tips: [],
  //     },
  //     structure: {
  //       score: 90,
  //       tips: [],
  //     },
  //     skills: {
  //       score: 90,
  //       tips: [],
  //     },
  //   },
  // },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;

export const testimonials = [
  {
    quote:
      "Thanks to Analizer, I landed my dream role at AlphaStream Technologies. It pinpointed the weak areas in my resume and helped tailor it precisely for the position. Within two weeks of applying, I had three interview calls—and one job offer!",
    name: "Adrian Johnson",
    title: "System Engineer at AlphaStream Technologies",
  },
  {
    quote:
      "Analizer completely transformed my job search. After using it to optimize my resume for a software development role, I received an interview invite the same week. The recruiter even complimented how well my skills matched the role.",
    name: "Michael Williams",
    title: "SDE at AlphaStream Technologies",
  },
  {
    quote:
      "I had been applying for months with no luck. Analizer revealed several gaps in my resume alignment with job descriptions. After implementing its suggestions, I secured an offer at Alpha Technologies in just under a month.",
    name: "Sam Smith",
    title: "Director at Alpha Technologies",
  },
  {
    quote:
      "Analizer gave me insights no career coach ever did. It matched my strengths to the right keywords and improved how my resume was interpreted by applicant tracking systems. That’s how I got into Stream Technologies as a director.",
    name: "Andrew Brown",
    title: "Director at Stream Technologies",
  },
  {
    quote:
      "I used Analizer before applying for a senior role, and the improvements it suggested were spot on. I got multiple callbacks, and eventually a fantastic offer from AlphaStream Technologies. I recommend it to every job seeker I know.",
    name: "Michael Johnson",
    title: "Director at AlphaStream Technologies",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "./icons/git.svg",
    link: "https://github.com/Divyanshu7001",
  },
  {
    id: 2,
    img: "./icons/twit.svg",
    link: "",
  },
  {
    id: 3,
    img: "./icons/link.svg",
    link: "",
  },
];
