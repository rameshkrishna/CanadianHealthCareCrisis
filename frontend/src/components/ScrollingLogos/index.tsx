import { FC } from 'react';

const ScrollingLogos: FC = () => {
  return (
    <div className="bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-400 mb-8">TRUSTED BY 800,000+ HIGHLY PRODUCTIVE COMPANIES</p>
        <div className="overflow-hidden">
          <div className="flex space-x-8 animate-scroll">
            <img src="/logos/mapbox.png" alt="Mapbox" className="h-12"/>
            <img src="/logos/strapi.png" alt="Strapi" className="h-12"/>
            <img src="/logos/stencil.png" alt="Stencil" className="h-12"/>
            <img src="/logos/spotify.png" alt="Spotify" className="h-12"/>
            <img src="/logos/woocommerce.png" alt="WooCommerce" className="h-12"/>
            {/* Repeat logos to create a seamless scroll effect */}
            <img src="/logos/mapbox.png" alt="Mapbox" className="h-12"/>
            <img src="/logos/strapi.png" alt="Strapi" className="h-12"/>
            <img src="/logos/stencil.png" alt="Stencil" className="h-12"/>
            <img src="/logos/spotify.png" alt="Spotify" className="h-12"/>
            <img src="/logos/woocommerce.png" alt="WooCommerce" className="h-12"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollingLogos;
