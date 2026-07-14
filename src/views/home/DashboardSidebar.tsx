import {
  RadarChartOutlined, WarningOutlined, EnvironmentOutlined,
  LineChartOutlined, FilterOutlined, SettingOutlined,
} from '@ant-design/icons';

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
}

const items: NavItem[] = [
  { key: 'overview', label: '总览面板', icon: RadarChartOutlined },
  { key: 'risk', label: '风险预警', icon: WarningOutlined },
  { key: 'sections', label: '断面详情', icon: EnvironmentOutlined },
  { key: 'trend', label: '趋势分析', icon: LineChartOutlined },
  { key: 'filter', label: '数据筛选', icon: FilterOutlined },
];

interface DashboardSidebarProps {
  activeKey: string;
  onSelect: (key: string) => void;
}

export default function DashboardSidebar({ activeKey, onSelect }: DashboardSidebarProps) {
  return (
    <div style={{
      position: 'fixed',
      left: 24,
      top: 88,
      bottom: 24,
      width: 48,
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.6)',
      borderRadius: 999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      zIndex: 100,
      padding: '6px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              title={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: active ? '#1e293b' : 'transparent',
                borderRadius: 999,
                width: 36,
                height: 36,
                cursor: 'pointer',
                transition: 'all 0.2s',
                margin: '0 auto',
              }}
              onMouseEnter={(e) => {
                if (!active) { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; }
              }}
              onMouseLeave={(e) => {
                if (!active) { e.currentTarget.style.background = 'transparent'; }
              }}
            >
              <Icon style={{ fontSize: 17, color: active ? '#ffffff' : '#64748b' }} />
            </button>
          );
        })}
      </div>

      <button
        title="面板设置"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', background: 'transparent', borderRadius: 999,
          width: 36, height: 36, cursor: 'pointer',
          margin: '0 auto', transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <SettingOutlined style={{ fontSize: 17, color: '#94a3b8' }} />
      </button>
    </div>
  );
}
