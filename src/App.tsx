/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useState } from 'react';
import { ShaderBackground } from './components/ShaderBackground';
import { ArrowUpRight, Hexagon, Send, Menu, X } from 'lucide-react';

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
    <form className="space-y-5 relative z-10" onSubmit={onSubmit}>
      <div>
        <label className="block font-label-caps text-xs text-slate-muted mb-2 tracking-wider uppercase" htmlFor="name">Full Name</label>
        <input className="w-full bg-surface-container-low border border-glass-border px-4 py-3 focus:ring-1 focus:ring-primary-container focus:border-primary-container text-primary font-body-md transition-colors hover-target rounded-lg outline-none placeholder:text-slate-muted/40" id="name" name="name" type="text" placeholder="John Doe" required />
      </div>
      <div>
        <label className="block font-label-caps text-xs text-slate-muted mb-2 tracking-wider uppercase" htmlFor="email">Email Address</label>
        <input className="w-full bg-surface-container-low border border-glass-border px-4 py-3 focus:ring-1 focus:ring-primary-container focus:border-primary-container text-primary font-body-md transition-colors hover-target rounded-lg outline-none placeholder:text-slate-muted/40" id="email" name="email" type="email" placeholder="john@example.com" required />
      </div>
      <div>
        <label className="block font-label-caps text-xs text-slate-muted mb-2 tracking-wider uppercase" htmlFor="message">Project Brief</label>
        <textarea className="w-full bg-surface-container-low border border-glass-border px-4 py-3 focus:ring-1 focus:ring-primary-container focus:border-primary-container text-primary font-body-md resize-none transition-colors hover-target rounded-lg outline-none placeholder:text-slate-muted/40" id="message" name="message" rows={4} placeholder="Tell me about your project..." required></textarea>
      </div>
      
      {/* Honeypot field to prevent spam */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
      
      <button className="w-full bg-primary-container text-obsidian-deep py-4 font-label-caps text-sm font-bold uppercase rounded-lg hover:bg-primary-fixed hover:scale-[1.02] active:scale-[0.98] transition-all hover-target flex items-center justify-center gap-2 mt-6 shadow-lg shadow-primary-container/10" type="submit">
        Get Quote Now
        <Send size={18} />
      </button>
      
      {result && <div className="text-center mt-4 font-body-md text-sm text-primary-container bg-primary-container/10 py-2.5 rounded-lg border border-primary-container/20">{result}</div>}
    </form>
  );
}

export default function App() {
  useScrollReveal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-obsidian-deep/85 backdrop-blur-xl border-b border-glass-border shadow-sm">
        <div className="flex justify-between items-center px-6 md:px-gutter py-4 w-full max-w-container-max mx-auto">
          <a className="font-display-xl text-2xl md:text-3xl font-bold tracking-tighter text-primary hover-target" href="#">.Daniyal</a>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-on-surface-variant font-medium font-body-md text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300 hover-target" href="#work">Work</a>
            <a className="text-on-surface-variant font-medium font-body-md text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300 hover-target" href="#stack">Stack</a>
            <a className="text-on-surface-variant font-medium font-body-md text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300 hover-target" href="#contact">Contact</a>
          </div>
          <a className="hidden md:flex bg-primary-container text-obsidian-deep px-5 py-2.5 font-label-caps text-xs font-bold uppercase rounded-lg hover:bg-primary-fixed hover:-translate-y-0.5 active:translate-y-0 transition-all hover-target items-center gap-2" href="#contact">
            Hire Me
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
          <button 
            className="md:hidden text-primary p-2 focus:outline-none hover-target" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-obsidian-deep/95 backdrop-blur-xl border-b border-glass-border py-6 px-6 flex flex-col gap-6 shadow-2xl">
            <a className="text-on-surface-variant font-medium font-body-md text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300" href="#work" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
            <a className="text-on-surface-variant font-medium font-body-md text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300" href="#stack" onClick={() => setIsMobileMenuOpen(false)}>Stack</a>
            <a className="text-on-surface-variant font-medium font-body-md text-sm uppercase tracking-wider hover:text-primary transition-colors duration-300" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <a className="bg-primary-container text-obsidian-deep px-6 py-4 font-label-caps text-sm font-bold uppercase rounded-lg text-center hover:bg-primary-fixed transition-colors flex justify-center items-center gap-2 mt-4" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Hire Me
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[100svh] flex items-center pt-24 pb-16 md:pt-section-gap-md md:pb-section-gap-lg overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <ShaderBackground />
        </div>
        <div className="relative z-10 w-full max-w-container-max mx-auto px-6 md:px-gutter grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-gutter">
          <div className="lg:col-span-8 flex flex-col gap-5 md:gap-6 reveal">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 md:w-10 h-[1px] bg-primary-container"></span>
              <p className="font-label-caps text-xs md:text-sm text-primary-container tracking-[0.2em] uppercase">Digital Craftsman</p>
            </div>
            <h1 className="font-display-xl text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-primary leading-[1.15] md:leading-[1.1] tracking-tight">
              Engineering Excellence through Precision &amp; Design.
            </h1>
            <p className="font-body-lg text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Architecting robust, scalable, and visually arresting digital experiences for forward-thinking enterprises.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
              <a className="bg-primary-container text-obsidian-deep px-8 py-4 font-label-caps text-sm uppercase font-bold rounded-lg hover:bg-primary-fixed hover:scale-105 active:scale-95 transition-all hover-target inline-flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20" href="#work">
                View Projects
              </a>
              <a className="bg-transparent border border-glass-border text-primary px-8 py-4 font-label-caps text-sm uppercase font-bold rounded-lg hover:bg-white/5 hover:border-primary-container/50 active:scale-95 transition-all hover-target inline-flex items-center justify-center gap-2" href="#contact">
                Contact Me
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:flex items-center justify-center relative reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="w-64 h-64 border border-glass-border rounded-full flex items-center justify-center relative before:absolute before:inset-[-20px] before:border before:border-glass-border/50 before:rounded-full after:absolute after:inset-[-40px] after:border after:border-glass-border/20 after:rounded-full animate-[spin_40s_linear_infinite]">
              <div className="animate-[spin_20s_linear_infinite_reverse]">
                <Hexagon size={80} className="text-primary-container opacity-90 drop-shadow-[0_0_15px_rgba(0,255,194,0.3)]" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Work Section */}
      <section className="py-20 md:py-32 relative z-10" id="work">
        <div className="w-full max-w-container-max mx-auto px-6 md:px-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 reveal">
            <div className="max-w-2xl">
              <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-3 md:mb-4">Selected Works</h2>
              <p className="font-body-md text-base md:text-lg text-on-surface-variant">Enterprise-grade solutions engineered for scale and aesthetic perfection.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      <section className="py-20 md:py-32 relative z-10 bg-surface-container-lowest border-y border-glass-border overflow-hidden" id="stack">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container/5 via-background to-background pointer-events-none"></div>
        <div className="w-full max-w-container-max mx-auto px-6 md:px-gutter relative z-10">
          <div className="text-center mb-10 md:mb-16 reveal">
            <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-3 md:mb-4">Technology Arsenal</h2>
            <p className="font-body-md text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">Mastery over modern tooling to deliver uncompromising quality and performance.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto reveal">
            {['HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'NEXTJS', 'TAILWIND CSS', 'SUPABASE', 'FIGMA'].map((tech, i) => {
              let borderClass = 'border-primary/20 hover:border-primary-container hover:bg-primary-container/10 hover:text-primary-container';
              if (['NEXTJS', 'TAILWIND CSS', 'SUPABASE'].includes(tech)) {
                borderClass = 'border-secondary-container/20 hover:border-secondary-container hover:bg-secondary-container/10 hover:text-secondary-container';
              } else if (tech === 'FIGMA') {
                borderClass = 'border-outline-variant hover:border-silver-type hover:bg-surface-variant hover:text-primary';
              }
              
              return (
                <div key={tech} className={`px-5 py-2.5 md:px-6 md:py-3 font-label-caps text-[10px] md:text-xs font-bold uppercase bg-obsidian-surface border rounded-full transition-all cursor-pointer hover-target hover:-translate-y-1 shadow-sm ${borderClass}`}>
                  {tech}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 relative z-10" id="contact">
        <div className="w-full max-w-container-max mx-auto px-6 md:px-gutter grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="reveal">
            <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4 md:mb-6">Initiate Dialogue</h2>
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant mb-6 md:mb-8 leading-relaxed max-w-lg">Ready to elevate your digital presence? Let's discuss architecture, timelines, and deliverables to bring your vision to life.</p>
            <div className="flex gap-4 items-center">
               <div className="h-[1px] bg-glass-border flex-1"></div>
               <span className="text-primary-container font-label-caps text-[10px] sm:text-xs uppercase tracking-widest font-bold">Available for new opportunities</span>
               <div className="h-[1px] bg-glass-border flex-1"></div>
            </div>
          </div>
          <div className="glass-card bg-obsidian-surface p-6 md:p-10 rounded-2xl reveal shadow-2xl relative" style={{ transitionDelay: '0.2s' }}>
             <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-container/10 blur-3xl rounded-full pointer-events-none"></div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 md:py-16 bg-obsidian-deep border-t border-glass-border relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-gutter w-full max-w-container-max mx-auto gap-6">
          <div className="font-display-xl text-xl font-bold tracking-tighter text-primary">.Daniyal</div>
          <div className="font-label-caps text-xs text-slate-muted text-center md:text-left">© 2024 .Daniyal. Engineered for Excellence.</div>
        </div>
      </footer>
    </>
  );
}
