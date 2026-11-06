import React, { useState, useEffect } from 'react';
import {
  MapPin, Navigation, Compass, ExternalLink, Search, Check,
  ChevronDown, ZoomIn, ZoomOut, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  Sparkles, ShieldCheck, AlertCircle, RefreshCw, Copy, CheckCircle2
} from 'lucide-react';
import { cambodiaProvinces } from '../data/cambodiaLocations';

// Curated popular Cambodian delivery landmark hubs
export const cambodiaLandmarks = [
  { nameEn: 'Aeon Mall 1 (Tonle Bassac)', nameKh: 'អ៊ីអន ១ (ទន្លេបាសាក់)', province: 'Phnom Penh', district: 'Chamkar Mon', commune: 'Tonle Bassac', lat: 11.5476, lng: 104.9332 },
  { nameEn: 'BKK1 / Brown Coffee', nameKh: 'បឹងកេងកង ១', province: 'Phnom Penh', district: 'Boeng Keng Kang', commune: 'Boeng Keng Kang 1', lat: 11.5529, lng: 104.9242 },
  { nameEn: 'Wat Phnom / Daun Penh', nameKh: 'វត្តភ្នំ / ដូនពេញ', province: 'Phnom Penh', district: 'Doun Penh', commune: 'Voat Phnum', lat: 11.5762, lng: 104.9228 },
  { nameEn: 'Russian Market (TTP)', nameKh: 'ផ្សារទួលទំពូង', province: 'Phnom Penh', district: 'Chamkar Mon', commune: 'Tuol Tumpung 1', lat: 11.5408, lng: 104.9147 },
  { nameEn: 'TK Avenue (Tuol Kouk)', nameKh: 'ធីខេ អាវិនញូ (ទួលគោក)', province: 'Phnom Penh', district: 'Tuol Kouk', commune: 'Boeng Kak 1', lat: 11.5833, lng: 104.8988 },
  { nameEn: 'Koh Pich (Diamond Island)', nameKh: 'កោះពេជ្រ', province: 'Phnom Penh', district: 'Chamkar Mon', commune: 'Tonle Bassac', lat: 11.5539, lng: 104.9406 },
  { nameEn: 'Aeon Mall 2 (Sen Sok)', nameKh: 'អ៊ីអន ២ (សែនសុខ)', province: 'Phnom Penh', district: 'Sen Sok', commune: 'Phnom Penh Thmei', lat: 11.5922, lng: 104.8781 },
  { nameEn: 'Chroy Changvar / OCIC', nameKh: 'ជ្រោយចង្វារ', province: 'Phnom Penh', district: 'Russey Keo', commune: 'Svay Pak', lat: 11.5912, lng: 104.9317 },
  { nameEn: 'Siem Reap Pub Street', nameKh: 'ផាប់ស្ទ្រីត សៀមរាប', province: 'Siem Reap', district: 'Siem Reap Municipality', commune: 'Svay Dangkum', lat: 13.3547, lng: 103.8549 },
  { nameEn: 'Battambang Riverside', nameKh: 'មាត់ស្ទឹង បាត់ដំបង', province: 'Battambang', district: 'Battambang Municipality', commune: 'Svay Pao', lat: 13.1027, lng: 103.1982 },
];

export default function GoogleMapPicker({ location, onChange, lang = 'en' }) {
  const [zoom, setZoom] = useState(16);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState('');
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Default coordinates to Phnom Penh city center if empty
  const lat = location?.lat || 11.5564;
  const lng = location?.lng || 104.9282;

  // Selected province / district objects for cascading dropdowns
  const selectedProvinceObj = cambodiaProvinces.find(
    (p) => p.nameEn === (location?.province || 'Phnom Penh')
  ) || cambodiaProvinces[0];

  const availableDistricts = selectedProvinceObj.districts || [];
  const selectedDistrictObj = availableDistricts.find(
    (d) => d.nameEn === location?.district
  ) || availableDistricts[0] || { nameEn: '', communes: [] };

  const availableCommunes = selectedDistrictObj.communes || [];

  // Update field helper
  const updateField = (field, value) => {
    onChange({
      ...location,
      [field]: value
    });
  };

  // Province change handler (resets district & commune)
  const handleProvinceChange = (provinceName) => {
    const prov = cambodiaProvinces.find((p) => p.nameEn === provinceName) || cambodiaProvinces[0];
    const defaultDist = prov.districts[0] || { nameEn: '', communes: [] };
    const defaultComm = defaultDist.communes[0] || '';

    // Also adjust coordinates roughly toward the province center
    let provLat = 11.5564;
    let provLng = 104.9282;
    if (prov.id === 'siem-reap') { provLat = 13.3633; provLng = 103.8564; }
    else if (prov.id === 'battambang') { provLat = 13.0957; provLng = 103.2022; }
    else if (prov.id === 'kampot') { provLat = 10.6104; provLng = 104.1815; }
    else if (prov.id === 'preah-sihanouk') { provLat = 10.6253; provLng = 103.5234; }
    else if (prov.id === 'kandal') { provLat = 11.4833; provLng = 105.0167; }

    onChange({
      ...location,
      province: prov.nameEn,
      district: defaultDist.nameEn,
      commune: defaultComm,
      lat: provLat,
      lng: provLng,
      landmark: `${prov.nameEn} Center`
    });
  };

  // District change handler
  const handleDistrictChange = (districtName) => {
    const dist = availableDistricts.find((d) => d.nameEn === districtName) || availableDistricts[0];
    const defaultComm = dist?.communes[0] || '';
    onChange({
      ...location,
      district: dist?.nameEn || '',
      commune: defaultComm
    });
  };

  // Geolocation trigger
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError(lang === 'kh' ? 'ឧបករណ៍របស់អ្នកមិនគាំទ្រ GPS ទេ' : 'Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = Number(position.coords.latitude.toFixed(6));
        const userLng = Number(position.coords.longitude.toFixed(6));

        onChange({
          ...location,
          lat: userLat,
          lng: userLng,
          landmark: lang === 'kh' ? 'ទីតាំង GPS បច្ចុប្បន្នរបស់អ្នក' : 'Your Live GPS Location'
        });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoError(lang === 'kh' ? 'សូមអនុញ្ញាតសិទ្ធិប្រើប្រាស់ទីតាំង (Location Permission)' : 'Location permission denied. Please allow location access or choose a landmark.');
        } else {
          setGeoError(lang === 'kh' ? 'មិនអាចកំណត់ទីតាំង GPS បានទេ' : 'Unable to retrieve your location. Please pick from landmarks below.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Select landmark shortcut
  const handleSelectLandmark = (item) => {
    onChange({
      ...location,
      lat: item.lat,
      lng: item.lng,
      province: item.province,
      district: item.district,
      commune: item.commune,
      landmark: lang === 'kh' ? item.nameKh : item.nameEn
    });
  };

  // Nudge pin slightly for precision gate/entrance targeting
  const nudgePin = (dLat, dLng) => {
    const newLat = Number((lat + dLat).toFixed(6));
    const newLng = Number((lng + dLng).toFixed(6));
    onChange({
      ...location,
      lat: newLat,
      lng: newLng
    });
  };

  // Copy coordinates
  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Custom search submission
  const handleSearchPlace = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search against landmarks list first
    const query = searchQuery.toLowerCase();
    const found = cambodiaLandmarks.find(
      (l) => l.nameEn.toLowerCase().includes(query) || l.nameKh.toLowerCase().includes(query)
    );

    if (found) {
      handleSelectLandmark(found);
      setSearchQuery('');
    } else {
      // Set notes or address detail
      updateField('addressDetails', searchQuery);
      setSearchQuery('');
    }
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=${lang === 'kh' ? 'km' : 'en'}&z=${zoom}&output=embed`;

  return (
    <div className="space-y-4 font-sans">
      
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
          <MapPin className="w-4 h-4 text-red-600" />
          <span>{lang === 'kh' ? 'ជ្រើសរើសទីតាំងដឹកជញ្ជូនលើ Google Map' : 'Customer Delivery Location on Google Map'}</span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>GPS Pin Active</span>
        </span>
      </div>

      {/* Main Map Box */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-red-500/80 shadow-md bg-gray-100 group">
        
        {/* Google Map Embed Iframe */}
        <div className="h-64 sm:h-72 w-full relative">
          <iframe
            title="Customer Google Map Delivery Location"
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full pointer-events-auto"
          />

          {/* Floating Map Pin Center Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none flex flex-col items-center">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl border-2 border-white animate-bounce">
                <MapPin className="w-5 h-5 fill-white" />
              </div>
              {/* Radar pulse ring */}
              <div className="absolute -inset-1 rounded-full bg-red-500/40 animate-ping pointer-events-none"></div>
            </div>
            <div className="w-2.5 h-1 bg-black/40 rounded-full blur-[1px] mt-0.5"></div>
            
            {/* Tag above pin */}
            <div className="mt-1 px-2.5 py-0.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full shadow-lg whitespace-nowrap">
              {location?.landmark || (lang === 'kh' ? 'ទីតាំងទម្លាក់ទំនិញ' : 'Delivery Drop-off')}
            </div>
          </div>

          {/* Top-Right Quick Map Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            {/* Zoom In */}
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(20, z + 1))}
              className="w-8 h-8 rounded-xl bg-white/95 hover:bg-white text-gray-700 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {/* Zoom Out */}
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(10, z - 1))}
              className="w-8 h-8 rounded-xl bg-white/95 hover:bg-white text-gray-700 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Top-Left GPS Button */}
          <div className="absolute top-3 left-3 z-10">
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 cursor-pointer transition-all border border-white/20 disabled:opacity-60"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? (lang === 'kh' ? 'កំពុងស្វែងរក...' : 'Locating...') : (lang === 'kh' ? 'កំណត់ទីតាំង GPS របស់ខ្ញុំ' : 'Use Current GPS')}</span>
            </button>
          </div>

          {/* Bottom Overlay Info Banner */}
          <div className="absolute bottom-2 inset-x-2 bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-xl p-2.5 shadow-md flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-gray-900 block truncate text-[11px]">
                  {location?.landmark || `${lat.toFixed(4)}, ${lng.toFixed(4)}`}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {lat.toFixed(6)}, {lng.toFixed(6)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyCoords}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                title="Copy Coordinates"
              >
                {copiedCoords ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-[#1e3a5f] hover:bg-[#142a45] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs"
              >
                <span>Google Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Nudge Fine-Tuner Bar */}
        <div className="bg-[#f8fafc] px-3 py-2 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-600">
          <span className="font-semibold">{lang === 'kh' ? 'តម្រង់ទីតាំងដៅមុខផ្ទះ (Fine-tune Pin):' : 'Fine-tune delivery pin:'}</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => nudgePin(0.0003, 0)}
              className="p-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
              title="Nudge North"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => nudgePin(-0.0003, 0)}
              className="p-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
              title="Nudge South"
            >
              <ArrowDown className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => nudgePin(0, -0.0003)}
              className="p-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
              title="Nudge West"
            >
              <ArrowLeft className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => nudgePin(0, 0.0003)}
              className="p-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
              title="Nudge East"
            >
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Geolocation error feedback if any */}
      {geoError && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{geoError}</span>
        </div>
      )}

      {/* Quick Landmark Buttons */}
      <div>
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
          {lang === 'kh' ? 'ទីតាំងពេញនិយមក្នុងភ្នំពេញ & ខេត្ត' : 'Quick Delivery Hubs in Cambodia:'}
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          {cambodiaLandmarks.map((item, idx) => {
            const isSelected = Math.abs(lat - item.lat) < 0.001 && Math.abs(lng - item.lng) < 0.001;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectLandmark(item)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <MapPin className="w-3 h-3" />
                <span>{lang === 'kh' ? item.nameKh : item.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cascading Administrative Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <div>
          <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
            {lang === 'kh' ? 'រាជធានី / ខេត្ត' : 'Province / City'} *
          </label>
          <select
            value={location?.province || 'Phnom Penh'}
            onChange={(e) => handleProvinceChange(e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            {cambodiaProvinces.map((p) => (
              <option key={p.id} value={p.nameEn}>
                {lang === 'kh' ? `${p.nameKh} (${p.nameEn})` : `${p.nameEn} (${p.nameKh})`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
            {lang === 'kh' ? 'ខណ្ឌ / ស្រុក' : 'Khan / District'} *
          </label>
          <select
            value={location?.district || ''}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            {availableDistricts.map((d) => (
              <option key={d.id} value={d.nameEn}>
                {lang === 'kh' ? `${d.nameKh} (${d.nameEn})` : `${d.nameEn} (${d.nameKh})`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
            {lang === 'kh' ? 'សង្កាត់ / ឃុំ' : 'Sangkat / Commune'}
          </label>
          <select
            value={location?.commune || ''}
            onChange={(e) => updateField('commune', e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            {availableCommunes.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* House / Street / Floor details */}
      <div>
        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
          {lang === 'kh' ? 'លេខផ្ទះ ផ្លូវ អគារ ឬខុនដូ' : 'Street Address / House / Condo / Room #'} *
        </label>
        <input
          type="text"
          required
          value={location?.addressDetails || ''}
          onChange={(e) => updateField('addressDetails', e.target.value)}
          placeholder={lang === 'kh' ? 'ឧ. ផ្ទះលេខ #24, ផ្លូវ 308, បន្ទប់ 402 អគារខុនដូ...' : 'e.g. #24, Street 308, Floor 4, Room 402...'}
          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      {/* Driver Instructions / Notes */}
      <div>
        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
          {lang === 'kh' ? 'ចំណាំសម្រាប់អ្នកដឹកជញ្ជូន (Driver Instructions)' : 'Notes for Delivery Rider (Optional)'}
        </label>
        <input
          type="text"
          value={location?.notes || ''}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder={lang === 'kh' ? 'ឧ. ទ្វាររបងពណ៌ត្នោត ក្បែរហាងកាហ្វេ Brown, សូមទូរស័ព្ទមុនពេលមកដល់' : 'e.g. Brown gate next to Brown Coffee, please call on arrival'}
          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

    </div>
  );
}
