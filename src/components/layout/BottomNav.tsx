/**
 * Bottom Navigation for Mobile
 */

import { Home, BarChart3, User, Trophy } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Categories', icon: BarChart3, href: '/categories' },
    { label: 'Leaderboard', icon: Trophy, href: '/leaderboard' },
    { label: 'Profile', icon: User, href: '/profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10 px-4 py-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 px-4 py-2 text-white/60 hover:text-white transition-colors"
          >
            <item.icon size={24} />
            <span className="text-xs">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
