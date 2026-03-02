"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileCheck2,
  Globe,
  Handshake,
  HardHat,
  Landmark,
  Scale,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

type RoleOption =
  | "Government Labour Officer"
  | "Labour Inspector"
  | "Employer"
  | "Employee / Worker"
  | "Labour Institute"
  | "Labour Union"
  | "Other";

type FormState = {
  fullName: string;
  organization: string;
  role: RoleOption | "";
  state: string;
  email: string;
  phone: string;
  interest: string;
  consent: boolean;
  website: string;
};

const roles = [
  {
    title: "Government Labour Officers",
    icon: Landmark,
    points: [
      "Single-window visibility into registrations, compliance, welfare access, and disputes",
      "District and state dashboards for enforcement planning and scheme monitoring",
      "Better coordination across departments, field teams, and institutions",
    ],
  },
  {
    title: "Labour Inspectors",
    icon: ClipboardList,
    points: [
      "Digital inspection workflows with case context, evidence capture, and follow-up tracking",
      "Risk-prioritized field activity instead of fragmented manual processes",
      "Audit-ready records with stronger transparency and accountability",
    ],
  },
  {
    title: "Employers",
    icon: Building2,
    points: [
      "Guided compliance across wages, benefits, returns, contractors, and worker records",
      "Reduced administrative burden for MSMEs and enterprise teams",
      "A more predictable compliance experience across geographies and workforces",
    ],
  },
  {
    title: "Employees & Workers",
    icon: HardHat,
    points: [
      "Multilingual access to rights, complaints, status tracking, and benefits",
      "Portable profiles and records across jobs, contractors, and locations",
      "Built for blue, white, and grey collar workers alike",
    ],
  },
  {
    title: "Institutions & Labour Unions",
    icon: Handshake,
    points: [
      "Structured worker support and grievance visibility",
      "Awareness, outreach, and community engagement at scale",
      "Stronger collaboration with departments and employers",
    ],
  },
] as const;

const modules = [
  {
    title: "Digital Labour Portal",
    desc: "A unified experience for registration, returns, licenses, grievances, and worker service delivery.",
    icon: Globe,
  },
  {
    title: "Worker Identity & Benefits",
    desc: "Portable digital records, entitlement journeys, document storage, and benefits access.",
    icon: UserRound,
  },
  {
    title: "Compliance Engine",
    desc: "Guided workflows, alerts, and tracking for employers, contractors, and departments.",
    icon: FileCheck2,
  },
  {
    title: "AI Inspection Intelligence",
    desc: "Risk scoring, case routing, and evidence-led prioritization for inspection teams.",
    icon: Sparkles,
  },
  {
    title: "Dispute & Grievance Workflows",
    desc: "Structured intake, mediation support, escalation management, and closure visibility.",
    icon: Scale,
  },
  {
    title: "Mobile Access Layer",
    desc: "Field-first and worker-first access for multilingual, mobile-centric service delivery.",
    icon: Smartphone,
  },
] as const;

const faqs = [
  {
    q: "Who is this platform designed for?",
    a: "It is designed for the full labour ecosystem, including labour departments, inspectors, employers, workers, labour institutes, and labour unions.",
  },
  {
    q: "What does early access include?",
    a: "Early access includes product walkthroughs, pilot discussions, implementation planning, and priority consideration for rollout cohorts.",
  },
  {
    q: "Can this support state-level or district-level deployment?",
    a: "Yes. The platform is structured for role-based implementation across departments, regions, and institutions with centralized oversight and local execution.",
  },
] as const;

const initialForm: FormState = {
  fullName: "",
  organization: "",
  role: "",
  state: "",
  email: "",
  phone: "",
  interest: "",
  consent: false,
  website: "",
};

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{subtitle}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-2xl font-semibold tracking-tight text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default function LabourPlatformWebsite() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const endpoint = process.env.NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT || "/api/early-access";

  const isValid = useMemo(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return (
      form.fullName.trim().length >= 2 &&
      form.organization.trim().length >= 2 &&
      form.role.trim().length > 0 &&
      emailValid &&
      form.interest.trim().length >= 10 &&
      form.consent &&
      form.website.trim() === ""
    );
  }, [form]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!isValid) {
      setSubmitError("Please complete all required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          organization: form.organization.trim(),
          role: form.role,
          state: form.state.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          interest: form.interest.trim(),
          submittedAt: new Date().toISOString(),
          source: "labour-platform-website",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Submission failed. Please try again.");
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500">LabourTech Platform</div>
              <div className="text-lg font-semibold tracking-tight">Unified Labour Access</div>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#solutions" className="transition hover:text-slate-900">Solutions</a>
            <a href="#users" className="transition hover:text-slate-900">Users</a>
            <a href="#how-it-works" className="transition hover:text-slate-900">How it Works</a>
            <a href="#faq" className="transition hover:text-slate-900">FAQ</a>
            <a href="#early-access" className="transition hover:text-slate-900">Early Access</a>
          </nav>
          <a href="#early-access" className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5">
            Join Early Access <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_left,rgba(16,185,129,0.12),transparent_24%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                <BellRing className="h-4 w-4" />
                Product platform for labour governance and worker access
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                One digital layer to solve labour issues across
                <span className="block text-indigo-600">blue, white, and grey collar workforces.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Built for labour departments, inspectors, employers, workers, institutions, and unions, this
                platform simplifies compliance, strengthens worker protections, improves transparency, and creates a
                more connected labour ecosystem.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#early-access" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5">
                  Request Early Access <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#solutions" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
                  Explore Platform <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard value="5+" label="Primary user groups" />
                <StatCard value="Blue • White • Grey" label="Worker segments covered" />
                <StatCard value="6" label="Core product modules" />
                <StatCard value="Single Window" label="Target operating model" />
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-500">Product vision</div>
                    <div className="text-2xl font-semibold tracking-tight">Unified Labour Access Stack</div>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4">
                  {[
                    ["Compliance", "Guided workflows for wages, filings, benefits, and employer obligations"],
                    ["Inspections", "Digital field operations with prioritization and evidence capture"],
                    ["Grievances", "Structured complaint intake, routing, mediation, and resolution tracking"],
                    ["Worker Access", "Multilingual access to rights, benefits, support, and status updates"],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <div className="font-semibold text-slate-900">{title}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">{desc}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Sparkles className="h-4 w-4" />
                    Why teams join early
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-100">
                    <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Shape pilot workflows and rollout priorities</li>
                    <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Access priority onboarding for departments and institutions</li>
                    <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Prepare for deployment with guided discovery sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="users" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="Who it serves" title="Designed for the full labour ecosystem" subtitle="The product strategy connects government enforcement, employer compliance, and worker access within one role-aware platform experience." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">{role.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section id="solutions" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <SectionHeading eyebrow="Core platform" title="A modular operating layer for labour reform, compliance, and worker support" subtitle="Each module is structured to reduce friction, improve accountability, and scale implementation across departments, employers, and worker communities." />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <div key={module.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">{module.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{module.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="How it works" title="From fragmented labour processes to one connected digital system" subtitle="The implementation model brings together policy workflows, digital access, analytics, and role-based execution into a modern labour platform." />
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {[
              { step: "01", title: "Onboard departments and organizations", desc: "Configure departments, employers, institutions, unions, and authorized field roles." },
              { step: "02", title: "Digitize priority journeys", desc: "Launch registration, grievance, compliance, benefits, and inspection workflows." },
              { step: "03", title: "Enable field teams and worker access", desc: "Support mobile, multilingual interaction for officers, employers, and workers." },
              { step: "04", title: "Measure outcomes and improve accountability", desc: "Use analytics, alerts, and risk signals to improve service delivery and enforcement." },
            ].map((item) => (
              <div key={item.step} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold tracking-[0.25em] text-indigo-600">{item.step}</div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-200">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Why this matters</div>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight">Less compliance friction, stronger worker access, better public outcomes</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  This is not only a digitization layer. It is an operating model for labour service delivery,
                  compliance management, enforcement support, and workforce inclusion.
                </p>
              </div>
              <div className="grid gap-4">
                {[
                  "Reduce compliance friction for employers and departments",
                  "Expand formal access for informal and distributed workforces",
                  "Improve transparency in inspections, claims, and grievance handling",
                  "Create a scalable digital labour infrastructure for public and private stakeholders",
                ].map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-sm leading-6 text-slate-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="early-access" className="border-t border-slate-200 bg-gradient-to-b from-indigo-50 to-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <SectionHeading eyebrow="Early access" title="Join the waitlist for pilot access and rollout planning" subtitle="Selected government bodies, employers, labour institutions, and worker organizations can join early to shape the first deployment cohorts." />
              <div className="mt-8 space-y-4">
                {[
                  "Priority consideration for pilots and partner programs",
                  "Role-based product walkthroughs for departments, employers, and institutions",
                  "Implementation planning support for rollout readiness",
                  "Direct input into roadmap priorities and regional use cases",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-sm leading-6 text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200">
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-slate-500">Live form flow</div>
                      <div className="text-2xl font-semibold tracking-tight text-slate-900">Request early access</div>
                    </div>
                    <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
                    <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => updateField("website", e.target.value)} className="hidden" aria-hidden="true" />
                    <label className="sm:col-span-1">
                      <div className="mb-2 text-sm font-medium text-slate-700">Full name</div>
                      <input value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900" placeholder="Enter your full name" required />
                    </label>
                    <label className="sm:col-span-1">
                      <div className="mb-2 text-sm font-medium text-slate-700">Organization</div>
                      <input value={form.organization} onChange={(e) => updateField("organization", e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900" placeholder="Department, company, institute, or union" required />
                    </label>
                    <label className="sm:col-span-1">
                      <div className="mb-2 text-sm font-medium text-slate-700">Role</div>
                      <select value={form.role} onChange={(e) => updateField("role", e.target.value as FormState["role"])} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900" required>
                        <option value="">Select your role</option>
                        <option>Government Labour Officer</option>
                        <option>Labour Inspector</option>
                        <option>Employer</option>
                        <option>Employee / Worker</option>
                        <option>Labour Institute</option>
                        <option>Labour Union</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <label className="sm:col-span-1">
                      <div className="mb-2 text-sm font-medium text-slate-700">State / Region</div>
                      <input value={form.state} onChange={(e) => updateField("state", e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900" placeholder="For example: Karnataka" />
                    </label>
                    <label className="sm:col-span-1">
                      <div className="mb-2 text-sm font-medium text-slate-700">Work email</div>
                      <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900" placeholder="name@organization.org" required />
                    </label>
                    <label className="sm:col-span-1">
                      <div className="mb-2 text-sm font-medium text-slate-700">Phone number</div>
                      <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900" placeholder="Optional" />
                    </label>
                    <label className="sm:col-span-2">
                      <div className="mb-2 text-sm font-medium text-slate-700">What are you most interested in?</div>
                      <textarea rows={4} value={form.interest} onChange={(e) => updateField("interest", e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900" placeholder="Tell us whether your priority is compliance, inspections, worker registration, benefits, grievances, analytics, or district/state rollout planning." required />
                    </label>
                    <label className="sm:col-span-2 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <input type="checkbox" checked={form.consent} onChange={(e) => updateField("consent", e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300" required />
                      <span className="text-sm leading-6 text-slate-700">
                        I agree to be contacted regarding early access, product updates, pilot opportunities, and
                        rollout discussions.
                      </span>
                    </label>
                    {submitError ? (
                      <div className="sm:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{submitError}</div>
                    ) : null}
                    <div className="sm:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-5 text-slate-500">
                        This form posts to <span className="font-medium text-slate-700">{endpoint}</span>. Configure
                        the endpoint for your CRM, API route, or backend service.
                      </p>
                      <button type="submit" disabled={!isValid || isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:bg-slate-300 enabled:bg-slate-900 enabled:hover:-translate-y-0.5">
                        {isSubmitting ? "Submitting..." : "Join the waitlist"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[1.5rem] bg-slate-50 p-8 text-center ring-1 ring-slate-200">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">You are on the list</h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                    Thank you for your interest. We will reach out with early access updates, pilot opportunities, and
                    product walkthrough details aligned to your role and organization.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
                    Submit another response
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common questions from early partners" subtitle="This section helps government teams, employers, and institutions understand how the platform is intended to be adopted." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <div className="font-semibold text-slate-700">Unified Labour Access</div>
            <div className="mt-1">Labour technology platform for compliance, worker access, and public-sector modernization.</div>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Briefcase className="h-4 w-4" />
            Next.js-ready landing page with live form submission flow
          </div>
        </div>
      </footer>
    </div>
  );
}
