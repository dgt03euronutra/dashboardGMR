type ConsumptionType = 'agua' | 'gas' | 'electricidad' | 'solar';
type View = 'realtime' | 'anomalies' | 'comparisons' | 'manual-report' | 'scheduled-reports';
type TimeRange = 'hour' | 'day' | 'week' | 'month' | 'year';

interface Parameter {
  id: string;
  name: string;
  group: string;
  priority: 1 | 2 | 3;
  unit: string;
  value: string;
  change: string;
  location: string;
  points: number[];
}

const consumptionTypes: { id: ConsumptionType; label: string; icon: string }[] = [
  { id: 'agua', label: 'Agua', icon: '◉' },
  { id: 'gas', label: 'Gas', icon: '◌' },
  { id: 'electricidad', label: 'Electricidad', icon: 'ϟ' },
  { id: 'solar', label: 'Placas solares', icon: '☼' },
];

const parameters: Record<ConsumptionType, Parameter[]> = {
  agua: [
    { id: 'water-flow', name: 'Caudal general', group: 'Caudal', priority: 1, unit: 'm³/h', value: '18,4', change: '+2,4%', location: 'Entrada principal', points: [24, 27, 24, 34, 30, 43, 36, 39, 34, 48, 42, 46, 39, 52, 46, 49, 42, 57, 48, 52] },
    { id: 'water-pressure', name: 'Presión de red', group: 'Presión', priority: 2, unit: 'bar', value: '3,2', change: '-0,8%', location: 'Sala de bombeo', points: [52, 49, 51, 45, 50, 48, 54, 51, 47, 51, 49, 53, 47, 50, 48, 52, 49, 51, 47, 50] },
    { id: 'water-tank', name: 'Nivel depósito', group: 'Depósito', priority: 1, unit: '%', value: '76', change: '+1,2%', location: 'Depósito norte', points: [32, 34, 35, 38, 40, 42, 41, 44, 46, 48, 49, 51, 54, 56, 55, 59, 61, 62, 65, 66] },
    { id: 'water-temperature', name: 'Temperatura del agua', group: 'Temperatura', priority: 3, unit: '°C', value: '16,8', change: '+0,6%', location: 'Tubería principal', points: [32, 33, 35, 34, 36, 37, 36, 38, 39, 38, 40, 39, 41, 40, 42, 43, 42, 44, 43, 45] },
    { id: 'water-quality', name: 'Conductividad', group: 'Calidad', priority: 2, unit: 'µS/cm', value: '428', change: '-1,1%', location: 'Control de calidad', points: [48, 46, 49, 47, 45, 48, 46, 49, 47, 45, 48, 46, 47, 49, 46, 48, 45, 47, 48, 46] },
  ],
  gas: [
    { id: 'gas-flow', name: 'Consumo de gas', group: 'Consumo', priority: 1, unit: 'm³/h', value: '12,8', change: '-3,1%', location: 'Sala de calderas', points: [59, 52, 56, 48, 53, 45, 48, 41, 46, 38, 43, 36, 40, 34, 37, 31, 35, 28, 32, 26] },
    { id: 'gas-pressure', name: 'Presión de gas', group: 'Presión', priority: 2, unit: 'mbar', value: '21,6', change: '+0,4%', location: 'Colector principal', points: [45, 46, 44, 47, 45, 46, 48, 45, 46, 44, 47, 45, 46, 48, 45, 46, 44, 47, 46, 48] },
    { id: 'gas-boiler', name: 'Temperatura caldera', group: 'Temperatura', priority: 1, unit: '°C', value: '68,2', change: '+1,8%', location: 'Caldera 01', points: [28, 30, 35, 38, 42, 46, 45, 49, 52, 55, 58, 60, 59, 63, 66, 64, 69, 72, 70, 74] },
    { id: 'gas-return', name: 'Temperatura de retorno', group: 'Temperatura', priority: 2, unit: '°C', value: '54,1', change: '+0,9%', location: 'Circuito de retorno', points: [35, 36, 38, 37, 39, 41, 40, 42, 43, 42, 44, 46, 45, 47, 48, 47, 49, 50, 49, 51] },
    { id: 'gas-hours', name: 'Horas de funcionamiento', group: 'Operación', priority: 3, unit: 'h', value: '6,4', change: '-2,0%', location: 'Caldera 01', points: [20, 23, 28, 35, 39, 42, 45, 49, 52, 55, 58, 60, 64, 67, 69, 72, 76, 80, 84, 88] },
  ],
  electricidad: [
    { id: 'power-demand', name: 'Demanda eléctrica', group: 'Potencia', priority: 1, unit: 'kW', value: '246,8', change: '+4,6%', location: 'Cuadro general', points: [25, 30, 27, 39, 34, 45, 40, 53, 48, 58, 52, 65, 57, 70, 62, 75, 67, 82, 72, 86] },
    { id: 'power-energy', name: 'Energía consumida', group: 'Potencia', priority: 1, unit: 'kWh', value: '1.842', change: '+3,4%', location: 'Contador general', points: [18, 22, 24, 31, 33, 39, 43, 49, 52, 58, 61, 66, 70, 74, 77, 82, 85, 88, 92, 96] },
    { id: 'power-factor', name: 'Factor de potencia', group: 'Potencia', priority: 2, unit: 'cos φ', value: '0,96', change: '+0,2%', location: 'Acometida', points: [67, 64, 66, 63, 68, 66, 69, 65, 67, 64, 66, 69, 66, 68, 65, 67, 69, 66, 68, 67] },
    { id: 'power-voltage', name: 'Tensión de línea', group: 'Tensión', priority: 1, unit: 'V', value: '401,2', change: '-0,3%', location: 'Cuadro general', points: [50, 53, 51, 48, 52, 50, 47, 51, 54, 50, 48, 52, 51, 49, 53, 50, 48, 51, 49, 52] },
    { id: 'power-current', name: 'Intensidad', group: 'Intensidad', priority: 1, unit: 'A', value: '356', change: '+2,7%', location: 'Cuadro general', points: [25, 31, 29, 38, 36, 43, 41, 50, 48, 56, 54, 63, 60, 70, 67, 75, 73, 82, 79, 87] },
    { id: 'power-frequency', name: 'Frecuencia', group: 'Frecuencia', priority: 2, unit: 'Hz', value: '50,02', change: '+0,04%', location: 'Acometida', points: [51, 50, 52, 49, 51, 50, 48, 51, 52, 49, 50, 52, 50, 49, 51, 50, 52, 50, 49, 51] },
  ],
  solar: [
    { id: 'solar-output', name: 'Producción solar', group: 'Potencia', priority: 1, unit: 'kW', value: '138,5', change: '+8,2%', location: 'Cubierta · inversores', points: [12, 15, 22, 33, 45, 58, 70, 79, 86, 91, 94, 90, 85, 78, 69, 57, 44, 32, 20, 13] },
    { id: 'solar-yield', name: 'Rendimiento', group: 'Rendimiento', priority: 1, unit: '%', value: '92,4', change: '+1,6%', location: 'Campo fotovoltaico', points: [42, 46, 47, 52, 55, 57, 60, 63, 65, 67, 70, 72, 73, 76, 77, 80, 82, 83, 87, 89] },
    { id: 'solar-temp', name: 'Temperatura panel', group: 'Temperatura', priority: 2, unit: '°C', value: '34,8', change: '+2,1%', location: 'Cubierta · zona A', points: [24, 28, 32, 36, 42, 49, 54, 58, 61, 64, 67, 69, 72, 74, 73, 70, 65, 58, 48, 39] },
    { id: 'solar-energy', name: 'Energía generada', group: 'Energía', priority: 1, unit: 'kWh', value: '968', change: '+6,4%', location: 'Producción diaria', points: [12, 15, 22, 33, 45, 58, 70, 79, 86, 91, 94, 90, 85, 78, 69, 57, 44, 32, 20, 13] },
    { id: 'solar-irradiance', name: 'Irradiancia', group: 'Radiación', priority: 3, unit: 'W/m²', value: '684', change: '+3,2%', location: 'Cubierta · zona A', points: [12, 15, 22, 33, 45, 58, 70, 79, 86, 91, 94, 90, 85, 78, 69, 57, 44, 32, 20, 13] },
  ],
};

const comparisonColors = ['#236649', '#e5a84b', '#8297c0', '#b480a3'];

const timeRanges: { id: TimeRange; label: string; ticks: string[]; samples: number }[] = [
  { id: 'hour', label: 'Hora', ticks: ['-60 min', '-45 min', '-30 min', '-15 min', 'Ahora'], samples: 12 },
  { id: 'day', label: 'Día', ticks: ['00:00', '06:00', '12:00', '18:00', 'Ahora'], samples: 24 },
  { id: 'week', label: 'Semana', ticks: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], samples: 7 },
  { id: 'month', label: 'Mes', ticks: ['1', '8', '15', '22', 'Hoy'], samples: 30 },
  { id: 'year', label: 'Año', ticks: ['Ene', 'Mar', 'May', 'Jul', 'Sep', 'Nov'], samples: 12 },
];
const rangeFactors: Record<TimeRange, number> = { hour: 0.75, day: 1, week: 1.2, month: 1.45, year: 1.7 };

const comparisonSeries = [
  { id: 'current', labels: { hour: 'Esta hora', day: 'Hoy', week: 'Esta semana', month: 'Este mes', year: 'Este año' } },
  { id: 'previous', labels: { hour: 'Hora anterior', day: 'Ayer', week: 'Semana anterior', month: 'Mes anterior', year: 'Año anterior' } },
  { id: 'average', labels: { hour: 'Media del día', day: 'Media del mes', week: 'Media del mes', month: 'Media del año', year: 'Media anual' } },
];

const anomalies = [
  { id: 'anomaly-water-flow', title: 'Pico de caudal', category: 'agua' as ConsumptionType, group: 'Caudal', parameterId: 'water-flow', type: 'Agua · Caudal · Caudal general', location: 'Entrada principal', date: 'Hoy, 10:42', severity: 'Alta', value: '31,8 m³/h', points: [38, 41, 36, 43, 40, 45, 39, 48, 40, 76, 35, 71, 38, 82, 42, 43, 40, 45, 42, 41] },
  { id: 'anomaly-water-pressure', title: 'Descenso de presión', category: 'agua' as ConsumptionType, group: 'Presión', parameterId: 'water-pressure', type: 'Agua · Presión · Presión de red', location: 'Sala de bombeo', date: 'Ayer, 16:18', severity: 'Media', value: '2,1 bar', points: [62, 60, 63, 58, 61, 59, 60, 58, 58, 32, 57, 28, 54, 31, 57, 59, 58, 61, 60, 62] },
  { id: 'anomaly-power-demand', title: 'Demanda fuera de patrón', category: 'electricidad' as ConsumptionType, group: 'Potencia', parameterId: 'power-demand', type: 'Electricidad · Potencia · Demanda eléctrica', location: 'Cuadro general', date: '28 oct, 03:06', severity: 'Alta', value: '318 kW', points: [30, 33, 29, 34, 31, 36, 32, 35, 33, 78, 31, 83, 35, 31, 37, 33, 35, 32, 36, 34] },
];

interface ScheduledReport {
  id: string;
  parameterId: string;
  frequency: string;
  time: string;
  format: string;
}

const initialScheduledReports: ScheduledReport[] = [
  { id: 'schedule-daily', parameterId: 'power-demand', frequency: 'daily', time: '08:00', format: 'brief' },
  { id: 'schedule-solar', parameterId: 'solar-output', frequency: 'weekly', time: '09:00', format: 'detailed' },
];

function readArchivedAnomalies(): string[] {
  const stored = localStorage.getItem('dashboard-consumos-archived');
  if (!stored) return [];
  const parsed: unknown = JSON.parse(stored);
  return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
}

const state: {
  view: View;
  category: ConsumptionType;
  parameterId: string;
  range: TimeRange;
  comparisonCategory: ConsumptionType;
  comparisonGroup: string;
  comparisonParameterId: string;
  comparisonRange: TimeRange;
  comparisons: string[];
  reportGenerated: boolean;
  scheduleFormOpen: boolean;
  editingScheduleId: string | null;
  schedules: ScheduledReport[];
  archivedAnomalies: string[];
  archivedOpen: boolean;
  sidebarOpen: boolean;
  analysisExpanded: boolean;
  reportingExpanded: boolean;
  openParameterGroups: string[];
} = {
  view: 'realtime',
  category: 'electricidad',
  parameterId: 'power-demand',
  range: 'day',
  comparisonCategory: 'electricidad',
  comparisonGroup: 'Potencia',
  comparisonParameterId: 'power-demand',
  comparisonRange: 'day',
  comparisons: ['current', 'previous', 'average'],
  reportGenerated: false,
  scheduleFormOpen: false,
  editingScheduleId: null,
  schedules: initialScheduledReports,
  archivedAnomalies: readArchivedAnomalies(),
  archivedOpen: false,
  sidebarOpen: false,
  analysisExpanded: true,
  reportingExpanded: true,
  openParameterGroups: [],
};

function currentParameter(): Parameter {
  return parameters[state.category].find(({ id }) => id === state.parameterId) ?? parameters[state.category][0];
}

function categoryLabel(category: ConsumptionType): string {
  return consumptionTypes.find(({ id }) => id === category)?.label ?? category;
}

function numericValue(value: string): number {
  return Number(value.replace(/\./g, '').replace(',', '.')) || 0;
}

interface ChartScale {
  min: number;
  max: number;
  ticks: number[];
}

function chartScale(values: number[]): ChartScale {
  const finiteValues = values.filter(Number.isFinite);
  const rawMin = Math.min(...finiteValues);
  const rawMax = Math.max(...finiteValues);
  const span = Math.max(rawMax - rawMin, Math.abs(rawMax) * 0.1, 1);
  const roughStep = (span * 1.2) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalizedStep = roughStep / magnitude;
  const step = (normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10) * magnitude;
  const min = Math.floor((rawMin - span * 0.1) / step) * step;
  const max = Math.ceil((rawMax + span * 0.1) / step) * step;
  const tickCount = Math.max(1, Math.round((max - min) / step));
  const ticks = Array.from({ length: tickCount + 1 }, (_, index) => max - index * step);
  return { min, max, ticks };
}

function resample(points: number[], count: number): number[] {
  if (count < 2) return [points.at(-1) ?? 0];
  return Array.from({ length: count }, (_, index) => {
    const position = (index / (count - 1)) * (points.length - 1);
    const lower = Math.floor(position);
    const fraction = position - lower;
    return (points[lower] ?? 0) * (1 - fraction) + (points[Math.min(lower + 1, points.length - 1)] ?? 0) * fraction;
  });
}

function chartPoints(parameter: Parameter, range: TimeRange, factor = 1): number[] {
  const relativePoints = resample(parameter.points, timeRanges.find((item) => item.id === range)?.samples ?? 24);
  const currentValue = numericValue(parameter.value) * rangeFactors[range];
  return relativePoints.map((point) => currentValue * (0.9 + point / 500) * factor);
}

function makeLine(points: number[], width = 720, height = 220, padding = 12, scale = chartScale(points)): string {
  return points.map((point, index) => {
    const x = padding + (index / (points.length - 1)) * (width - padding * 2);
    const ratio = Math.max(0, Math.min(1, (point - scale.min) / (scale.max - scale.min)));
    const y = height - padding - ratio * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

function chartSvg(points: number[], color = '#236649', compact = false, scale = chartScale(points)): string {
  const width = compact ? 280 : 720;
  const height = compact ? 92 : 220;
  const padding = compact ? 5 : 12;
  const line = makeLine(points, width, height, padding, scale);
  const firstPoint = line.split(' ')[0];
  const lastPoint = line.split(' ').at(-1);
  const baseline = (height - padding).toFixed(1);
  const area = `${firstPoint} ${line} ${lastPoint?.split(',')[0]},${baseline} ${firstPoint.split(',')[0]},${baseline}`;
  const grid = compact ? '' : scale.ticks.slice(1, -1).map((tick) => {
    const fraction = (tick - scale.min) / (scale.max - scale.min);
    const y = (height - padding - fraction * (height - padding * 2)).toFixed(1);
    return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" class="chart-grid" />`;
  }).join('');

  return `<svg class="chart-svg${compact ? ' chart-svg--compact' : ''}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Gráfica de valores en el tiempo" preserveAspectRatio="none">
    ${grid}<polygon points="${area}" fill="${color}" opacity="${compact ? '.09' : '.08'}"></polygon>
    <polyline points="${line}" fill="none" stroke="${color}" stroke-width="${compact ? '2.5' : '3'}" stroke-linecap="round" stroke-linejoin="round"></polyline>
  </svg>`;
}

function comparisonPoints(parameter: Parameter): { id: string; color: string; points: number[] }[] {
  const selected = comparisonSeries.filter((series) => state.comparisons.includes(series.id));
  const factors = [1, .92, .84];
  return selected.map((series) => {
    const index = comparisonSeries.findIndex(({ id }) => id === series.id);
    return { id: series.id, color: comparisonColors[index], points: chartPoints(parameter, state.comparisonRange, factors[index]) };
  });
}

function comparisonSvg(parameter: Parameter, scale: ChartScale): string {
  const selected = comparisonPoints(parameter);
  const padding = 12;
  const grid = scale.ticks.slice(1, -1).map((tick) => {
    const fraction = (tick - scale.min) / (scale.max - scale.min);
    const y = (220 - padding - fraction * (220 - padding * 2)).toFixed(1);
    return `<line x1="${padding}" y1="${y}" x2="${720 - padding}" y2="${y}" class="chart-grid" />`;
  }).join('');
  const lines = selected.map((series) =>
    `<polyline data-series="${series.id}" points="${makeLine(series.points, 720, 220, padding, scale)}" fill="none" stroke="${series.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>`
  ).join('');
  return `<svg class="chart-svg" viewBox="0 0 720 220" role="img" aria-label="Gráfica comparativa de los periodos seleccionados" preserveAspectRatio="none">${grid}${lines}</svg>`;
}

function renderSidebar(): string {
  const item = (view: View, label: string, icon: string) =>
    `<button class="nav-item${state.view === view ? ' nav-item--active' : ''}" data-view="${view}" ${state.view === view ? 'aria-current="page"' : ''}>
      <span class="nav-item__chevron">›</span><span class="nav-item__icon">${icon}</span><span>${label}</span>
    </button>`;
  const group = (name: string, icon: string, expanded: boolean, views: [View, string][]) =>
    `<div class="nav-group">
      <button class="nav-group__toggle" data-action="toggle-nav-group" data-group="${name}" aria-expanded="${expanded}">
        <span class="nav-group__chevron">${expanded ? '⌄' : '›'}</span><span class="nav-group__icon">${icon}</span><span>${name}</span>
      </button>
      ${expanded ? `<div class="nav-group__items">${views.map(([view, label]) => item(view, label, label === 'Anomalías' ? '⌁' : label === 'Comparaciones' ? '⇄' : label === 'Informe manual' ? '▤' : '◷')).join('')}</div>` : ''}
    </div>`;
  return `<aside class="sidebar${state.sidebarOpen ? ' sidebar--open' : ''}">
    <nav class="navigation" aria-label="Navegación principal">
      ${item('realtime', 'Tiempo real', '◉')}
      ${group('Análisis', '⌁', state.analysisExpanded, [['anomalies', 'Anomalías'], ['comparisons', 'Comparaciones']])}
      ${group('Reporting', '▤', state.reportingExpanded, [['manual-report', 'Informe manual'], ['scheduled-reports', 'Informes automáticos']])}
    </nav>
  </aside>`;
}

function renderRealtime(): string {
  const parameter = currentParameter();
  const points = chartPoints(parameter, state.range);
  const scale = chartScale(points);
  const ticks = scale.ticks.map((value) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(value));
  const range = timeRanges.find((item) => item.id === state.range) ?? timeRanges[1];
  const categoryCards = consumptionTypes.map((category) => `<button class="category-card${state.category === category.id ? ' category-card--active' : ''}" data-category="${category.id}" aria-pressed="${state.category === category.id}">
    <span class="category-card__icon category-card__icon--${category.id}">${category.icon}</span><span>${category.label}</span>
  </button>`).join('');
  const categoryParameters = parameters[state.category];
  const groups = [...new Set(categoryParameters.map(({ group }) => group))];
  const rows = (items: Parameter[]) => items.map((item) => `<button class="sensor-row${item.id === parameter.id ? ' sensor-row--active' : ''}${item.priority === 1 ? ' sensor-row--primary' : ''}" data-parameter="${item.id}" aria-pressed="${item.id === parameter.id}">
    <span class="sensor-row__details"><strong>${item.name}</strong><small>${item.location}</small></span>
    <span class="sensor-row__value"><strong>${item.value}</strong><small>${item.unit}</small></span>
  </button>`).join('');
  const groupMarkup = groups.map((group) => {
    const groupParameters = categoryParameters.filter((item) => item.group === group);
    const primary = groupParameters.filter((item) => item.priority === 1);
    const secondary = groupParameters.filter((item) => item.priority > 1);
    const expanded = state.openParameterGroups.includes(`${state.category}:${group}`);
    return `<section class="parameter-group"><h3>${group}</h3>${rows(primary)}${secondary.length ? `<details class="lower-parameters" data-parameter-group="${state.category}:${group}"${expanded ? ' open' : ''}><summary>Más medidas <span>(${secondary.length})</span></summary><div class="sensor-list">${rows(secondary)}</div></details>` : ''}</section>`;
  }).join('');
  return `<section class="content-section">
    <div class="category-grid">${categoryCards}</div>
    <div class="realtime-layout">
      <article class="panel live-panel">
        <div class="panel-heading panel-heading--row"><h2>${parameter.name}</h2><span class="live-pill"><i></i> EN VIVO</span></div>
        <div class="reading"><strong>${parameter.value}</strong><span class="reading__unit">${parameter.unit}</span><span class="reading__change">${parameter.change}</span></div>
        <p class="reading__location">${parameter.location}</p>
        <div class="chart-toolbar"><div class="chart-tabs" role="group" aria-label="Rango de gráfica">
          ${timeRanges.map(({ id, label }) => `<button class="chart-tab${state.range === id ? ' chart-tab--active' : ''}" data-range="${id}" aria-pressed="${state.range === id}">${label}</button>`).join('')}
        </div></div>
        <div class="chart-wrap">${chartSvg(points, '#236649', false, scale)}<div class="chart-y-labels">${ticks.map((tick) => `<span>${tick} ${parameter.unit}</span>`).join('')}</div><div class="chart-x-labels">${range.ticks.map((tick) => `<span>${tick}</span>`).join('')}</div></div>
      </article>
      <aside class="panel monitored-panel"><div class="panel-heading panel-heading--row"><h2>Parámetros</h2><span class="panel-count">${categoryParameters.length}</span></div>
        ${groupMarkup}
      </aside>
    </div>
  </section>`;
}

function renderAnomalies(): string {
  const activeAnomalies = anomalies.filter(({ id }) => !state.archivedAnomalies.includes(id));
  const archived = anomalies.filter(({ id }) => state.archivedAnomalies.includes(id));
  const cards = activeAnomalies.map((anomaly) => `<article class="panel anomaly-card">
    <div class="anomaly-card__top"><span class="anomaly-card__type">${anomaly.type}</span><span class="severity severity--${anomaly.severity === 'Alta' ? 'high' : 'medium'}">${anomaly.severity}</span></div>
    <div class="anomaly-card__chart">${chartSvg(anomaly.points, '#dc785d', true)}<span class="anomaly-marker">!</span></div>
    <h3>${anomaly.title}</h3><div class="anomaly-card__value"><strong>${anomaly.value}</strong><span>fuera de rango</span></div>
    <div class="anomaly-card__meta"><span>⌖ ${anomaly.location}</span><span>◷ ${anomaly.date}</span></div>
    <div class="anomaly-card__actions"><button class="button button--outline" data-action="open-capture" data-anomaly-id="${anomaly.id}">Ver captura</button><button class="button button--primary" data-action="archive-anomaly" data-anomaly-id="${anomaly.id}">Archivar</button></div>
  </article>`).join('');
  const archiveGroups = [...new Set(archived.map(({ category }) => category))].map((category) => {
    const categoryAnomalies = archived.filter((anomaly) => anomaly.category === category);
    const groups = [...new Set(categoryAnomalies.map(({ group }) => group))];
    return `<details class="archive-category"><summary>${categoryLabel(category)} <span>(${categoryAnomalies.length})</span></summary>${groups.map((group) => `<section class="archive-group"><h4>${group}</h4>${categoryAnomalies.filter((anomaly) => anomaly.group === group).map((anomaly) => `<div class="archive-row"><span><strong>${anomaly.title}</strong><small>${anomaly.date} · ${anomaly.location}</small></span><button class="text-action" data-action="open-capture" data-anomaly-id="${anomaly.id}">Ver</button></div>`).join('')}</section>`).join('')}</details>`;
  }).join('');
  return `<section class="content-section"><div class="anomaly-grid">${cards}</div><details class="archived-anomalies"${state.archivedOpen ? ' open' : ''}><summary>Anomalías archivadas <span>(${archived.length})</span></summary>${archived.length ? archiveGroups : '<p class="archive-empty">No hay capturas archivadas.</p>'}</details></section>`;
}

function renderComparisons(): string {
  const categoryParameters = parameters[state.comparisonCategory];
  const groups = [...new Set(categoryParameters.map(({ group }) => group))];
  if (!groups.includes(state.comparisonGroup)) state.comparisonGroup = groups[0];
  const groupParameters = categoryParameters.filter(({ group }) => group === state.comparisonGroup);
  if (!groupParameters.some(({ id }) => id === state.comparisonParameterId)) state.comparisonParameterId = groupParameters[0].id;
  const parameter = groupParameters.find(({ id }) => id === state.comparisonParameterId) ?? groupParameters[0];
  const range = timeRanges.find(({ id }) => id === state.comparisonRange) ?? timeRanges[1];
  const legends = comparisonSeries.filter(({ id }) => state.comparisons.includes(id)).map((series) => {
    const index = comparisonSeries.findIndex(({ id }) => id === series.id);
    return `<span class="legend-item"><i style="--legend-color:${comparisonColors[index]}"></i>${series.labels[state.comparisonRange]}</span>`;
  }).join('');
  const categoryOptions = consumptionTypes.map(({ id, label }) => `<option value="${id}"${id === state.comparisonCategory ? ' selected' : ''}>${label}</option>`).join('');
  const groupOptions = groups.map((group) => `<option value="${group}"${group === state.comparisonGroup ? ' selected' : ''}>${group}</option>`).join('');
  const parameterOptions = groupParameters.map((item) => `<option value="${item.id}"${item.id === state.comparisonParameterId ? ' selected' : ''}>${item.name} (${item.unit})</option>`).join('');
  const seriesPoints = comparisonPoints(parameter);
  const scale = chartScale(seriesPoints.flatMap(({ points }) => points));
  const yTicks = scale.ticks.map((value) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(value));
  return `<section class="content-section">
    <div class="view-actions"><button class="button button--outline" data-action="export-comparison">↓ <span>Exportar</span></button></div>
    <article class="panel comparison-panel">
      <div class="comparison-controls">
        <label class="comparison-field"><span>Tipo</span><select data-comparison="category">${categoryOptions}</select></label>
        <label class="comparison-field"><span>Grupo</span><select data-comparison="group">${groupOptions}</select></label>
        <label class="comparison-field"><span>Parámetro</span><select data-comparison="parameter">${parameterOptions}</select></label>
        <label class="comparison-field"><span>Rango</span><select data-comparison="range">${timeRanges.map(({ id, label }) => `<option value="${id}"${state.comparisonRange === id ? ' selected' : ''}>${label}</option>`).join('')}</select></label>
      </div>
      <div class="period-options">${comparisonSeries.map((series, index) => `<label class="period-option"><input type="checkbox" data-period="${series.id}" ${state.comparisons.includes(series.id) ? 'checked' : ''}><i style="--legend-color:${comparisonColors[index]}"></i>${series.labels[state.comparisonRange]}</label>`).join('')}</div>
      <div class="comparison-chart-heading"><div><span class="comparison-unit">${parameter.unit}</span><strong>${parameter.name}</strong></div><div class="chart-legend">${legends}</div></div>
      <div class="comparison-chart">${comparisonSvg(parameter, scale)}<div class="chart-y-labels">${yTicks.map((tick) => `<span>${tick} ${parameter.unit}</span>`).join('')}</div><div class="chart-x-labels">${range.ticks.map((tick) => `<span>${tick}</span>`).join('')}</div></div>
    </article>
    <div class="comparison-footer"><button class="text-action" data-action="reset-comparison">Restablecer selección</button></div>
  </section>`;
}

function renderManualReport(): string {
  const result = state.reportGenerated ? `<div class="report-result" role="status"><span class="report-result__icon">✦</span><div><p class="eyebrow">RESUMEN · CENTRO LOGÍSTICO NORTE</p><h3>Actividad estable con un aumento moderado de demanda.</h3><p>Entre el 1 y el 3 de noviembre, la demanda eléctrica alcanzó un máximo de 318 kW y un promedio de 224 kW. El consumo se situó un 8% por encima de la media mensual. Se detectaron 2 anomalías durante el periodo, sin interrupciones en el servicio.</p></div><button class="icon-action" data-action="copy-report" aria-label="Copiar informe">▢</button></div>` : '';
  return `<section class="content-section report-content">
    <div class="report-layout"><form class="panel report-form" data-form="manual-report">
      <div class="form-section-title"><div><strong>Parámetros</strong></div></div>
      <label class="form-field"><span>Tipo de consumo</span><select name="consumption"><option>Electricidad</option><option>Agua</option><option>Gas</option><option>Placas solares</option></select></label>
      <label class="form-field"><span>Parámetro</span><select name="parameter"><option>Demanda eléctrica</option><option>Consumo acumulado</option><option>Factor de potencia</option><option>Tensión de línea</option></select></label>
      <div class="form-section-title form-section-title--spaced"><div><strong>Rango de tiempo</strong></div></div>
      <div class="date-fields"><label class="form-field"><span>Desde</span><input type="date" name="from" value="2026-11-01"></label><label class="form-field"><span>Hasta</span><input type="date" name="to" value="2026-11-03"></label></div>
      <label class="form-field"><span>Destinatario <small>(opcional)</small></span><input type="email" placeholder="nombre@empresa.com"></label>
      <button class="button button--primary button--generate" type="submit">Generar resumen</button>
    </form>
    </div>
    ${result}
  </section>`;
}

function renderScheduledReports(): string {
  const allParameters = consumptionTypes.map(({ id, label }) => ({ label, items: parameters[id] }));
  const editing = state.schedules.find(({ id }) => id === state.editingScheduleId);
  const parameterOptions = allParameters.map(({ label, items }) => `<optgroup label="${label}">${items.map((parameter) => `<option value="${parameter.id}"${parameter.id === editing?.parameterId ? ' selected' : ''}>${parameter.group} · ${parameter.name} (${parameter.unit})</option>`).join('')}</optgroup>`).join('');
  const schedule = state.schedules.map((report) => {
    const parameter = Object.values(parameters).flat().find(({ id }) => id === report.parameterId);
    if (!parameter) return '';
    const category = consumptionTypes.find(({ id }) => parameters[id].some(({ id: parameterId }) => parameterId === report.parameterId));
    const frequency = report.frequency === 'weekly' ? 'Cada lunes' : report.frequency === 'monthly' ? 'Primer día del mes' : 'Todos los días';
    const icon = category?.id === 'solar' ? '☼' : '◷';
    const format = report.format === 'detailed' ? 'Detallado' : report.format === 'technical' ? 'Técnico' : 'Breve';
    return `<article class="panel schedule-row"><span class="schedule-icon${category?.id === 'solar' ? ' schedule-icon--solar' : ''}">${icon}</span><span class="schedule-main"><strong>${parameter.name}</strong><small>${category?.label} · ${parameter.group} · ${frequency} a las ${report.time} · ${format}</small></span><span class="schedule-status"><i></i> Activo</span><button class="icon-action schedule-menu" data-action="edit-schedule" data-schedule-id="${report.id}" aria-label="Editar informe ${parameter.name}">✎</button></article>`;
  }).join('');
  const form = state.scheduleFormOpen ? `<form class="schedule-form panel" data-form="schedule">
    <label class="form-field"><span>Parámetro y grupo</span><select name="parameterId">${parameterOptions}</select></label>
    <label class="form-field"><span>Frecuencia</span><select name="frequency"><option value="daily"${editing?.frequency === 'daily' ? ' selected' : ''}>Todos los días</option><option value="weekly"${editing?.frequency === 'weekly' ? ' selected' : ''}>Cada lunes</option><option value="monthly"${editing?.frequency === 'monthly' ? ' selected' : ''}>Primer día del mes</option></select></label>
    <label class="form-field"><span>Hora</span><input type="time" name="time" value="${editing?.time ?? '07:30'}" required></label>
    <label class="form-field"><span>Formato del resumen</span><select name="format"><option value="brief"${editing?.format === 'brief' ? ' selected' : ''}>Breve</option><option value="detailed"${editing?.format === 'detailed' ? ' selected' : ''}>Detallado</option><option value="technical"${editing?.format === 'technical' ? ' selected' : ''}>Técnico</option></select></label>
    <button class="button button--primary" type="submit">${editing ? 'Guardar cambios' : 'Crear informe'}</button>
  </form>` : '';
  return `<section class="content-section report-content">
    <div class="view-actions"><button class="button button--primary" data-action="toggle-schedule-form">＋ ${state.scheduleFormOpen ? 'Cancelar' : 'Nuevo informe'}</button></div>
    ${form}
    <aside class="report-format-legend" aria-label="Formatos de informe">
      <h2>Formatos de informe</h2>
      <div><strong>Breve</strong><span>Resumen y datos destacados.</span></div>
      <div><strong>Detallado</strong><span>Tendencias, comparaciones y anomalías.</span></div>
      <div><strong>Técnico</strong><span>Valores, unidades y terminología técnica.</span></div>
    </aside>
    <div class="schedule-list">${schedule}</div>
  </section>`;
}

function renderView(): string {
  switch (state.view) {
    case 'realtime': return renderRealtime();
    case 'anomalies': return renderAnomalies();
    case 'comparisons': return renderComparisons();
    case 'manual-report': return renderManualReport();
    case 'scheduled-reports': return renderScheduledReports();
  }
}

function showCapture(id: string): void {
  const capture = anomalies.find(({ id: anomalyId }) => anomalyId === id);
  if (!capture) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'capture-dialog';
  dialog.innerHTML = `<button class="capture-dialog__close" aria-label="Cerrar">×</button><p class="eyebrow">CAPTURA</p><h2>${capture.title}</h2><p>${capture.type} · ${capture.location}</p><div class="capture-dialog__chart">${chartSvg(capture.points, '#dc785d')}</div><div class="capture-dialog__details"><span><small>DETECTADO</small><strong>${capture.date}</strong></span><span><small>VALOR MÁXIMO</small><strong>${capture.value}</strong></span><span><small>SEVERIDAD</small><strong>${capture.severity}</strong></span></div>`;
  document.body.append(dialog);
  dialog.showModal();
  dialog.querySelector('.capture-dialog__close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => dialog.remove(), { once: true });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

export function initDashboard(app: HTMLDivElement): void {
  function render(): void {
    app.innerHTML = `<div class="app-shell">${renderSidebar()}<main class="main-content"><button class="mobile-menu" data-action="toggle-sidebar" aria-label="Abrir navegación">☰</button>${renderView()}</main></div>`;
    app.querySelectorAll<HTMLDetailsElement>('.lower-parameters[data-parameter-group]').forEach((details) => {
      details.addEventListener('toggle', () => {
        const group = details.dataset.parameterGroup;
        if (!group) return;
        state.openParameterGroups = details.open
          ? [...new Set([...state.openParameterGroups, group])]
          : state.openParameterGroups.filter((openGroup) => openGroup !== group);
      });
    });
    app.querySelector<HTMLDetailsElement>('.archived-anomalies')?.addEventListener('toggle', (event) => {
      state.archivedOpen = (event.currentTarget as HTMLDetailsElement).open;
    });
  }

  app.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const viewButton = target.closest<HTMLElement>('[data-view]');
    if (viewButton?.dataset.view) {
      state.view = viewButton.dataset.view as View;
      state.sidebarOpen = false;
      render();
      return;
    }

    const categoryButton = target.closest<HTMLElement>('[data-category]');
    if (categoryButton?.dataset.category) {
      state.category = categoryButton.dataset.category as ConsumptionType;
      state.parameterId = parameters[state.category][0].id;
      state.openParameterGroups = [];
      render();
      return;
    }

    const parameterButton = target.closest<HTMLElement>('[data-parameter]');
    if (parameterButton?.dataset.parameter) {
      state.parameterId = parameterButton.dataset.parameter;
      render();
      return;
    }

    const rangeButton = target.closest<HTMLElement>('[data-range]');
    if (rangeButton?.dataset.range && timeRanges.some(({ id }) => id === rangeButton.dataset.range)) {
      state.range = rangeButton.dataset.range as TimeRange;
      render();
      return;
    }

    const action = target.closest<HTMLElement>('[data-action]')?.dataset.action;
    if (action === 'toggle-sidebar') {
      state.sidebarOpen = !state.sidebarOpen;
      render();
    } else if (action === 'toggle-nav-group') {
      if (target.closest<HTMLElement>('[data-group]')?.dataset.group === 'Análisis') {
        state.analysisExpanded = !state.analysisExpanded;
      } else {
        state.reportingExpanded = !state.reportingExpanded;
      }
      render();
    } else if (action === 'open-capture') {
      const anomalyId = target.closest<HTMLElement>('[data-anomaly-id]')?.dataset.anomalyId;
      if (anomalyId) showCapture(anomalyId);
    } else if (action === 'archive-anomaly') {
      const anomalyId = target.closest<HTMLElement>('[data-anomaly-id]')?.dataset.anomalyId;
      if (anomalyId && !state.archivedAnomalies.includes(anomalyId)) {
        state.archivedAnomalies.push(anomalyId);
        localStorage.setItem('dashboard-consumos-archived', JSON.stringify(state.archivedAnomalies));
        render();
      }
    } else if (action === 'reset-comparison') {
      state.comparisons = ['current', 'previous', 'average'];
      render();
    } else if (action === 'toggle-schedule-form') {
      state.scheduleFormOpen = !state.scheduleFormOpen;
      state.editingScheduleId = null;
      render();
    } else if (action === 'edit-schedule') {
      state.editingScheduleId = target.closest<HTMLElement>('[data-schedule-id]')?.dataset.scheduleId ?? null;
      state.scheduleFormOpen = state.editingScheduleId !== null;
      render();
    } else if (action === 'export-comparison') {
      target.closest<HTMLButtonElement>('[data-action="export-comparison"]')?.classList.toggle('button--selected');
    } else if (action === 'copy-report') {
      const button = target.closest<HTMLButtonElement>('[data-action="copy-report"]');
      if (button) button.textContent = '✓';
    }
  });

  app.addEventListener('change', (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.dataset.period) {
      state.comparisons = target.checked
        ? [...state.comparisons, target.dataset.period]
        : state.comparisons.filter((period) => period !== target.dataset.period);
      render();
      return;
    }

    if (!(target instanceof HTMLSelectElement)) return;
    if (target.dataset.comparison === 'category') {
      state.comparisonCategory = target.value as ConsumptionType;
      state.comparisonGroup = parameters[state.comparisonCategory][0].group;
      state.comparisonParameterId = parameters[state.comparisonCategory][0].id;
      render();
    } else if (target.dataset.comparison === 'group') {
      state.comparisonGroup = target.value;
      const firstInGroup = parameters[state.comparisonCategory].find(({ group }) => group === state.comparisonGroup);
      if (firstInGroup) state.comparisonParameterId = firstInGroup.id;
      render();
    } else if (target.dataset.comparison === 'parameter') {
      state.comparisonParameterId = target.value;
      render();
    } else if (target.dataset.comparison === 'range' && timeRanges.some(({ id }) => id === target.value)) {
      state.comparisonRange = target.value as TimeRange;
      render();
    }
  });

  app.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.dataset.form === 'manual-report') state.reportGenerated = true;
    if (form.dataset.form === 'schedule') {
      const formData = new FormData(form);
      const report: ScheduledReport = {
        id: state.editingScheduleId ?? `schedule-${Date.now()}`,
        parameterId: String(formData.get('parameterId') ?? ''),
        frequency: String(formData.get('frequency') ?? 'daily'),
        time: String(formData.get('time') ?? '08:00'),
        format: String(formData.get('format') ?? 'brief'),
      };
      state.schedules = state.editingScheduleId
        ? state.schedules.map((schedule) => schedule.id === state.editingScheduleId ? report : schedule)
        : [...state.schedules, report];
      state.scheduleFormOpen = false;
      state.editingScheduleId = null;
    }
    render();
  });

  render();
}
