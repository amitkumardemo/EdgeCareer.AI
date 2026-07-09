"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import {
    ShieldCheck, CheckCircle, Download, ExternalLink, ShieldAlert,
    BadgeCheck, Lock, Search, Cpu, Check, Copy, Printer, Share2,
    AlertTriangle, XCircle, ChevronDown, Clock, Building, RefreshCcw,
    FileText, ArrowRight, HelpCircle, Mail, Link as LinkIcon,
    Fingerprint, Server, Activity, User, Award, Calendar, GraduationCap, Info, Database, Zap,
    BarChart3, CheckSquare, Presentation, SearchCode, Shield, Eye, EyeOff, Terminal,
    MapPin, Globe, ChevronUp, Users, Target, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { verifyCertificate } from '@/actions/verify';
import confetti from 'canvas-confetti';

// --- HELPER HOOKS ---

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

function useBlobUrl(base64DataUri) {
    const [blobUrl, setBlobUrl] = useState('');
    useEffect(() => {
        if (!base64DataUri) {
            setBlobUrl('');
            return;
        }
        if (!base64DataUri.startsWith('data:')) {
            setBlobUrl(base64DataUri);
            return;
        }
        try {
            const parts = base64DataUri.split(',');
            const byteString = atob(parts[1]);
            const mimeString = parts[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            const url = URL.createObjectURL(blob);
            setBlobUrl(url);
            return () => URL.revokeObjectURL(url);
        } catch (e) {
            console.error('Failed to parse base64', e);
            setBlobUrl(base64DataUri);
        }
    }, [base64DataUri]);
    return blobUrl;
}

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!inView) return;
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);
            
            if (progress < 1) {
                // easeOutExpo
                const currentVal = end === 100 ? 
                    end * (progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)) :
                    Math.floor(end * (progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)));
                
                setCount(currentVal);
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, inView]);

    const isFloat = end % 1 !== 0;
    return <span ref={ref}>{prefix}{isFloat ? count.toFixed(2) : Math.floor(count)}{suffix}</span>;
};


// --- FAQ DATA ---
const FAQS = [
    {
        q: "How do I verify a certificate?",
        a: "Enter the unique Student ID or Certificate ID exactly as printed on the credential into the search bar. Our system will securely cross-reference it with our immutable database."
    },
    {
        q: "How does the AI Fraud Detection work?",
        a: "Our system employs advanced algorithms to analyze the digital signature, hash integrity, and issuance timestamps to ensure the credential has not been altered or tampered with since its creation."
    },
    {
        q: "Can employers use this platform for background checks?",
        a: "Yes. This enterprise-grade portal is designed specifically for employers, HR agencies, and universities to instantly and reliably validate a candidate's credentials and performance metrics."
    },
    {
        q: "What does the Authenticity Score mean?",
        a: "The Authenticity Score represents the confidence level of our system in the credential's validity, based on hash matching, cryptographic signatures, and revocation registry checks."
    }
];

export default function CertificateVerify() {
    const [certIdInput, setCertIdInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [certData, setCertData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPolicyModal, setShowPolicyModal] = useState(false);
    const [showHash, setShowHash] = useState(false);
    
    // Shield Animation States
    const [loadingStep, setLoadingStep] = useState(0);
    const loadingMessages = [
        "Connecting to Secure Server...",
        "Querying Immutable Database...",
        "Matching Certificate Records...",
        "Verifying Cryptographic Hash...",
        "Finalizing Validation..."
    ];

    const { copiedId, copy } = useCopyLink();
    const pdfBlobUrl = useBlobUrl(certData?.previewUrl);

    // Scroll Progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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

    const triggerConfetti = () => {
        const end = Date.now() + 1.5 * 1000;
        const colors = ['#0B5FFF', '#F4B400', '#16A34A'];

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const onVerify = async (e) => {
        if (e) e.preventDefault();
        const id = certIdInput.trim();

        if (!id) {
            setErrorMessage('Validation Error: Student ID or Certificate ID is required.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');
        setCertData(null);
        setLoadingStep(0);

        // Simulate secure multi-step verification process
        const stepInterval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= 4) {
                    clearInterval(stepInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 600);

        try {
            const result = await verifyCertificate(id);

            setTimeout(() => {
                clearInterval(stepInterval);
                if (result.success) {
                    setCertData(result.data);
                    setStatus('success');
                    triggerConfetti();
                } else {
                    setErrorMessage(result.message || 'Verification Failed: No matching record found in the registry.');
                    setStatus('error');
                }
            }, 3500); // Allow animation to finish

        } catch (error) {
            clearInterval(stepInterval);
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
                title: 'Verified Credential - TechieHelp',
                text: `View my verified credential from TechieHelp Institute of AI.`,
                url: url
            }).catch(console.error);
        } else {
            copy(url, 'shareLink');
        }
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-[#0B5FFF] selection:text-white pb-20 relative overflow-hidden">
            
            {/* BACKGROUND WATERMARK & SHAPES */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden print:hidden">
                <h1 className="text-[12vw] font-black text-slate-900 opacity-[0.02] whitespace-nowrap -rotate-12 select-none">
                    TECHIEHELP VERIFIED
                </h1>
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#0B5FFF] opacity-[0.04] rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#16A34A] opacity-[0.03] rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-[#F4B400] opacity-[0.03] rounded-full blur-[80px]" />
            </div>

            <AnimatePresence>
                {showPolicyModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} 
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white/80 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/40 w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-8 text-center border-b border-slate-200/50">
                                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100/50">
                                    <Shield className="w-10 h-10 text-[#0B5FFF]" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Enterprise Verification Policy</h2>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    To maintain the integrity of our digital credentials, all verification requests are processed through our secure, immutable ledger system.
                                </p>
                            </div>
                            <div className="p-8 bg-slate-50/50 space-y-4">
                                <button 
                                    onClick={handleAcceptPolicy}
                                    className="w-full px-6 py-4 rounded-xl bg-[#0B5FFF] text-white font-bold hover:bg-[#094DD9] transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    <Check className="w-5 h-5" /> I Understand & Accept
                                </button>
                                <Link href="/verification-policy" target="_blank" className="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                    <FileText className="w-4 h-4" /> View Full Policy
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B5FFF] via-[#16A34A] to-[#F4B400] z-50 origin-left print:hidden"
                style={{ scaleX }}
            />

            {/* HEADER HERO */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 z-10 print:hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 shadow-sm mb-8"
                        >
                            <ShieldCheck className="w-4 h-4 text-[#0B5FFF]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-900">Official Credential Registry</span>
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
                        >
                            Verify Professional <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B5FFF] to-[#3B82F6]">Credentials</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl"
                        >
                            Instantly verify internship certificates, performance records, and digital credentials issued by TechieHelp Institute of AI.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
                        >
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                                <CheckCircle className="w-4 h-4 text-[#16A34A]" /> Digitally Signed
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                                <Shield className="w-4 h-4 text-[#0B5FFF]" /> Tamper Detection
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                                <Building className="w-4 h-4 text-[#F4B400]" /> Employer Ready
                            </div>
                        </motion.div>
                    </div>

                    {/* SEARCH CARD RIGHT */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                        className="w-full max-w-md relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#0B5FFF] to-[#F4B400] rounded-[26px] blur opacity-20" />
                        <div className="bg-white/80 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white p-8 relative">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900">Credential Lookup</h3>
                                <Database className="w-5 h-5 text-slate-400" />
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Student ID or Certificate ID</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="e.g. TH-INT-24-XXXX"
                                            value={certIdInput}
                                            onChange={(e) => setCertIdInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && onVerify()}
                                            className="w-full bg-slate-50 border-2 border-slate-200 text-slate-900 text-lg rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#0B5FFF] focus:bg-white transition-all placeholder:text-slate-400 font-semibold"
                                        />
                                    </div>
                                </div>
                                
                                <button
                                    onClick={onVerify}
                                    disabled={status === 'loading'}
                                    className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-3 overflow-hidden relative ${
                                        status === 'loading'
                                            ? 'bg-slate-800 cursor-not-allowed'
                                            : 'bg-[#0B5FFF] hover:bg-[#094DD9] shadow-lg shadow-blue-900/20 hover:-translate-y-1'
                                    }`}
                                >
                                    {status === 'loading' ? (
                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Verifying Record...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 relative z-10">
                                            <BadgeCheck className="w-5 h-5" />
                                            Verify Authenticity
                                        </div>
                                    )}
                                    {/* Ripple Effect */}
                                    <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300 rounded-xl" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 z-10 relative">
                <AnimatePresence mode="wait">

                    {/* LOADING STATE - ANIMATED SHIELD */}
                    {status === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[24px] shadow-xl border border-slate-200 p-12 flex flex-col items-center justify-center min-h-[400px]"
                        >
                            <div className="relative mb-10">
                                <motion.div 
                                    animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                    className="absolute -inset-8 border border-dashed border-[#0B5FFF]/30 rounded-full"
                                />
                                <motion.div 
                                    animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                                    className="absolute -inset-4 border-2 border-slate-100 rounded-full"
                                />
                                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center border-4 border-[#0B5FFF] shadow-lg shadow-blue-900/20 relative z-10">
                                    <Shield className="w-10 h-10 text-[#0B5FFF] animate-pulse" />
                                </div>
                            </div>
                            
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-black text-slate-900">{loadingMessages[loadingStep]}</h3>
                                <p className="text-slate-500 font-mono text-sm">SECURE_VERIFICATION_PROTOCOL_V2</p>
                            </div>

                            <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }} animate={{ width: `${(loadingStep + 1) * 20}%` }}
                                    className="h-full bg-[#0B5FFF] rounded-full"
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* ERROR STATE */}
                    {status === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="bg-white rounded-[24px] shadow-xl border border-red-100 p-10 md:p-16 text-center"
                        >
                            <div className="w-24 h-24 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-red-500/10 rounded-full" />
                                <XCircle className="w-12 h-12 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Credential Not Found</h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                                {errorMessage}
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mb-10">
                                {[
                                    { icon: SearchCode, title: "Invalid Format", desc: "Check for typos in the ID provided." },
                                    { icon: Clock, title: "Processing", desc: "Certificate might still be under review." },
                                    { icon: ShieldAlert, title: "Revoked", desc: "The credential was permanently revoked." },
                                    { icon: FileText, title: "Extension Error", desc: "Do not include .pdf in the search." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                            <item.icon className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => setStatus('idle')} className="px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-0.5">
                                Try Another Search
                            </button>
                        </motion.div>
                    )}

                    {/* SUCCESS DASHBOARD */}
                    {status === 'success' && certData && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {/* TOP SUCCESS BANNER */}
                            <div className="bg-[#16A34A] rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-xl shadow-green-900/20 relative overflow-hidden print:bg-white print:text-black print:border print:border-slate-300">
                                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                                <div className="flex items-center gap-6 z-10 relative w-full md:w-auto text-center md:text-left mb-6 md:mb-0">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto md:mx-0 shrink-0">
                                        <CheckCircle className="w-10 h-10 text-[#16A34A]" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight mb-1">OFFICIALLY VERIFIED</h2>
                                        <p className="text-green-100 font-medium">This credential is authentic and recorded on our ledger.</p>
                                    </div>
                                </div>
                                <div className="z-10 bg-black/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center flex items-center gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-green-200 tracking-wider mb-1">Authenticity Score</p>
                                        <p className="text-3xl font-black">100<span className="text-xl">%</span></p>
                                    </div>
                                    <div className="w-12 h-12 relative">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                                            <motion.circle cx="24" cy="24" r="20" stroke="white" strokeWidth="4" fill="none" strokeDasharray="125.6" initial={{ strokeDashoffset: 125.6 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-8">
                                {/* LEFT COLUMN */}
                                <div className="lg:col-span-8 space-y-8">
                                    
                                    {/* STUDENT PROFILE CARD */}
                                    <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden relative">
                                        <div className="h-32 bg-gradient-to-r from-slate-100 to-blue-50 relative">
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
                                        </div>
                                        <div className="px-8 pb-8">
                                            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
                                                <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg border border-slate-100 relative">
                                                    <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-4xl font-black text-slate-300">
                                                        {certData.studentName.charAt(0)}
                                                    </div>
                                                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#0B5FFF] rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                                                        <BadgeCheck className="w-4 h-4 text-white" />
                                                    </div>
                                                </div>
                                                <div className="text-center sm:text-left flex-1">
                                                    <h3 className="text-2xl font-black text-slate-900">{certData.studentName}</h3>
                                                    <p className="text-slate-500 font-medium">{certData.programName}</p>
                                                </div>
                                                <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-center">
                                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">Grade</p>
                                                    <p className="text-sm font-black text-slate-900">{certData.grade}</p>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                {[
                                                    { icon: User, label: "Student ID", val: certData.techieId },
                                                    { icon: FileText, label: "Certificate ID", val: certData.id },
                                                    { icon: Target, label: "Domain", val: certData.domain },
                                                    { icon: Clock, label: "Duration", val: certData.duration },
                                                    { icon: Calendar, label: "Issue Date", val: certData.issueDate },
                                                    { icon: CheckCircle, label: "Status", val: certData.credentialStatus }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                                                            <item.icon className="w-4 h-4 text-slate-500" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                                            <p className="text-sm font-bold text-slate-900">{item.val || "N/A"}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* PERFORMANCE ANALYTICS */}
                                    <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
                                        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                            <BarChart3 className="w-6 h-6 text-[#0B5FFF]" /> Performance Analytics
                                        </h3>
                                        <div className="grid md:grid-cols-3 gap-6">
                                            {/* Attendance */}
                                            <div className="border border-slate-100 rounded-2xl p-6 relative overflow-hidden group hover:border-[#0B5FFF]/30 transition-colors">
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors" />
                                                <div className="relative z-10">
                                                    <p className="text-sm font-bold text-slate-500 mb-2">Attendance</p>
                                                    <p className="text-3xl font-black text-slate-900 mb-4">{certData.attendancePct}%</p>
                                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${certData.attendancePct}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-[#0B5FFF] rounded-full" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Tasks */}
                                            <div className="border border-slate-100 rounded-2xl p-6 relative overflow-hidden group hover:border-[#16A34A]/30 transition-colors">
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-100 transition-colors" />
                                                <div className="relative z-10">
                                                    <p className="text-sm font-bold text-slate-500 mb-2">Tasks Completed</p>
                                                    <p className="text-3xl font-black text-slate-900 mb-4">{certData.tasksCompleted} <span className="text-lg text-slate-400">/ {certData.totalTasks}</span></p>
                                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${(certData.tasksCompleted/certData.totalTasks)*100}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-[#16A34A] rounded-full" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Overall */}
                                            <div className="border border-slate-100 rounded-2xl p-6 relative overflow-hidden group hover:border-[#F4B400]/30 transition-colors">
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-100 transition-colors" />
                                                <div className="relative z-10">
                                                    <p className="text-sm font-bold text-slate-500 mb-2">Overall Score</p>
                                                    <p className="text-3xl font-black text-slate-900 mb-4">{certData.performScore}%</p>
                                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${certData.performScore}%` }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-[#F4B400] rounded-full" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DIGITAL SECURITY DASHBOARD */}
                                    <div className="bg-slate-900 rounded-[24px] shadow-sm border border-slate-800 p-8 text-white relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-xl font-black flex items-center gap-2">
                                                    <Lock className="w-6 h-6 text-[#F4B400]" /> Digital Security Record
                                                </h3>
                                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Live Ledger
                                                </span>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verification Timestamp</p>
                                                        <p className="font-mono text-sm">{certData.timestamp}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verification ID</p>
                                                        <p className="font-mono text-sm bg-white/5 p-3 rounded-xl border border-white/10">{certData.verificationId}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cryptographic Signature (SHA-256)</p>
                                                    <div className="bg-black/50 p-4 rounded-xl border border-white/10 relative group">
                                                        <p className={`font-mono text-xs break-all ${showHash ? 'text-green-400' : 'text-slate-600 blur-sm select-none'}`}>
                                                            {certData.hash}
                                                        </p>
                                                        <button 
                                                            onClick={() => setShowHash(!showHash)}
                                                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                                                        >
                                                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                                                {showHash ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                                {showHash ? 'Hide Hash' : 'Reveal Hash'}
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <button onClick={() => copy(certData.hash, 'hash')} className="text-xs font-bold text-[#0B5FFF] flex items-center gap-1 hover:text-blue-400 transition-colors">
                                                        {copiedId === 'hash' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                        {copiedId === 'hash' ? 'Copied to clipboard' : 'Copy Hash Value'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* RIGHT COLUMN */}
                                <div className="lg:col-span-4 space-y-8">
                                    
                                    {/* AI FRAUD DETECTION */}
                                    <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0B5FFF]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <Cpu className="w-5 h-5 text-[#0B5FFF]" />
                                            </div>
                                            <h3 className="font-bold text-slate-900">AI Fraud Detection</h3>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-6">This credential has passed AI-powered tamper detection and digital integrity validation.</p>
                                        
                                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                                            <span className="text-sm font-bold text-slate-700">Confidence Meter</span>
                                            <span className="text-lg font-black text-[#16A34A]">99.98%</span>
                                        </div>
                                    </div>

                                    {/* CERTIFICATE PREVIEW CARD */}
                                    <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 print:hidden">
                                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-[#0B5FFF]" /> Official Document
                                        </h3>
                                        <div className="w-full aspect-[1.414/1] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative group mb-6">
                                            {pdfBlobUrl ? (
                                                <iframe src={`${pdfBlobUrl}#view=FitH`} className="absolute inset-0 w-full h-full border-0 pointer-events-none" title="Certificate Preview" />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                                    <FileText className="w-12 h-12 mb-3 opacity-50" />
                                                    <p className="text-sm font-medium">Preview Unavailable</p>
                                                </div>
                                            )}
                                            {pdfBlobUrl && (
                                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm gap-3">
                                                    <a href={pdfBlobUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2 text-sm">
                                                        <ExternalLink className="w-4 h-4" /> Open Full
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {pdfBlobUrl && (
                                                <a href={pdfBlobUrl} download={`${certData.studentName.replace(/\s+/g, '_')}_Certificate.pdf`} className="w-full py-3 rounded-xl bg-[#0B5FFF] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#094DD9] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                                    <Download className="w-4 h-4" /> Download PDF
                                                </a>
                                            )}
                                            <div className="grid grid-cols-2 gap-3">
                                                <button onClick={handlePrint} className="w-full py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors text-sm">
                                                    <Printer className="w-4 h-4" /> Print
                                                </button>
                                                <button onClick={handleShare} className="w-full py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors text-sm">
                                                    {copiedId === 'shareLink' ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Share2 className="w-4 h-4" />}
                                                    Share
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* VERIFICATION TIMELINE */}
                                    <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6">
                                        <h3 className="font-bold text-slate-900 mb-6">Credential Journey</h3>
                                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#0B5FFF] before:to-slate-200">
                                            {[
                                                { title: "Application Approved", active: true },
                                                { title: "Internship Commenced", active: true },
                                                { title: "Assessments Cleared", active: true },
                                                { title: "Certificate Issued", active: true },
                                                { title: "Successfully Verified", active: true, pulse: true }
                                            ].map((step, i) => (
                                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#0B5FFF] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                                                        {step.pulse ? (
                                                            <CheckCircle className="w-4 h-4 text-white animate-pulse" />
                                                        ) : (
                                                            <Check className="w-4 h-4 text-white" />
                                                        )}
                                                    </div>
                                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100 ml-4 md:ml-0">
                                                        <p className="font-bold text-slate-900 text-sm">{step.title}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* LOWER SECTIONS - HIDDEN IN PRINT */}
            <div className="print:hidden relative z-10 bg-white">
                
                {/* STATISTICS SECTION */}
                <section className="py-20 px-4 border-t border-slate-200 bg-slate-50">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Students Certified", val: 5000, prefix: "", suffix: "+" },
                            { label: "Verification Success", val: 100, prefix: "", suffix: "%" },
                            { label: "Partner Colleges", val: 150, prefix: "", suffix: "+" },
                            { label: "System Uptime", val: 99.99, prefix: "", suffix: "%" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <h4 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                                    <AnimatedCounter end={stat.val} suffix={stat.suffix} prefix={stat.prefix} />
                                </h4>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EMPLOYER SECTION */}
                <section className="py-24 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">For Employers & HR Teams</h2>
                            <p className="text-slate-600 text-lg">Streamline your background verification process with our enterprise tools designed for bulk and automated validations.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: Users, title: "Bulk Verification", desc: "Verify multiple candidates simultaneously using our secure batch processing system." },
                                { icon: Terminal, title: "Verification API", desc: "Integrate our verification endpoint directly into your ATS or HRMS platform." },
                                { icon: BookOpen, title: "Institution Access", desc: "Dedicated portals for universities and colleges to track alumni performance." }
                            ].map((feature, i) => (
                                <div key={i} className="bg-white p-8 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                        <feature.icon className="w-6 h-6 text-[#0B5FFF]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-0.5">
                                Contact Verification Team <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* TRUST LOGOS */}
                <section className="py-16 px-4 border-y border-slate-200 bg-white">
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Recognized & Trusted By</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholders for actual logos. Replace with <img> tags later */}
                            <div className="flex items-center gap-2 font-black text-2xl text-slate-800"><Globe className="w-8 h-8" /> MSME</div>
                            <div className="flex items-center gap-2 font-black text-2xl text-slate-800"><Award className="w-8 h-8" /> ISO 9001</div>
                            <div className="flex items-center gap-2 font-black text-2xl text-slate-800"><Activity className="w-8 h-8" /> STARTUP INDIA</div>
                            <div className="flex items-center gap-2 font-black text-2xl text-slate-800"><Cpu className="w-8 h-8" /> AICTE</div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-4 bg-[#F8FAFC]">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                            {FAQS.map((faq, i) => (
                                <details key={i} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-slate-900">
                                        {faq.q}
                                        <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
            
            {/* FLOATING SUPPORT CARD */}
            <div className="fixed bottom-6 right-6 z-50 print:hidden">
                <div className="group relative">
                    <button className="w-14 h-14 bg-[#0B5FFF] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
                        <HelpCircle className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-full right-0 mb-4 w-72 bg-white rounded-[24px] shadow-2xl border border-slate-200 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all origin-bottom-right scale-95 group-hover:scale-100">
                        <h4 className="font-bold text-slate-900 mb-2">Verification Support</h4>
                        <p className="text-sm text-slate-600 mb-4">Need help validating a credential? Our team is available 24/7.</p>
                        <a href="mailto:support@techiehelp.in" className="flex items-center gap-3 text-sm font-bold text-[#0B5FFF] p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors mb-2">
                            <Mail className="w-4 h-4" /> support@techiehelp.in
                        </a>
                        <p className="text-xs text-slate-400 text-center mt-4">Average response time: &lt; 2 hours</p>
                    </div>
                </div>
            </div>

        </main>
    );
}
