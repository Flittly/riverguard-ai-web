import { useState, useRef, useEffect } from 'react';
import { Input, Button, Tooltip } from 'antd';
import { SendOutlined, ReloadOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { streamChat } from '@/api/ai/chat';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ReportChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [sessionId] = useState(() => `report-${Date.now()}`);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
    const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    setStreaming(true);

    try {
      for await (const delta of streamChat({ message: text, sessionId })) {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: m.content + delta } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id ? { ...m, content: m.content || '请求失败，请重试' } : m
        )
      );
    } finally {
      setStreaming(false);
    }
  };

  const handleClear = () => setMessages([]);

  return (
    <div className="glass-card" style={{ height: '100%', padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', margin: 0 }}>AI 助手</h3>
        <Tooltip title="清空对话">
          <Button type="text" size="small" icon={<ReloadOutlined />} onClick={handleClear} />
        </Tooltip>
      </div>

      <div ref={listRef} style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        {messages.length === 0 && (
          <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', paddingTop: 60 }}>
            <RobotOutlined style={{ fontSize: 32, marginBottom: 8, color: '#cbd5e1' }} />
            <p>与我对话，调整报告内容</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: msg.role === 'user' ? 'rgba(59,130,246,0.12)' : 'rgba(16,185,129,0.12)',
              flexShrink: 0,
            }}>
              {msg.role === 'user' ? (
                <UserOutlined style={{ fontSize: 13, color: '#3b82f6' }} />
              ) : (
                <RobotOutlined style={{ fontSize: 13, color: '#10b981' }} />
              )}
            </div>
            <div style={{
              flex: 1,
              fontSize: 13,
              color: '#334155',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {msg.content || (msg.role === 'assistant' && streaming ? '...' : '')}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 8 }}>
        <Input.TextArea
          placeholder="输入消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) { e.preventDefault(); handleSend(); }
          }}
          disabled={streaming}
          autoSize={{ minRows: 1, maxRows: 3 }}
          style={{ fontSize: 13 }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={streaming}
          disabled={!input.trim()}
        />
      </div>
    </div>
  );
}
