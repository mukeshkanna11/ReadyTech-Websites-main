import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

import {
  FaArrowRight,
  FaCheckCircle,
  FaChartLine,
  FaUsers,
  FaFileInvoiceDollar,
  FaBoxes,
  FaShoppingCart,
  FaHandshake,
  FaShieldAlt,
  FaCloud,
  FaRocket,
  FaLayerGroup,
  FaCogs,
  FaGlobe,
  FaHeadset,
  FaChartPie,
  FaUserTie,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaBullseye,
  FaTimes,
  FaRobot,
  FaStar,
  FaArrowLeft,
} from "react-icons/fa";

/* =========================================================
   PRODUCT LINKS
   Replace these with your actual deployed product URLs
========================================================= */

const CRM_PRODUCT_URL = "https://crmreadytechsolutions.in";
const GROWTH_PRODUCT_URL = "https://readytech-growth-suit.vercel.app";
// TODO: set the ERP product URL (Access Product shows "not configured" until then)
const ERP_PRODUCT_URL = "";

/* =========================================================
   PRICING PLANS
   Each product with a `pricing` config gets a Plan Details modal.
   Comparison values: true = ✓, null = —, string = shown as-is.
========================================================= */

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://readytech-websites.onrender.com/api";

/* ---------- ERP + CRM Combo ---------- */

const COMBO_LIMITS = [
  { key: "users", label: "Users", icon: <FaUsers /> },
  { key: "companies", label: "Companies / Branches", icon: <FaGlobe /> },
  { key: "warehouses", label: "Warehouses", icon: <FaBoxes /> },
  { key: "pipelines", label: "Sales Pipelines", icon: <FaChartLine /> },
  { key: "ai", label: "AI Points / month", icon: <FaRobot /> },
];

// TODO: confirm aiFeatures / support / savings copy before going live
const COMBO_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "₹6,999",
    period: "/month",
    idealFor: "Small businesses running sales and operations from one place.",
    limits: { users: "5", companies: "1", warehouses: "1", pipelines: "1", ai: "150" },
    ai: "Essential AI assistance",
    perks: ["Email support", "One subscription instead of two"],
  },
  {
    id: "professional",
    name: "Professional",
    price: "₹13,999",
    period: "/month",
    idealFor: "Growing teams with multiple branches and warehouses.",
    popular: true,
    limits: { users: "15", companies: "3", warehouses: "3", pipelines: "3", ai: "500" },
    ai: "AI insights & smart automation",
    perks: ["Priority email & chat support", "One subscription instead of two"],
  },
  {
    id: "business",
    name: "Business",
    price: "₹27,999",
    period: "/month",
    idealFor: "Established businesses scaling across locations.",
    limits: { users: "50", companies: "10", warehouses: "10", pipelines: "10", ai: "1,200" },
    ai: "Advanced AI insights & automation",
    perks: ["Priority support + guided onboarding", "One subscription instead of two"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    idealFor: "Large organizations needing tailored limits and setup.",
    limits: { users: "Custom", companies: "Custom", warehouses: "Custom", pipelines: "Unlimited", ai: "Custom" },
    ai: "Custom AI allocation & workflows",
    perks: ["Dedicated account manager", "Custom pricing for your scale"],
  },
];

const COMBO_MODULES = ["CRM", "Sales", "Inventory", "Finance", "Purchases", "Analytics"];

const COMBO_PRICING = {
  label: "ERP + CRM",
  title: "ERP + CRM Combo Plans",
  heading: "One platform for sales and operations",
  intro: `Every Combo plan includes both the ERP and CRM core modules — ${COMBO_MODULES.join(", ")} — in a single subscription. AI points are credits used whenever you use the built-in AI features.`,
  summaryNote: "Includes ERP + CRM core modules",
  notes: ["Prices exclude applicable taxes. Our team will confirm your setup before activation."],
  limits: COMBO_LIMITS,
  plans: COMBO_PLANS,
  comparison: [
    { section: "Included Modules" },
    ...COMBO_MODULES.map((label) => ({ label, values: [true, true, true, true] })),
    { section: "Plan Limits" },
    ...COMBO_LIMITS.map(({ key, label }) => ({ label, values: COMBO_PLANS.map((p) => p.limits[key]) })),
    { section: "Extras" },
    { label: "AI Features", values: COMBO_PLANS.map((p) => p.ai) },
    { label: "Support", values: COMBO_PLANS.map((p) => p.perks[0]) },
    { label: "Savings", values: COMBO_PLANS.map((p) => p.perks[1]) },
  ],
};

/* ---------- Digital Marketing SaaS (Growth Suite) ---------- */

const SAAS_LIMITS = [
  { key: "users", label: "Users", icon: <FaUsers /> },
  { key: "workspaces", label: "Workspaces", icon: <FaLayerGroup /> },
  { key: "keywords", label: "Keyword Tracking", icon: <FaBullseye /> },
  { key: "social", label: "Social Platforms", icon: <FaGlobe /> },
  { key: "posts", label: "Post Capacity", icon: <FaCalendarCheck /> },
];

const SAAS_PLANS = [
  {
    id: "saas-starter",
    name: "SaaS Starter",
    price: "₹3,999",
    period: "/month",
    limits: { users: "2", workspaces: "1", keywords: "10", social: "2", posts: "30" },
    ai: "150 AI Points / month",
    aiNote: "Approx. 1.5M token budget • Top-up available",
    perks: [
      "Basic SEO",
      "AI Marketing Assistant",
      "Meta Ads Integration",
      "Basic AI Content Generation",
      "Basic Workflow Automation",
    ],
  },
  {
    id: "saas-growth",
    name: "SaaS Growth",
    price: "₹7,999",
    period: "/month",
    limits: { workspaces: "1", keywords: "50", social: "4", posts: "100" },
    ai: "400 AI Points / month",
    aiNote: "Approx. 4M token budget • Top-up available",
    perks: [
      "Everything in Starter",
      "Advanced SEO",
      "Google Ads Integration",
      "CRM Integration",
      "Competitor Monitoring: 3",
      "AI Competitor Insights",
      "AI Campaign Analysis",
      "Weekly + Monthly AI Reports",
    ],
  },
  {
    id: "saas-professional",
    name: "SaaS Professional",
    price: "₹14,999",
    period: "/month",
    limits: { keywords: "200", social: "5+", posts: "300" },
    ai: "1,000 AI Points / month",
    aiNote: "Approx. 10M token budget • Top-up available",
    perks: [
      "Everything in Growth",
      "AI-powered Content Calendar",
      "Competitor Monitoring: 10",
      "AI Trend / Predictive Insights",
      "White-label Reports",
      "Advanced AI Marketing Features",
    ],
  },
  {
    id: "saas-enterprise",
    name: "SaaS Enterprise",
    price: "Custom",
    period: "",
    limits: { users: "Custom", workspaces: "Custom", keywords: "Custom", social: "Unlimited / Custom", posts: "Custom" },
    ai: "Custom AI Allocation",
    perks: [
      "Everything in Professional",
      "Custom limits",
      "Custom integrations, API & workflows",
      "Custom reporting",
      "Custom support",
    ],
  },
];

const SAAS_PRICING = {
  label: "Digital Marketing SaaS",
  title: "Digital Marketing SaaS Plans",
  heading: "AI-powered marketing software for your team",
  intro: "Software-only SaaS subscription. AI points are credits used whenever you use the built-in AI features, backed by the token budget shown on each plan.",
  summaryNote: "Software-only SaaS subscription",
  notes: [
    "Software-only SaaS subscription. Human-managed marketing services are separate.",
    "Ad spend is NOT included.",
    "AI usage warning at 80% of your monthly AI points. AI top-up available for Starter, Growth and Professional.",
  ],
  limits: SAAS_LIMITS,
  plans: SAAS_PLANS,
  comparison: [
    { section: "Plan Limits" },
    ...SAAS_LIMITS.map(({ key, label }) => ({ label, values: SAAS_PLANS.map((p) => p.limits[key]) })),
    { label: "Competitor Monitoring", values: [null, "3", "10", true] },
    { section: "AI Allocation" },
    { label: "AI Points / month", values: ["150", "400", "1,000", "Custom"] },
    { label: "Token Budget", values: ["≈ 1.5M", "≈ 4M", "≈ 10M", "Custom"] },
    { label: "AI Usage Warning", values: ["80%", "80%", "80%", null] },
    { label: "AI Top-up", values: [true, true, true, null] },
    { section: "SEO & Content" },
    { label: "SEO", values: ["Basic", "Advanced", "Advanced", true] },
    { label: "AI Content Generation", values: ["Basic", true, true, true] },
    { label: "AI-powered Content Calendar", values: [null, null, true, true] },
    { section: "AI Marketing" },
    { label: "AI Marketing Assistant", values: [true, true, true, true] },
    { label: "AI Competitor Insights", values: [null, true, true, true] },
    { label: "AI Campaign Analysis", values: [null, true, true, true] },
    { label: "AI Trend / Predictive Insights", values: [null, null, true, true] },
    { label: "Advanced AI Marketing Features", values: [null, null, true, true] },
    { section: "Integrations & Reporting" },
    { label: "Meta Ads Integration", values: [true, true, true, true] },
    { label: "Google Ads Integration", values: [null, true, true, true] },
    { label: "CRM Integration", values: [null, true, true, true] },
    { label: "Workflow Automation", values: ["Basic", true, true, "Custom"] },
    { label: "AI Reports", values: [null, "Weekly + Monthly", "Weekly + Monthly", true] },
    { label: "White-label Reports", values: [null, null, true, true] },
    { label: "Custom Integrations, API & Reporting", values: [null, null, null, true] },
    { label: "Custom Support", values: [null, null, null, true] },
  ],
};

/* ---------- ERP SaaS ---------- */

const ERP_LIMITS = [
  { key: "users", label: "Users", icon: <FaUsers /> },
  { key: "companies", label: "Companies / Branches", icon: <FaGlobe /> },
  { key: "warehouses", label: "Warehouses", icon: <FaBoxes /> },
];

const ERP_PLANS = [
  {
    id: "erp-starter",
    name: "ERP Starter",
    price: "₹4,999",
    period: "/month",
    priceNote: "or ₹59,988/year",
    limits: { users: "5", companies: "1", warehouses: "1" },
    ai: "100 AI Points / month",
    aiNote: "Approx. 1M tokens • Top-up available",
    perks: [
      "Basic dashboard & inventory",
      "Basic Tax/GST",
      "Basic workflow automation",
      "Daily backup",
      "Email support",
    ],
  },
  {
    id: "erp-professional",
    name: "ERP Professional",
    price: "₹9,999",
    period: "/month",
    popular: true,
    limits: { users: "15", companies: "3", warehouses: "3" },
    ai: "300 AI Points / month",
    aiNote: "Approx. 3M tokens • Top-up available",
    perks: [
      "Advanced dashboard & inventory",
      "HR, attendance & leave",
      "API access",
      "AI business insights",
      "Email + chat support, standard SLA",
    ],
  },
  {
    id: "erp-business",
    name: "ERP Business",
    price: "₹19,999",
    period: "/month",
    limits: { users: "50", companies: "10", warehouses: "10" },
    ai: "800 AI Points / month",
    aiNote: "Approx. 8M tokens • Top-up available",
    perks: [
      "Advanced + custom dashboard",
      "Payroll & advanced HR",
      "Custom reports & advanced projects",
      "AI forecasting / predictive insights",
      "Priority support & SLA",
    ],
  },
  {
    id: "erp-enterprise",
    name: "ERP Enterprise",
    price: "Custom",
    period: "",
    limits: { users: "Custom", companies: "Unlimited", warehouses: "Unlimited" },
    ai: "Custom AI Points",
    aiNote: "Custom token budget",
    perks: [
      "Custom limits",
      "Unlimited / custom infrastructure",
      "Enterprise inventory",
      "Dedicated support & custom SLA",
    ],
  },
];

const ALL = [true, true, true, true];

const ERP_PRICING = {
  label: "ERP SaaS",
  title: "ERP SaaS Plans",
  heading: "Run your business operations from one ERP",
  intro: "Cloud ERP subscription for inventory, purchasing, sales, finance, HR and projects. AI points are credits used whenever you use the built-in AI features, backed by the token budget shown on each plan.",
  summaryNote: "ERP SaaS subscription",
  notes: [
    "ERP Starter is also available at ₹59,988/year.",
    "AI usage warning at 80% of your monthly AI points. AI top-up available for Starter, Professional and Business.",
  ],
  limits: ERP_LIMITS,
  plans: ERP_PLANS,
  comparison: [
    { section: "Core & Setup" },
    { label: "Core ERP", values: ALL },
    { label: "Dashboard & KPIs", values: ["Basic", "Advanced", "Advanced + Custom", "Custom"] },
    { label: "Company / Branch Management", values: ["1", "3", "10", "Unlimited"] },
    { label: "Users", values: ["5", "15", "50", "Custom"] },
    { label: "Roles & Permissions", values: ALL },
    { section: "Masters & Inventory" },
    { label: "Customer Management", values: ALL },
    { label: "Vendor Management", values: ALL },
    { label: "Product / Item Master", values: ALL },
    { label: "Inventory", values: ["Basic", "Advanced", "Advanced", "Enterprise"] },
    { label: "Multi-Warehouse", values: ALL },
    { label: "Warehouses", values: ["1", "3", "10", "Unlimited"] },
    { section: "Purchase & Sales" },
    { label: "Purchase", values: ALL },
    { label: "Sales", values: ALL },
    { label: "Quotation & Sales Order", values: ALL },
    { label: "Invoice", values: ALL },
    { label: "Payment Tracking", values: ALL },
    { section: "Finance" },
    { label: "Expense", values: ["Basic", true, "Advanced", "Custom"] },
    { label: "Accounting Integration", values: ["Optional", true, true, true] },
    { label: "Tax / GST", values: ["Basic", "Advanced", "Advanced", "Custom"] },
    { label: "Financial Reports", values: ALL },
    { section: "HR & Projects" },
    { label: "HR / Employee", values: [null, "Basic", "Advanced", "Custom"] },
    { label: "Payroll", values: [null, "Optional", true, "Custom"] },
    { label: "Attendance", values: [null, true, true, "Custom"] },
    { label: "Leave", values: [null, true, true, "Custom"] },
    { label: "Project Management", values: [null, "Basic", "Advanced", "Custom"] },
    { section: "Automation, Reports & Integrations" },
    { label: "Workflow Automation", values: ["Basic", "Advanced", "Advanced", "Custom"] },
    { label: "Reports & Analytics", values: ["Basic", "Advanced", "Advanced", "Custom"] },
    { label: "Custom Reports", values: [null, "Limited", true, true] },
    { label: "API Access", values: [null, true, true, true] },
    { label: "Third-party Integrations", values: ["Limited", "Standard", "Advanced", "Custom"] },
    { section: "Platform & Support" },
    { label: "Mobile Responsive", values: ALL },
    { label: "Mobile App", values: [null, "Optional", "Optional", "Custom"] },
    { label: "Data Export", values: ALL },
    { label: "Backup", values: ["Daily", "Daily", "Daily", "Custom"] },
    { label: "Support", values: ["Email", "Email + Chat", "Priority", "Dedicated"] },
    { label: "SLA", values: [null, "Standard", "Priority", "Custom"] },
    { section: "AI" },
    { label: "AI Assistant", values: ALL },
    { label: "AI Document / Data Summaries", values: ALL },
    { label: "AI Business Insights", values: [null, true, true, true] },
    { label: "AI Forecasting / Predictive Insights", values: [null, null, true, "Custom"] },
    { label: "AI Workflow Assistance", values: ["Basic", "Advanced", "Advanced", "Custom"] },
    { label: "AI Points / month", values: ["100", "300", "800", "Custom"] },
    { label: "Token Budget", values: ["1M", "3M", "8M", "Custom"] },
    { label: "AI Usage Warning", values: ["80%", "80%", "80%", "Custom"] },
    { label: "AI Top-up", values: ["Available", "Available", "Available", "Custom"] },
  ],
};

/* ---------- CRM SaaS ---------- */

const CRM_LIMITS = [
  { key: "users", label: "Users", icon: <FaUsers /> },
  { key: "pipelines", label: "Sales Pipelines", icon: <FaChartLine /> },
  { key: "leadSources", label: "Lead Sources", icon: <FaBullseye /> },
  { key: "emailTemplates", label: "Email Templates", icon: <FaFileInvoiceDollar /> },
];

const CRM_PLANS = [
  {
    id: "crm-starter",
    name: "CRM Starter",
    price: "₹2,999",
    period: "/month",
    priceNote: "or ₹35,988/year",
    limits: { users: "5", pipelines: "1", leadSources: "5", emailTemplates: "5" },
    ai: "50 AI Points / month",
    aiNote: "Approx. 500K tokens • Top-up available",
    perks: ["Basic CRM dashboard", "5 custom fields", "Limited integrations", "Daily backup", "Email support"],
  },
  {
    id: "crm-professional",
    name: "CRM Professional",
    price: "₹5,999",
    period: "/month",
    popular: true,
    limits: { users: "15", pipelines: "3", leadSources: "Unlimited", emailTemplates: "25" },
    ai: "150 AI Points / month",
    aiNote: "Approx. 1.5M tokens • Top-up available",
    perks: ["Advanced CRM dashboard", "20 custom fields", "API access", "Standard integrations", "Email + chat support, standard SLA"],
  },
  {
    id: "crm-business",
    name: "CRM Business",
    price: "₹11,999",
    period: "/month",
    limits: { users: "50", pipelines: "10", leadSources: "Unlimited", emailTemplates: "Unlimited" },
    ai: "400 AI Points / month",
    aiNote: "Approx. 4M tokens • Top-up available",
    perks: ["Advanced + custom dashboard", "Unlimited custom fields", "API access", "Advanced integrations", "Priority support & SLA"],
  },
  {
    id: "crm-enterprise",
    name: "CRM Enterprise",
    price: "Custom",
    period: "",
    limits: { users: "Custom", pipelines: "Unlimited", leadSources: "Unlimited", emailTemplates: "Unlimited" },
    ai: "Custom AI Points",
    aiNote: "Custom token budget",
    perks: ["Custom limits", "Unlimited custom fields", "Custom integrations", "Dedicated support & custom SLA"],
  },
];

// TODO: rows with `values: null` are awaiting the CRM table values and stay hidden until filled
const CRM_ROWS = [
  { section: "Dashboard & Leads" },
  { label: "CRM Dashboard", values: ["Basic", "Advanced", "Advanced + Custom", "Custom"] },
  { label: "Lead Management", values: null },
  { label: "Lead Capture Forms", values: null },
  { label: "Lead Sources", values: ["5", "Unlimited", "Unlimited", "Unlimited"] },
  { section: "Contacts & Deals" },
  { label: "Contact Management", values: null },
  { label: "Company / Account Management", values: null },
  { label: "Deal / Opportunity Management", values: null },
  { label: "Sales Pipeline", values: ["1", "3", "10", "Unlimited"] },
  { label: "Pipeline Stages", values: null },
  { label: "Sales Forecasting", values: null },
  { section: "Activities & Communication" },
  { label: "Activity Management", values: null },
  { label: "Tasks & Follow-ups", values: null },
  { label: "Calendar Integration", values: null },
  { label: "Email Integration", values: null },
  { label: "Email Templates", values: ["5", "25", "Unlimited", "Unlimited"] },
  { label: "Email Campaigns", values: null },
  { label: "SMS / WhatsApp Integration", values: null },
  { label: "Call / Communication Logs", values: null },
  { label: "Customer Support / Tickets", values: null },
  { label: "Customer Interaction History", values: null },
  { label: "Notes & Attachments", values: null },
  { section: "Customization & Automation" },
  { label: "Custom Fields", values: ["5", "20", "Unlimited", "Unlimited"] },
  { label: "Custom Modules", values: null },
  { label: "Workflow Automation", values: null },
  { label: "Lead Assignment Rules", values: null },
  { label: "Approval Workflows", values: null },
  { section: "Reports & Analytics" },
  { label: "Reports & Analytics", values: null },
  { label: "Custom Reports", values: null },
  { label: "Sales Performance Reports", values: null },
  { label: "Conversion Analytics", values: null },
  { section: "Users & Integrations" },
  { label: "User Roles & Permissions", values: null },
  { label: "Users", values: ["5", "15", "50", "Custom"] },
  { label: "Territory / Team Management", values: null },
  { label: "API Access", values: [null, true, true, true] },
  { label: "Third-party Integrations", values: ["Limited", "Standard", "Advanced", "Custom"] },
  { section: "Platform & Support" },
  { label: "Mobile Responsive", values: null },
  { label: "Mobile App", values: null },
  { label: "Data Import / Export", values: null },
  { label: "Backup", values: ["Daily", "Daily", "Daily", "Custom"] },
  { label: "Support", values: ["Email", "Email + Chat", "Priority", "Dedicated"] },
  { label: "SLA", values: [null, "Standard", "Priority", "Custom"] },
  { section: "AI" },
  { label: "AI Sales Assistant", values: null },
  { label: "AI Lead Qualification", values: null },
  { label: "AI Email / Message Drafting", values: null },
  { label: "AI Meeting / Call Summary", values: null },
  { label: "AI Customer Insights", values: null },
  { label: "AI Lead Scoring", values: null },
  { label: "AI Sales Forecasting", values: null },
  { label: "AI Follow-up Suggestions", values: null },
  { label: "AI Workflow Assistance", values: null },
  { label: "AI Points / Month", values: ["50", "150", "400", "Custom"] },
  { label: "Approx. Token Budget", values: ["500K", "1.5M", "4M", "Custom"] },
  { label: "AI Usage Warning", values: ["80%", "80%", "80%", "Custom"] },
  { label: "AI Top-up", values: ["Available", "Available", "Available", "Custom"] },
];

const CRM_PRICING = {
  label: "CRM SaaS",
  title: "CRM SaaS Plans",
  heading: "Manage leads, deals and customers in one CRM",
  intro: "Cloud CRM subscription for your sales team. AI points are credits used whenever you use the built-in AI features, backed by the token budget shown on each plan.",
  summaryNote: "CRM SaaS subscription",
  notes: [
    "CRM Starter is also available at ₹35,988/year.",
    "AI usage warning at 80% of your monthly AI points. AI top-up available for Starter, Professional and Business.",
  ],
  limits: CRM_LIMITS,
  plans: CRM_PLANS,
  // hide empty sections and rows still awaiting values
  comparison: CRM_ROWS.filter((row, i, rows) =>
    row.section ? rows.slice(i + 1).find((r) => r.section || r.values)?.values : row.values
  ),
};

/* ---------- Enquiry form ---------- */

const ENQUIRY_FIELDS = [
  { name: "name", label: "Full Name", autoComplete: "name", required: true },
  { name: "company", label: "Company Name", autoComplete: "organization", required: true },
  { name: "email", label: "Work Email", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", required: true },
  { name: "city", label: "City / Location", autoComplete: "address-level2" },
  { name: "users", label: "Number of Users", type: "number", min: 1 },
];

const EMPTY_ENQUIRY = { name: "", company: "", email: "", phone: "", city: "", users: "", message: "" };

const INPUT_CLASS =
  "w-full px-4 py-3 text-sm text-white placeholder-gray-500 transition border rounded-xl border-white/10 bg-white/[0.04] focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06]";

const limitValue = (plan, key) => plan.limits[key] ?? "—";

/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [
  {
    id: "crm-erp",
    badge: "Business Management Platform",
    title: "ReadyTech CRM & ERP",
    shortTitle: "CRM & ERP",
    description:
      "A powerful all-in-one business management platform designed to manage customers, sales, inventory, finance, operations and business workflows from one intelligent system.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
    url: CRM_PRODUCT_URL,
    pricing: COMBO_PRICING,
    icon: <FaLayerGroup />,
    gradient: "from-cyan-400 via-blue-500 to-purple-500",

    features: [
      "Customer & Client Management",
      "Lead & Opportunity Management",
      "Sales & Quotation Management",
      "Invoice & Payment Management",
      "Product & Inventory Management",
      "Purchase & Vendor Management",
      "Reports & Business Analytics",
      "Role-Based User Access",
    ],

    modules: [
      {
        title: "CRM",
        description:
          "Manage leads, clients, contacts, opportunities and complete customer relationships.",
        icon: <FaUsers />,
      },
      {
        title: "Sales",
        description:
          "Manage quotations, sales workflows, invoices and customer transactions.",
        icon: <FaShoppingCart />,
      },
      {
        title: "Inventory",
        description:
          "Track products, stock levels, reserved stock, movements and inventory value.",
        icon: <FaBoxes />,
      },
      {
        title: "Finance",
        description:
          "Manage invoices, payments, financial information and business reports.",
        icon: <FaFileInvoiceDollar />,
      },
      {
        title: "Purchases",
        description:
          "Manage vendors, purchase orders and procurement workflows efficiently.",
        icon: <FaHandshake />,
      },
      {
        title: "Analytics",
        description:
          "Turn operational data into meaningful reports and business insights.",
        icon: <FaChartPie />,
      },
    ],
  },

  {
    id: "growth-suite",
    badge: "Business Growth Platform",
    title: "ReadyTech Growth Suite",
    shortTitle: "Growth Suite",
    description:
      "A modern growth-focused platform designed to help businesses organize their growth activities, improve productivity and build stronger customer engagement.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    url: GROWTH_PRODUCT_URL,
    pricing: SAAS_PRICING,
    icon: <FaRocket />,
    gradient: "from-purple-400 via-fuchsia-500 to-pink-500",

    features: [
      "Business Growth Management",
      "Customer Engagement",
      "Performance Tracking",
      "Business Insights",
      "Team Productivity",
      "Growth Planning",
      "Activity Management",
      "Scalable Business Workflows",
    ],

    modules: [
      {
        title: "Growth",
        description:
          "Organize growth initiatives and monitor business progress in one place.",
        icon: <FaChartLine />,
      },
      {
        title: "Customers",
        description:
          "Build stronger customer relationships with organized engagement workflows.",
        icon: <FaUsers />,
      },
      {
        title: "Performance",
        description:
          "Monitor important business activities and performance indicators.",
        icon: <FaBullseye />,
      },
      {
        title: "Productivity",
        description:
          "Help teams stay organized and focused on business priorities.",
        icon: <FaCalendarCheck />,
      },
      {
        title: "Insights",
        description:
          "Understand business activity through useful reports and insights.",
        icon: <FaChartPie />,
      },
      {
        title: "Automation",
        description:
          "Streamline repetitive workflows and improve operational efficiency.",
        icon: <FaCogs />,
      },
    ],
  },

  {
    id: "erp-saas",
    badge: "Business Operations Platform",
    title: "ReadyTech ERP",
    shortTitle: "ERP SaaS",
    description:
      "A cloud ERP to run inventory, purchasing, sales, finance, HR and projects across your companies, branches and warehouses — with built-in AI assistance.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80",
    url: ERP_PRODUCT_URL,
    pricing: ERP_PRICING,
    icon: <FaBoxes />,
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",

    features: [
      "Company & Branch Management",
      "Multi-Warehouse Inventory",
      "Purchase & Sales Management",
      "Invoicing & Payment Tracking",
      "Tax/GST & Financial Reports",
      "HR, Payroll & Attendance",
      "Workflow Automation",
      "AI Business Insights",
    ],

    modules: [
      {
        title: "Inventory",
        description:
          "Manage items and stock across one or more warehouses.",
        icon: <FaBoxes />,
      },
      {
        title: "Purchase & Sales",
        description:
          "Handle vendors, purchases, quotations, sales orders and invoices.",
        icon: <FaShoppingCart />,
      },
      {
        title: "Finance & GST",
        description:
          "Track payments and expenses, manage Tax/GST and view financial reports.",
        icon: <FaFileInvoiceDollar />,
      },
      {
        title: "HR & Payroll",
        description:
          "Manage employees, attendance, leave and payroll.",
        icon: <FaUserTie />,
      },
      {
        title: "Projects & Workflows",
        description:
          "Organize projects and automate routine business workflows.",
        icon: <FaCogs />,
      },
      {
        title: "AI Insights",
        description:
          "Use AI for business insights, data summaries and workflow assistance.",
        icon: <FaRobot />,
      },
    ],
  },

  {
    id: "crm-saas",
    badge: "Customer Relationship Platform",
    title: "ReadyTech CRM",
    shortTitle: "CRM SaaS",
    description:
      "A cloud CRM to manage leads, contacts, deals and sales pipelines in one place — with built-in AI assistance for your sales team.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    url: CRM_PRODUCT_URL,
    pricing: CRM_PRICING,
    icon: <FaHandshake />,
    gradient: "from-blue-400 via-indigo-500 to-violet-500",

    features: [
      "Lead Management",
      "Contact & Account Management",
      "Deal & Pipeline Management",
      "Email Templates & Integration",
      "Activities, Tasks & Follow-ups",
      "Workflow Automation",
      "Reports & Analytics",
      "AI Sales Assistant",
    ],

    modules: [
      {
        title: "Leads",
        description: "Capture leads from multiple sources and track them in one place.",
        icon: <FaBullseye />,
      },
      {
        title: "Contacts & Accounts",
        description: "Keep every contact, company and interaction organized.",
        icon: <FaUsers />,
      },
      {
        title: "Deals & Pipelines",
        description: "Move opportunities through your sales pipelines stage by stage.",
        icon: <FaChartLine />,
      },
      {
        title: "Activities",
        description: "Manage tasks, follow-ups and calendar activity for your team.",
        icon: <FaCalendarCheck />,
      },
      {
        title: "Automation",
        description: "Automate routine sales workflows and lead handling.",
        icon: <FaCogs />,
      },
      {
        title: "AI Assistance",
        description: "Use AI to support your sales team's everyday work.",
        icon: <FaRobot />,
      },
    ],
  },
];

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

const ProductButton = ({ url, children = "Open Product" }) => {
  const handleOpen = () => {
    if (!url || url.includes("YOUR-")) {
      alert("Product website URL is not configured yet.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleOpen}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-black transition-all duration-300 bg-white rounded-xl hover:scale-[1.03] hover:shadow-xl"
    >
      {children}
      <FaArrowRight className="text-sm" />
    </button>
  );
};

const FeatureItem = ({ children }) => (
  <div className="flex items-start gap-3">
    <FaCheckCircle className="flex-shrink-0 mt-1 text-cyan-400" />
    <span className="text-sm leading-6 text-gray-300">{children}</span>
  </div>
);

const ModuleCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.25 }}
    className="p-5 transition-all duration-300 border rounded-2xl border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.07] hover:border-cyan-400/20"
  >
    <div className="flex items-center justify-center mb-4 text-lg w-11 h-11 rounded-xl bg-cyan-400/10 text-cyan-300">
      {item.icon}
    </div>

    <h4 className="text-base font-semibold text-white">{item.title}</h4>

    <p className="mt-2 text-sm leading-6 text-gray-400">
      {item.description}
    </p>
  </motion.div>
);

const PlanCard = ({ plan, pricing, onChoose }) => (
  <div
    className={`relative flex flex-col p-6 border rounded-2xl backdrop-blur-xl ${
      plan.popular
        ? "border-cyan-400/40 bg-cyan-400/[0.06] shadow-[0_0_40px_-12px_rgba(34,211,238,0.45)]"
        : "border-white/10 bg-white/[0.04]"
    }`}
  >
    {plan.popular && (
      <span className="absolute inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-black -translate-x-1/2 rounded-full -top-3 left-1/2 bg-gradient-to-r from-cyan-400 to-blue-500">
        <FaStar className="text-[10px]" />
        Most Popular
      </span>
    )}

    <span className="self-start px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase border rounded-full text-cyan-300 border-cyan-400/20 bg-cyan-400/10">
      {pricing.label}
    </span>

    <h4 className="mt-3 text-lg font-bold text-white">{plan.name}</h4>
    {plan.idealFor && (
      <p className="mt-1 text-sm leading-6 text-gray-400">{plan.idealFor}</p>
    )}

    <div className="mt-5">
      <span className="text-3xl font-extrabold text-white">{plan.price}</span>
      {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
      {plan.priceNote && <p className="mt-1 text-xs text-gray-500">{plan.priceNote}</p>}
    </div>

    <div className="mt-6 space-y-2.5">
      {pricing.limits.map((limit) => (
        <div key={limit.key} className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-gray-400">
            <span className="text-cyan-400">{limit.icon}</span>
            {limit.label}
          </span>
          <span className="font-semibold text-right text-white">{limitValue(plan, limit.key)}</span>
        </div>
      ))}
    </div>

    <div className="flex items-start gap-3 p-3 mt-6 border rounded-xl border-purple-400/20 bg-purple-400/[0.06]">
      <FaRobot className="flex-shrink-0 mt-1 text-purple-300" />
      <div>
        <p className="text-sm font-semibold text-white">{plan.ai}</p>
        {plan.aiNote && <p className="mt-0.5 text-xs text-gray-400">{plan.aiNote}</p>}
      </div>
    </div>

    <div className="mt-4 space-y-2">
      {plan.perks.map((perk) => (
        <FeatureItem key={perk}>{perk}</FeatureItem>
      ))}
    </div>

    <div className="pt-6 mt-auto">
      <button
        onClick={() => onChoose(plan)}
        className={`inline-flex items-center justify-center w-full gap-2 px-5 py-3 font-semibold transition rounded-xl hover:scale-[1.02] ${
          plan.popular
            ? "text-black bg-gradient-to-r from-cyan-400 to-blue-500"
            : "text-white border border-white/10 bg-white/5 hover:bg-white/10"
        }`}
      >
        Choose Plan
        <FaArrowRight className="text-sm" />
      </button>
    </div>
  </div>
);

const ComparisonCell = ({ value }) => {
  if (value === true) return <FaCheckCircle className="mx-auto text-cyan-400" />;
  if (value == null) return <span className="text-gray-600">—</span>;
  return value;
};

const ComparisonTable = ({ pricing }) => (
  <div className="mt-12">
    <h4 className="text-xl font-bold text-white">Detailed Feature Comparison</h4>
    <p className="mt-2 text-sm text-gray-500">Compare every plan side by side.</p>

    <div className="mt-6 overflow-x-auto border rounded-2xl border-white/10">
      <table className="w-full min-w-[720px] text-sm text-left">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04]">
            <th className="p-4 font-semibold text-gray-300">Feature</th>
            {pricing.plans.map((p) => (
              <th
                key={p.id}
                className={`p-4 font-semibold text-center ${p.popular ? "text-cyan-300 bg-cyan-400/[0.06]" : "text-white"}`}
              >
                {p.name}
                <span className="block mt-0.5 text-xs font-normal text-gray-400">
                  {p.price}{p.period}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricing.comparison.map((row) =>
            row.section ? (
              <tr key={row.section} className="bg-white/[0.02]">
                <td colSpan={pricing.plans.length + 1} className="px-4 py-2 text-xs font-semibold tracking-widest uppercase text-cyan-400">
                  {row.section}
                </td>
              </tr>
            ) : (
              <tr key={row.label} className="border-t border-white/5">
                <td className="p-4 text-gray-400">{row.label}</td>
                {pricing.plans.map((p, i) => (
                  <td key={p.id} className={`p-4 text-center text-gray-200 ${p.popular ? "bg-cyan-400/[0.04]" : ""}`}>
                    <ComparisonCell value={row.values[i]} />
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const EnquiryForm = ({ plan, pricing, onBack, onClose }) => {
  const [form, setForm] = useState(EMPTY_ENQUIRY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const limits = pricing.limits
      .map((l) => `${l.label}: ${limitValue(plan, l.key)}`)
      .concat(`AI: ${plan.ai}${plan.aiNote ? ` (${plan.aiNote})` : ""}`)
      .join(", ");

    try {
      await axios.post(`${API_BASE_URL}/contact`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `${pricing.label} — ${plan.name} Plan Enquiry`,
        message: [
          `Plan: ${pricing.label} — ${plan.name} (${plan.price}${plan.period}${plan.priceNote ? `, ${plan.priceNote}` : ""})`,
          `Included: ${limits}`,
          `Company: ${form.company}`,
          `City/Location: ${form.city || "Not specified"}`,
          `Number of Users: ${form.users || "Not specified"}`,
          `Requirements: ${form.message || "—"}`,
        ].join("\n"),
      });
      setStatus("success");
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to submit your request. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-xl py-10 mx-auto text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-2xl rounded-2xl bg-cyan-400/10 text-cyan-300">
          <FaCheckCircle />
        </div>
        <h3 className="text-2xl font-bold text-white md:text-3xl">Request Submitted Successfully!</h3>
        <p className="mt-4 text-sm leading-7 text-gray-400 md:text-base">
          Thank you for your interest in Ready Tech Solutions. Our team will
          review your requirements and contact you shortly.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
          >
            <FaArrowLeft className="text-sm" />
            Back to Plans
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 font-semibold text-black transition rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
      >
        <FaArrowLeft className="text-xs" />
        Back to plans
      </button>

      <div className="grid gap-8 mt-6 lg:grid-cols-[320px_1fr]">
        {/* Selected plan summary */}
        <div className="p-6 border h-fit rounded-2xl border-cyan-400/30 bg-cyan-400/[0.05]">
          <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400">Selected Plan</span>
          <h4 className="mt-2 text-xl font-bold text-white">{pricing.label} — {plan.name}</h4>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-white">{plan.price}</span>
            {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
            {plan.priceNote && <p className="mt-1 text-xs text-gray-500">{plan.priceNote}</p>}
          </div>
          <div className="pt-4 mt-4 space-y-2.5 border-t border-white/10">
            {pricing.limits.map((limit) => (
              <div key={limit.key} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-400">{limit.label}</span>
                <span className="font-semibold text-right text-white">{limitValue(plan, limit.key)}</span>
              </div>
            ))}
            <div className="flex items-start justify-between gap-3 text-sm">
              <span className="text-gray-400">AI</span>
              <span className="font-semibold text-right text-white">
                {plan.ai}
                {plan.aiNote && <span className="block text-xs font-normal text-gray-400">{plan.aiNote}</span>}
              </span>
            </div>
          </div>
          <p className="flex items-center gap-2 mt-5 text-xs text-gray-400">
            <FaLayerGroup className="text-cyan-400" />
            {pricing.summaryNote}
          </p>
        </div>

        {/* Enquiry form */}
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          {ENQUIRY_FIELDS.map(({ name, label, ...rest }) => (
            <label key={name} className="text-sm text-gray-300">
              {label}
              {rest.required && <span className="text-cyan-400"> *</span>}
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={label}
                type={rest.type || "text"}
                className={`${INPUT_CLASS} mt-1.5`}
                {...rest}
              />
            </label>
          ))}

          <label className="text-sm text-gray-300 sm:col-span-2">
            Requirements / Message
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your business and what you need"
              className={`${INPUT_CLASS} mt-1.5 resize-none`}
            />
          </label>

          {error && <p className="text-sm text-red-400 sm:col-span-2">{error}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-black transition rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 sm:col-span-2"
          >
            {status === "sending" ? "Submitting..." : "Request Access"}
            {status !== "sending" && <FaArrowRight className="text-sm" />}
          </button>
        </form>
      </div>
    </div>
  );
};

const PlanModal = ({ pricing, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    panelRef.current?.scrollTo({ top: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={pricing.title}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl max-h-[92vh] overflow-y-auto p-5 sm:p-6 md:p-10 border rounded-3xl md:rounded-[2rem] border-white/10 bg-[#070b1d]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute flex items-center justify-center w-10 h-10 text-gray-300 transition border rounded-xl top-4 right-4 md:top-5 md:right-5 border-white/10 bg-white/5 hover:bg-white/10"
        >
          <FaTimes />
        </button>

        <div className="max-w-2xl pr-12">
          <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">
            {pricing.title}
          </span>
          <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            {selectedPlan ? "Request access to your plan" : pricing.heading}
          </h3>
          {!selectedPlan && (
            <p className="mt-3 text-sm leading-6 text-gray-400">{pricing.intro}</p>
          )}
        </div>

        <div className="mt-8">
          {selectedPlan ? (
            <EnquiryForm
              plan={selectedPlan}
              pricing={pricing}
              onBack={() => setSelectedPlan(null)}
              onClose={onClose}
            />
          ) : (
            <>
              <div className="grid gap-5 pt-4 sm:grid-cols-2 xl:grid-cols-4">
                {pricing.plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} pricing={pricing} onChoose={selectPlan} />
                ))}
              </div>

              <div className="p-4 mt-8 space-y-2 border rounded-2xl border-white/10 bg-white/[0.03]">
                {pricing.notes.map((note) => (
                  <p key={note} className="flex items-start gap-2 text-xs leading-5 text-gray-400">
                    <FaShieldAlt className="flex-shrink-0 mt-0.5 text-cyan-400" />
                    {note}
                  </p>
                ))}
              </div>

              <ComparisonTable pricing={pricing} />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Products() {
  const [planProduct, setPlanProduct] = useState(null);

  return (
    <>
      <Helmet>
        <title>Products | Ready Tech Solutions</title>

        <meta
          name="description"
          content="Explore Ready Tech Solutions products including CRM, ERP and business growth platforms designed to simplify operations and accelerate business growth."
        />

        <meta
          name="keywords"
          content="Ready Tech Solutions Products, CRM, ERP, Growth Suite, Business Management Software, CRM ERP Software, Business Automation"
        />
      </Helmet>

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute w-[550px] h-[550px] bg-cyan-500/10 blur-3xl rounded-full top-[-180px] left-[-150px]" />

        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full top-[35%] right-[-180px]" />

        <div className="absolute w-[450px] h-[450px] bg-blue-500/10 blur-3xl rounded-full bottom-[-150px] left-[20%]" />
      </div>

      <main className="relative min-h-screen text-white">
        <div className="px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative py-24 text-center md:py-32">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium border rounded-full border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
            >
              <FaRocket />

              Built for Modern Businesses
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight md:text-6xl"
            >
              Powerful Products for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                Smarter Business Growth
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-3xl mx-auto mt-6 text-base leading-8 text-gray-400 md:text-lg"
            >
              Welcome to Ready Tech Solutions Products — a growing ecosystem
              of modern business platforms built to simplify operations,
              improve productivity and help organizations scale with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-black transition rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.03]"
              >
                Explore Products
                <FaArrowRight />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
              >
                Talk to Our Team
              </a>
            </motion.div>
          </section>

          {/* =================================================
              WELCOME / INTRO
          ================================================= */}

          <section className="pb-24">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 text-center border md:p-12 rounded-3xl border-white/10 bg-white/[0.035] backdrop-blur-xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-2xl rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-cyan-300">
                <FaLayerGroup />
              </div>

              <h2 className="text-2xl font-bold md:text-3xl">
                Welcome to the Ready Tech Solutions Product Ecosystem
              </h2>

              <p className="max-w-3xl mx-auto mt-5 text-sm leading-7 text-gray-400 md:text-base">
                We don't just build software — we build digital products that
                solve real business problems. From customer relationships and
                sales to inventory, finance and growth, our platforms are
                designed with modern technology, intuitive experiences and
                scalable architecture.
              </p>
            </motion.div>

          </section>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <section id="products" className="pb-28">

            <div className="mb-12 text-center">

              <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">
                Our Products
              </span>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Built to Solve Real Business Challenges
              </h2>

              <p className="max-w-2xl mx-auto mt-4 text-gray-400">
                Explore our business platforms and discover solutions built
                around the way modern organizations actually work.
              </p>

            </div>

            <div className="space-y-10">

              {products.map((product, index) => (

                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden border rounded-[2rem] border-white/10 bg-white/[0.035] backdrop-blur-xl"
                >

                  {/* Product glow */}

                  <div
                    className={`absolute w-96 h-96 bg-gradient-to-r ${product.gradient} opacity-[0.07] blur-3xl rounded-full ${
                      index % 2 === 0
                        ? "top-[-180px] right-[-100px]"
                        : "bottom-[-180px] left-[-100px]"
                    }`}
                  />

                  <div className="relative grid lg:grid-cols-2">

                    {/* PRODUCT IMAGE */}

                    <div
                      className={`relative min-h-[320px] lg:min-h-[520px] overflow-hidden ${
                        index % 2 !== 0 ? "lg:order-2" : ""
                      }`}
                    >

                      <img
                        src={product.image}
                        alt={product.title}
                        className="absolute inset-0 object-cover w-full h-full transition duration-700 hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">

                        <div
                          className={`flex items-center justify-center w-14 h-14 mb-5 text-xl rounded-2xl bg-gradient-to-br ${product.gradient}`}
                        >
                          {product.icon}
                        </div>

                        <span className="text-xs font-semibold tracking-widest uppercase text-cyan-300">
                          {product.badge}
                        </span>

                        <h3 className="mt-2 text-3xl font-bold md:text-4xl">
                          {product.shortTitle}
                        </h3>

                      </div>

                    </div>

                    {/* PRODUCT CONTENT */}

                    <div
                      className={`p-7 md:p-10 lg:p-12 ${
                        index % 2 !== 0 ? "lg:order-1" : ""
                      }`}
                    >

                      <div className="flex flex-wrap items-center gap-3">

                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${product.gradient} text-black`}
                        >
                          Ready to Scale
                        </span>

                        <span className="px-3 py-1 text-xs text-gray-300 border rounded-full border-white/10 bg-white/5">
                          Enterprise Ready
                        </span>

                      </div>

                      <h3 className="mt-5 text-3xl font-bold md:text-4xl">
                        {product.title}
                      </h3>

                      <p className="mt-5 text-sm leading-7 text-gray-400 md:text-base">
                        {product.description}
                      </p>

                      <div className="grid gap-3 mt-7 sm:grid-cols-2">

                        {product.features.map((feature) => (
                          <FeatureItem key={feature}>
                            {feature}
                          </FeatureItem>
                        ))}

                      </div>

                      <div className="flex flex-wrap gap-3 mt-8">

                        <ProductButton url={product.url}>
                          Access Product
                        </ProductButton>

                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                        >
                          Request Access
                          <FaArrowRight className="text-sm" />
                        </a>

                        {product.pricing && (
                          <button
                            onClick={() => setPlanProduct(product)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold transition border rounded-xl border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
                          >
                            Plan Details
                            <FaLayerGroup className="text-sm" />
                          </button>
                        )}

                      </div>

                      <p className="flex items-center gap-2 mt-5 text-xs text-gray-500">
                        <FaShieldAlt className="text-cyan-400" />
                        Secure access • Cloud-ready • Scalable architecture
                      </p>

                    </div>

                  </div>

                  {/* MODULES */}

                  <div className="relative border-t p-7 md:p-10 border-white/10">

                    <div className="mb-7">

                      <h4 className="text-xl font-bold">
                        Platform Capabilities
                      </h4>

                      <p className="mt-2 text-sm text-gray-500">
                        Designed to bring your essential business workflows
                        together in one connected platform.
                      </p>

                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                      {product.modules.map((module) => (
                        <ModuleCard
                          key={module.title}
                          item={module}
                        />
                      ))}

                    </div>

                  </div>

                </motion.article>

              ))}

            </div>

          </section>

          {/* =================================================
              WHY READY TECH
          ================================================= */}

          <section className="pb-28">

            <div className="mb-12 text-center">

              <span className="text-sm font-semibold tracking-widest text-purple-400 uppercase">
                Why Ready Tech Solutions
              </span>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Technology Built Around Your Business
              </h2>

            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {[
                {
                  icon: <FaRocket />,
                  title: "Built for Growth",
                  desc: "Our products are designed to scale as your business grows.",
                },
                {
                  icon: <FaCogs />,
                  title: "Smart Workflows",
                  desc: "Reduce manual processes and bring business operations together.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Secure Architecture",
                  desc: "Built with modern development practices and access control.",
                },
                {
                  icon: <FaHeadset />,
                  title: "Product Support",
                  desc: "Our team continues to support and improve the product ecosystem.",
                },
              ].map((item, index) => (

                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="p-6 border rounded-2xl border-white/10 bg-white/[0.035] backdrop-blur-xl"
                >

                  <div className="flex items-center justify-center w-12 h-12 mb-5 text-lg text-purple-300 rounded-xl bg-purple-400/10">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {item.desc}
                  </p>

                </motion.div>

              ))}

            </div>

          </section>

          {/* =================================================
              PRODUCT ECOSYSTEM
          ================================================= */}

          <section className="pb-28">

            <div className="relative p-8 overflow-hidden border md:p-12 rounded-[2rem] border-white/10 bg-gradient-to-br from-cyan-500/[0.08] via-white/[0.03] to-purple-500/[0.08]">

              <div className="absolute w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full top-[-120px] right-[-80px]" />

              <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-400/10 text-cyan-300">
                      <FaGlobe />
                    </div>

                    <span className="text-sm font-semibold tracking-wider uppercase text-cyan-400">
                      Growing Ecosystem
                    </span>

                  </div>

                  <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                    More Products.
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      More Possibilities.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-gray-400 md:text-base">
                    Ready Tech Solutions is continuously building innovative
                    digital products for businesses across different industries.
                    Our product ecosystem is designed to evolve with emerging
                    technologies and changing business needs.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-7">

                    <span className="px-4 py-2 text-sm text-gray-300 border rounded-full border-white/10 bg-white/5">
                      CRM
                    </span>

                    <span className="px-4 py-2 text-sm text-gray-300 border rounded-full border-white/10 bg-white/5">
                      ERP
                    </span>

                    <span className="px-4 py-2 text-sm text-gray-300 border rounded-full border-white/10 bg-white/5">
                      Business Automation
                    </span>

                    <span className="px-4 py-2 text-sm text-gray-300 border rounded-full border-white/10 bg-white/5">
                      Growth Solutions
                    </span>

                    <span className="px-4 py-2 text-sm text-gray-300 border rounded-full border-white/10 bg-white/5">
                      Custom Platforms
                    </span>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  {[
                    {
                      number: "CRM",
                      label: "Customer Management",
                      icon: <FaUsers />,
                    },
                    {
                      number: "ERP",
                      label: "Business Operations",
                      icon: <FaLayerGroup />,
                    },
                    {
                      number: "AI",
                      label: "Intelligent Solutions",
                      icon: <FaChartLine />,
                    },
                    {
                      number: "∞",
                      label: "Built to Scale",
                      icon: <FaRocket />,
                    },
                  ].map((item) => (

                    <motion.div
                      key={item.number}
                      whileHover={{ scale: 1.03 }}
                      className="p-6 border rounded-2xl border-white/10 bg-black/20"
                    >

                      <div className="text-xl text-cyan-300">
                        {item.icon}
                      </div>

                      <div className="mt-4 text-2xl font-extrabold">
                        {item.number}
                      </div>

                      <div className="mt-1 text-xs text-gray-500">
                        {item.label}
                      </div>

                    </motion.div>

                  ))}

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section className="pb-24">

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-10 overflow-hidden text-center border rounded-[2rem] md:p-16 border-white/10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10"
            >

              <div className="absolute w-80 h-80 bg-cyan-400/10 blur-3xl rounded-full top-[-180px] left-1/2 -translate-x-1/2" />

              <div className="relative">

                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-2xl rounded-2xl bg-white/10 text-cyan-300">
                  <FaRocket />
                </div>

                <h2 className="text-3xl font-bold md:text-4xl">
                  Ready to Transform Your Business?
                </h2>

                <p className="max-w-2xl mx-auto mt-5 text-sm leading-7 text-gray-400 md:text-base">
                  Explore our products, request access or talk to the Ready
                  Tech Solutions team about a platform designed specifically
                  for your business needs.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">

                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-black transition rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.03]"
                  >
                    Talk to Our Team
                    <FaArrowRight />
                  </a>

                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-white transition border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    Explore Products
                  </a>

                </div>

              </div>

            </motion.div>

          </section>

        </div>
      </main>

      <AnimatePresence>
        {planProduct && (
          <PlanModal
            pricing={planProduct.pricing}
            onClose={() => setPlanProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}