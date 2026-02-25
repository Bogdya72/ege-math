import React from 'react';

/* ═══════════════════════════════════════════════════════════
   ГЕНЕРАТОР ЗАДАЧ (БЕСКОНЕЧНЫЕ ВАРИАНТЫ)
   Вместо статического списка мы генерируем задачи на лету
   с разными числами, сохраняя логику прототипов ФИПИ.
═══════════════════════════════════════════════════════════ */

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Пифагоровы тройки (a, b, c) для красивых чисел
const TRIPLES = [
  [3,4,5], [5,12,13], [6,8,10], [8,15,17], [7,24,25], 
  [9,12,15], [10,24,26], [12,16,20], [9,40,41], [15,20,25]
];

// Рисунки (шаблоны)
const SVG = {
  right: <svg width="120" height="95" viewBox="0 0 120 95"><polygon points="10,85 10,12 95,85" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/><rect x="10" y="74" width="10" height="10" fill="none" stroke="#5b8eff" strokeWidth="1.2"/><text x="5" y="10" fill="#5b8eff" fontSize="11" fontFamily="Caveat,cursive">A</text><text x="5" y="94" fill="#5b8eff" fontSize="11" fontFamily="Caveat,cursive">C</text><text x="98" y="90" fill="#5b8eff" fontSize="11" fontFamily="Caveat,cursive">B</text></svg>,
  right_h: <svg width="120" height="95" viewBox="0 0 120 95"><polygon points="10,85 10,12 95,85" fill="#e8f0ff" stroke="#5b8eff" strokeWidth="1.5"/><rect x="10" y="74" width="10" height="10" fill="none" stroke="#5b8eff" strokeWidth="1.2"/><line x1="10" y1="85" x2="38" y2="52" stroke="#ff5a5a" strokeWidth="1.3" strokeDasharray="3,2"/><text x="5" y="10" fill="#5b8eff" fontSize="11" fontFamily="Caveat,cursive">A</text><text x="5" y="94" fill="#5b8eff" fontSize="11" fontFamily="Caveat,cursive">C</text><text x="98" y="90" fill="#5b8eff" fontSize="11" fontFamily="Caveat,cursive">B</text><text x="40" y="50" fill="#ff5a5a" fontSize="10" fontFamily="Caveat,cursive">H</text></svg>,
  iso: <svg width="120" height="90" viewBox="0 0 120 90"><polygon points="60,10 10,80 110,80" fill="#f0e8ff" stroke="#9b6dff" strokeWidth="1.5"/><text x="58" y="8" fill="#9b6dff" fontSize="11" fontFamily="Caveat,cursive">C</text><text x="5" y="88" fill="#9b6dff" fontSize="11" fontFamily="Caveat,cursive">A</text><text x="110" y="88" fill="#9b6dff" fontSize="11" fontFamily="Caveat,cursive">B</text></svg>,
  trap: <svg width="120" height="80" viewBox="0 0 120 80"><polygon points="30,70 40,15 90,15 110,70" fill="#fff8e8" stroke="#ffb547" strokeWidth="1.5"/></svg>,
  rhomb: <svg width="100" height="80" viewBox="0 0 100 80"><polygon points="50,5 90,40 50,75 10,40" fill="rgba(61,220,151,.1)" stroke="#3ddc97" strokeWidth="1.5"/><line x1="10" y1="40" x2="90" y2="40" stroke="#3ddc97" strokeWidth="1" strokeDasharray="3,2"/><line x1="50" y1="5" x2="50" y2="75" stroke="#3ddc97" strokeWidth="1" strokeDasharray="3,2"/></svg>,
  circ: <svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="rgba(45,212,191,.07)" stroke="#2dd4bf" strokeWidth="1.5"/><circle cx="50" cy="50" r="2" fill="#2dd4bf"/></svg>
};

// --- ГЕНЕРАТОРЫ ПО ТЕМАМ ---

const GENS = {
  // === ПРЯМОУГОЛЬНЫЙ ТРЕУГОЛЬНИК ===
  right: [
    // 1. Найти гипотенузу по катетам
    () => {
      const [a, b, c] = randItem(TRIPLES);
      return {
        q: `В треугольнике ABC угол C = 90°, катет AC = ${a}, катет BC = ${b}. Найдите гипотенузу AB.`,
        h: 'c² = a² + b²',
        s: `AB = √(${a}² + ${b}²) = √(${a*a} + ${b*b}) = ${c}`,
        a: c, fig: SVG.right
      };
    },
    // 2. Найти катет по гипотенузе и катету
    () => {
      const [a, b, c] = randItem(TRIPLES);
      return {
        q: `В треугольнике ABC угол C = 90°, гипотенуза AB = ${c}, катет AC = ${a}. Найдите катет BC.`,
        h: 'b = √(c² − a²)',
        s: `BC = √(${c}² − ${a}²) = √(${c*c} − ${a*a}) = √${b*b} = ${b}`,
        a: b, fig: SVG.right
      };
    },
    // 3. Синус угла (отношение)
    () => {
      const [a, b, c] = randItem(TRIPLES); // a=AC, b=BC, c=AB. sin A = BC/AB = b/c
      return {
        q: `В треугольнике ABC угол C = 90°, BC = ${b}, AB = ${c}. Найдите синус угла A.`,
        h: 'sin A = Противолежащий / Гипотенуза = BC / AB',
        s: `sin A = ${b} / ${c} = ${b/c}`,
        a: b/c, fig: SVG.right
      };
    },
    // 4. Косинус угла
    () => {
      const [a, b, c] = randItem(TRIPLES); // cos A = AC/AB = a/c
      return {
        q: `В треугольнике ABC угол C = 90°, AC = ${a}, AB = ${c}. Найдите косинус угла A.`,
        h: 'cos A = Прилежащий / Гипотенуза = AC / AB',
        s: `cos A = ${a} / ${c} = ${a/c}`,
        a: a/c, fig: SVG.right
      };
    },
    // 5. Тангенс
    () => {
      const a = randInt(2, 8); const b = randInt(2, 8) * 2; // чтобы делилось или было красивым
      return {
        q: `В треугольнике ABC угол C = 90°, AC = ${b}, BC = ${a}. Найдите тангенс угла A.`,
        h: 'tg A = Противолежащий / Прилежащий = BC / AC',
        s: `tg A = ${a} / ${b} = ${a/b}`,
        a: a/b, fig: SVG.right
      };
    },
    // 6. Найти сторону через синус/косинус
    () => {
      const c = randItem([10, 20, 50, 100]);
      const sin = randItem([0.2, 0.4, 0.5, 0.6, 0.8]);
      const a = Math.round(c * sin * 10) / 10; // Противолежащий
      return {
        q: `В треугольнике ABC угол C = 90°, гипотенуза AB = ${c}, sin A = ${sin}. Найдите катет BC.`,
        h: 'sin A = BC / AB  ⇒  BC = AB · sin A',
        s: `BC = ${c} · ${sin} = ${c*sin}`,
        a: c*sin, fig: SVG.right
      };
    },
    // 7. Основное триг. тождество
    () => {
      const [sin, cos] = randItem([[0.6, 0.8], [0.8, 0.6], [0.28, 0.96]]);
      return {
        q: `В треугольнике ABC угол C = 90°, sin A = ${sin}. Найдите cos A.`,
        h: 'sin²A + cos²A = 1',
        s: `cos A = √(1 − ${sin}²) = √(1 − ${sin*sin}) = ${cos}`,
        a: cos, fig: SVG.right
      };
    },
    // 8. Высота в прямоугольном (h = ab/c)
    () => {
      const [a, b, c] = randItem([[3,4,5], [6,8,10], [5,12,13], [15,20,25]]);
      const h = (a * b) / c;
      return {
        q: `В треугольнике ABC угол C = 90°, катеты AC = ${a}, BC = ${b}. Найдите высоту CH, проведенную к гипотенузе.`,
        h: 'Сначала найдите гипотенузу AB, затем h = (AC·BC)/AB',
        s: `1) AB = √(${a}² + ${b}²) = ${c}. 2) CH = (${a}·${b}) / ${c} = ${h}`,
        a: h, fig: SVG.right_h
      };
    },
    // 9. Высота делит гипотенузу (h^2 = xy)
    () => {
      const h = randInt(4, 12);
      const x = randItem([1, 2, 3, 4, 9, 16]);
      // h^2 = x * y  => y = h^2 / x
      if ((h*h) % x !== 0) return GENS.right[0](); // fallback
      const y = (h*h) / x;
      return {
        q: `В прямоугольном треугольнике высота, проведенная к гипотенузе, делит её на отрезки. Один из отрезков равен ${x}, а высота равна ${h}. Найдите второй отрезок.`,
        h: 'h² = AH · HB',
        s: `${h}² = ${x} · x  ⇒  ${h*h} = ${x}x  ⇒  x = ${y}`,
        a: y, fig: SVG.right_h
      };
    },
    // 10. Медиана к гипотенузе
    () => {
      const c = randItem([10, 12, 14, 16, 20, 24, 26, 30]);
      return {
        q: `В треугольнике ABC угол C = 90°, гипотенуза AB = ${c}. Найдите медиану CM, проведенную к гипотенузе.`,
        h: 'Медиана к гипотенузе равна половине гипотенузы.',
        s: `CM = AB / 2 = ${c} / 2 = ${c/2}`,
        a: c/2, fig: SVG.right
      };
    }
  ],

  // === РАВНОБЕДРЕННЫЙ ТРЕУГОЛЬНИК ===
  isosceles: [
    // 1. Высота по Пифагору
    () => {
      const h = randInt(3, 12);
      const halfBase = randInt(3, 12);
      const side = Math.sqrt(h*h + halfBase*halfBase);
      if (!Number.isInteger(side)) return GENS.isosceles[1]();
      const base = halfBase * 2;
      return {
        q: `В равнобедренном треугольнике основание равно ${base}, боковая сторона равна ${side}. Найдите высоту, проведенную к основанию.`,
        h: 'Высота делит основание пополам. Используйте теорему Пифагора.',
        s: `Половина основания = ${halfBase}. h = √(${side}² − ${halfBase}²) = ${h}`,
        a: h, fig: SVG.iso
      };
    },
    // 2. Углы
    () => {
      const angleTop = randItem([20, 30, 40, 50, 80, 90, 100, 120]);
      const angleBase = (180 - angleTop) / 2;
      return {
        q: `В равнобедренном треугольнике угол при вершине, противолежащей основанию, равен ${angleTop}°. Найдите угол при основании.`,
        h: '(180 − ∠Вершины) / 2',
        s: `(180 − ${angleTop}) / 2 = ${angleBase}`,
        a: angleBase, fig: SVG.iso
      };
    },
    // 3. Внешний угол
    () => {
      const angleBase = randInt(30, 70);
      const ext = 180 - angleBase;
      return {
        q: `В равнобедренном треугольнике внешний угол при основании равен ${ext}°. Найдите угол при вершине.`,
        h: 'Сначала найдите внутренний угол при основании.',
        s: `Внутренний угол = 180 − ${ext} = ${angleBase}. Угол при вершине = 180 − 2·${angleBase} = ${180 - 2*angleBase}`,
        a: 180 - 2*angleBase, fig: SVG.iso
      };
    }
  ],

  // === ОБЩИЙ ТРЕУГОЛЬНИК ===
  general: [
    // 1. Сумма углов
    () => {
      const a = randInt(20, 80);
      const b = randInt(20, 80);
      return {
        q: `В треугольнике два угла равны ${a}° и ${b}°. Найдите третий угол.`,
        h: 'Сумма углов 180°',
        s: `180 − (${a} + ${b}) = ${180 - a - b}`,
        a: 180 - a - b
      };
    },
    // 2. Площадь (стороны и угол)
    () => {
      const a = randInt(4, 12);
      const b = randInt(4, 12);
      return {
        q: `Стороны треугольника равны ${a} и ${b}, а угол между ними равен 30°. Найдите площадь треугольника.`,
        h: 'S = ½ · a · b · sin 30°',
        s: `S = 0.5 · ${a} · ${b} · 0.5 = ${0.25 * a * b}`,
        a: 0.25 * a * b
      };
    }
  ],

  // === ПАРАЛЛЕЛОГРАММЫ ===
  parallel: [
    // 1. Площадь ромба (диагонали)
    () => {
      const d1 = randInt(4, 16);
      const d2 = randInt(4, 16);
      return {
        q: `Найдите площадь ромба, если его диагонали равны ${d1} и ${d2}.`,
        h: 'S = ½ · d₁ · d₂',
        s: `S = 0.5 · ${d1} · ${d2} = ${0.5 * d1 * d2}`,
        a: 0.5 * d1 * d2, fig: SVG.rhomb
      };
    },
    // 2. Площадь параллелограмма
    () => {
      const a = randInt(5, 15);
      const h = randInt(4, 12);
      return {
        q: `Сторона параллелограмма равна ${a}, а высота, проведенная к ней, равна ${h}. Найдите площадь.`,
        h: 'S = a · h',
        s: `${a} · ${h} = ${a*h}`,
        a: a*h
      };
    }
  ],

  // === ТРАПЕЦИЯ ===
  trap: [
    // 1. Средняя линия
    () => {
      const a = randInt(4, 20);
      const b = a + randInt(2, 10) * 2; // чтобы делилось на 2
      return {
        q: `Основания трапеции равны ${a} и ${b}. Найдите среднюю линию.`,
        h: 'm = (a + b) / 2',
        s: `(${a} + ${b}) / 2 = ${(a+b)/2}`,
        a: (a+b)/2, fig: SVG.trap
      };
    },
    // 2. Площадь
    () => {
      const a = randInt(4, 12);
      const b = a + randInt(2, 8) * 2;
      const h = randInt(3, 10);
      return {
        q: `Основания трапеции равны ${a} и ${b}, а высота равна ${h}. Найдите площадь.`,
        h: 'S = ½(a + b)h',
        s: `S = (${a} + ${b})/2 · ${h} = ${(a+b)/2} · ${h} = ${(a+b)/2 * h}`,
        a: (a+b)/2 * h, fig: SVG.trap
      };
    }
  ],

  // === ОКРУЖНОСТЬ ===
  angles: [
    // 1. Вписанный угол
    () => {
      const arc = randInt(40, 160) * 2; // четное
      return {
        q: `Дуга окружности равна ${arc}°. Найдите вписанный угол, опирающийся на эту дугу.`,
        h: 'Вписанный угол равен половине дуги.',
        s: `${arc} / 2 = ${arc/2}`,
        a: arc/2, fig: SVG.circ
      };
    }
  ],
  inscribed: [
    // 1. Радиус описанной около прямоугольного
    () => {
      const [a, b, c] = randItem(TRIPLES);
      return {
        q: `Катеты прямоугольного треугольника равны ${a} и ${b}. Найдите радиус описанной окружности.`,
        h: 'R = гипотенуза / 2',
        s: `Гипотенуза = ${c}. R = ${c}/2 = ${c/2}`,
        a: c/2
      };
    }
  ]
};

// Функция для получения N задач (генерация)
export const getTasks = (topic, count = 50) => {
  const generators = topic === 'mixed' 
    ? Object.values(GENS).flat() 
    : (GENS[topic] || []);
  
  if (generators.length === 0) return [];

  const tasks = [];
  for (let i = 0; i < count; i++) {
    const gen = randItem(generators);
    const task = gen();
    // Добавляем уникальный ID для React
    tasks.push({ ...task, id: `${topic}-${i}-${Math.random().toString(36).substr(2,9)}` });
  }
  return tasks;
};

// Для совместимости со старым кодом (счетчики)
export const COUNTS = {
  right: 50, isosceles: 50, general: 30, parallel: 40, trap: 40, angles: 40, inscribed: 30, tangent: 20, circumscribed: 30, mixed: 100
};
