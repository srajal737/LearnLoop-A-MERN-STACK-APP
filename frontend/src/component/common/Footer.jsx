import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Images/learnloop_nav.jpg";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
 return (
  <footer className="bg-slate-900 text-slate-300">
    <div className="w-11/12  mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-slate-700 pb-8 mx-auto">
        {/* Logo */}
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-32 bg-white rounded-lg p-1"
          />
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg text-center font-semibold mb-4">Categories</h2>

          <div className="flex flex-col lg:flex-row gap-2 text-sm">
            <Link
              to="/category/web-development"
              className="hover:text-white transition"
            >
              Web Development
            </Link>

            <Link
              to="/category/data-science"
              className="hover:text-white transition"
            >
              Data Science
            </Link>

            <Link
              to="/category/mobile-development"
              className="hover:text-white transition"
            >
              Mobile Development
            </Link>

            <Link
              to="/category/cyber-security"
              className="hover:text-white transition"
            >
              Cyber Security
            </Link>

            <Link
              to="/category/cloud-computing"
              className="hover:text-white transition"
            >
              Cloud Computing
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-sm">
        <div className="flex gap-4">
          <Link
            to="/terms"
            className="hover:text-white transition border-r border-slate-600 pr-4"
          >
            Terms
          </Link>

          <Link
            to="/policy"
            className="hover:text-white transition border-r border-slate-600 pr-4"
          >
            Policy
          </Link>

          <Link
            to="/cookies"
            className="hover:text-white transition"
          >
            Cookies
          </Link>
        </div>

        <p>Made By SS © 2026</p>
      </div>
    </div>
  </footer>
);
};

export default Footer;