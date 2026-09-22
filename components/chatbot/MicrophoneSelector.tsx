'use client';

import { useEffect, useState } from 'react';

interface MicrophoneSelectorProps {
  onDeviceChange?: (deviceId: string) => void;
  currentDeviceId?: string;
}

export default function MicrophoneSelector({ onDeviceChange, currentDeviceId }: MicrophoneSelectorProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string>(currentDeviceId || '');

  useEffect(() => {
    // Solicitar permiso para acceder a los dispositivos
    const getDevices = async () => {
      try {
        // Primero solicitamos permiso si no lo tenemos
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = mediaDevices.filter(device => device.kind === 'audioinput');
        setDevices(audioInputs);
        
        if (audioInputs.length > 0 && !selectedDevice) {
          setSelectedDevice(audioInputs[0].deviceId);
          onDeviceChange?.(audioInputs[0].deviceId);
        }
      } catch (error) {
        console.error('Error accessing microphone devices:', error);
      }
    };

    getDevices();

    // Escuchar cambios en los dispositivos
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, [selectedDevice, onDeviceChange]);

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    onDeviceChange?.(deviceId);
    setIsOpen(false);
  };

  const selectedDeviceName = devices.find(d => d.deviceId === selectedDevice)?.label || 'Seleccionar micrófono';

  return (
    <div style={{ position: 'relative', zIndex: 1000 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          borderRadius: 8,
          background: 'rgba(200, 80, 255, 0.1)',
          border: '1px solid rgba(200, 80, 255, 0.3)',
          color: 'rgba(200, 80, 255, 0.9)',
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(200, 80, 255, 0.15)';
          e.currentTarget.style.borderColor = 'rgba(200, 80, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(200, 80, 255, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(200, 80, 255, 0.3)';
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/>
        </svg>
        <span style={{ 
          maxWidth: 150, 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap' 
        }}>
          {selectedDeviceName}
        </span>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={2} 
          style={{ 
            width: 14, 
            height: 14, 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 8,
            minWidth: 250,
            maxHeight: 300,
            overflowY: 'auto',
            background: 'rgba(8, 4, 12, 0.95)',
            border: '1px solid rgba(200, 80, 255, 0.3)',
            borderRadius: 8,
            padding: 8,
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          {devices.length === 0 ? (
            <div style={{ 
              padding: '12px', 
              textAlign: 'center', 
              color: 'rgba(200, 80, 255, 0.5)',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.7rem'
            }}>
              No se encontraron micrófonos
            </div>
          ) : (
            devices.map((device) => (
              <button
                key={device.deviceId}
                onClick={() => handleDeviceSelect(device.deviceId)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 6,
                  background: selectedDevice === device.deviceId 
                    ? 'rgba(200, 80, 255, 0.2)' 
                    : 'transparent',
                  border: selectedDevice === device.deviceId 
                    ? '1px solid rgba(200, 80, 255, 0.5)' 
                    : '1px solid transparent',
                  color: selectedDevice === device.deviceId 
                    ? 'rgba(200, 80, 255, 1)' 
                    : 'rgba(200, 80, 255, 0.7)',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '0.7rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginBottom: 4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (selectedDevice !== device.deviceId) {
                    e.currentTarget.style.background = 'rgba(200, 80, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDevice !== device.deviceId) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {device.label || `Micrófono ${device.deviceId.slice(0, 8)}...`}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
