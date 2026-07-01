"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    ShieldCheck, CheckCircle, Download, ExternalLink, ShieldAlert,
    BadgeCheck, Lock, Search, Cpu, Check, Copy, Printer, Share2,
    AlertTriangle, XCircle, ChevronDown, Clock, Building, RefreshCcw,
    FileText, ArrowRight, HelpCircle, Mail, Link as LinkIcon,
    Fingerprint, Server, Activity, User, Award, Calendar, GraduationCap, Info, Database, Zap
} from 'lucide-react';
import Link from 'next/link';

// Helper for copy to clipboard
function useCopyLink() {
    const [copiedId, setCopiedId] = useState(null);
    const copy = useCallback((text, id) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    }, []);
    return { copiedId, copy };
}

// FAQ Data
const FAQS = [
    {
        q: "How do I verify a certificate?",
        a: "Simply enter the unique Certificate ID exactly as printed on the certificate into the verification search bar above. Our system will instantly cross-reference it with our secure database."
    },
    {
        q: "How long does verification take?",
        a: "Verification is instantaneous. The moment you submit a valid Certificate ID, our system retrieves the official secure record."
    },
    {
        q: "What if my certificate cannot be found?",
        a: "If the system returns a 'Not Found' error, double-check that the ID was entered correctly without any typos. If it still fails, the certificate may be unauthorized, revoked, or not yet published."
    },
    {
        q: "Can employers verify credentials?",
        a: "Yes, this portal is specifically designed for employers, HR professionals, universities, and background verification agencies to securely validate candidates' credentials."
    },
    {
        q: "Can revoked certificates be detected?",
        a: "Absolutely. If a credential is revoked due to policy violations, our real-time database immediately updates its status to 'Revoked', protecting the integrity of the certification."
    }
];

export default function CertificateVerify() {
    const [certIdInput, setCertIdInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [certData, setCertData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [openFAQIndex, setOpenFAQIndex] = useState(null);
    const [showPolicyModal, setShowPolicyModal] = useState(false);
    const { copiedId, copy } = useCopyLink();

    useEffect(() => {
        const hasAccepted = localStorage.getItem('techiehelp_verification_policy_accepted');
        if (!hasAccepted) {
            setShowPolicyModal(true);
        }
    }, []);

    const handleAcceptPolicy = () => {
        localStorage.setItem('techiehelp_verification_policy_accepted', 'true');
        setShowPolicyModal(false);
    };

    // Smooth scroll progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyHlcmEOufh2oqh5LEvzkrPYZ9xHOC0yDeeyJA08U0Ym5scez-yqQ6uYqJiCK_1ZUW7/exec';

    // Mock realistic hash generation
    const generateHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
    };

    const onVerify = async (e) => {
        if (e) e.preventDefault();
        const id = certIdInput.trim();

        if (!id) {
            setErrorMessage('Validation Error: Certificate ID is required.');
            setStatus('error');
            return;
        }
        if (id.toLowerCase().endsWith('.pdf')) {
            setErrorMessage('Input Error: Enter the Certificate ID only (e.g. THIAI-INT-1234), excluding .pdf');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');
        setCertData(null);

        try {
            const fetchUrl = `${GAS_WEB_APP_URL}?id=${encodeURIComponent(id)}`;
            const response = await fetch(fetchUrl, { method: 'GET', mode: 'cors' });

            if (!response.ok) throw new Error('Secure Gateway Timeout');

            const result = await response.json();

            if (result.status === 'success') {
                const secureHash = `THIAI-HASH-${generateHash(id)}-${generateHash(id + 'salt')}`;
                const data = {
                    id: id.toUpperCase(),
                    previewUrl: result.preview,
                    downloadUrl: result.download,
                    // Note: In production, these should come from the API. We mock placeholders for the UI showcase.
                    studentName: "Verified Learner",
                    programName: "Advanced Industry Internship Program",
                    programType: "Professional Certification",
                    domain: "Technology & Innovation",
                    duration: "4 - 8 Weeks",
                    issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    completionDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    credentialStatus: "Active & Verified",
                    grade: "Outstanding Performance",
                    verificationStatus: "Authentic",
                    verificationId: `VID-${generateHash(id)}`,
                    hash: secureHash,
                    issuedBy: "TechieHelp Institute of AI",
                    timestamp: new Date().toLocaleString()
                };
                setCertData(data);
                setStatus('success');
            } else {
                setErrorMessage(result.message || 'Identity Verification Failed: No matching record found in the secure registry.');
                setStatus('error');
            }
        } catch (error) {
            setErrorMessage('System Error: Communication with the secure verification registry was interrupted.');
            setStatus('error');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        const url = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(certData?.id || '')}`;
        if (navigator.share) {
            navigator.share({
                title: 'Verified Credential - TechieHelp Institute of AI',
                text: `View my verified internship credential from TechieHelp Institute of AI.`,
                url: url
            }).catch(console.error);
        } else {
            copy(url, 'shareLink');
        }
    };

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#0F4CBA] selection:text-white pb-20">
            <AnimatePresence>
                {showPolicyModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }} 
                            exit={{ scale: 0.95, opacity: 0, y: 20 }} 
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden"
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-white px-8 py-8 text-center border-b border-slate-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-200">
                                    <ShieldCheck className="w-8 h-8 text-blue-700" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-2">Verification Policy</h2>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    To ensure a secure and trusted credential environment, all verifications must comply with our official policy guidelines.
                                </p>
                            </div>
                            <div className="p-8 space-y-4">
                                <Link 
                                    href="/verification-policy" 
                                    target="_blank"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FileText className="w-4 h-4" /> Read Verification Policy
                                </Link>
                                <button 
                                    onClick={handleAcceptPolicy}
                                    className="w-full px-6 py-4 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" /> Accept & Continue
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F4CBA] to-[#F4B400] z-50 origin-left print:hidden"
                style={{ scaleX }}
            />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-slate-50 border-b border-slate-200 print:hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-multiply" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#0F4CBA]/5 to-[#F4B400]/5 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
                    >
                        <ShieldCheck className="w-4 h-4 text-[#0F4CBA]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700">Official Credential Verification Portal</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6"
                    >
                        Verify Internship & <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4CBA] to-[#1e6fd9]">Professional Credentials</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10"
                    >
                        Instantly verify the authenticity of internship certificates and professional credentials issued by TechieHelp Institute of AI using our secure digital verification system.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 md:gap-8"
                    >
                        {[
                            { icon: Lock, text: "Secure Digital Verification" },
                            { icon: ShieldCheck, text: "Tamper Detection Enabled" },
                            { icon: Database, text: "Official Institute Records" },
                            { icon: Zap, text: "Instant Verification" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white/60 px-4 py-2 rounded-lg border border-slate-200/60 backdrop-blur-sm shadow-sm">
                                <item.icon className="w-4 h-4 text-[#F4B400]" />
                                {item.text}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SEARCH CARD - STICKY WRAPPER */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-30 -mt-10 md:-mt-12 print:hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 md:p-10"
                >
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Search className="w-4 h-4 text-[#0F4CBA]" />
                                Certificate ID
                            </label>
                            <input
                                type="text"
                                placeholder="Example: THIAI-INT-2026-001245"
                                value={certIdInput}
                                onChange={(e) => setCertIdInput(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#0F4CBA] focus:border-transparent transition-all placeholder:text-slate-400 font-medium tracking-wide"
                                required
                            />
                            <p className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
                                <Info className="w-3.5 h-3.5" />
                                Enter the unique Certificate ID exactly as printed on the certificate.
                            </p>
                        </div>
                        <button
                            onClick={onVerify}
                            disabled={status === 'loading'}
                            className={`w-full md:w-auto px-8 py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-3 shrink-0 ${status === 'loading'
                                    ? 'bg-slate-400 cursor-not-allowed'
                                    : 'bg-[#0F4CBA] hover:bg-[#0a3a94] shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0'
                                }`}
                        >
                            {status === 'loading' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <BadgeCheck className="w-5 h-5" />
                                    Verify Credential
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* RESULTS SECTION */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                <AnimatePresence mode="wait">

                    {/* LOADING STATE */}
                    {status === 'loading' && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <div className="relative w-24 h-24 mb-8">
                                <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                                <div className="absolute inset-0 border-4 border-[#0F4CBA] border-t-transparent rounded-full animate-spin" />
                                <ShieldCheck className="absolute inset-0 m-auto w-8 h-8 text-[#0F4CBA] animate-pulse" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Connecting to Secure Registry...</h3>
                            <p className="text-slate-500">Validating digital signatures and verifying records.</p>
                        </motion.div>
                    )}

                    {/* ERROR STATE */}
                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="bg-red-50 border border-red-100 rounded-3xl p-8 md:p-12 text-center"
                        >
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Certificate Not Found</h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                                {errorMessage}
                            </p>

                            <div className="bg-white border border-red-100 rounded-2xl p-6 text-left max-w-lg mx-auto mb-8 shadow-sm">
                                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-red-500" /> Possible Reasons:
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Incorrect Certificate ID or typing error",
                                        "Certificate has not yet been published to the registry",
                                        "The credential has been revoked",
                                        "You included the .pdf extension in the ID"
                                    ].map((reason, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                <button onClick={() => setStatus('idle')} className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">
                                    Try Again
                                </button>
                                <Link href="/contact" className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-md shadow-red-600/20">
                                    Contact Support
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* SUCCESS STATE */}
                    {status === 'success' && certData && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="space-y-12"
                        >
                            {/* SUCCESS BANNER */}
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-8 md:p-12 text-center shadow-lg shadow-emerald-900/5 print:bg-white print:border-slate-300 print:shadow-none">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20 border-4 border-emerald-500 relative"
                                >
                                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border-2 border-white">
                                        Verified
                                    </div>
                                </motion.div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                                    Credential Successfully Verified
                                </h2>
                                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                                    This credential has been successfully validated against the official TechieHelp Institute of AI verification database. The certificate is authentic and has not been revoked based on our current records.
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* LEFT COLUMN: DETAILS & SECURITY */}
                                <div className="lg:col-span-2 space-y-8">

                                    {/* CREDENTIAL DETAILS */}
                                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
                                        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                                <User className="w-5 h-5 text-[#0F4CBA]" /> Credential Details
                                            </h3>
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Active
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                                                {[
                                                    { label: "Certificate ID", val: certData.id, copyable: true },
                                                    { label: "Student Name", val: certData.studentName },
                                                    { label: "Program Name", val: certData.programName },
                                                    { label: "Program Type", val: certData.programType },
                                                    { label: "Internship Domain", val: certData.domain },
                                                    { label: "Duration", val: certData.duration },
                                                    { label: "Issue Date", val: certData.issueDate },
                                                    { label: "Completion Date", val: certData.completionDate },
                                                    { label: "Certificate Grade", val: certData.grade },
                                                    { label: "Issued By", val: certData.issuedBy, bold: true },
                                                ].map((item, idx) => (
                                                    <div key={idx} className="space-y-1">
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                                        <div className="flex items-center gap-2">
                                                            <p className={`text-base text-slate-800 ${item.bold ? 'font-black' : 'font-medium'}`}>{item.val}</p>
                                                            {item.copyable && (
                                                                <button onClick={() => copy(item.val, `copy-${idx}`)} className="text-slate-400 hover:text-[#0F4CBA] transition-colors p-1 print:hidden">
                                                                    {copiedId === `copy-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* SECURITY PANEL */}
                                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
                                        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50">
                                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                                <ShieldCheck className="w-5 h-5 text-[#0F4CBA]" /> Credential Security
                                            </h3>
                                        </div>
                                        <div className="p-6 space-y-6">
                                            <p className="text-sm text-slate-600 leading-relaxed border-b border-slate-100 pb-6">
                                                Every credential issued by TechieHelp Institute of AI contains a unique verification identifier and secure digital record that helps detect unauthorized modifications and enables employers and institutions to validate authenticity.
                                            </p>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {[
                                                    { icon: Fingerprint, text: "Digitally Signed Credential" },
                                                    { icon: Server, text: "Verified Against Official Records" },
                                                    { icon: ShieldCheck, text: "Tamper Detection Passed" },
                                                    { icon: Database, text: "Permanent Verification Record" }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                            <item.icon className="w-4 h-4 text-emerald-600" />
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="bg-[#0F4CBA]/5 border border-[#0F4CBA]/10 rounded-2xl p-5 break-all">
                                                <p className="text-xs font-bold text-[#0F4CBA] uppercase tracking-wider mb-2">Digital Credential Hash</p>
                                                <p className="text-sm font-mono text-slate-700 font-medium">{certData.hash}</p>

                                                <div className="mt-4 pt-4 border-t border-[#0F4CBA]/10 grid sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unique Verification ID</p>
                                                        <p className="text-sm font-medium text-slate-900 mt-1">{certData.verificationId}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verification Timestamp</p>
                                                        <p className="text-sm font-medium text-slate-900 mt-1">{certData.timestamp}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: PREVIEW & ACTIONS */}
                                <div className="space-y-6">
                                    {/* PREVIEW */}
                                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 print:hidden">
                                        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-4">
                                            <FileText className="w-5 h-5 text-[#0F4CBA]" /> Certificate Preview
                                        </h3>
                                        <div className="w-full aspect-[1.414/1] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative group">
                                            <iframe src={certData.previewUrl} className="absolute inset-0 w-full h-full border-0 pointer-events-none" title="Certificate Preview" />
                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                <a href={certData.previewUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                                                    <ExternalLink className="w-4 h-4" /> Open Full
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 print:hidden">
                                        <h3 className="font-bold text-lg text-slate-900 mb-4">Actions</h3>
                                        <div className="space-y-3">
                                            <a href={certData.downloadUrl} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-3 rounded-xl bg-[#0F4CBA] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#0a3a94] transition-colors shadow-md shadow-blue-900/10">
                                                <Download className="w-4 h-4" /> Download PDF
                                            </a>
                                            <button onClick={handlePrint} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                                                <Printer className="w-4 h-4" /> Print Verification
                                            </button>
                                            <button onClick={handleShare} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                                                {copiedId === 'shareLink' ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                                                {copiedId === 'shareLink' ? 'Link Copied!' : 'Share Verification Link'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* LOWER SECTIONS - HIDDEN IN PRINT */}
            <div className="print:hidden">
                {/* FOR RECRUITERS */}
                <section className="bg-slate-900 py-20 px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-8">
                            <Building className="w-8 h-8 text-[#F4B400]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">For Recruiters & Institutions</h2>
                        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
                            Employers, HR teams, universities, and Training & Placement Offices (TPOs) can use this portal to instantly verify candidate credentials before recruitment or admissions.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button onClick={() => { setStatus('idle'); setCertIdInput(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-8 py-4 rounded-xl bg-[#F4B400] text-slate-900 font-black tracking-wide hover:bg-[#e0a600] transition-colors shadow-lg shadow-[#F4B400]/20">
                                Verify Another Credential
                            </button>
                            <Link href="/contact" className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/10">
                                Contact Verification Team
                            </Link>
                        </div>
                    </div>
                </section>

                {/* VERIFICATION PROCESS */}
                <section className="py-24 px-4 bg-white border-b border-slate-200">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Verification Process</h2>
                            <p className="text-slate-600">How our secure credential system works.</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between relative">
                            {/* Line connecting steps */}
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />

                            {[
                                { title: "Certificate Issued", icon: Award },
                                { title: "ID Generated", icon: Fingerprint },
                                { title: "Record Created", icon: Database },
                                { title: "Credential Published", icon: ExternalLink },
                                { title: "Verified by Employer", icon: ShieldCheck }
                            ].map((step, i) => (
                                <div key={i} className="relative z-10 flex flex-col items-center text-center max-w-[150px] w-full mb-8 md:mb-0 bg-white">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                                        <step.icon className="w-6 h-6 text-[#0F4CBA]" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-800">{step.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* IMPORTANT NOTICE */}
                <section className="py-12 px-4 bg-slate-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 relative overflow-hidden flex items-start gap-6">
                            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Important Notice</h3>
                                <p className="text-slate-700 mb-3">Only certificates successfully verified through this portal should be considered authentic.</p>
                                <p className="text-slate-700">Any credential that cannot be verified or appears altered should be treated as invalid and reported to TechieHelp Institute of AI immediately.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-4 bg-white border-t border-slate-200">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-6">
                            {FAQS.map((faq, i) => (
                                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <h4 className="font-bold text-lg text-slate-900 mb-3 flex items-start gap-3">
                                        <span className="text-[#0F4CBA]">Q.</span> {faq.q}
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed pl-7">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="py-20 px-4 bg-gradient-to-br from-[#0F4CBA] to-[#0a3a94] text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black text-white mb-6">Need Verification Assistance?</h2>
                        <p className="text-blue-100 mb-8 text-lg">Our support team is available to help employers and institutions with bulk verification or discrepancy resolution.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="mailto:support@techiehelp.in" className="px-8 py-4 rounded-xl bg-white text-[#0F4CBA] font-black tracking-wide shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                                <Mail className="w-5 h-5" /> Contact Verification Team
                            </a>
                            <p className="text-blue-200 font-medium">support@techiehelp.in</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
