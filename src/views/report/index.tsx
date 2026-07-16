import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button, Input, message } from 'antd';
import { EditOutlined, SaveOutlined, ExportOutlined, CloseOutlined } from '@ant-design/icons';
import ReportList from './ReportList';
import ReportGenerator from './ReportGenerator';
import ReportChat from './ReportChat';
import { listReports, getReport, updateReport, exportReport } from '@/api/ai/report';
import type { ReportItem } from './ReportList';
import type { ReportListItem, ReportDetail } from '@/api/ai/report';

export default function ReportPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadReportList();
  }, []);

  const loadReportList = async () => {
    try {
      setLoadingList(true);
      const list: ReportListItem[] = await listReports();
      setReports(list.map(r => ({
        id: r.id,
        topic: r.topic,
        createdAt: r.createdAt,
      })));
    } catch (e) {
      console.error('Failed to load reports', e);
    } finally {
      setLoadingList(false);
    }
  };

  const handleGenerated = (item: ReportItem) => {
    setReports(prev => [item, ...prev]);
    setSelectedId(item.id);
  };

  const handleSelect = async (id: string) => {
    setSelectedId(id);
    setEditing(false);
    const existing = reports.find(r => r.id === id);
    if (existing && !existing.result) {
      try {
        const detail: ReportDetail = await getReport(id);
        setReports(prev => prev.map(r =>
          r.id === id ? { ...r, result: { id: detail.id, topic: detail.topic, createdAt: detail.createdAt, content: detail.content } } : r
        ));
      } catch (e) {
        console.error('Failed to load report detail', e);
      }
    }
  };

  const handleDelete = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setEditing(false);
    }
  };

  const handleEdit = () => {
    if (!selectedReport?.result) return;
    setEditContent(selectedReport.result.content);
    setEditing(true);
  };

  const handleSave = async () => {
    if (!selectedId) return;
    setSaving(true);
    try {
      await updateReport(selectedId, editContent);
      setReports(prev => prev.map(r =>
        r.id === selectedId ? { ...r, result: r.result ? { ...r.result, content: editContent } : undefined } : r
      ));
      setEditing(false);
      message.success('报告已保存');
    } catch (e) {
      message.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    if (!selectedId) return;
    try {
      await exportReport(selectedId);
    } catch (e) {
      message.error('导出失败');
    }
  };

  const selectedReport = reports.find(r => r.id === selectedId);

  return (
    <div style={{ display: 'flex', gap: 12, height: 'calc(100vh - 72px - 16px)', padding: '8px' }}>
      <div style={{ width: 260, flexShrink: 0 }}>
        <ReportList
          reports={reports}
          selectedId={selectedId}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        <div style={{ flex: selectedReport ? '0 0 auto' : 1 }}>
          <ReportGenerator onGenerated={handleGenerated} />
        </div>

        {selectedReport?.result && (
          <div
            className="glass-card"
            style={{
              flex: 1,
              padding: 20,
              overflow: 'auto',
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexShrink: 0 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', margin: 0 }}>
                {selectedReport.topic}
              </h3>
              <div style={{ display: 'flex', gap: 6 }}>
                {editing ? (
                  <>
                    <Button size="small" icon={<SaveOutlined />} onClick={handleSave} loading={saving} type="primary">
                      保存
                    </Button>
                    <Button size="small" icon={<CloseOutlined />} onClick={() => setEditing(false)}>
                      取消
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="small" icon={<EditOutlined />} onClick={handleEdit} type="text">
                      编辑
                    </Button>
                    <Button size="small" icon={<ExportOutlined />} onClick={handleExport} type="text">
                      导出
                    </Button>
                  </>
                )}
              </div>
            </div>

            {editing ? (
              <Input.TextArea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                style={{ flex: 1, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8, resize: 'none' }}
              />
            ) : (
              <div className="markdown-body" style={{ fontSize: 14, color: '#334155', lineHeight: 1.9 }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedReport.result.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ width: 340, flexShrink: 0 }}>
        <ReportChat />
      </div>
    </div>
  );
}
