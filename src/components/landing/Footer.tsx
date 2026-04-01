import { Wifi } from 'lucide-react';

export const Footer = () => (
  <footer className="border-t border-white/5 relative">
    <div className="h-0.5 gradient-bg opacity-50" />
    <div className="container px-4 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Wifi className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">HotspotHive</span>
          </div>
          <p className="text-muted-foreground text-sm">Turn your WiFi into a business.</p>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Docs'] },
          { title: 'Company', links: ['About', 'Support', 'Contact'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-foreground text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(l => (
                <li key={l}><a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-6 border-t border-white/5 text-center">
        <p className="text-muted-foreground text-sm">Made with ❤️ in Tanzania</p>
      </div>
    </div>
  </footer>
);
