import { useState } from 'react';
import { Modal, Steps, Button, Checkbox, Input, message } from 'antd';
import {
  ThunderboltOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  WarningFilled,
  ReadOutlined,
  ClockCircleOutlined,
  AimOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { VO_COACHING } from '../data/mockData';

interface Props {
  onClose: () => void;
}

export function CoachingModal({ onClose }: Props) {
  const C = VO_COACHING;
  const [step, setStep] = useState(0); // 0,1,2 = steps; 3 = success
  const [opts, setOpts] = useState({ enroll: true, audit: true, notify: true, note: true });
  const [noteText, setNoteText] = useState(C.note);
  const [msg, contextHolder] = message.useMessage();

  const toggle = (k: keyof typeof opts) =>
    setOpts((o) => ({ ...o, [k]: !o[k] }));

  const footer =
    step === 0 ? (
      <>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" onClick={() => setStep(1)}>
          Next: recommended training
        </Button>
      </>
    ) : step === 1 ? (
      <>
        <Button onClick={() => setStep(0)}>Back</Button>
        <Button onClick={() => msg.info('Plan opened in editor')}>Edit plan</Button>
        <Button type="primary" onClick={() => setStep(2)}>
          Next: approval
        </Button>
      </>
    ) : step === 2 ? (
      <>
        <Button onClick={() => setStep(1)}>Back</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="primary"
          icon={<CheckCircleOutlined />}
          onClick={() => setStep(3)}
        >
          Approve enrollment
        </Button>
      </>
    ) : (
      <>
        <Button onClick={() => msg.info('Opening coaching tracker')}>
          View coaching plan
        </Button>
        <Button type="primary" onClick={onClose}>
          Done
        </Button>
      </>
    );

  return (
    <>
      {contextHolder}
      <Modal
        open
        centered
        onCancel={onClose}
        width={640}
        footer={footer}
        maskClosable
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            AI-recommended coaching plan
            <span className="vo-ai-chip">
              <ThunderboltOutlined /> Rohan Mehta
            </span>
          </span>
        }
      >
        <div style={{ paddingTop: 8 }}>
          {step < 3 && (
            <Steps
              current={step}
              size="small"
              style={{ marginBottom: 24 }}
              items={[
                { title: 'Pattern detected' },
                { title: 'Recommended training' },
                { title: 'Automation approval' },
              ]}
            />
          )}

          {/* Step 0: Pattern detected */}
          {step === 0 && (
            <div>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 14px' }}>
                {C.pattern}
              </p>
              <div
                style={{
                  border: '1px solid #f0f0f0',
                  borderRadius: 8,
                  padding: '8px 16px',
                }}
              >
                {C.evidence.map((e) => (
                  <div className="vo-evidence-li" key={e}>
                    <WarningFilled style={{ color: '#faad14', marginTop: 3 }} />
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Recommended training */}
          {step === 1 && (
            <div>
              <div className="vo-module">
                <span className="vo-module-icon">
                  <ReadOutlined />
                </span>
                <span style={{ flex: 1 }}>
                  <div className="vo-module-name">{C.module.name}</div>
                  <div className="vo-module-meta">
                    <span>
                      <ClockCircleOutlined /> {C.module.duration}
                    </span>
                    <span>
                      <AimOutlined /> {C.module.format}
                    </span>
                  </div>
                </span>
              </div>
              <div style={{ marginTop: 14 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--ad-color-text-secondary)',
                    marginBottom: 4,
                  }}
                >
                  Why this module
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {C.module.reason}
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Automation approval */}
          {step === 2 && (
            <div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}
              >
                {[
                  { k: 'enroll' as const, label: 'Enroll agent automatically' },
                  {
                    k: 'audit' as const,
                    label: 'Schedule follow-up audit (Friday, Jun 12)',
                  },
                  { k: 'notify' as const, label: 'Notify agent' },
                  { k: 'note' as const, label: 'Add manager note' },
                ].map((o) => (
                  <Checkbox
                    key={o.k}
                    checked={opts[o.k]}
                    onChange={() => toggle(o.k)}
                  >
                    {o.label}
                  </Checkbox>
                ))}
              </div>
              {opts.note && (
                <div style={{ marginTop: 8 }}>
                  <label
                    htmlFor="vo-mgr-note"
                    style={{
                      fontSize: 13,
                      color: 'var(--ad-color-text-secondary)',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Manager note (visible to Rohan)
                  </label>
                  <Input.TextArea
                    id="vo-mgr-note"
                    rows={3}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="vo-success">
              <div className="big-icon">
                <CheckCircleFilled style={{ color: '#52c41a', fontSize: 48 }} />
              </div>
              <h3>Coaching plan approved</h3>
              <p>{C.success}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

