import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Zap, Ticket, Activity, MapPin, BarChart3,
  Settings, Bell, ChevronLeft, LogOut, Wifi, Menu, X,
  CreditCard, Layout, FileText, MessageSquare, HelpCircle, MoreHorizontal
} from 'lucide-react';

const navItems = [
  { section: 'OVERVIEW', items: [{ icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' }] },
  { section: 'OPERATIONS', items: [
    { icon: Zap, label: 'Quick Sell', path: '/dashboard/quick-sell' },
    { icon: Ticket, label: 'Vouchers', path: '/dashboard/vouchers' },
    { icon: Activity, label: 'Sessions', path: '/dashboard/sessions' },
  ]},
  { section: 'NETWORK', items: [
    { icon: MapPin, label: 'Locations', path: '/dashboard/locations' },
    { icon: Layout, label: 'Captive Portal', path: '/dashboard/portal' },
  ]},
  { section: 'INSIGHTS', items: [
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  ]},
  { section: 'ACCOUNT', items: [
    { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ]},
];

const mobileNav = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: Ticket, label: 'Vouchers', path: '/dashboard/vouchers' },
  { icon: Zap, label: 'Sell', path: '/dashboard/quick-sell' },
  { icon: Activity, label: 'Sessions', path: '/dashboard/sessions' },
  { icon: MoreHorizontal, label: 'More', path: '' },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 border-r border-white/5 bg-sidebar z-40"
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center shrink-0">
            <Wifi className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display font-bold text-foreground">HotspotHive</span>}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-3 mb-2 p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground transition-colors self-end"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>

        <nav className="flex-1 overflow-y-auto px-3 space-y-6">
          {navItems.map(section => (
            <div key={section.section}>
              {!collapsed && <p className="text-[10px] font-semibold text-muted-foreground tracking-wider mb-2 px-2">{section.section}</p>}
              <div className="space-y-1">
                {section.items.map(item => {
                  const active = currentPath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative ${
                        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-xl gradient-bg opacity-10"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-primary' : ''}`} />
                      {!collapsed && <span className="font-medium">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">MN</div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Mama Ntilie</p>
                <p className="text-[10px] text-primary">Pro Plan</p>
              </div>
            )}
            {!collapsed && (
              <button onClick={() => navigate('/login')} className="text-muted-foreground hover:text-foreground">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all ${collapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        {/* Top header */}
        <header className="sticky top-0 z-30 border-b border-white/5 bg-background/80 backdrop-blur-xl h-14 flex items-center px-4 gap-4">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <select className="input-dark text-xs py-1.5 px-3 rounded-lg">
            <option>Main Shop — Arusha</option>
            <option>Upstairs Flat</option>
          </select>
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 gradient-bg rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">4</span>
          </button>
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold">MN</div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-white/5 bg-background/95 backdrop-blur-xl z-40">
        <div className="flex items-center justify-around h-16">
          {mobileNav.map(item => {
            const active = item.path && currentPath === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.path) navigate(item.path);
                  else setMobileMenuOpen(true);
                }}
                className={`flex flex-col items-center gap-1 px-3 py-1 ${active ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-white/5 z-50 lg:hidden p-4"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                    <Wifi className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-display font-bold text-foreground">HotspotHive</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-4">
                {navItems.map(section => (
                  <div key={section.section}>
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-wider mb-2 px-2">{section.section}</p>
                    {section.items.map(item => (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${
                          currentPath === item.path ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
