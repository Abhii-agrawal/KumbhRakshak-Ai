import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  Languages 
} from 'lucide-react';

export const AnnouncementModal = ({ isOpen, onClose }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  if (!isOpen) return null;

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

  const speak = (hindiText, id) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(hindiText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));
    if (hindiVoice) utterance.voice = hindiVoice;

    utterance.onstart = () => setCurrentlyPlaying(id);
    utterance.onend = () => setCurrentlyPlaying(null);
    utterance.onerror = () => setCurrentlyPlaying(null);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setCurrentlyPlaying(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0D131F] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-slate-100 relative">
        <button
          onClick={() => {
            stop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40">
            <Volume2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>AI Multi-Language Public Megaphone (Bhashini Engine)</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-mono">
                INDIAN HINDI TTS
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any channel to trigger real-time synthesized voice announcements over Kumbh Mela PA loudspeakers
            </p>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {announcements.map((item, idx) => {
            const isPlaying = currentlyPlaying === item.id;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isPlaying
                    ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-950/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    CHANNEL 0{idx + 1} • {item.location}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="text-xs font-bold text-white mb-1.5">
                  {item.title}
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 mb-2">
                  <p className="text-sm text-amber-200/90 font-sans leading-relaxed">
                    "{item.hindi}"
                  </p>
                </div>

                <p className="text-[11px] text-slate-400 italic mb-3">
                  "{item.translit}"
                </p>

                <button
                  onClick={() => speak(item.hindi, item.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    isPlaying
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Stop Playing (चुप करें)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Broadcast in Hindi (ध्वनि प्रसारण)</span>
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

export default AnnouncementModal;
