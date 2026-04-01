export const plans = [
  { id: '1', name: '1 Hour Browse', duration: '1 hour', data: '500MB', speed: '2 Mbps', price: 500, currency: 'TZS', active: true, sold: 234, revenue: 117000, activeSessions: 3 },
  { id: '2', name: 'Daily Pass', duration: '24 hours', data: '2GB', speed: '5 Mbps', price: 2000, currency: 'TZS', active: true, sold: 156, revenue: 312000, activeSessions: 5 },
  { id: '3', name: 'Weekly Pro', duration: '7 days', data: '10GB', speed: '10 Mbps', price: 8000, currency: 'TZS', active: true, sold: 67, revenue: 536000, activeSessions: 2 },
];

export const vouchers = [
  { id: '1', code: 'HH-4829-AXKF', planId: '1', planName: '1 Hour Browse', price: 500, status: 'active' as const, createdAt: '2024-03-15', soldAt: '2024-03-15', customer: '+255 712 345 678', location: 'Main Shop' },
  { id: '2', code: 'HH-7391-BMZQ', planId: '2', planName: 'Daily Pass', price: 2000, status: 'unused' as const, createdAt: '2024-03-15', soldAt: null, customer: null, location: 'Main Shop' },
  { id: '3', code: 'HH-1056-CNWP', planId: '2', planName: 'Daily Pass', price: 2000, status: 'active' as const, createdAt: '2024-03-14', soldAt: '2024-03-14', customer: '+255 678 901 234', location: 'Main Shop' },
  { id: '4', code: 'HH-8274-DRYV', planId: '3', planName: 'Weekly Pro', price: 8000, status: 'expired' as const, createdAt: '2024-03-08', soldAt: '2024-03-08', customer: '+255 654 321 098', location: 'Upstairs Flat' },
  { id: '5', code: 'HH-5638-ETGH', planId: '1', planName: '1 Hour Browse', price: 500, status: 'sold' as const, createdAt: '2024-03-15', soldAt: '2024-03-15', customer: '+255 789 012 345', location: 'Main Shop' },
  { id: '6', code: 'HH-9012-FXLK', planId: '1', planName: '1 Hour Browse', price: 500, status: 'unused' as const, createdAt: '2024-03-15', soldAt: null, customer: null, location: 'Main Shop' },
  { id: '7', code: 'HH-3456-GPQM', planId: '2', planName: 'Daily Pass', price: 2000, status: 'active' as const, createdAt: '2024-03-14', soldAt: '2024-03-14', customer: '+255 612 345 789', location: 'Main Shop' },
  { id: '8', code: 'HH-7890-HWNR', planId: '3', planName: 'Weekly Pro', price: 8000, status: 'unused' as const, createdAt: '2024-03-15', soldAt: null, customer: null, location: 'Upstairs Flat' },
];

export const sessions = [
  { id: '1', device: 'Samsung Galaxy A54', deviceType: 'smartphone' as const, mac: 'AA:BB:12:34:56:78', voucher: 'HH-4829-AXKF', plan: '1 Hour Browse', timeRemaining: 2340, dataUsed: 125, dataLimit: 500, startedAt: '2024-03-15 10:30', status: 'active' as const, signal: 4 },
  { id: '2', device: 'iPhone 15', deviceType: 'smartphone' as const, mac: 'CC:DD:98:76:54:32', voucher: 'HH-1056-CNWP', plan: 'Daily Pass', timeRemaining: 54000, dataUsed: 890, dataLimit: 2000, startedAt: '2024-03-15 08:15', status: 'active' as const, signal: 3 },
  { id: '3', device: 'HP Laptop', deviceType: 'laptop' as const, mac: 'EE:FF:11:22:33:44', voucher: 'HH-3456-GPQM', plan: 'Daily Pass', timeRemaining: 32000, dataUsed: 1200, dataLimit: 2000, startedAt: '2024-03-15 09:00', status: 'active' as const, signal: 4 },
  { id: '4', device: 'Tecno Spark', deviceType: 'smartphone' as const, mac: 'GG:HH:55:66:77:88', voucher: 'HH-5638-ETGH', plan: '1 Hour Browse', timeRemaining: 0, dataUsed: 500, dataLimit: 500, startedAt: '2024-03-15 07:00', status: 'expired' as const, signal: 0 },
  { id: '5', device: 'MacBook Pro', deviceType: 'laptop' as const, mac: 'II:JJ:99:00:AA:BB', voucher: 'HH-8274-DRYV', plan: 'Weekly Pro', timeRemaining: 180000, dataUsed: 3200, dataLimit: 10000, startedAt: '2024-03-12 14:30', status: 'active' as const, signal: 4 },
  { id: '6', device: 'Xiaomi Redmi', deviceType: 'smartphone' as const, mac: 'KK:LL:CC:DD:EE:FF', voucher: 'HH-9012-FXLK', plan: '1 Hour Browse', timeRemaining: 1800, dataUsed: 75, dataLimit: 500, startedAt: '2024-03-15 11:00', status: 'active' as const, signal: 2 },
];

export const revenueData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: Math.floor(20000 + Math.random() * 60000),
    vouchers: Math.floor(5 + Math.random() * 30),
  };
});

export const transactions = [
  { id: '1', plan: 'Daily Pass', amount: 2000, time: '2 min ago', method: 'mpesa' as const },
  { id: '2', plan: '1 Hour Browse', amount: 500, time: '15 min ago', method: 'cash' as const },
  { id: '3', plan: 'Weekly Pro', amount: 8000, time: '1 hour ago', method: 'mpesa' as const },
  { id: '4', plan: '1 Hour Browse', amount: 500, time: '2 hours ago', method: 'airtel' as const },
  { id: '5', plan: 'Daily Pass', amount: 2000, time: '3 hours ago', method: 'cash' as const },
];

export const notifications = [
  { id: '1', type: 'sale' as const, title: 'New voucher sold', description: 'Daily Pass sold via M-Pesa — TZS 2,000', time: '2 min ago', read: false },
  { id: '2', type: 'system' as const, title: 'Router reconnected', description: 'MikroTik RB951 at Main Shop is back online', time: '1 hour ago', read: false },
  { id: '3', type: 'session' as const, title: 'Session expired', description: 'Device Samsung Galaxy ended session on 1 Hour Browse', time: '2 hours ago', read: true },
  { id: '4', type: 'session' as const, title: 'Session expired', description: 'Device Tecno Spark ended session on 1 Hour Browse', time: '3 hours ago', read: true },
];

export const testimonials = [
  { name: 'Amina Hassan', location: 'Dar es Salaam', rating: 5, quote: 'HotspotHive helped me turn my cafe WiFi into a real revenue stream. I make TZS 50,000 extra per month!', avatar: 'AH' },
  { name: 'Joseph Mwanga', location: 'Arusha', rating: 5, quote: 'The Quick Sell feature is incredible. I sell vouchers to my customers in seconds from my phone.', avatar: 'JM' },
  { name: 'Fatuma Bakari', location: 'Mwanza', rating: 4, quote: 'Setting up with my MikroTik router was so easy. The captive portal looks professional.', avatar: 'FB' },
];

export const faqData = [
  { q: 'What routers are supported?', a: 'HotspotHive works with MikroTik (recommended), OpenWRT, and Ubiquiti UniFi routers. MikroTik offers the best integration with automatic configuration.' },
  { q: 'Do I need a special internet connection?', a: 'No! Any internet connection works. You just need a compatible router and an internet subscription from your ISP.' },
  { q: 'How do customers pay for vouchers?', a: 'Customers can pay via M-Pesa, Airtel Money, or cash. You can also enable self-service purchasing through your captive portal.' },
  { q: 'Can I manage multiple locations?', a: 'Yes! Pro and Business plans support multiple locations. Each location can have its own router, voucher plans, and captive portal.' },
  { q: 'Is there a contract or commitment?', a: 'No contracts! You can start with the free Starter plan and upgrade anytime. Cancel whenever you want.' },
  { q: 'How do I deliver vouchers to customers?', a: 'You can print vouchers, share via WhatsApp, send via SMS, or let customers see the code on screen at point of sale.' },
];
