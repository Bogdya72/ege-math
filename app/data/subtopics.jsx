import React from 'react';

/* ═══════════════════════════════════════════════════════════
   MINI SVG FIGURES для теории (по формуле)
═══════════════════════════════════════════════════════════ */
export const MF = {
  pyth: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="8,62 8,10 64,62" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#5b8eff" strokeWidth="1.2"/>
      <text x="2" y="39" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">a</text>
      <text x="30" y="68" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">b</text>
      <text x="32" y="36" fill="#9b6dff" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">c</text>
    </svg>
  ),
  sincos: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="8,62 8,10 64,62" fill="#f0e8ff" stroke="#9b6dff" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#9b6dff" strokeWidth="1.2"/>
      <path d="M 22,62 A 14,14 0 0,1 8,48" fill="none" stroke="#ffb547" strokeWidth="1.5"/>
      <text x="20" y="59" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">A</text>
      <text x="2" y="39" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">a</text>
      <text x="30" y="68" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">b</text>
      <text x="31" y="36" fill="#9b6dff" fontSize="10" fontFamily="Caveat,cursive">c</text>
    </svg>
  ),
  area_right: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="8,62 8,10 64,62" fill="rgba(61,220,151,.2)" stroke="#3ddc97" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#3ddc97" strokeWidth="1.2"/>
      <text x="2" y="39" fill="#3ddc97" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">a</text>
      <text x="30" y="68" fill="#3ddc97" fontSize="10" fontFamily="Caveat,cursive" fontWeight="600">b</text>
      <text x="30" y="42" fill="#3ddc97" fontSize="11" fontFamily="Caveat,cursive" fontWeight="700">S</text>
    </svg>
  ),
  median_hyp: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="8,62 8,10 64,62" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#5b8eff" strokeWidth="1.2"/>
      <line x1="8" y1="10" x2="36" y2="62" stroke="#ff5a5a" strokeWidth="1.5" strokeDasharray="3,2"/>
      <circle cx="36" cy="62" r="2.5" fill="#ff5a5a"/>
      <text x="14" y="44" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">m=c/2</text>
    </svg>
  ),
  iso_angles: (
    <svg width="80" height="72" viewBox="0 0 80 72">
      <polygon points="40,8 10,66 70,66" fill="#f0e8ff" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="25" y1="36" x2="29" y2="40" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="55" y1="36" x2="51" y2="40" stroke="#9b6dff" strokeWidth="1.5"/>
      <path d="M 34,22 A 10,10 0 0,1 46,22" fill="none" stroke="#ffb547" strokeWidth="1.5"/>
      <text x="35" y="36" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">α</text>
      <path d="M 16,66 A 9,9 0 0,1 10,57" fill="none" stroke="#ff5a5a" strokeWidth="1.4"/>
      <path d="M 64,66 A 9,9 0 0,0 70,57" fill="none" stroke="#ff5a5a" strokeWidth="1.4"/>
      <text x="5" y="62" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">β</text>
      <text x="62" y="62" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">β</text>
    </svg>
  ),
  iso_height: (
    <svg width="80" height="72" viewBox="0 0 80 72">
      <polygon points="40,8 10,66 70,66" fill="#f0e8ff" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="40" y1="8" x2="40" y2="66" stroke="#ff5a5a" strokeWidth="1.5" strokeDasharray="3,2"/>
      <rect x="40" y="57" width="8" height="8" fill="none" stroke="#ff5a5a" strokeWidth="1.1"/>
      <text x="43" y="42" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">h</text>
      <text x="22" y="68" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">b</text>
      <text x="52" y="68" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">b</text>
    </svg>
  ),
  angle_sum: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="20,62 60,8 72,62" fill="#e8f4ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <path d="M 27,62 A 8,8 0 0,1 20,54" fill="none" stroke="#ffb547" strokeWidth="1.4"/>
      <path d="M 58,20 A 9,9 0 0,1 66,16" fill="none" stroke="#9b6dff" strokeWidth="1.4"/>
      <path d="M 64,62 A 8,8 0 0,0 72,54" fill="none" stroke="#3ddc97" strokeWidth="1.4"/>
      <text x="11" y="50" fill="#5b8eff" fontSize="8" fontFamily="Caveat,cursive" fontWeight="600">180°</text>
    </svg>
  ),
  ext_angle: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="15,62 50,10 72,62" fill="#e8f4ff" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="15" y1="62" x2="0" y2="62" stroke="#ff5a5a" strokeWidth="1.5"/>
      <path d="M 12,62 A 11,11 0 0,0 15,51" fill="none" stroke="#ff5a5a" strokeWidth="1.5"/>
      <text x="0" y="56" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">внеш.</text>
      <text x="2" y="46" fill="#ff5a5a" fontSize="7" fontFamily="Caveat,cursive">=A+B</text>
    </svg>
  ),
  area_sin: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="10,62 52,8 72,62" fill="rgba(61,220,151,.2)" stroke="#3ddc97" strokeWidth="1.5"/>
      <path d="M 62,62 A 12,12 0 0,0 72,50" fill="none" stroke="#ffb547" strokeWidth="1.4"/>
      <text x="55" y="58" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">C</text>
      <text x="18" y="40" fill="#3ddc97" fontSize="9" fontFamily="Caveat,cursive">b</text>
      <text x="52" y="40" fill="#3ddc97" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="36" y="55" fill="#3ddc97" fontSize="11" fontFamily="Caveat,cursive" fontWeight="700">S</text>
    </svg>
  ),
  par_area: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="12,62 24,12 68,12 56,62" fill="rgba(61,220,151,.15)" stroke="#3ddc97" strokeWidth="1.5"/>
      <line x1="24" y1="12" x2="24" y2="62" stroke="#ff5a5a" strokeWidth="1.4" strokeDasharray="3,2"/>
      <rect x="24" y="53" width="8" height="8" fill="none" stroke="#ff5a5a" strokeWidth="1.1"/>
      <text x="26" y="40" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">h</text>
      <text x="30" y="68" fill="#3ddc97" fontSize="10" fontFamily="Caveat,cursive">a</text>
    </svg>
  ),
  rhombus: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="40,6 72,35 40,64 8,35" fill="rgba(91,142,255,.1)" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="8" y1="35" x2="72" y2="35" stroke="#ff5a5a" strokeWidth="1.4" strokeDasharray="3,2"/>
      <line x1="40" y1="6" x2="40" y2="64" stroke="#9b6dff" strokeWidth="1.4" strokeDasharray="3,2"/>
      <rect x="40" y="35" width="7" height="7" fill="none" stroke="#888" strokeWidth="1"/>
      <text x="40" y="32" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">d₂</text>
      <text x="50" y="44" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">d₁</text>
    </svg>
  ),
  rect_diag: (
    <svg width="80" height="62" viewBox="0 0 80 62">
      <rect x="8" y="10" width="64" height="42" fill="rgba(45,212,191,.1)" stroke="#2dd4bf" strokeWidth="1.5"/>
      <line x1="8" y1="10" x2="72" y2="52" stroke="#ff5a5a" strokeWidth="1.4" strokeDasharray="3,2"/>
      <text x="32" y="36" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">d</text>
      <text x="28" y="58" fill="#2dd4bf" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="2" y="35" fill="#2dd4bf" fontSize="9" fontFamily="Caveat,cursive">b</text>
    </svg>
  ),
  trap_area: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="16,62 24,14 60,14 68,62" fill="rgba(255,181,71,.15)" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="30" y1="14" x2="30" y2="62" stroke="#ff5a5a" strokeWidth="1.4" strokeDasharray="3,2"/>
      <rect x="30" y="53" width="8" height="8" fill="none" stroke="#ff5a5a" strokeWidth="1.1"/>
      <text x="32" y="44" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">h</text>
      <text x="36" y="12" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="36" y="68" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">b</text>
    </svg>
  ),
  trap_mid: (
    <svg width="80" height="70" viewBox="0 0 80 70">
      <polygon points="16,62 24,14 60,14 68,62" fill="rgba(255,181,71,.1)" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="20" y1="38" x2="64" y2="38" stroke="#9b6dff" strokeWidth="2" strokeDasharray="4,2"/>
      <text x="34" y="34" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">m</text>
      <text x="36" y="12" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="36" y="68" fill="#ffb547" fontSize="9" fontFamily="Caveat,cursive">b</text>
    </svg>
  ),
  inscr_angle: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="38" cy="38" r="30" fill="rgba(45,212,191,.08)" stroke="#2dd4bf" strokeWidth="1.5"/>
      <line x1="14" y1="24" x2="62" y2="24" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="14" y1="24" x2="38" y2="66" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="62" y1="24" x2="38" y2="66" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="38" y1="38" x2="14" y2="24" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="2,2"/>
      <line x1="38" y1="38" x2="62" y2="24" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="32" y="63" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">β</text>
      <text x="32" y="48" fill="#ff5a5a" fontSize="8" fontFamily="Caveat,cursive">2β</text>
    </svg>
  ),
  thales: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="38" cy="38" r="30" fill="rgba(45,212,191,.08)" stroke="#2dd4bf" strokeWidth="1.5"/>
      <line x1="8" y1="38" x2="68" y2="38" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="8" y1="38" x2="38" y2="66" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="68" y1="38" x2="38" y2="66" stroke="#9b6dff" strokeWidth="1.5"/>
      <rect x="32" y="59" width="8" height="8" fill="none" stroke="#ff5a5a" strokeWidth="1.2"/>
      <text x="30" y="73" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">90°!</text>
    </svg>
  ),
  tang_prop: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="32" cy="38" r="22" fill="rgba(255,181,71,.08)" stroke="#ffb547" strokeWidth="1.5"/>
      <circle cx="32" cy="38" r="2" fill="#ffb547"/>
      <circle cx="70" cy="38" r="2.5" fill="#ff5a5a"/>
      <line x1="70" y1="38" x2="46" y2="18" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="70" y1="38" x2="46" y2="58" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="32" y1="38" x2="46" y2="18" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="72" y="37" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">M</text>
      <text x="54" y="18" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">t</text>
      <text x="54" y="56" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">t</text>
    </svg>
  ),
  tang_len: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="32" cy="38" r="22" fill="rgba(255,181,71,.08)" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="70" y1="38" x2="46" y2="18" stroke="#9b6dff" strokeWidth="1.5"/>
      <line x1="32" y1="38" x2="46" y2="18" stroke="#ff5a5a" strokeWidth="1" strokeDasharray="2,2"/>
      <line x1="32" y1="38" x2="70" y2="38" stroke="#3ddc97" strokeWidth="1" strokeDasharray="2,2"/>
      <rect x="42" y="14" width="7" height="7" fill="none" stroke="#ff5a5a" strokeWidth="1" transform="rotate(20,45.5,17.5)"/>
      <text x="22" y="52" fill="#ffb547" fontSize="8" fontFamily="Caveat,cursive">R</text>
      <text x="48" y="44" fill="#3ddc97" fontSize="8" fontFamily="Caveat,cursive">d</text>
      <text x="52" y="22" fill="#9b6dff" fontSize="9" fontFamily="Caveat,cursive">t</text>
    </svg>
  ),
  chord_cross: (
    <svg width="76" height="76" viewBox="0 0 76 76">
      <circle cx="38" cy="38" r="30" fill="rgba(255,181,71,.06)" stroke="#ffb547" strokeWidth="1.5"/>
      <line x1="12" y1="20" x2="65" y2="58" stroke="#5b8eff" strokeWidth="1.5"/>
      <line x1="10" y1="55" x2="68" y2="24" stroke="#9b6dff" strokeWidth="1.5"/>
      <circle cx="38" cy="38" r="2" fill="#ff5a5a"/>
      <text x="25" y="30" fill="#5b8eff" fontSize="8" fontFamily="Caveat,cursive">a</text>
      <text x="50" y="52" fill="#5b8eff" fontSize="8" fontFamily="Caveat,cursive">b</text>
      <text x="20" y="52" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">c</text>
      <text x="50" y="30" fill="#9b6dff" fontSize="8" fontFamily="Caveat,cursive">d</text>
    </svg>
  ),
  incirc: (
    <svg width="76" height="72" viewBox="0 0 76 72">
      <polygon points="38,5 6,67 70,67" fill="rgba(255,138,219,.08)" stroke="#ff8adb" strokeWidth="1.5"/>
      <circle cx="38" cy="47" r="20" fill="none" stroke="#9b6dff" strokeWidth="1.4" strokeDasharray="3,2"/>
      <line x1="38" y1="47" x2="38" y2="67" stroke="#ff5a5a" strokeWidth="1.3" strokeDasharray="2,2"/>
      <rect x="38" y="59" width="7" height="7" fill="none" stroke="#ff5a5a" strokeWidth="1"/>
      <text x="41" y="56" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">r</text>
    </svg>
  ),
  incirc_right: (
    <svg width="76" height="70" viewBox="0 0 76 70">
      <polygon points="8,62 8,10 62,62" fill="rgba(255,138,219,.08)" stroke="#ff8adb" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#ff8adb" strokeWidth="1.2"/>
      <circle cx="20" cy="50" r="12" fill="none" stroke="#9b6dff" strokeWidth="1.4" strokeDasharray="3,2"/>
      <text x="2" y="34" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">a</text>
      <text x="28" y="68" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">b</text>
      <text x="30" y="44" fill="#ff8adb" fontSize="9" fontFamily="Caveat,cursive">c</text>
    </svg>
  ),
  circumcirc: (
    <svg width="76" height="72" viewBox="0 0 76 72">
      <circle cx="38" cy="35" r="30" fill="rgba(61,220,151,.06)" stroke="#3ddc97" strokeWidth="1.5"/>
      <polygon points="38,5 10,62 66,62" fill="rgba(61,220,151,.1)" stroke="#3ddc97" strokeWidth="1.5"/>
      <circle cx="38" cy="35" r="2.5" fill="#3ddc97"/>
      <line x1="38" y1="35" x2="38" y2="5" stroke="#ff5a5a" strokeWidth="1.3" strokeDasharray="2,2"/>
      <text x="40" y="24" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">R</text>
    </svg>
  ),
  circumcirc_right: (
    <svg width="76" height="70" viewBox="0 0 76 70">
      <polygon points="8,62 8,10 62,62" fill="rgba(61,220,151,.08)" stroke="#3ddc97" strokeWidth="1.5"/>
      <rect x="8" y="51" width="10" height="10" fill="none" stroke="#3ddc97" strokeWidth="1.2"/>
      <circle cx="35" cy="36" r="33" fill="none" stroke="#3ddc97" strokeWidth="1.4" strokeDasharray="4,2" clipPath="url(#clip-right)"/>
      <line x1="8" y1="10" x2="62" y2="62" stroke="#ff5a5a" strokeWidth="1.5" strokeDasharray="3,2"/>
      <circle cx="35" cy="36" r="2" fill="#3ddc97"/>
      <text x="36" y="34" fill="#3ddc97" fontSize="8" fontFamily="Caveat,cursive">O</text>
      <text x="36" y="46" fill="#ff5a5a" fontSize="9" fontFamily="Caveat,cursive">R=c/2</text>
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════
   SUBTOPICS + THEORY DATA
═══════════════════════════════════════════════════════════ */
export const SUBTOPICS = [
  { id:'mixed', label:'Все темы', icon:'🔀', color:'var(--vio)', desc:'Все задачи вперемешку — лучшая подготовка' },
  {
    id:'right', label:'Прямоугольный треугольник', icon:'⊾', color:'#5b8eff', desc:'Теорема Пифагора, тригонометрия, площадь',
    theory: {
      formulas: [
        { f:'c² = a² + b²', n:'Теорема Пифагора: квадрат гипотенузы = сумма квадратов катетов', fig: MF.pyth },
        { f:'sin A = a/c · cos A = b/c · tg A = a/b', n:'Тригонометрия: a — противолежащий катет, c — гипотенуза', fig: MF.sincos },
        { f:'S = ½ · a · b', n:'Площадь: катеты перпендикулярны, поэтому высота = второй катет', fig: MF.area_right },
        { f:'m = c/2 (медиана к гипотенузе)', n:'Из прямого угла медиана = половине гипотенузы, центр описанной окружности — середина гипотенузы', fig: MF.median_hyp },
      ],
      tip: 'Пифагоровы тройки: 3–4–5, 6–8–10, 5–12–13, 8–15–17, 7–24–25, 9–40–41. Сразу узнавай — ответ будет целым!',
      warn: 'Пифагор работает ТОЛЬКО в прямоугольном треугольнике. Для прочих — теорема косинусов.',
      ex: { cond:'Катеты △ABC = 6 и 8. Найдите гипотенузу AC.', fig: MF.pyth, steps:[{t:'Пишем теорему Пифагора:',f:'AC² = AB² + BC²'},{t:'Подставляем:',f:'AC² = 6² + 8² = 36 + 64 = 100',hl:true},{t:'Берём корень:',f:'AC = √100 = 10'}], ans:'10' },
    },
  },
  {
    id:'isosceles', label:'Равнобедренный треугольник', icon:'▲', color:'#9b6dff', desc:'Свойства, высота, углы',
    theory: {
      formulas: [
        { f:'∠B = ∠C (углы при основании равны)', n:'Главное свойство: при равных боковых сторонах углы при основании равны', fig: MF.iso_angles },
        { f:'∠A = 180° − 2∠B', n:'Угол при вершине через угол при основании', fig: MF.iso_angles },
        { f:'h = √(a² − (b/2)²)', n:'Высота к основанию b через боковую сторону a (по Пифагору)', fig: MF.iso_height },
        { f:'S = ½ · b · h', n:'Площадь через основание b и высоту h', fig: MF.iso_height },
      ],
      tip: 'Высота, медиана и биссектриса из вершинного угла — одна и та же линия! Сразу три свойства в одной линии.',
      warn: 'Вершинный угол — между РАВНЫМИ сторонами. Угол при основании — между основанием и боковой стороной.',
      ex: { cond:'Вершинный угол △ = 40°. Найдите угол при основании.', fig: MF.iso_angles, steps:[{t:'Сумма углов треугольника:',f:'∠A + ∠B + ∠C = 180°'},{t:'∠B = ∠C, поэтому:',f:'40° + 2∠B = 180°  →  2∠B = 140°',hl:true},{t:'Делим на 2:',f:'∠B = 70°'}], ans:'70°' },
    },
  },
  {
    id:'general', label:'Треугольники общего вида', icon:'△', color:'#2dd4bf', desc:'Теоремы синусов и косинусов, площадь, углы',
    theory: {
      formulas: [
        { f:'∠A + ∠B + ∠C = 180°', n:'Сумма внутренних углов треугольника всегда 180°', fig: MF.angle_sum },
        { f:'Внешний угол = ∠A + ∠B (сумма несмежных)', n:'Внешний угол при вершине C равен сумме двух других углов', fig: MF.ext_angle },
        { f:'S = ½ · a · b · sin C', n:'Площадь через две стороны и угол МЕЖДУ ними — самая частая на ЕГЭ', fig: MF.area_sin },
        { f:'a/sin A = b/sin B = c/sin C = 2R', n:'Теорема синусов: отношение стороны к синусу противолежащего угла постоянно', fig: MF.angle_sum },
        { f:'c² = a² + b² − 2ab·cos C', n:'Теорема косинусов: обобщение Пифагора для любого треугольника', fig: MF.angle_sum },
      ],
      tip: 'S = ½·a·b·sin C — запомни раз и навсегда. Угол C строго между сторонами a и b!',
      warn: 'Внешний угол ≠ смежному углу. Внешний угол = 180° − внутренний. Но = сумме двух других внутренних.',
      ex: { cond:'a = 8, b = 6, угол между ними C = 30°. Найдите площадь.', fig: MF.area_sin, steps:[{t:'Формула площади:',f:'S = ½·a·b·sin C'},{t:'sin 30° = 0,5, подставляем:',f:'S = ½ · 8 · 6 · 0,5',hl:true},{t:'Вычисляем:',f:'S = ½ · 48 · 0.5 = 12'}], ans:'12' },
    },
  },
  {
    id:'parallel', label:'Параллелограммы', icon:'▱', color:'#3ddc97', desc:'Ромб, прямоугольник, квадрат, площадь',
    theory: {
      formulas: [
        { f:'S = a · h (h — высота ⊥ основанию)', n:'Площадь параллелограмма: высота ≠ боковой стороне!', fig: MF.par_area },
        { f:'S(ромб) = ½ · d₁ · d₂', n:'Площадь ромба через диагонали: они ⊥ и делятся пополам', fig: MF.rhombus },
        { f:'S(прямоугольник) = a · b', n:'Площадь прямоугольника = произведение сторон', fig: MF.rect_diag },
        { f:'d(прямоугольник) = √(a² + b²)', n:'Диагональ прямоугольника по теореме Пифагора', fig: MF.rect_diag },
        { f:'a(ромб) = √((d₁/2)² + (d₂/2)²)', n:'Сторона ромба через диагонали: половины диагоналей — катеты', fig: MF.rhombus },
      ],
      tip: 'В ромбе диагонали перпендикулярны и делятся пополам. Четыре прямоугольных треугольника!',
      warn: 'Высота параллелограмма — перпендикуляр к основанию. Боковая сторона ≠ высота (кроме прямоугольника).',
      ex: { cond:'Диагонали ромба d₁ = 6, d₂ = 8. Найдите площадь и сторону.', fig: MF.rhombus, steps:[{t:'Площадь:',f:'S = ½ · 6 · 8 = 24',hl:true},{t:'Диагонали ⊥, катеты = d₁/2 = 3 и d₂/2 = 4:',f:'a = √(3² + 4²) = √25 = 5'}], ans:'S = 24, a = 5' },
    },
  },
  {
    id:'trapezoid', label:'Трапеция', icon:'⏢', color:'#ffb547', desc:'Площадь, средняя линия, высота',
    theory: {
      formulas: [
        { f:'S = ½ · (a + b) · h', n:'Площадь трапеции: a и b — основания (параллельные стороны), h — высота', fig: MF.trap_area },
        { f:'m = (a + b) / 2', n:'Средняя линия = полусумма оснований. Параллельна основаниям', fig: MF.trap_mid },
        { f:'S = m · h', n:'Площадь через среднюю линию и высоту', fig: MF.trap_area },
      ],
      tip: 'Прямоугольная трапеция: один из боковых углов = 90°, высота = этой боковой стороне. Диагональ — по Пифагору.',
      warn: 'a и b — только параллельные стороны (основания). Боковые стороны не входят в формулу площади.',
      ex: { cond:'Основания 5 и 13, высота 6. Найдите площадь.', fig: MF.trap_area, steps:[{t:'Формула площади трапеции:',f:'S = ½·(a+b)·h'},{t:'Подставляем:',f:'S = ½·(5+13)·6 = ½·18·6',hl:true},{t:'Вычисляем:',f:'S = 9 · 6 = 54'}], ans:'54' },
    },
  },
  {
    id:'angles', label:'Центральные и вписанные углы', icon:'◠', color:'#2dd4bf', desc:'Дуги, вписанный угол, теорема Фалеса',
    theory: {
      formulas: [
        { f:'∠вписанный = ½ · дуга', n:'Вписанный угол = половина дуги, которую он ВИДИТ (противоположная хорде)', fig: MF.inscr_angle },
        { f:'∠центральный = дуга', n:'Центральный угол равен стягиваемой им дуге', fig: MF.inscr_angle },
        { f:'∠вписанный = ½ · ∠центральный', n:'На одну дугу: вписанный = половине центрального', fig: MF.inscr_angle },
        { f:'∠(на диаметр) = 90°', n:'Теорема Фалеса: вписанный угол, опирающийся на диаметр = 90°', fig: MF.thales },
      ],
      tip: 'Все вписанные углы, опирающиеся на одну дугу с одной стороны — равны между собой!',
      warn: 'Не путай: вписанный = ½ дуги, которую он ВИДИТ. Если угол тупой — дуга > 180°.',
      ex: { cond:'Дуга AB = 110°. Найдите вписанный угол ACB.', fig: MF.inscr_angle, steps:[{t:'Вписанный = половина дуги:',f:'∠ACB = дуга AB / 2'},{t:'Подставляем:',f:'∠ACB = 110° / 2 = 55°',hl:true}], ans:'55°' },
    },
  },
  {
    id:'tangent', label:'Касательная, хорда, секущая', icon:'⌒', color:'#ffb547', desc:'Равенство касательных, степень точки',
    theory: {
      formulas: [
        { f:'|MA| = |MB| (две касательные из одной точки)', n:'Оба отрезка касательных из внешней точки M равны', fig: MF.tang_prop },
        { f:'t = √(d² − R²) (длина касательной)', n:'d — расстояние от точки до центра, R — радиус; касательная ⊥ радиусу', fig: MF.tang_len },
        { f:'MA · MB = MC · MD (хорды пересекаются внутри)', n:'Произведения отрезков двух хорд, пересекающихся внутри окружности, равны', fig: MF.chord_cross },
        { f:'t² = внешняя · вся (касательная и секущая)', n:'Квадрат касательной = произведению внешнего отрезка секущей на всю секущую', fig: MF.tang_len },
      ],
      tip: 'Касательная ⊥ радиусу в точке касания — это ключ ко всем задачам с касательными. Треугольник прямоугольный!',
      warn: 'Касательная не пересекает окружность. Она касается в ровно одной точке.',
      ex: { cond:'Расстояние от M до центра = 13, R = 5. Найдите длину касательной.', fig: MF.tang_len, steps:[{t:'Касательная ⊥ радиусу → прямоугольный △:',f:'t² = d² − R²'},{t:'Подставляем:',f:'t² = 13² − 5² = 169 − 25 = 144',hl:true},{t:'Корень:',f:'t = √144 = 12'}], ans:'12' },
    },
  },
  {
    id:'inscribed', label:'Вписанные окружности', icon:'⊙', color:'#ff8adb', desc:'Радиус вписанной окружности',
    theory: {
      formulas: [
        { f:'r = S / p', n:'Универсальная формула: r — радиус, S — площадь △, p — полупериметр', fig: MF.incirc },
        { f:'r = (a + b − c) / 2', n:'Только для прямоугольного △: a, b — катеты, c — гипотенуза', fig: MF.incirc_right },
        { f:'a + c = b + d (условие для четырёхугольника)', n:'В четырёхугольнике с вписанной окружностью: суммы противоположных сторон равны', fig: MF.incirc },
      ],
      tip: 'Для прямоугольного △: r = (a+b−c)/2 быстрее и надёжнее, чем S/p. Запомни!',
      warn: 'В задачах с четырёхугольником: a+c = b+d — находи неизвестную сторону отсюда.',
      ex: { cond:'Прямоугольный △: катеты 6 и 8. Вписанная окружность. Найдите r.', fig: MF.incirc_right, steps:[{t:'Гипотенуза:',f:'c = √(6²+8²) = √100 = 10'},{t:'Формула для прямоугольного △:',f:'r = (a + b − c) / 2',hl:true},{t:'Подставляем:',f:'r = (6 + 8 − 10) / 2 = 4 / 2 = 2'}], ans:'2' },
    },
  },
  {
    id:'circumscribed', label:'Описанные окружности', icon:'○', color:'#3ddc97', desc:'Радиус описанной окружности',
    theory: {
      formulas: [
        { f:'R = c / 2 (прямоугольный △)', n:'Для прямоугольного △: центр = середина гипотенузы, R = c/2', fig: MF.circumcirc_right },
        { f:'R = a / (2 · sin A)', n:'Из теоремы синусов: a — любая сторона, A — противолежащий угол', fig: MF.circumcirc },
        { f:'R = abc / (4S)', n:'Через все три стороны и площадь', fig: MF.circumcirc },
        { f:'R ≥ 2r (неравенство Эйлера)', n:'Радиус описанной ≥ двух радиусов вписанной. Равенство — для правильного △', fig: MF.circumcirc },
      ],
      tip: 'Для прямоугольного △: R = c/2. Всегда! Центр описанной окружности — середина гипотенузы.',
      warn: 'R = 2r только для правильного (равностороннего) треугольника. Для остальных R > 2r.',
      ex: { cond:'Прямоугольный △: катеты 6 и 8. Описанная окружность. Найдите R.', fig: MF.circumcirc_right, steps:[{t:'Гипотенуза:',f:'c = √(6²+8²) = 10'},{t:'Для прямоугольного △:',f:'R = c / 2',hl:true},{t:'Подставляем:',f:'R = 10 / 2 = 5'}], ans:'5' },
    },
  },
];
