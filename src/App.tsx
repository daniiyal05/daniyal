/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useState } from 'react';
import { ShaderBackground } from './components/ShaderBackground';
import { ArrowUpRight, Hexagon, Mail, MapPin, Send } from 'lucide-react';

function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    
    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
    };
    
    const onMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return <div id="custom-cursor"></div>;
}

function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);
}

function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // Add the Web3Forms access key
    formData.append("access_key", "9412293c-5c00-49ad-bc1e-1e77cda878e0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        form.reset();
      } else {
        console.error("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error", error);
      setResult("An error occurred while submitting the form.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="block font-label-caps text-label-caps text-slate-muted mb-2" htmlFor="name">Full Name</label>
        <input className="w-full bg-transparent border-0 border-b border-glass-border px-0 py-2 focus:ring-0 focus:border-primary-container text-primary font-body-md transition-colors hover-target" id="name" name="name" type="text" required />
      </div>
      <div>
        <label className="block font-label-caps text-label-caps text-slate-muted mb-2" htmlFor="email">Email Address</label>
        <input className="w-full bg-transparent border-0 border-b border-glass-border px-0 py-2 focus:ring-0 focus:border-primary-container text-primary font-body-md transition-colors hover-target" id="email" name="email" type="email" required />
      </div>
      <div>
        <label className="block font-label-caps text-label-caps text-slate-muted mb-2" htmlFor="message">Project Brief</label>
        <textarea className="w-full bg-transparent border-0 border-b border-glass-border px-0 py-2 focus:ring-0 focus:border-primary-container text-primary font-body-md resize-none transition-colors hover-target" id="message" name="message" rows={4} required></textarea>
      </div>
      
      {/* Honeypot field to prevent spam */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
      
      <button className="w-full bg-primary-container text-obsidian-deep py-4 font-label-caps text-label-caps uppercase rounded-DEFAULT hover:bg-primary-fixed transition-colors hover-target flex items-center justify-center gap-2 mt-8" type="submit">
        Get Quote Now
        <Send size={16} />
      </button>
      
      {result && <div className="text-center mt-4 font-body-md text-primary-container">{result}</div>}
    </form>
  );
}

export default function App() {
  useScrollReveal();

  return (
    <>
      <CustomCursor />
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-glass-border">
        <div className="flex justify-between items-center px-gutter py-unit w-full max-w-container-max mx-auto">
          <a className="font-display-xl text-headline-md tracking-tighter text-primary hover-target" href="#">.Daniyal</a>
          <div className="hidden md:flex items-center gap-element-gap">
            <a className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-300 hover-target" href="#work">Work</a>
            <a className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-300 hover-target" href="#stack">Stack</a>
            <a className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-300 hover-target" href="#contact">Contact</a>
          </div>
          <a className="bg-primary-container text-obsidian-deep px-6 py-3 font-label-caps text-label-caps uppercase rounded-DEFAULT hover:bg-primary-fixed transition-colors hover-target flex items-center gap-2" href="#contact">
            Hire Me
            <ArrowUpRight size={16} />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-section-gap-md pb-section-gap-lg">
        <div className="absolute inset-0 z-0 opacity-40">
          <ShaderBackground />
        </div>
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 flex flex-col gap-element-gap reveal">
            <p className="font-label-caps text-label-caps text-primary-container tracking-[0.2em] uppercase">Digital Craftsman</p>
            <h1 className="font-display-xl text-display-xl md:text-display-xl text-primary leading-none">Engineering Excellence through Precision &amp; Design.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
              Architecting robust, scalable, and visually arresting digital experiences for forward-thinking enterprises.
            </p>
            <div className="mt-8 flex gap-4">
              <a className="bg-primary-container text-obsidian-deep px-8 py-4 font-label-caps text-label-caps uppercase rounded-DEFAULT hover:bg-primary-fixed transition-colors hover-target inline-flex items-center gap-2" href="#work">
                View Projects
              </a>
            </div>
          </div>
          <div className="md:col-span-4 hidden md:flex items-center justify-center relative reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="w-64 h-64 border border-glass-border rounded-full flex items-center justify-center relative before:absolute before:inset-[-20px] before:border before:border-glass-border/50 before:rounded-full after:absolute after:inset-[-40px] after:border after:border-glass-border/20 after:rounded-full">
              <Hexagon size={64} className="text-primary-container opacity-80" strokeWidth={1} />
            </div>
          </div>
        </div>
      </header>

      {/* Work Section */}
      <section className="py-section-gap-lg relative z-10" id="work">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
            <div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Selected Works</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Enterprise-grade solutions engineered for scale.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Project 1 */}
            <div className="glass-card bg-obsidian-surface rounded-xl overflow-hidden group transition-all duration-500 reveal hover:-translate-y-2 hover-target">
              <div className="h-64 bg-surface-container-high relative overflow-hidden">
                <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" alt="Enterprise Dashboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzwPUI_JWUJ1eZ4OCg49U0rKnwi0tcu3f0LntO-vt7Zn5dGki9tFfadXRwNSQmzRsTfqJY4ZOQ_kuJBqLEyeUiGzqhEmcJefplziuf8HS8goWHuFlaB63u2BNFy3mvSPpBT_8XNEynWl0Pc8r5C0GhwCraTfcFPrykdiaFrxMcGhfXxATIRBT9MW3_s5ScysmMIWiOvaI3UW3CIwDHBbdH5RwUkXmDYnlKKPPoSl_sZVH-LQJLcDsdKsoZbiKaax5ewhG8tTZlMm_e" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-obsidian-deep" href="https://acedigitalsolutions.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <p className="font-label-caps text-label-caps text-slate-muted mb-2">Enterprise Infrastructure</p>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Ace Digital Solutions</h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Architecting resilient distributed systems and high-performance digital infrastructures.</p>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="glass-card bg-obsidian-surface rounded-xl overflow-hidden group transition-all duration-500 reveal hover:-translate-y-2 hover-target" style={{ transitionDelay: '0.1s' }}>
              <div className="h-64 bg-surface-container-high relative overflow-hidden">
                <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" alt="Swiss Tech" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpTzanSbvIW2bKjFjL-e1G4SyK9EdSX9omHRbmc1iIuiTxDnMykux4Ul7xyIKBSE4Osn6O4Fl0ypqBp5RwDwu6dVGzugLRgZN5qy-cdHSGyXKgRMdEerEsAjF-RhTZDVvI_cu9XCMxQSnfhwk773WWouGEWDLZTiimki7j7cjt3aHTx6TSeeISaXsYDEJCcSE4kAN4-t_auyUXrpd_8aGKFYKVaJNqpHb1hvmZ47Lxb87hs1r1ooOm3NNqMjqGrDB7JPI0oWpBIu1T" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-obsidian-deep" href="https://swisstechnologi.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <p className="font-label-caps text-label-caps text-slate-muted mb-2">Certified Engineering</p>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Swiss Technologi</h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Surgical-grade repair management systems requiring absolute precision and reliability.</p>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="glass-card bg-obsidian-surface rounded-xl overflow-hidden group transition-all duration-500 reveal hover:-translate-y-2 hover-target" style={{ transitionDelay: '0.2s' }}>
              <div className="h-64 bg-surface-container-high relative overflow-hidden">
                <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" alt="Solugix ERP" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWTL9ioH2EFoDUDV-rtpvxSGANj_wjDUd3eRVMq5ffFSQlTRF-wRgLyjTqf7BDfO3ISXy14qSjUOeQcrNAlio9E6-9bEE9K6hAAZi0ymMVuhL2ClElGbhKShLIpdM2uHd78HaY6PAyCGMM-EnMcVhzinteD4mabhl6QOlDxWbz8AqfZPcGB_UBDscF6N2KVBVzi0Tq5Id2eFIN-29SS_8IEckZ7Yl9c6xokuK_6xNnzTTc-FUOyfe59gzNeXJa8WuALVI6uhh_xJ_w" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-obsidian-deep" href="https://solugix.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <p className="font-label-caps text-label-caps text-slate-muted mb-2">Business Automation</p>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Solugix</h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Comprehensive ERP solutions driving organizational transformation and efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-section-gap-lg relative z-10 bg-surface-container-lowest border-y border-glass-border" id="stack">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16 reveal">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Technology Arsenal</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl mx-auto">Mastery over modern tooling to deliver uncompromising quality.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto reveal">
            {['HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'NEXTJS', 'TAILWIND CSS', 'SUPABASE', 'FIGMA'].map((tech, i) => {
              let borderClass = 'border-primary/20 hover:border-primary-container hover:bg-primary-container/10 hover:text-primary-container';
              if (['NEXTJS', 'TAILWIND CSS', 'SUPABASE'].includes(tech)) {
                borderClass = 'border-secondary-container/20 hover:border-secondary-container hover:bg-secondary-container/10 hover:text-secondary-container';
              } else if (tech === 'FIGMA') {
                borderClass = 'border-outline-variant hover:border-silver-type hover:bg-surface-variant hover:text-primary';
              }
              
              return (
                <div key={tech} className={`px-6 py-3 font-label-caps text-label-caps bg-obsidian-surface border rounded-full transition-all cursor-pointer hover-target ${borderClass}`}>
                  {tech}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-section-gap-lg relative z-10" id="contact">
        <div className="w-full max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="reveal">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">Initiate Dialogue</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Ready to elevate your digital presence? Let's discuss architecture, timelines, and deliverables.</p>
          </div>
          <div className="glass-card bg-obsidian-surface p-8 rounded-xl reveal" style={{ transitionDelay: '0.2s' }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-section-gap-md bg-obsidian-deep border-t border-glass-border relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter w-full max-w-container-max mx-auto gap-8">
          <div className="font-display-xl text-body-lg text-primary">.Daniyal</div>
          <div className="font-label-caps text-label-caps text-slate-muted">© 2024 .Daniyal. Engineered for Excellence.</div>
        </div>
      </footer>
    </>
  );
}
