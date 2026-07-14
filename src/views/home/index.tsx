import { useState } from 'react';
import SectionCards from './SectionCards';
import GreetingBar from './GreetingBar';
import DashboardSidebar from './DashboardSidebar';
import WarningRiskPanel from './WarningRiskPanel';
import WaterLevelPanel from './WaterLevelPanel';
import HomeMap from './HomeMap';
import WarningEventTable from './WarningEventTable';
import EmergencyContacts from './EmergencyContacts';

export default function HomePage() {
  const [activePanel, setActivePanel] = useState('overview');

  return (
    <div style={{ display: 'flex', gap: 0 }}>
      <DashboardSidebar activeKey={activePanel} onSelect={setActivePanel} />

      <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GreetingBar onDateChange={(date) => console.log('回溯日期:', date)} />

        {/* Row 1: 断面指标卡片 */}
        <SectionCards />

        {/* Row 2: 数据看板 (左) + GIS 地图 (右) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <WarningRiskPanel />
            <WaterLevelPanel />
          </div>
          <div className="glass-panel-static" style={{ padding: 0, overflow: 'hidden', minHeight: 460 }}>
            <HomeMap />
          </div>
        </div>

        {/* Row 3: 预警事件表 (左) + 应急通讯录 (右) */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 16 }}>
          <WarningEventTable />
          <EmergencyContacts />
        </div>
      </div>
    </div>
  );
}
