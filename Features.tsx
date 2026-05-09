import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Layers, 
  Smartphone, 
  BarChart, 
  MessageSquare 
} from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Rapid Deployment',
    description: 'Launch your product faster with our optimized development workflow and AI integration.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure by Design',
    description: 'Enterprise-grade security protocols built into every layer of your application from day one.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Scalable Architecture',
    description: 'Systems that grow with you. We build with the future in mind, ensuring 99.9% uptime.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile First',
    description: 'Perfect experiences across all devices. We prioritize responsiveness and touch interactions.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: 'Data Insights',
    description: 'Built-in analytics and reporting tools to help you make data-driven decisions.',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: '24/7 Support',
    description: 'Our dedicated team is always available to help you with any technical challenges.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const Features = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Core Capabilities</h2>
          <p className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Everything you need to scale your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
