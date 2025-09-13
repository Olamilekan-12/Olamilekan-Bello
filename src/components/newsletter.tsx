'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from './ui/use-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to my newsletter!',
      });
      
      setEmail('');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to subscribe. Please try again.';
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
        Newsletter
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Subscribe to get updates on my latest projects and articles.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isSubmitting}
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </motion.button>
      </form>
      <p className="text-xs text-muted-foreground mt-2">
        No spam, unsubscribe at any time.
      </p>
    </div>
  );
}
