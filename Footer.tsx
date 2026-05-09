import { Sparkles, Mail, Globe, Cpu, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-500 p-1.5 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Lumina</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Empowering the next generation of digital products with AI-driven design and elite engineering.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-500 transition-colors text-white">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-500 transition-colors text-white">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-500 transition-colors text-white">
                <Cpu className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-500 transition-colors text-white">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Integration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brand Identity</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Subscribe</h4>
            <p className="text-slate-400 mb-6">Join 5,000+ creators for our weekly insights.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
              <button className="absolute right-2 top-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded-lg transition-colors text-sm font-medium">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 Lumina Studio Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
