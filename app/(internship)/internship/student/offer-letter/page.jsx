import { getMyApplications } from "@/actions/internship-student";
import { getMyOfferLetterPdf } from "@/actions/offer-letter";
import { Download, FileText, Linkedin } from "lucide-react";

export default async function OfferLetterPage({ searchParams }) {
  const awaitedParams = await searchParams;
  const apps = await getMyApplications();
  const appId = awaitedParams?.appId;

  // If no specific app ID, find the first selected one with an offer letter
  const app = appId
    ? apps.find((a) => a.id === appId)
    : apps.find((a) => a.status === "SELECTED" && a.offerLetter);

  if (!app || !app.offerLetter) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Offer Letters</h1>
        </div>
        <div className="text-center py-16 bg-white border border-slate-200 shadow-sm rounded-xl">
          <FileText className="h-8 w-8 mx-auto mb-3 text-slate-400" />
          <p className="text-slate-500 text-sm">No offer letters available yet.</p>
        </div>
      </div>
    );
  }

  // Fetch the full pdfUrl only on this dedicated page (avoids loading large base64 in list queries)
  const offerPdf = await getMyOfferLetterPdf(app.id);
  const pdfUrl = offerPdf?.pdfUrl || null;
  const offer = app.offerLetter;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Internship Offer Letter</h1>
        <p className="text-slate-500 text-sm mt-0.5">Congratulations on your selection!</p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <FileText className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">Offer of Internship</h2>
        <p className="text-slate-600 text-sm mb-6">
          We are pleased to offer you an internship position at{" "}
          <strong className="text-slate-900">TechieHelp Institute of AI</strong> for the{" "}
          <strong className="text-slate-900">{app.batch?.program?.title}</strong> program.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-3 mb-8">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-xs text-slate-500 font-medium">Program</span>
            <span className="text-xs font-bold text-slate-900">{app.batch?.program?.title}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-xs text-slate-500 font-medium">Batch</span>
            <span className="text-xs font-bold text-slate-900">{app.batch?.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-xs text-slate-500 font-medium">Duration</span>
            <span className="text-xs font-bold text-slate-900">
              {app.batch?.program?.duration} Weeks
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-xs text-slate-500 font-medium">Stipend</span>
            <span className="text-xs font-bold text-green-600">
              {app.batch?.program?.stipend
                ? `₹${app.batch.program.stipend}/month`
                : "Unpaid"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500 font-medium">Issued Date</span>
            <span className="text-xs font-bold text-slate-900">
              {new Date(offer.generatedAt).toLocaleDateString("en-IN")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center mt-6">
          {pdfUrl ? (
            <>
              <a
                href={pdfUrl}
                download={`TechieHelp-OfferLetter-${
                  app.user?.name ? app.user.name.replace(/\s+/g, "_") : "Student"
                }.pdf`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-8 py-3.5 bg-white text-slate-900 rounded-xl hover:bg-slate-50 transition-all shadow-sm border border-slate-200"
              >
                <Download className="h-4 w-4 text-slate-500" /> Download Offer Letter
              </a>
              <a
                href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
                  `I am thrilled to announce my selection as a ${
                    app.batch?.program?.title || "Intern"
                  } at TechieHelp Institute of AI! 🚀\n\nLooking forward to this amazing opportunity to learn, innovate, and grow my career.\n\n#Internship #AI #CareerGrowth #TechieHelpInstituteofAI`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-8 py-3.5 bg-[#0A66C2] text-white rounded-xl hover:bg-[#004182] transition-all shadow-md mt-2"
              >
                <Linkedin className="h-4 w-4" /> Share on LinkedIn
              </a>
              <p className="text-xs text-slate-500 mt-2 text-center max-w-sm">
                Don&apos;t forget to attach your downloaded Offer Letter PDF when posting on LinkedIn!
              </p>
            </>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 bg-slate-100 text-slate-400 rounded-xl cursor-not-allowed border border-slate-200"
            >
              PDF Generating...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
