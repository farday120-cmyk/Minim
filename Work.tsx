import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Nexus Platform',
    category: 'SaaS / AI',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
  {
    title: 'Aura Mobile App',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
  {
    title: 'Orbit Design System',
    category: 'Framework',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
  {
    title: 'Pulse Analytics',
    category: 'Big Data',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
];

const Work = () => {
  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Work</h2>
            <p className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Selected projects that <br />define excellence
            </p>
          </div>
          <button className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-indigo-600 hover:border-indigo-600 transition-all">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white p-4 rounded-full">
                    <ExternalLink className="w-6 h-6 text-slate-900" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
                  <p className="text-slate-500 font-medium">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
