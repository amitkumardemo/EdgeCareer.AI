const fs = require('fs');
const path = require('path');

// Large internship component files to upgrade
const largeFiles = [
  'FrontendInternship.jsx',
  'MachineLearning.jsx',
  'python.jsx',
  'MERN.jsx',
  'FullStackInternship.jsx',
  'DataScience.jsx',
  'CyberSecurity.jsx',
  'DevOpsInternship.jsx',
  'aiinternship.jsx',
  'aimlinternship.jsx',
  'androiddevelopment.jsx',
  'seo.jsx',
  'uiux.jsx',
];

// CSS class upgrades — map old classes to new professional classes
const classReplacements = [
  // Loading spinner upgrade
  { 
    from: `<div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-slate-200"></div>
  </div>`,
    to: `<div className="flex justify-center items-center min-h-screen bg-white">
    <div className="relative text-center">
      <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-indigo-600 font-semibold text-sm">Loading...</p>
    </div>
  </div>`
  },
  // Root div upgrades
  {
    from: 'className="bg-[#F8FAFC] min-h-screen text-slate-900"',
    to: 'className="et-root bg-white min-h-screen text-slate-900"',
  },
  // Hero section upgrade - add bg gradient
  {
    from: 'className="relative pt-32 pb-24 px-6 bg-gradient-to-b from-indigo-50/50 via-white to-white border-b border-indigo-100/30 text-slate-900"',
    to: 'className="relative pt-32 pb-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-indigo-100/30 text-slate-900 overflow-hidden"',
  },
  // Section background upgrades
  {
    from: 'className="bg-white py-16 px-6 md:px-12"',
    to: 'className="bg-white py-20 px-6 md:px-12"',
  },
  {
    from: 'className="bg-gray-50 py-20 px-6 md:px-12"',
    to: 'className="bg-slate-50 py-20 px-6 md:px-12"',
  },
  // Heading upgrades - h2 in sections
  {
    from: 'className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"',
    to: 'className="text-3xl md:text-4xl font-black text-slate-900 mb-4"',
  },
  {
    from: 'className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"',
    to: 'className="text-4xl md:text-5xl font-black text-slate-900 mb-6"',
  },
  // Card upgrades
  {
    from: 'className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4"',
    to: 'className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-start space-x-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"',
  },
  {
    from: 'className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 cursor-pointer group"',
    to: 'className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"',
  },
  {
    from: 'className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group"',
    to: 'className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"',
  },
  {
    from: 'className="bg-white rounded-2xl shadow-lg p-8 mb-16"',
    to: 'className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-16"',
  },
  // Career outcomes strip - upgrade gradient
  {
    from: 'className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-8 rounded-2xl shadow-xl"',
    to: 'className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-14 px-8 rounded-3xl shadow-2xl shadow-indigo-200"',
  },
  // Icon boxes
  {
    from: 'className="bg-blue-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-blue-100 rounded-xl p-3 flex-shrink-0"',
  },
  {
    from: 'className="bg-green-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-green-100 rounded-xl p-3 flex-shrink-0"',
  },
  {
    from: 'className="bg-purple-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-purple-100 rounded-xl p-3 flex-shrink-0"',
  },
  {
    from: 'className="bg-indigo-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-indigo-100 rounded-xl p-3 flex-shrink-0"',
  },
  {
    from: 'className="bg-orange-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-orange-100 rounded-xl p-3 flex-shrink-0"',
  },
  {
    from: 'className="bg-teal-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-teal-100 rounded-xl p-3 flex-shrink-0"',
  },
  {
    from: 'className="bg-pink-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-pink-100 rounded-xl p-3 flex-shrink-0"',
  },
  {
    from: 'className="bg-yellow-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-yellow-100 rounded-xl p-3 flex-shrink-0"',
  },
  {
    from: 'className="bg-red-100 rounded-full p-3 flex-shrink-0"',
    to: 'className="bg-red-100 rounded-xl p-3 flex-shrink-0"',
  },
  // Duration cards icon boxes
  {
    from: 'className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors"',
    to: 'className="bg-blue-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"',
  },
  {
    from: 'className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors"',
    to: 'className="bg-green-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"',
  },
  {
    from: 'className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors"',
    to: 'className="bg-purple-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"',
  },
  {
    from: 'className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors"',
    to: 'className="bg-orange-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"',
  },
  // Trust section icon boxes (non-group)
  {
    from: 'className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"',
    to: 'className="bg-blue-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4"',
  },
  {
    from: 'className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"',
    to: 'className="bg-green-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4"',
  },
  {
    from: 'className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"',
    to: 'className="bg-purple-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4"',
  },
  {
    from: 'className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"',
    to: 'className="bg-orange-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4"',
  },
  // Button upgrades
  {
    from: 'className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition duration-300 shadow-md"',
    to: 'className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"',
  },
  {
    from: 'className="border border-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm transition duration-300 hover:bg-white hover:text-blue-900 flex items-center gap-2"',
    to: 'className="border-2 border-indigo-200 text-indigo-700 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:bg-indigo-50 flex items-center gap-2"',
  },
  // Marquee section upgrade
  {
    from: 'className="w-full bg-slate-50 py-4 border-t border-b border-slate-200 overflow-hidden"',
    to: 'className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 py-4 overflow-hidden"',
  },
  {
    from: 'className="bg-slate-200 rounded-full px-4 py-2 text-sm font-medium border border-slate-300 text-slate-800"',
    to: 'className="bg-white/15 backdrop-blur-sm border border-white/25 text-white rounded-full px-5 py-2 text-sm font-semibold whitespace-nowrap"',
  },
  // Stats card upgrades in hero
  {
    from: 'className="bg-blue-100 rounded-lg p-6 text-center"',
    to: 'className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-6 text-center shadow-md"',
  },
  {
    from: 'className="text-3xl font-bold text-blue-900 mb-2"',
    to: 'className="text-3xl font-black text-white mb-2"',
  },
  {
    from: 'className="text-sm text-blue-700"',
    to: 'className="text-sm text-white/90"',
  },
  {
    from: 'className="bg-green-100 rounded-lg p-6 text-center"',
    to: 'className="bg-gradient-to-br from-emerald-500 to-green-700 text-white rounded-2xl p-6 text-center shadow-md"',
  },
  {
    from: 'className="text-3xl font-bold text-green-900 mb-2"',
    to: 'className="text-3xl font-black text-white mb-2"',
  },
  {
    from: 'className="text-sm text-green-700"',
    to: 'className="text-sm text-white/90"',
  },
  {
    from: 'className="bg-indigo-100 rounded-lg p-6 text-center"',
    to: 'className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl p-6 text-center shadow-md"',
  },
  {
    from: 'className="text-3xl font-bold text-indigo-900 mb-2"',
    to: 'className="text-3xl font-black text-white mb-2"',
  },
  {
    from: 'className="text-sm text-indigo-700"',
    to: 'className="text-sm text-white/90"',
  },
  {
    from: 'className="bg-yellow-100 rounded-lg p-6 text-center"',
    to: 'className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 text-center shadow-md"',
  },
  {
    from: 'className="text-3xl font-bold text-yellow-900 mb-2"',
    to: 'className="text-3xl font-black text-white mb-2"',
  },
  {
    from: 'className="text-sm text-yellow-700"',
    to: 'className="text-sm text-white/90"',
  },
  // Hero stats card container
  {
    from: 'className="bg-white rounded-xl shadow-2xl p-8"',
    to: 'className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-indigo-100 p-8"',
  },
  // Tab styles
  {
    from: 'className="px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 border-indigo-600 bg-indigo-600 text-white shadow"',
    to: 'className="px-5 py-2 rounded-full text-sm font-bold border-2 transition-all duration-200 border-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"',
  },
  {
    from: 'className="px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600"',
    to: 'className="px-5 py-2 rounded-full text-sm font-bold border-2 transition-all duration-200 border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 bg-white"',
  },
  // Enroll button in hero card
  {
    from: 'className="btn-primary"',
    to: 'className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all block text-center"',
  },
  // Section badge/label upgrade
  {
    from: 'className="inline-block bg-yellow-500 text-black px-5 py-1 rounded-full text-xs font-medium mb-1"',
    to: 'className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wide"',
  },
  // Mode pills upgrade
  {
    from: 'className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"',
    to: 'className="bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"',
  },
  {
    from: 'className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"',
    to: 'className="bg-white border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"',
  },
  {
    from: 'className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium"',
    to: 'className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"',
  },
  {
    from: 'className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium"',
    to: 'className="bg-white border border-orange-200 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"',
  },
  {
    from: 'className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium"',
    to: 'className="bg-white border border-red-200 text-red-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"',
  },
  {
    from: 'className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium"',
    to: 'className="bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"',
  },
];

let totalReplacements = 0;

largeFiles.forEach(filename => {
  const filePath = path.join(__dirname, 'components', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped (not found): ${filename}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;
  
  classReplacements.forEach(({ from, to }) => {
    const count = (content.split(from).length - 1);
    if (count > 0) {
      content = content.split(from).join(to);
      fileReplacements += count;
    }
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${filename}: ${fileReplacements} replacements`);
  totalReplacements += fileReplacements;
});

console.log(`\n🎉 Total replacements across all large files: ${totalReplacements}`);
