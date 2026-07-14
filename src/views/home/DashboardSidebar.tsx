import { useState } from 'react';
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

const COLLAPSED = 48;
const EXPANDED = 200;

interface DashboardSidebarProps {
  activeKey: string;
  onSelect: (key: string) => void;
}

export default function DashboardSidebar({ activeKey, onSelect }: DashboardSidebarProps) {
  const [hovered, setHovered] = useState(false);
  const width = hovered ? EXPANDED : COLLAPSED;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        left: 24,
        top: 88,
        width,
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
        transition: 'width 0.25s ease',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              title={!hovered ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: 'none',
                background: active ? 'rgba(99,102,241,0.1)' : 'transparent',
                borderRadius: 999,
                padding: '11px 14px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? '#6366F1' : '#64748b',
                transition: 'all 0.2s',
                width: '100%',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                justifyContent: hovered ? 'flex-start' : 'center',
              }}
              onMouseEnter={(e) => {
                if (!active) { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; }
              }}
              onMouseLeave={(e) => {
                if (!active) { e.currentTarget.style.background = 'transparent'; }
              }}
            >
              <Icon style={{ fontSize: 17, flexShrink: 0 }} />
              <span style={{
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.2s',
                pointerEvents: hovered ? 'auto' : 'none',
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        title={!hovered ? '面板设置' : undefined}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          border: 'none', background: 'transparent', borderRadius: 999,
          padding: '11px 14px', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 13, color: '#94a3b8',
          width: '100%', textAlign: 'left', whiteSpace: 'nowrap',
          justifyContent: hovered ? 'flex-start' : 'center',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; e.currentTarget.style.color = '#64748b'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
      >
        <SettingOutlined style={{ fontSize: 17, flexShrink: 0 }} />
        <span style={{
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s',
          pointerEvents: hovered ? 'auto' : 'none',
        }}>
          面板设置
        </span>
      </button>
    </div>
  );
}
