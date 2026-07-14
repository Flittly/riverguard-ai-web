import { Card, Statistic, Row, Col } from 'antd';
import { WarningOutlined, SafetyOutlined, RadarChartOutlined, ApiOutlined } from '@ant-design/icons';

const stats = [
  { key: 'sections', label: '监测岸段', value: 12, icon: <SafetyOutlined />, color: '#1677ff' },
  { key: 'warnings', label: '本月预警', value: 3, icon: <WarningOutlined />, color: '#fa541c' },
  { key: 'sensors', label: '在线传感器', value: 86, icon: <ApiOutlined />, color: '#52c41a' },
  { key: 'riskSites', label: '高风险点位', value: 2, icon: <RadarChartOutlined />, color: '#faad14' },
];

export default function HomeStats() {
  return (
    <div className="glass-card">
      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>监测概览</h3>
      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col span={6} key={item.key}>
            <Card
              styles={{ body: { padding: '20px 24px' } }}
              style={{
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 16,
              }}
            >
              <Statistic
                title={<span style={{ color: '#64748b', fontSize: 13 }}>{item.label}</span>}
                value={item.value}
                prefix={<span style={{ color: item.color, marginRight: 8, fontSize: 20 }}>{item.icon}</span>}
                styles={{ value: { color: '#1e293b', fontSize: 28, fontWeight: 600 } }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
