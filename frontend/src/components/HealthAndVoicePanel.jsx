import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Volume2, 
  VolumeX, 
  Thermometer, 
  Droplet, 
  Activity, 
  ShieldCheck, 
  Radio, 
  Sparkles, 
  AlertCircle, 
  Flame 
} from 'lucide-react';

export const HealthAndVoicePanel = ({ telemetrySummary = {}, sectors = [] }) => {
  // Live thermal gate screening counter (starts with benchmark and ticks realistically)
  const [thermalScreened, setThermalScreened] = useState(148280);
  const [currentlySpeaking, setCurrentlySpeaking] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Derived metrics from telemetry or props
  const feverTotal = telemetrySummary.total_fever_flags ?? (sectors.reduce((acc, s) => acc + (s.fever_cases || 0), 0) || 104);
  const avgBOD = telemetrySummary.avg_water_bod_mg_l ?? (sectors.length ? (sectors.reduce((acc, s) => acc + (s.water_bod_mg_l || 0), 0) / sectors.length).toFixed(2) : 2.31);
  const dehydrationTotal = telemetrySummary.total_dehydration_cases ?? (sectors.reduce((acc, s) => acc + (s.dehydration_cases || 0), 0) || 154);

  // Check speech synthesis support on mount
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  // Tick the thermal screening counter to simulate continuous gate flow
  useEffect(() => {
    const timer = setInterval(() => {
      setThermalScreened((prev) => prev + Math.floor(Math.random() * 8) + 3);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Speech synthesizer execution using Bhashini-style Hindi voice
  const speakAnnouncement = (textHindi, textTranslit, announcementId) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (currentlySpeaking === announcementId) {
      setCurrentlySpeaking(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textHindi);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick a Hindi voice if available
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    utterance.onstart = () => {
      setCurrentlySpeaking(announcementId);
    };

    utterance.onend = () => {
      setCurrentlySpeaking(null);
    };

    utterance.onerror = () => {
      setCurrentlySpeaking(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setCurrentlySpeaking(null);
    }
  };

  // 3 Bhashini-Style Public Megaphone Announcements
  const announcements = [
    {
      id: 'ANNOUNCE_1',
      title: 'Crowd Diversion (Choke Point Bypass)',
      badge: 'TRAFFIC ALERT',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      hindi: 'यात्रियों से अनुरोध है कि पांटून ब्रिज 3 पर भीड़ अधिक है, कृपया सेक्टर 2 का रास्ता चुनें।',
      translit: 'Yatriyon se anurodh hai ki Pontoon Bridge 3 par bheed adhik hai, kripya Sector 2 ka rasta chunein.',
      location: 'Pontoon Bridge 3 -> Sector 2 Bypass',
    },
    {
      id: 'ANNOUNCE_2',
      title: 'Bio-Surveillance Medical Alert',
      badge: 'HEALTH EMERGENCY',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      hindi: 'स्वास्थ्य चेतावनी! सेक्टर 4 के मेडिकल कैंप में तेज बुखार के मामले बढ़े हैं। मेडिकल टीम तुरंत पहुंच रही है।',
      translit: 'Swasthya chetavni! Sector 4 ke medical camp mein tez bukhar ke mamle badhe hain. Medical team turant pahunch rahi hai.',
      location: 'Akhara Sector 4 Tent City',
    },
    {
      id: 'ANNOUNCE_3',
      title: 'Emergency Green Corridor Siren & Clearance',
      badge: 'GREEN CORRIDOR',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      hindi: 'आपातकालीन सूचना! संगम घाट से सेंट्रल हॉस्पिटल तक ग्रीन कॉरिडोर बनाया गया है। कृपया एम्बुलेंस को रास्ता दें।',
      translit: 'Aapatkaaleen suchna! Sangam Ghat se Central Hospital tak Green Corridor banaya gaya hai. Kripya ambulance ko rasta dein.',
      location: 'Sangam Nose to Central Hospital Hub',
    },
  ];

  return (
    <div className="w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl font-sans text-gray-100">
      {/* Header with Viksit Bharat @ 2047 Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/30 text-white">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>🩺 KumbhRakshak Bio-Surveillance &amp; Health Command</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Live Triveni Sangam Public Health Monitoring, Water Safety &amp; AI Multilingual Megaphone
            </p>
          </div>
        </div>

        {/* National Initiative Badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-emerald-500/20 border border-amber-500/40 px-3 py-1.5 rounded-full shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span className="text-xs font-black tracking-wider text-amber-300 uppercase">
            Viksit Bharat @ 2047
          </span>
          <span className="text-[10px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded font-mono font-bold">
            VBYLD
          </span>
        </div>
      </div>

      {/* 4 Metric Cards Grid - Clean 2x2 Layout */}
      <div className="grid grid-cols-2 gap-3 my-5">
        {/* Card 1: Thermal Gate Screened */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-4 shadow-lg hover:border-gray-700 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Thermal Gate Screened
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-white tracking-tight">
              {thermalScreened.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              +12/sec
            </span>
          </div>
          <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>6 Entry Gate Scanners Active</span>
          </div>
        </div>

        {/* Card 2: Fever Flags */}
        <div className={`bg-gray-900/90 rounded-xl p-4 shadow-lg transition-all relative overflow-hidden group border ${
          feverTotal > 25 ? 'border-red-500/80 shadow-red-500/20' : 'border-gray-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Fever Flags
            </span>
            <div className={`p-2 rounded-lg ${feverTotal > 25 ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/10 text-purple-400'}`}>
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className={`text-2xl font-bold font-mono tracking-tight ${
              feverTotal > 25 ? 'text-red-400 animate-pulse' : 'text-purple-300'
            }`}>
              {feverTotal}
            </span>
            <span className="text-xs text-gray-400">cases</span>
          </div>
          <div className="mt-2 text-[11px] flex items-center justify-between">
            <span className={feverTotal > 25 ? 'text-red-400 font-bold' : 'text-gray-400'}>
              {feverTotal > 25 ? '⚠️ Bio-Alert Threshold Exceeded' : 'Within Normal Range'}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">Limit: 25</span>
          </div>
        </div>

        {/* Card 3: Ganga Water BOD Level */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-4 shadow-lg hover:border-gray-700 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Ganga Water BOD Level
            </span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-cyan-300 tracking-tight">
              {avgBOD}
            </span>
            <span className="text-xs text-gray-400 font-medium">mg/L</span>
          </div>
          <div className="mt-2 text-[11px] flex items-center justify-between">
            <span className={`inline-flex items-center gap-1 font-semibold ${
              Number(avgBOD) < 3.0 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {Number(avgBOD) < 3.0 ? 'Bathing Quality Safe (<3.0)' : 'Monitoring Advised'}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">CPCB Stds</span>
          </div>
        </div>

        {/* Card 4: Dehydration Cases */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-xl p-4 shadow-lg hover:border-gray-700 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Dehydration Cases
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-amber-300 tracking-tight">
              {dehydrationTotal}
            </span>
            <span className="text-xs text-gray-400">pilgrims</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center justify-between">
            <span>ORS Points Dispatched</span>
            <span className="text-[10px] text-gray-500 font-mono">18 Booths</span>
          </div>
        </div>
      </div>

      {/* AI Public Megaphone Broadcast Section (Bhashini Style) */}
      <div className="bg-gray-950/70 border border-gray-800/90 rounded-xl p-5 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Volume2 className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>AI Public Megaphone Broadcast (Bhashini Voice Engine)</span>
                {currentlySpeaking && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/40 animate-pulse font-mono">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    BROADCASTING IN HINDI...
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-400">
                Click any announcement to synthesize real-time Indian Hindi announcements via PA speakers
              </p>
            </div>
          </div>

          {currentlySpeaking && (
            <button
              onClick={stopSpeech}
              className="inline-flex items-center space-x-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-700 transition-all self-start sm:self-auto"
            >
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              <span>Stop Broadcast</span>
            </button>
          )}
        </div>

        {/* 3 Announcement Cards - Spacious 1-Column Stack */}
        <div className="grid grid-cols-1 gap-3.5 mt-4">
          {announcements.map((item, idx) => {
            const isSpeakingThis = currentlySpeaking === item.id;
            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between p-4 rounded-xl border transition-all ${
                  isSpeakingThis
                    ? 'bg-gradient-to-b from-rose-950/40 to-gray-900 border-rose-500/80 shadow-lg shadow-rose-950/50 scale-[1.02]'
                    : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-gray-400">
                      CHANNEL 0{idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-gray-200 mb-1.5 line-clamp-1">
                    {item.title}
                  </h4>

                  {/* Hindi Script Display */}
                  <div className="bg-gray-950/80 p-2.5 rounded-lg border border-gray-800/80 mb-2">
                    <p className="text-xs font-medium text-amber-200/90 leading-relaxed font-sans">
                      "{item.hindi}"
                    </p>
                  </div>

                  {/* Transliteration */}
                  <p className="text-[11px] text-gray-400 italic mb-3">
                    "{item.translit}"
                  </p>
                </div>

                {/* Speak Action Button */}
                <button
                  onClick={() => speakAnnouncement(item.hindi, item.translit, item.id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    isSpeakingThis
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/40 animate-pulse'
                      : 'bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-500/50 hover:shadow-md hover:shadow-indigo-600/20 active:scale-95'
                  }`}
                >
                  {isSpeakingThis ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop Playing (चुप करें)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Speak in Hindi (ध्वनि प्रसारण)</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HealthAndVoicePanel;
