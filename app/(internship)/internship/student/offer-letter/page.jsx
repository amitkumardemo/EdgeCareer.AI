import { getMyApplications } from "@/actions/internship-student";
import { Download, FileText } from "lucide-react";

export default async function OfferLetterPage({ searchParams }) {
  const apps = await getMyApplications();
  const appId = searchParams?.appId;
  
  // If no specific app ID, find the first selected one with an offer letter
  const app = appId 
    ? apps.find(a => a.id === appId)
    : apps.find(a => a.status === "SELECTED" && a.offerLetter);

  if (!app || !app.offerLetter) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Offer Letters</h1>
        </div>
        <div className="text-center py-16 bg-white/3 border border-white/8 rounded-xl">
          <FileText className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-gray-500 text-sm">No offer letters available yet.</p>
        </div>
      </div>
    );
  }

  const offer = app.offerLetter;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Internship Offer Letter</h1>
        <p className="text-gray-500 text-sm mt-0.5">Congratulations on your selection!</p>
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">Offer of Internship</h2>
        <p className="text-gray-400 text-sm mb-6">
          We are pleased to offer you an internship position at <strong className="text-white">TechieHelp Institute of AI</strong> for the <strong className="text-white">{app.batch?.program?.title}</strong> program.
        </p>
        
        <div className="bg-black/30 rounded-xl p-5 text-left space-y-3 mb-8">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-xs text-gray-500">Program</span>
            <span className="text-xs font-semibold text-white">{app.batch?.program?.title}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-xs text-gray-500">Batch</span>
            <span className="text-xs font-semibold text-white">{app.batch?.name}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-xs text-gray-500">Duration</span>
            <span className="text-xs font-semibold text-white">{app.batch?.program?.duration} Weeks</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-xs text-gray-500">Stipend</span>
            <span className="text-xs font-semibold text-white text-green-400">{app.batch?.program?.stipend ? `₹${app.batch.program.stipend}/month` : "Unpaid"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Issued Date</span>
            <span className="text-xs font-semibold text-white">{new Date(offer.generatedAt).toLocaleDateString("en-IN")}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {offer.pdfUrl ? (
            <a href={offer.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all">
              <Download className="h-4 w-4" /> Download Official PDF
            </a>
          ) : (
            <button disabled className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 bg-white/10 text-gray-500 rounded-xl cursor-not-allowed">
              PDF Generating...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
