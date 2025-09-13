'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from './ui/use-toast';

export function Hero() {
  const { toast } = useToast();

  const handleDownloadResume = () => {
    // This is a placeholder for the resume download functionality
    // Replace with your actual resume URL
    toast({
      title: 'Downloading Resume',
      description: 'Your resume will start downloading shortly.',
    });
    // Simulate download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/bello_olamilekan_software_eng.pdf';
      link.download = 'Bello_Olamilekan_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-40 dark:opacity-20" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              Fullstack Developer
            </span>
          </motion.div>
          
          <motion.div 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Hi, I&apos;m <span className="text-primary">Bello Olamilekan</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Fullstack Software Engineer | Cloud & DevOps Enthusiast | Building Scalable Systems
            </p>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build exceptional digital experiences that are fast, accessible, and visually appealing.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              onClick={handleDownloadResume}
              className="group px-6 py-3 text-base font-medium transition-all duration-300"
              size="lg"
            >
              Download Resume
              <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              className="px-6 py-3 text-base font-medium group transition-all duration-300"
              size="lg"
              asChild
            >
              <a href="#contact">
                Let&apos;s Talk
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 md:mt-24 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm border border-primary/20" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="text-muted-foreground"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
