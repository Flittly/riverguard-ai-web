import { useState, useRef } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import zhCN from 'antd/locale/zh_CN';
import dayjs, { Dayjs } from 'dayjs';

interface GreetingBarProps {
  onDateChange?: (date: string) => void;
}

export default function GreetingBar({ onDateChange }: GreetingBarProps) {
  const { userInfo } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      onDateChange?.(date.format('YYYY-MM-DD'));
    }
    setOpen(false);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <h2 style={{
        fontSize: 22,
        fontWeight: 700,
        color: '#1e293b',
        margin: 0,
        lineHeight: 1,
      }}>
        Hello, {userInfo?.nickname || userInfo?.username || '值班员'}
      </h2>

      <div ref={containerRef} style={{ position: 'relative' }}>
        <div
          onClick={() => setOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(148, 163, 184, 0.12)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: 999,
            padding: '8px 18px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(148, 163, 184, 0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(148, 163, 184, 0.12)'; }}
        >
          <CalendarOutlined style={{ fontSize: 14, color: '#64748b' }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>
            {selectedDate.format('YYYY-MM-DD')}
          </span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>
            {selectedDate.isSame(dayjs(), 'day') ? '今天' : selectedDate.fromNow()}
          </span>
        </div>

        <ConfigProvider locale={zhCN}>
          <DatePicker
            open={open}
            onOpenChange={setOpen}
            value={selectedDate}
            onChange={handleDateChange}
            allowClear={false}
            format="YYYY-MM-DD"
            getPopupContainer={() => containerRef.current || document.body}
            style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, visibility: 'hidden' }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
