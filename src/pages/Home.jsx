import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Timer,
  Palette,
  Database,
  ArrowRight,
  Star,
  Sun,
  Moon,
} from "lucide-react";


function Home() {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    document
      .querySelectorAll(".reveal, .stagger-children")
      .forEach((element) => {
        observer.observe(element);
      });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDark ? "dark bg-gray-900" : "bg-gradient-to-b from-white to-green-50"
      }`}
    >
      {/* Header */}
      <nav
        className={`fixed w-full z-50 ${
          isDark ? "bg-gray-900/80" : "bg-white/80"
        } backdrop-blur-sm border-b ${
          isDark ? "border-gray-800" : "border-gray-100"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-green-600"
            } transition-colors duration-300`}
          >
            AI Quiz Maker
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${
                isDark
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-100 text-gray-600"
              } hover:scale-110 transition-all duration-300`}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
            onClick={() => navigate("/login")}
              className={`px-4 py-2 rounded-lg ${
                isDark
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-all duration-300`}
            >
              Login
            </button>
            <button 
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 space-y-8 reveal">
          <h1
            className={`text-5xl lg:text-6xl font-bold ${
              isDark
                ? "text-white"
                : "bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-500"
            } transition-colors duration-300`}
          >
            Create Smart Quizzes in Seconds with AI
          </h1>
          <p
            className={`text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            } transition-colors duration-300`}
          >
            Generate engaging quizzes effortlessly with AI-powered automation.
          </p>
          <button 
          onClick={() => navigate("/login")}
          className="group bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
            Get Started for Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
        <div
          className="lg:w-1/2 mt-12 lg:mt-0 reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-lg blur-2xl opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80"
              alt="AI Quiz Platform"
              className="relative rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section
        className={`py-20 ${
          isDark ? "bg-gray-800" : "bg-white"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl font-bold text-center mb-16 ${
              isDark ? "text-white" : "text-gray-900"
            } reveal transition-colors duration-300`}
          >
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {[
              {
                icon: Brain,
                title: "AI-Generated Quizzes",
                desc: "Multiple formats including MCQs, True/False, and more",
              },
              {
                icon: Palette,
                title: "Custom Themes",
                desc: "Personalize the look and feel of your quizzes",
              },
              {
                icon: Timer,
                title: "Timer Controls",
                desc: "Set time limits for enhanced engagement",
              },
              {
                icon: Database,
                title: "Question Bank",
                desc: "Access thousands of pre-made questions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl hover:shadow-xl transition-all duration-300 ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white border border-gray-100"
                } group hover:-translate-y-1`}
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  } transition-colors duration-300`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className={`py-20 ${
          isDark ? "bg-gray-900" : "bg-gradient-to-b from-green-50 to-white"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl font-bold text-center mb-16 ${
              isDark ? "text-white" : "text-gray-900"
            } reveal transition-colors duration-300`}
          >
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center stagger-children">
            {[
              {
                step: "01",
                title: "Enter Your Topic",
                desc: "Input your subject or upload content",
              },
              {
                step: "02",
                title: "AI Generation",
                desc: "Our AI creates a complete quiz instantly",
              },
              {
                step: "03",
                title: "Share Results",
                desc: "Distribute and analyze performance",
              },
            ].map((step, index) => (
              <div key={index} className="relative flex-1 max-w-sm">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div
                  className={`${
                    isDark ? "bg-gray-800" : "bg-white"
                  } p-8 rounded-xl shadow-lg transition-colors duration-300`}
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    } transition-colors duration-300`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } transition-colors duration-300`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className={`py-20 ${
          isDark ? "bg-gray-800" : "bg-white"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl font-bold text-center mb-16 ${
              isDark ? "text-white" : "text-gray-900"
            } reveal transition-colors duration-300`}
          >
            What Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {[
              {
                name: "Sarah Johnson",
                role: "High School Teacher",
                text: "This AI quiz maker has revolutionized how I create assessments. So intuitive!",
              },
              {
                name: "Mark Chen",
                role: "Corporate Trainer",
                text: "The analytics features help me understand exactly where my team needs improvement.",
              },
              {
                name: "Emily Davis",
                role: "University Professor",
                text: "Creating comprehensive quizzes has never been easier. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50"
                } hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p
                  className={`mb-4 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } transition-colors duration-300`}
                >
                  "{testimonial.text}"
                </p>
                <div>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    } transition-colors duration-300`}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    } transition-colors duration-300`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-400 text-white reveal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Start Creating Now – No Signup Required!
          </h2>
          <button
          onClick={() => navigate("/login")}
          className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            Try It Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${
          isDark ? "bg-gray-900 text-gray-300" : "bg-gray-900 text-gray-300"
        } py-12 transition-colors duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 reveal">
            <div>
              <h3 className="font-bold text-xl mb-4">AI Quiz Maker</h3>
              <p className="text-gray-400">
                Create engaging quizzes in seconds with the power of AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} AI Quiz Maker. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
