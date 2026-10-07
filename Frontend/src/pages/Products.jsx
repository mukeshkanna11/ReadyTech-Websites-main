import React, { useEffect, useState } from "react";
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
} from "react-icons/fa";

/* =========================================================
   PRODUCT LINKS
   Replace these with your actual deployed product URLs
========================================================= */

const CRM_PRODUCT_URL = "https://crmreadytechsolutions.in";
const GROWTH_PRODUCT_URL = "https://readytech-growth-suit.vercel.app";

/* =========================================================
   CRM PLANS
========================================================= */

const CRM_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "₹2,999",
    period: "/month",
    idealFor: "Small teams starting to organize leads and sales.",
    highlights: [
      "Up to 5 team members",
      "1 sales pipeline",
      "Capture leads from 5 sources",
      "5 ready-to-use email templates",
      "Essential CRM, automation & reports",
    ],
    ai: "50 AI points / month",
    aiNote: "Approx. 500K AI tokens",
  },
  {
    id: "professional",
    name: "Professional",
    price: "₹5,999",
    period: "/month",
    idealFor: "Growing teams managing multiple sales processes.",
    popular: true,
    highlights: [
      "Up to 15 team members",
      "3 sales pipelines",
      "Unlimited lead sources",
      "25 email templates",
      "Advanced CRM, automation & reports",
    ],
    ai: "150 AI points / month",
    aiNote: "Approx. 1.5M AI tokens",
  },
  {
    id: "business",
    name: "Business",
    price: "₹11,999",
    period: "/month",
    idealFor: "Established businesses with larger sales teams.",
    highlights: [
      "Up to 50 team members",
      "10 sales pipelines",
      "Unlimited lead sources",
      "Unlimited email templates",
      "Advanced & custom capabilities",
    ],
    ai: "400 AI points / month",
    aiNote: "Approx. 4M AI tokens",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    idealFor: "Large organizations needing a tailored setup.",
    highlights: [
      "Custom number of team members",
      "Unlimited sales pipelines",
      "Custom features & limits",
      "Built around your workflows",
    ],
    ai: "Custom AI allocation",
    aiNote: "Sized to your usage",
  },
];

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
    plans: CRM_PLANS,
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

const PlanCard = ({ plan, productId }) => (
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

    <h4 className="text-lg font-bold text-white">{plan.name}</h4>
    <p className="mt-1 text-sm leading-6 text-gray-400">{plan.idealFor}</p>

    <div className="mt-5">
      <span className="text-3xl font-extrabold text-white">{plan.price}</span>
      {plan.period && (
        <span className="text-sm text-gray-500">{plan.period}</span>
      )}
    </div>

    <div className="mt-6 space-y-3">
      {plan.highlights.map((item) => (
        <FeatureItem key={item}>{item}</FeatureItem>
      ))}
    </div>

    <div className="flex items-start gap-3 p-3 mt-6 border rounded-xl border-purple-400/20 bg-purple-400/[0.06]">
      <FaRobot className="flex-shrink-0 mt-1 text-purple-300" />
      <div>
        <p className="text-sm font-semibold text-white">{plan.ai}</p>
        <p className="text-xs text-gray-400">{plan.aiNote}</p>
      </div>
    </div>

    <a
      href={`/contact?product=${productId}&plan=${plan.id}`}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 mt-6 font-semibold transition rounded-xl hover:scale-[1.02] ${
        plan.popular
          ? "text-black bg-gradient-to-r from-cyan-400 to-blue-500"
          : "text-white border border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      {plan.price === "Custom" ? "Contact Sales" : "Choose Plan"}
      <FaArrowRight className="text-sm" />
    </a>
  </div>
);

const PlanModal = ({ product, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.shortTitle} plans`}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto p-6 md:p-10 border rounded-[2rem] border-white/10 bg-[#070b1d]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute flex items-center justify-center w-10 h-10 text-gray-300 transition border rounded-xl top-5 right-5 border-white/10 bg-white/5 hover:bg-white/10"
        >
          <FaTimes />
        </button>

        <div className="max-w-2xl pr-12">
          <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">
            {product.shortTitle} Plans
          </span>
          <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            Pick the plan that fits your team
          </h3>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            Every plan includes secure cloud access. AI points are credits
            used whenever you use the built-in AI features — upgrade anytime
            as your team grows.
          </p>
        </div>

        <div className="grid gap-5 pt-4 mt-8 sm:grid-cols-2 xl:grid-cols-4">
          {product.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} productId={product.id} />
          ))}
        </div>

        <p className="flex items-center gap-2 mt-8 text-xs text-gray-500">
          <FaShieldAlt className="text-cyan-400" />
          Prices exclude applicable taxes. Our team will confirm your setup
          before activation.
        </p>
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

                        {product.plans && (
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
            product={planProduct}
            onClose={() => setPlanProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}