/**
 * Landing Page
 */

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { ArrowRight, Zap, Target, Trophy, Users, Sparkles, TrendingUp } from 'lucide-react';

const AnimatedGradient = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      animate={{
        background: [
          'radial-gradient(at 20% 50%, rgba(168, 85, 247, 0.3) 0px, transparent 50%)',
          'radial-gradient(at 80% 50%, rgba(59, 130, 246, 0.3) 0px, transparent 50%)',
          'radial-gradient(at 20% 50%, rgba(168, 85, 247, 0.3) 0px, transparent 50%)',
        ],
      }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute inset-0"
    />
  </div>
);

export default function LandingPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'XP System',
      description: 'Earn XP with every correct answer and level up',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Daily Streaks',
      description: 'Build consecutive day streaks and earn bonus rewards',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Leaderboards',
      description: 'Compete with friends and climb the rankings',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Achievements',
      description: 'Unlock special achievements and badges',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Multiplayer (Coming Soon)',
      description: 'Challenge friends in real-time battles',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'AI Generator (Coming Soon)',
      description: 'Auto-generated quizzes powered by AI',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Student',
      content: 'SnapQuiz made learning fun! I\'ve been using it daily.',
      avatar: '👨‍🎓',
    },
    {
      name: 'Sarah Chen',
      role: 'Educator',
      content: 'My students are more engaged with interactive quizzes.',
      avatar: '👩‍🏫',
    },
    {
      name: 'Mike Davis',
      role: 'Developer',
      content: 'The gamification keeps me motivated to learn.',
      avatar: '👨‍💻',
    },
  ];

  return (
    <div className="bg-dark-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <AnimatedGradient />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-4xl font-bold shadow-glow-purple">
                SQ
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent"
          >
            Learn Faster. Play Smarter.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 mb-8"
          >
            Earn XP, build streaks, unlock achievements and challenge your friends.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button size="lg" variant="primary" className="group">
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="ghost">
              Login
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Features
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-glow-purple transition-all h-full">
                  <div className="text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-5xl font-bold text-gold-400 mb-2">50K+</div>
              <p className="text-white/60">Active Learners</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-primary-400 mb-2">1M+</div>
              <p className="text-white/60">Quizzes Completed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-5xl font-bold text-secondary-400 mb-2">8</div>
              <p className="text-white/60">Quiz Categories</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16"
          >
            What Users Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <p className="text-white/80 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            Ready to level up?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 mb-8 text-lg"
          >
            Start your learning journey today and unlock your potential.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="primary" className="group">
              Get Started Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">SnapQuiz</h3>
              <p className="text-white/60 text-sm">Making learning fun through gamification.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Categories</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2024 SnapQuiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
