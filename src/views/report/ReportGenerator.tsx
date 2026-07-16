import { useState } from 'react';
import { Input, Button } from 'antd';
import { generateReport } from '@/api/ai/report';
import type { ReportItem } from './ReportList';

interface ReportGeneratorProps {
  onGenerated: (report: ReportItem) => void;
}

export default function ReportGenerator({ onGenerated }: ReportGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const result = await generateReport({
        topic: topic.trim(),
        requirements: requirements.trim() || undefined,
      });
      const item: ReportItem = {
        id: result.id,
        topic: result.topic,
        createdAt: result.createdAt,
        result,
      };
      onGenerated(item);
      setTopic('');
      setRequirements('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ height: '100%', padding: 20, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>
        报告智能生成
      </h3>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 13, color: '#475569', marginBottom: 6, display: 'block' }}>
          报告主题
        </label>
        <Input
          placeholder="输入报告主题，如：荆江河段2025年6月岸线监测分析"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onPressEnter={handleGenerate}
          disabled={loading}
        />
      </div>
      <div style={{ marginBottom: 16, flex: 1 }}>
        <label style={{ fontSize: 13, color: '#475569', marginBottom: 6, display: 'block' }}>
          补充要求（可选）
        </label>
        <Input.TextArea
          placeholder="输入额外的报告要求..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          disabled={loading}
          rows={3}
        />
      </div>
      <Button
        type="primary"
        onClick={handleGenerate}
        loading={loading}
        disabled={!topic.trim()}
        block
      >
        {loading ? '生成中...' : '生成报告'}
      </Button>
    </div>
  );
}
