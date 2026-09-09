"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForgotPasswordPage;
const react_1 = require("react");
const AuthBrandPanel_1 = __importDefault(require("@/components/auth/AuthBrandPanel"));
function ForgotPasswordPage() {
    const [step, setStep] = (0, react_1.useState)('request');
    const [email, setEmail] = (0, react_1.useState)('');
    const [otp, setOtp] = (0, react_1.useState)(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)('');
    /* ── OTP input handler ── */
    const handleOtp = (index, value) => {
        if (!/^\d?$/.test(value))
            return;
        const next = [...otp];
        next[index] = value;
        setOtp(next);
        if (value && index < 5) {
            const el = document.getElementById(`otp-${index + 1}`);
            el?.focus();
        }
    };
    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };
    /* ── Submit handlers ── */
    const handleRequest = async (e) => {
        e.preventDefault();
        if (!email.includes('@')) {
            setError('Enter a valid email address');
            return;
        }
        setError('');
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setStep('sent');
    };
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.join('').length < 6) {
            setError('Enter the 6-digit code');
            return;
        }
        setError('');
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        setStep('reset');
    };
    const handleReset = async (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        setStep('done');
    };
    return (<div className="min-h-screen flex w-full font-outfit">
      <AuthBrandPanel_1.default />

      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-20 bg-white">
        <div className="max-w-md w-full mx-auto">

          {/* Mobile logo */}
          <a href="/" className="flex items-center gap-2 mb-10 lg:hidden w-fit">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <span className="text-navy font-black text-xl">ZAIPIO</span>
          </a>

          {/* ── Step: Request ── */}
          {step === 'request' && (<>
              <div className="mb-8">
                <div className="w-12 h-12 bg-navy/10 rounded-2xl flex items-center justify-center text-2xl mb-4">🔑</div>
                <h1 className="text-3xl font-black text-navy mb-2">Forgot password?</h1>
                <p className="text-navy/55 text-sm">
                  No worries. Enter your email and we'll send you a reset code.
                </p>
              </div>
              {error && <p className="text-red-500 text-sm mb-4 flex items-center gap-1"><span>⚠</span> {error}</p>}
              <form onSubmit={handleRequest} className="space-y-4">
                <div>
                  <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="forgot-email">
                    Email address
                  </label>
                  <input id="forgot-email" type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-navy/20 rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"/>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-navy text-white font-bold text-sm py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Sending…</> : 'Send Reset Code'}
                </button>
              </form>
            </>)}

          {/* ── Step: Code sent ── */}
          {step === 'sent' && (<>
              <div className="mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mb-4">📧</div>
                <h1 className="text-3xl font-black text-navy mb-2">Check your email</h1>
                <p className="text-navy/55 text-sm">
                  We sent a 6-digit code to <span className="text-navy font-semibold">{email}</span>. Enter it below.
                </p>
              </div>
              {error && <p className="text-red-500 text-sm mb-4 flex items-center gap-1"><span>⚠</span> {error}</p>}
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {/* OTP input boxes */}
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, i) => (<input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtp(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} className="w-11 h-14 text-center text-navy text-xl font-black border-2 border-navy/20 rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white"/>))}
                </div>
                <button type="submit" disabled={loading} className="w-full bg-navy text-white font-bold text-sm py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Verifying…</> : 'Verify Code'}
                </button>
                <p className="text-center text-navy/45 text-sm">
                  Didn't get it?{' '}
                  <button type="button" onClick={() => setStep('request')} className="text-accent font-semibold hover:underline">
                    Resend
                  </button>
                </p>
              </form>
            </>)}

          {/* ── Step: New password ── */}
          {step === 'reset' && (<>
              <div className="mb-8">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-2xl mb-4">🔒</div>
                <h1 className="text-3xl font-black text-navy mb-2">Set new password</h1>
                <p className="text-navy/55 text-sm">Choose a strong password for your account.</p>
              </div>
              {error && <p className="text-red-500 text-sm mb-4 flex items-center gap-1"><span>⚠</span> {error}</p>}
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="new-password">New password</label>
                  <input id="new-password" type="password" placeholder="Min. 8 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border border-navy/20 rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"/>
                  {newPassword && (<div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4].map((i) => (<div key={i} className={`h-1 flex-1 rounded-full transition-all ${newPassword.length >= i * 3 ? i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-amber-400' : i <= 3 ? 'bg-accent' : 'bg-green-500' : 'bg-navy/10'}`}/>))}
                    </div>)}
                </div>
                <div>
                  <label className="block text-navy font-semibold text-sm mb-1.5" htmlFor="confirm-new-password">Confirm password</label>
                  <input id="confirm-new-password" type="password" placeholder="Repeat password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full border rounded-xl px-4 py-3 text-navy text-sm placeholder-navy/35 outline-none focus:ring-2 focus:ring-accent/20 transition-all ${confirmPassword && newPassword === confirmPassword ? 'border-green-400' : 'border-navy/20 focus:border-accent'}`}/>
                  {confirmPassword && newPassword === confirmPassword && <p className="text-green-600 text-xs mt-1">✓ Passwords match</p>}
                </div>
                <button type="submit" disabled={loading} className="w-full bg-navy text-white font-bold text-sm py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Saving…</> : 'Reset Password'}
                </button>
              </form>
            </>)}

          {/* ── Step: Done ── */}
          {step === 'done' && (<div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✅</div>
              <h1 className="text-3xl font-black text-navy mb-3">Password reset!</h1>
              <p className="text-navy/55 text-sm mb-8">Your password has been updated. You can now sign in with your new password.</p>
              <a href="/login" className="inline-block bg-navy text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-navy-800 transition-all shadow-navy-sm">
                Back to Sign in
              </a>
            </div>)}

          {/* Back link (only on request step) */}
          {step === 'request' && (<p className="text-center text-navy/50 text-sm mt-8">
              <a href="/login" className="text-navy font-bold hover:text-accent transition-colors">
                ← Back to sign in
              </a>
            </p>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map