/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList
} from 'recharts';
import { 
  ChevronRight, ChevronLeft, Award, TrendingUp, Info, Search, 
  Home, Video, LayoutGrid, ClipboardList, Lightbulb, CheckCircle,
  Users, ShoppingCart, Zap, Fuel, GraduationCap, Flag, Crown, RefreshCcw,
  HelpCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Interfaces ---
interface SlideData {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// --- Components ---

const SaudiEmblem = () => (
  <div className="flex items-center gap-3 md:gap-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white shadow-lg overflow-hidden">
    <div className="flex flex-col items-center gap-1 group">
      <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center bg-saudi-green/10 rounded-xl transition-transform group-hover:scale-110">
        <Crown className="text-saudi-green" size={28} />
      </div>
      <span className="text-[8px] md:text-[10px] font-bold text-saudi-green tracking-tighter">جامعة الملك عبدالعزيز</span>
      <div className="h-0.5 w-full bg-saudi-gold rounded-full opacity-30 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
    </div>
    <div className="w-px h-10 bg-saudi-gold/20" />
    <div className="flex flex-col items-center gap-1 group">
      <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center bg-saudi-gold/10 rounded-xl transition-transform group-hover:scale-110">
        <Award className="text-saudi-gold" size={28} />
      </div>
      <span className="text-[8px] md:text-[10px] font-bold text-saudi-gold tracking-tighter">رؤية المملكة ٢٠٣٠</span>
      <div className="h-0.5 w-full bg-saudi-green rounded-full opacity-30 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
    </div>
  </div>
);

const Tag = ({ children, variant = 'blue' }: { children: React.ReactNode, variant?: 'blue' | 'green' | 'red' | 'gold' | 'purple' }) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700',
    gold: 'bg-amber-50 text-amber-700',
    purple: 'bg-purple-50 text-purple-700',
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold", styles[variant])}>
      {children}
    </span>
  );
};

const FlipCard = ({ title, icon, front, back, className, small = false, bgImage }: { 
  title: string; 
  icon: React.ReactNode; 
  front: React.ReactNode; 
  back: React.ReactNode;
  className?: string;
  key?: React.Key;
  small?: boolean;
  bgImage?: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Subtle wiggle to attract attention after slide entry
    const timer = setTimeout(() => setHasAnimated(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn("flip-card-container cursor-pointer perspective-1000", small ? "h-40 md:h-52" : "h-56 md:h-72", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="w-full h-full relative preserve-3d"
        animate={{ 
          rotateY: isFlipped ? 180 : (hasAnimated && !isFlipped ? [0, -3, 3, 0] : 0),
          scale: !isFlipped && hasAnimated ? [1, 1.015, 1] : 1
        }}
        transition={{ 
          rotateY: isFlipped 
            ? { duration: 0.6, type: "spring", stiffness: 260, damping: 20 }
            : { duration: 0.8, times: [0, 0.2, 0.5, 0.8] },
          scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        {/* Front */}
        <div className={cn(
          "absolute inset-0 backface-hidden w-full h-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col",
          small ? "p-3" : "p-6"
        )}>
          {/* Interaction Badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-saudi-gold/10 px-2 py-0.5 rounded-full animate-pulse z-20">
            <div className="w-1.5 h-1.5 bg-saudi-gold rounded-full" />
            <span className="text-[7px] md:text-[9px] font-bold text-saudi-gold uppercase tracking-widest">تفاعل</span>
          </div>

          <div className="absolute top-0 right-0 w-12 h-12 bg-saudi-gold/5 rounded-bl-3xl flex items-center justify-center text-saudi-gold">
            <RefreshCcw size={16} className={cn("opacity-40 transition-all", !isFlipped && "animate-spin-slow")} />
          </div>
          <div className={cn(
            "flex items-center gap-2 text-saudi-green font-black",
            small ? "text-xs md:text-sm mb-2" : "text-sm md:text-lg mb-4"
          )}>
            <span className="text-saudi-gold">{icon}</span>
            <h4 className="truncate">{title}</h4>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-3">
             <div className="absolute inset-0 flex items-center justify-center opacity-5 grayscale scale-150 rotate-12 pointer-events-none">
                {icon}
             </div>
             <div className="relative z-10 w-full text-center">
              {front}
             </div>
          </div>
          <div className="mt-2 text-[8px] md:text-[10px] text-gray-400 text-center font-medium flex items-center justify-center gap-1 group">
             <span className="group-hover:text-saudi-gold transition-colors">انقر للتدوير والقراءة</span>
             <motion.span
               animate={{ x: [0, 4, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
             >←</motion.span>
          </div>
        </div>

        {/* Back */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden w-full h-full rounded-3xl border-2 border-saudi-gold text-white flex flex-col relative overflow-hidden rotate-y-180",
            small ? "p-4 md:p-6" : "p-6"
          )}
          style={{ 
            backgroundColor: '#0a4b33',
            backgroundImage: bgImage ? `linear-gradient(rgba(10, 75, 51, 0.93), rgba(10, 75, 51, 0.95)), url(${bgImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={cn(
            "relative z-10 flex items-center gap-2 text-saudi-gold font-black border-b border-saudi-gold/30",
            small ? "mb-2 pb-2 text-[12px] md:text-sm" : "mb-4 pb-4 text-sm md:text-lg"
          )}>
            <Award size={small ? 14 : 20} className="text-saudi-gold" />
            <h4 className="truncate">تحليل معمق</h4>
          </div>
          <div className={cn(
            "relative z-10 flex-1 flex flex-col justify-center leading-relaxed font-bold",
            small ? "text-[11px] md:text-xs" : "text-sm md:text-base"
          )}>
            {back}
          </div>
          <div className="absolute bottom-2 left-2 opacity-10 text-saudi-gold scale-150">
            {icon}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SlideContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    className={cn("h-full flex flex-col gap-4 overflow-hidden py-1", className)}
  >
    {children}
  </motion.div>
);

// --- App ---

export default function App() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const nextVal = currentSlide + newDirection;
    if (nextVal >= 0 && nextVal < slides.length) {
      setSlide([nextVal, newDirection]);
    }
  };

  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);

  const trendData = [
    { year: '2021', val: 67 },
    { year: 'ذروة 2022', val: 100 },
    { year: '2023', val: 83 },
    { year: '2024', val: 69 },
    { year: '2025', val: 72 },
    { year: '2026', val: 60 }
  ];

  const slides: SlideData[] = [
    // 1. Cover
    {
      id: 1,
      title: "ضريبة القيمة المضافة 15%",
      icon: <Award />,
      content: (
        <SlideContainer className="justify-center items-center text-center">
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-48 md:w-64 md:h-64 mb-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/80 shadow-xl overflow-hidden relative flex flex-col items-center justify-center p-6 group"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0a4b33 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
            <Trophy size={64} className="text-saudi-gold mb-4 transition-transform group-hover:scale-125 duration-500" />
            <div className="relative z-10 text-center">
               <div className="text-saudi-green font-black text-2xl tracking-widest">VISION رؤية</div>
               <div className="text-saudi-gold font-black text-4xl">2030</div>
               <div className="h-1 w-full bg-saudi-green mt-2 rounded-full transform scale-x-50"></div>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-black text-saudi-green mb-4 drop-shadow-sm"
          >
            ضريبة القيمة المضافة <span className="text-saudi-gold">15%</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-saudi-green/70 mb-6 font-semibold"
          >
            تحليل الاتجاهات والآثار المجتمعية (2021-2026)
          </motion.p>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl px-4">
             <div className="bg-white/80 p-3 rounded-2xl border-r-4 border-saudi-green shadow-lg">
                <p className="text-[10px] text-gray-400 mb-1">تقديم الطالبات</p>
                <p className="text-xs font-black text-saudi-green">جامعة الملك عبدالعزيز</p>
             </div>
             <div className="bg-white/80 p-3 rounded-2xl border-r-4 border-saudi-gold shadow-lg">
                <p className="text-[10px] text-gray-400 mb-1">إشراف</p>
                <p className="text-xs font-black text-saudi-gold">الدكتورة الفاضلة</p>
             </div>
          </div>
        </SlideContainer>
      )
    },
    // 2. Introduction
    {
      id: 2,
      title: "نبذة عن القضية",
      icon: <Info />,
      content: (
        <SlideContainer className="grid md:grid-cols-2 gap-4 items-center">
          <div className="space-y-3">
             <div className="bg-white p-4 rounded-2xl border-r-4 border-saudi-green shadow-sm">
                <h3 className="font-bold text-saudi-green text-sm mb-2 flex items-center gap-2"><Flag size={14}/> القرار التاريخي</h3>
                <p className="text-xs leading-relaxed text-gray-600">في 11 مايو 2020، تقرر رفع نسبة ضريبة القيمة المضافة من 5% إلى 15% لمواجهة تداعيات جائحة كورونا وانخفاض أسعار النفط.</p>
             </div>
             <div className="bg-saudi-gold/5 p-4 rounded-2xl border-r-4 border-saudi-gold shadow-sm">
                <h3 className="font-bold text-saudi-green text-sm mb-2 flex items-center gap-2"><Zap size={14}/> الهدف الاقتصادي</h3>
                <p className="text-xs leading-relaxed text-gray-600">تعزيز الاستدامة المالية وتنوع مصادر الدخل الوطني لضمان استمرار المشاريع التنموية الكبرى في المملكة.</p>
             </div>
          </div>
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
             <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800" alt="Saudi Economy" className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-saudi-green/60 to-transparent flex items-bottom p-4">
                <p className="text-white text-[10px] font-bold mt-auto tracking-widest">رؤية السعودية 2030</p>
             </div>
          </div>
        </SlideContainer>
      )
    },
    // 3. Methodology
    {
      id: 3,
      title: "منهجية الرصد الرقمي",
      icon: <LayoutGrid />,
      content: (
        <SlideContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { 
               title: "أداة الرصد الذكي", 
               desc: "Google Trends", 
               icon: <Search size={18}/>, 
               img: "https://images.unsplash.com/photo-1543286386-713bcd537a72?auto=format&fit=crop&q=80&w=400",
               detail: "خوارزميات جوجل وتتبع الاهتمامات اللحظية يضمن الوصول لنبض الشارع السعودي."
             },
             { 
               title: "الشمول الجغرافي", 
               desc: "المملكة العربية السعودية", 
               icon: <Flag size={18}/>, 
               img: "https://images.unsplash.com/photo-1512428559083-a400a4b11103?auto=format&fit=crop&q=80&w=400",
               detail: "تغطية كافة المناطق لرصد التباين من نيوم شمالاً وحتى جازان جنوباً."
             },
             { 
               title: "النطاق الزمني", 
               desc: "خمس سنوات (2021 - 2026)", 
               icon: <RefreshCcw size={18}/>, 
               img: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=400",
               detail: "تحليل يمتد لنصف عقد لمراقبة تحول الوعي من صدمة القرار إلى ثقافة الاستهلاك."
             },
             { 
               title: "المحور التحليلي", 
               desc: "الضريبة وبدل الغلاء", 
               icon: <ClipboardList size={18}/>, 
               img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400",
               detail: "ربط السلوك الرقمي ببدل غلاء المعيشة لفهم كيفية إدارة الميزانية."
             }
           ].map((item, i) => (
             <FlipCard 
               key={i}
               small
               bgImage={item.img}
               title={item.title}
               icon={item.icon}
               front={<div className="text-center font-black text-sm text-saudi-green px-2 leading-tight">{item.desc}</div>}
               back={<p className="text-center md:text-right font-bold leading-relaxed">{item.detail}</p>}
             />
           ))}
           <div className="col-span-2 md:col-span-4 bg-white p-4 rounded-3xl border-r-8 border-saudi-gold flex items-center gap-5 shadow-md">
              <div className="w-14 h-14 rounded-full bg-saudi-green flex items-center justify-center text-white flex-shrink-0 shadow-xl">
                <Lightbulb size={28}/>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-black text-saudi-green mb-1">السؤال المركزي للدراسة:</h4>
                <p className="text-xs text-gray-600 font-medium italic leading-relaxed">"كيف تفاعل الجمهور السعودي رقمياً مع قرار رفع الضريبة، وما هي الأنماط السلوكية التي تشكلت عبر محركات البحث على مدار خمس سنوات؟"</p>
              </div>
           </div>
        </SlideContainer>
      )
    },
    // 4. Time Trend
    {
      id: 4,
      title: "الاتجاه الزمني للبحث",
      icon: <TrendingUp />,
      content: (
        <SlideContainer>
          <div className="bg-white rounded-3xl p-4 border border-gray-100 flex-1 shadow-inner relative overflow-hidden flex flex-col">
             <div className="flex-1 min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={trendData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.05} />
                   <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                   <YAxis hide />
                   <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                   <Bar dataKey="val" radius={[8, 8, 0, 0]}>
                     <LabelList dataKey="val" position="top" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#0a4b33' }} />
                     {trendData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.val === 100 ? '#d4a017' : '#0a4b33'} />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
             
             {/* Thick Bordered Legend Bar */}
             <div className="mt-2 p-2 bg-saudi-green/5 border-2 md:border-4 border-saudi-gold rounded-xl flex justify-around items-center gap-2">
                <div className="flex items-center gap-1.5">
                   <div className="w-3 h-3 rounded-sm bg-saudi-gold shadow-sm" />
                   <span className="text-[9px] md:text-xs font-black text-saudi-green">الذهبي: ذروة التفاعل (100)</span>
                </div>
                <div className="w-px h-4 bg-saudi-gold/20" />
                <div className="flex items-center gap-1.5">
                   <div className="w-3 h-3 rounded-sm bg-saudi-green shadow-sm" />
                   <span className="text-[9px] md:text-xs font-black text-saudi-green">الأخضر: استقرار الاهتمام</span>
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-1">
             <div className="bg-saudi-green text-white p-2 rounded-xl text-center shadow-lg">
                <p className="text-[10px] opacity-80 mb-0.5">بدأت الدراسة بـ</p>
                <p className="text-xs font-black">67 نقطة (2021)</p>
             </div>
             <div className="bg-saudi-gold text-white p-2 rounded-xl text-center shadow-lg">
                <p className="text-[10px] opacity-80 mb-0.5">استقرت في القمة بـ</p>
                <p className="text-xs font-black">60 نقطة (2026)</p>
             </div>
          </div>
        </SlideContainer>
      )
    },
    // 5. Rising Keywords
    {
      id: 5,
      title: "الكلمات الصاعدة ودلالاتها",
      icon: <Search />,
      content: (
        <SlideContainer className="grid grid-cols-2 md:grid-cols-4 gap-3">
           {[
             { title: "هيئة الزكاة والضريبة", val: "+4,150%", desc: "وعي مؤسساتي عالي", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400" },
             { title: "استرداد الضريبة", val: "+350%", desc: "سلوك استهلاكي واعٍ", img: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=400" },
             { title: "ضريبة وطني", val: "+600%", desc: "ارتباط بالهوية والقرار", img: "https://images.unsplash.com/photo-1586724230413-404709ed3f46?auto=format&fit=crop&q=80&w=400" },
             { title: "رقم التسجيل", val: "+140%", desc: "اهتمام بالإجراءات الرسمية", img: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=400" }
           ].map((item, i) => (
             <FlipCard 
               key={i}
               small
               bgImage={item.img}
               title={item.title}
               icon={<RefreshCcw size={14}/>}
               front={<div className="text-saudi-gold text-xl font-bold">{item.val}</div>}
               back={<p className="text-center font-bold">{item.desc}</p>}
             />
           ))}
        </SlideContainer>
      )
    },
    // 6. Popular Queries
    {
      id: 6,
      title: "أبرز استفسارات الجمهور",
      icon: <HelpCircle size={24} />,
      content: (
        <SlideContainer>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
             <div className="bg-white p-4 rounded-3xl border-2 border-saudi-green shadow-sm overflow-y-auto">
                <h3 className="font-black text-saudi-green text-sm mb-3">الأكثر بحثاً (Top)</h3>
                <ul className="space-y-4">
                   {["نسبة الضريبة 15%", "رقم ضريبة القيمة المضافة", "حاسبة الضريبة", "التسجيل في الهيئة"].map((q, i) => (
                     <li key={i} className="text-[10px] flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                        <span className="font-bold">{q}</span>
                        <ChevronRight className="text-saudi-gold" size={12}/>
                     </li>
                   ))}
                </ul>
             </div>
             <div className="bg-white p-4 rounded-3xl border-2 border-saudi-gold shadow-sm overflow-y-auto">
                <h3 className="font-black text-saudi-gold text-sm mb-3">الأكثر نمواً (Rising)</h3>
                <ul className="space-y-4">
                   {["كيفية استرداد الضريبة", "رقم الهيئة الموحد", "ضريبة المسكن الأول", "الإعفاءات الضريبية"].map((q, i) => (
                     <li key={i} className="text-[10px] flex justify-between items-center bg-saudi-gold/5 p-2 rounded-xl">
                        <span className="font-bold">{q}</span>
                        <ChevronRight className="text-saudi-green" size={12}/>
                     </li>
                   ))}
                </ul>
             </div>
           </div>
        </SlideContainer>
      )
    },
    // 7. Social Impact
    {
      id: 7,
      title: "الأثر المباشر على المجتمع",
      icon: <Home />,
      content: (
        <SlideContainer className="grid grid-cols-3 gap-3">
           <div className="bg-white rounded-3xl p-4 border-b-8 border-saudi-gold text-center shadow-lg">
              <Zap className="mx-auto text-amber-500 mb-2" />
              <p className="text-[10px] text-gray-400">الفواتير</p>
              <p className="text-xl font-black text-saudi-green">+15%</p>
           </div>
           <div className="bg-white rounded-3xl p-4 border-b-8 border-saudi-green text-center shadow-lg">
              <ShoppingCart className="mx-auto text-green-500 mb-2" />
              <p className="text-[10px] text-gray-400">التموين</p>
              <p className="text-xl font-black text-saudi-green">+10%</p>
           </div>
           <div className="bg-white rounded-3xl p-4 border-b-8 border-saudi-gold text-center shadow-lg">
              <Fuel className="mx-auto text-blue-500 mb-2" />
              <p className="text-[10px] text-gray-400">الوقود</p>
              <p className="text-xl font-black text-saudi-green">+15%</p>
           </div>
           <div className="col-span-3 bg-red-50 p-4 rounded-3xl border border-red-100 flex items-center gap-4">
              <div className="p-2 bg-red-500 rounded-xl text-white"><Info /></div>
              <p className="text-xs font-bold text-red-900 leading-relaxed">أظهرت النتائج أن القرارات المالية ترفع مستوى البحث "القلق" وتدفع المواطنين للبحث عن حلول "وفر" ذكية.</p>
           </div>
        </SlideContainer>
      )
    },
    // 8. Video
    {
      id: 8,
      title: "تصريح ولي العهد الرسمي",
      icon: <Video />,
      content: (
        <SlideContainer className="justify-center items-center">
           <div className="w-full max-w-xl aspect-video rounded-3xl overflow-hidden border-4 border-saudi-gold shadow-2xl relative bg-black">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/cWl6r77usww" 
                title="MBS Statement"
                allowFullScreen
              ></iframe>
           </div>
           <p className="mt-4 text-xs font-bold text-saudi-green bg-white px-6 py-2 rounded-full border border-saudi-gold/30">
             "القرار مؤقت وقد يستمر 5 سنوات بحد أقصى"
           </p>
        </SlideContainer>
      )
    },
    // 9. Platforms Analysis
    {
      id: 9,
      title: "تحليل سلوك المنصات",
      icon: <LayoutGrid />,
      content: (
        <SlideContainer>
           <div className="bg-white rounded-3xl border overflow-hidden shadow-sm flex-1">
              <table className="w-full text-[10px] md:text-xs text-right">
                <thead className="bg-saudi-green text-white">
                  <tr><th className="p-3">المنصة</th><th className="p-3">اللغة</th><th className="p-3">نمط البحث</th></tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="p-3 font-bold">بحث الويب</td><td className="p-3">🇸🇦 العربية</td><td className="p-3">استكشاف عام ومعرفة</td></tr>
                  <tr><td className="p-3 font-bold">الأخبار</td><td className="p-3">🇸🇦 العربية</td><td className="p-3">متابعة القرارات الرسمية</td></tr>
                  <tr><td className="p-3 font-bold">يوتيوب</td><td className="p-3">🇸🇦 العربية</td><td className="p-3">شروحات وتطبيق عملي</td></tr>
                  <tr><td className="p-3 font-bold">شوبينق</td><td className="p-3">🇸🇦 العربية</td><td className="p-3">مقارنة الأسعار والعروض</td></tr>
                </tbody>
              </table>
           </div>
           <div className="bg-saudi-gold/10 p-3 rounded-2xl border-r-4 border-saudi-gold text-[10px] font-bold text-saudi-green">
             💡 هيمنة اللغة العربية تعكس الثقة العالية في المحتوى الوطني والاهتمام الشعبي الواسع باللغة الأم في القضايا الاقتصادية.
           </div>
        </SlideContainer>
      )
    },
    // 10. Results
    {
      id: 10,
      title: "أبرز نتائج الدراسة",
      icon: <ClipboardList />,
      content: (
        <SlideContainer className="grid grid-cols-2 md:grid-cols-2 gap-4">
           <FlipCard 
             small
             title="الاهتمام الرقمي" icon={<TrendingUp size={18}/>}
             bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"
             front={<div className="text-center font-black text-sm text-saudi-green px-2 leading-tight">استدامة الوعي</div>}
             back={<ul className="space-y-1 text-xs px-2 leading-tight"><li>- ذروة بحثية (100%) في 2022</li><li>- بقاء القضية حية لمدة 5 سنوات</li><li>- تراجع البحث عن بدلات الدعم</li></ul>}
           />
           <FlipCard 
             small
             title="سلوك المستخدم" icon={<Users size={18}/>}
             bgImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400"
             front={<div className="text-center font-black text-sm text-saudi-green px-2 leading-tight">تحول إجرائي</div>}
             back={<ul className="space-y-1 text-xs px-2 leading-tight"><li>- الانتقال من الاستفسار للتطبيق</li><li>- ثقة كاملة في محركات البحث العربية</li><li>- الاعتماد على المنصات الرسمية</li></ul>}
           />
           <div className="col-span-2 bg-white p-4 rounded-3xl border-r-8 border-saudi-green flex items-center gap-4 shadow-md">
              <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
              <p className="text-sm font-black text-saudi-green leading-relaxed">النتيجة الكبرى: تحول الضريبة من "قرار اقتصادي مؤقت" إلى "ثقافة استهلاك واعية" لدى المواطن السعودي.</p>
           </div>
        </SlideContainer>
      )
    },
    // 11. Recommendations
    {
      id: 11,
      title: "التوصيات المستقبلية",
      icon: <Lightbulb />,
      content: (
        <SlideContainer className="grid grid-cols-2 gap-2">
           {[
             "1. تقديم شروحات رقمية مبسطة دائمًا",
             "2. توفير حاسبات ضريبية تفاعلية رسمية",
             "3. تدريب الأسر على موازنة المصروفات",
             "4. تعزيز قنوات التواصل باللغة العربية",
             "5. دراسة الأثر السلوكي طويل المدى",
             "6. ربط الضريبة بالمكتسبات الوطنية",
             "7. تسهيل إجراءات الاسترداد للمواطن",
             "8. تكثيف التوعية في فترات الرواتب"
           ].map((rec, i) => (
             <div key={i} className="p-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold text-saudi-green shadow-sm">
                {rec}
             </div>
           ))}
           <div className="col-span-2 bg-saudi-gold p-3 rounded-2xl text-white text-center font-black text-xs shadow-lg">
             توصية ذهبية: الاستثمار في المحتوى العربي الرسمي هو أمانك الأول.
           </div>
        </SlideContainer>
      )
    },
    // 12. Team & Tasks
    {
      id: 12,
      title: "فريق العمل وتوزيع المهام",
      icon: <Users />,
      content: (
        <SlideContainer>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1 overflow-y-auto pb-4">
              {[
                { name: "أريام الخديدي", task: "تحليل معمق للاتجاه الزمني للبحث عبر Google Trends" },
                { name: "شذى الحارثي", task: "تحليل الكلمات الصاعدة ودراسة الدلالات السلوكية" },
                { name: "وداد الجهني", task: "دراسة الأثر المباشر للقضية على المجتمع السعودي" },
                { name: "جنى الزبيدي", task: "تحليل سلوك المنصات الرقمية وأنماط البحث المتنوعة" },
                { name: "أريام الزهراني", task: "استخلاص النتائج النهائية وتصميم الرسوم البيانية" },
                { name: "رغد معروف", task: "صياغة التوصيات الاستراتيجية والحلول المقترحة" },
                { name: "وديان الزهراني", task: "جمع المصادر العلمية وتوثيق كافة المراجع بدقة" },
                { name: "دانه القحطاني", task: "التنسيق العام للمشروع والتدقيق اللغوي والمراجعة" }
              ].map((member, i) => (
                <div key={i} className="p-3 bg-white border-r-4 border-saudi-gold rounded-xl shadow-sm hover:shadow-md transition-shadow">
                   <p className="text-xs font-black text-saudi-green mb-1.5">{member.name}</p>
                   <p className="text-[10px] text-gray-500 leading-tight font-medium">{member.task}</p>
                </div>
              ))}
           </div>
           <footer className="mt-2 flex items-center justify-between border-t border-saudi-gold/10 pt-3">
              <div className="flex flex-col items-start">
                <p className="text-[10px] text-saudi-green font-black">تحت إشراف: د. الفاضلة</p>
                <p className="text-[8px] text-gray-400">قسم العلاقات العامة - كلية الاتصال</p>
              </div>
              <SaudiEmblem />
           </footer>
        </SlideContainer>
      )
    }
  ];


  const currentSlideData = slides[currentSlide];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
      opacity: 0,
      filter: 'blur(10px)',
    })
  };

  return (
    <div className="h-screen bg-saudi-bg relative overflow-hidden flex flex-col p-4 md:p-8">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 najdi-pattern pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 najdi-triangles opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 najdi-triangles rotate-180 opacity-10 pointer-events-none" />

      {/* Main Container */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col saudi-border shadow-2xl z-20">
        
        {/* Header */}
        <header className="p-4 md:p-6 flex items-center justify-between border-b border-saudi-gold/20 bg-white/30 backdrop-blur-md relative z-30">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-saudi-green flex items-center justify-center text-white shadow-xl shadow-saudi-green/20">
                {currentSlideData.icon}
             </div>
             <div>
                <h2 className="text-xl md:text-3xl font-black text-saudi-green leading-tight">{currentSlideData.title}</h2>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-6 h-1.5 bg-saudi-gold rounded-full" />
                   <span className="text-[10px] md:text-xs text-saudi-gold font-black uppercase tracking-widest">King Abdulaziz University</span>
                </div>
             </div>
          </div>
          <div className="scale-75 md:scale-100 origin-left">
            <SaudiEmblem />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-hidden perspective-2000 relative">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                rotateY: { type: "spring", stiffness: 200, damping: 20 },
                scale: { duration: 0.4 }
              }}
              className="h-full w-full"
            >
              {currentSlideData.content}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer / Controls */}
        <footer className="p-4 md:p-6 bg-gray-50/50 backdrop-blur-md flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center gap-6">
             <div className="flex gap-2">
                <button 
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-saudi-green shadow-sm hover:bg-saudi-green hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-saudi-green"
                >
                  <ChevronRight />
                </button>
                <button 
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                   className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-saudi-green shadow-sm hover:bg-saudi-green hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-saudi-green"
                >
                  <ChevronLeft />
                </button>
             </div>
             
             {/* Progress Bubbles */}
             <div className="hidden md:flex gap-1.5">
                {slides.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setSlide([i, i > currentSlide ? 1 : -1])}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === currentSlide ? "w-8 bg-saudi-gold" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                    )}
                  />
                ))}
             </div>
          </div>

          <div className="flex flex-col items-end">
             <span className="text-xl font-black text-saudi-green">{currentSlide + 1} <span className="text-gray-300 text-sm">/ {slides.length}</span></span>
             <p className="text-[10px] text-gray-400 font-bold">كلية الاتصال والإعلام</p>
          </div>
        </footer>
      </div>

      {/* Slide Counter Overlay */}
      <div className="fixed top-8 left-8 text-[8vw] font-black pointer-events-none opacity-[0.02] text-saudi-green select-none">
        {String(currentSlide + 1).padStart(2, '0')}
      </div>
    </div>
  );
}
